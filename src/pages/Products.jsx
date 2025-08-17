'use client';
import { baseImage, useApiGet } from '../config/Api';
import FeatureList from '../components/molecules/FeatureList';
import ProductSkeleton from '../components/skeleton/ProductSkeleton';
import { useEffect, useState, useMemo } from 'react';
import Breadcrumb from '../components/atoms/Breadcrumb';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import Img from '../components/atoms/Image';
import { ShoppingCart } from 'lucide-react';
import EmptyState from '../components/atoms/EmptyState';
import { PriceBlock } from '../components/atoms/PriceCurrency';
import { useStoreCategories } from '../hooks/useStoreCategories';
import { useStoreProducts } from '../hooks/Product/useStoreProducts';
import { Pagination } from '../components/molecules/Pagination';
import { useAddToCart } from '../hooks/cart/useAddToCart';

export default function Products() {
  const { handleAddToCart } = useAddToCart();
  const { id: categoryId } = useParams(); // Get the category ID from URL params
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = Number(searchParams.get("page")) || 1;
  const { data: storedProducts, loading } = useStoreProducts(currentPage);
  const { data: categoriesData, loading: categoriesLoading } = useStoreCategories();
  const [active, setActive] = useState('all');
  const breadcrumbRoutes = [{ label: 'الرئيسية', href: '/' }, { label: 'جميع المنتجات' }];
  // Update the page in query string
  const setPage = (newPage) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", newPage);
    setSearchParams(params);
  };

  const categories = useMemo(() => {
    // Start with "All Products" option
    const result = [{ key: 'all', label: 'جميع المنتجات' }];

    // Add categories from API if available
    if (categoriesData?.data) {
      categoriesData.data.forEach(category => {
        result.push({
          key: category.id.toString(),
          slug: category.slug,
          label: category.name,
        });
      });
    }

    return result;
  }, [categoriesData]);

  const products = useMemo(() => {
    return storedProducts?.data?.data?.map(product => ({
      id: product.id,
      image: baseImage + product.preview?.media?.url || '/products/default.png',
      secondImage: baseImage + product.medias?.[1]?.url || '/products/default.png',
      discountLabel: product.price?.special_price < product.price?.regular_price ? `خصم ${Math.round(100 - (product.price.special_price / product.price.regular_price) * 100)}%` : null,
      cta: product.categories?.[0]?.name || 'منتج',
      type: product.categories?.[0]?.id?.toString() || 'all',
      title: product.title,
      originalPrice: product.price?.regular_price,
      salePrice: product.price?.price,
      slug: product.slug,
      stockStatus: product.stock?.stock_status,
      fakeStock: product.price?.fake_product_stock ? JSON.parse(product.price.fake_product_stock) : null,
    })) || []
  }, [storedProducts])

  useEffect(() => {
    if (categoryId) {
      // Find category by slug (assuming categoryId is the slug)
      const foundCategory = categories.find(cat => cat.slug === categoryId);
      if (foundCategory) {
        setActive(foundCategory.key);
      }
    } else {
      // No category ID in URL, show all products
      setActive('all');
    }
  }, [categoryId, categories]);

  const filteredData = active === 'all' ? products : products.filter(p => p.type.includes(active));

  const pageCount = Math.ceil(storedProducts?.data?.total / storedProducts?.data?.per_page || 15);

  function onClick(id) {
    handleAddToCart(...storedProducts?.data?.data?.filter(product => product.id == id), `mainImage-${id}`)
  }

  return (
    <div className='bg-[#f8fafb]'>
      <div className='container max-sm:!px-[20px] py-[30px]'>
        <div className=' py-6 space-y-4'>
          <div data-aos='fade-up' className='flex flex-wrap gap-3'>
            {categoriesLoading
              ? // Skeleton loading state
              Array(4)
                .fill(0)
                .map((_, index) => <div key={`cat-skeleton-${index}`} className='h-[45px] w-24 bg-gray-200 rounded-full animate-pulse' />)
              : // Actual categories when loaded
              categories.map(cat => (
                <button
                  key={cat.key}
                  onClick={() => {
                    setActive(cat.key);
                    setPage(1);
                  }}
                  className={`px-4 py-2 hover:bg-[var(--main)] hover:border-transparent hover:text-white min-h-[45px] hover:scale-[1.05] duration-300 rounded-full text-sm font-medium transition-all ${active === cat.key ? 'bg-[var(--main)] text-white scale-[1.1]' : 'bg-white text-[#58749A] border border-[#EEF0F7]'}`}>
                  {cat.label}
                </button>
              ))}
          </div>

          <Breadcrumb cn={'!pt-[30px]'} routes={breadcrumbRoutes} />
        </div>

        <div className='bg-white shadow-sm p-4 lg:p-8 rounded-md grid grid-cols-[repeat(auto-fit,minmax(320px,1fr))] gap-4'>
          {loading
            ? Array(12)
              .fill(0)
              .map((_, i) => <ProductSkeleton key={i} />)
            : filteredData.map((p, index) => (
              <PaginatedProductCard key={index} index={index} product={p} onClick={onClick} />
            ))}

          {filteredData.length === 0 && <EmptyState />}
        </div>

        {/* Pagination */}
        <Pagination currentPage={currentPage} pageCount={pageCount} setCurrentPage={setPage} />

        <FeatureList />
      </div>
    </div>
  );
}


const PaginatedProductCard = ({ product, index, onClick }) => {

  return <div data-aos={`${index % 2 == 0 ? 'fade-up' : 'fade-down'}`} className=' block max-w-[400px] group product-item  border border-[#EEEEEE] relative bg-white text-black rounded-lg p-3'>
    <Link to={`/product/${product.slug}`} className=' block img-switcher-2 relative'>
      {product.discountLabel && <span className='absolute shadow-xl top-[5px] left-[5px] z-[10] text-[10px] bg-[var(--second)] text-white px-[10px] py-[5px] rounded-[6px]'>{product.discountLabel}</span>}
      {product.fakeStock?.status && <span className='absolute shadow-xl top-[5px] right-[5px] z-[10] text-[10px] bg-red-500 text-white px-[10px] py-[5px] rounded-[6px]'>متبقي {product.fakeStock.left} فقط</span>}
      <Img id={`mainImage-${product.id}`} src={product.image} alt={product.title} className='base' />
      <img src={product.secondImage} alt={product.title} className='overlay' />
    </Link>
    <span className='bg-[#F8F8F9] text-[#A0A9BB] px-[20px] py-[5px] shadow-sm w-fit text-[10px] rounded-[10px] my-[10px] block mx-auto'>{product.cta}</span>
    <span className='text-center w-full block text-[var(--black-1)] text-base my-[10px]'>{product.title}</span>

    <PriceBlock ar salePrice={product.salePrice} originalPrice={product.originalPrice} />

    <div className=' flex items-center justify-between mt-[20px] gap-2'>
      <Link to={`/product/${product.slug}`} className='btn-blue flex-1 text-center py-2 rounded-md'>
        "شراء الان"
        <img src="/icons/buy.png" alt='' width={20} height={20} />
      </Link>

      <button onClick={() => onClick(product.id)} className=' h-[40px] w-[40px] flex items-center justify-center  bg-[var(--second)] hover:scale-[0.9] hover:opacity-90 duration-300 text-white p-2 rounded-md transition-all shadow-md' title='أضف إلى السلة'>
        <ShoppingCart size={18} />
      </button>
    </div>
  </div>
} 