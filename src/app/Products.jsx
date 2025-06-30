'use client';
import { baseImage, useApiGet } from '../config/Api';
import FeatureList from '../components/molecules/FeatureList';
import ProductSkeleton from '../components/skeleton/ProductSkeleton';
import { useEffect, useState, useMemo } from 'react';
import Breadcrumb from '../components/atoms/Breadcrumb';
import { Link } from 'react-router-dom';

export default function Products() {
  const { data, loading } = useApiGet('/get-store-products');
  const [active, setActive] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 12;

  const { data: categoriesData, loading: categoriesLoading } = useApiGet('/get-store-categories');

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
  const products = {
    currency: 'ج.م',
    btnName: 'شراء الان',
    btnIcon: '/icons/buy.png',
    title1: 'المنتجات الاكثر ',
    title2: 'مبيعاً',
    data:
      data?.data?.data?.map(product => ({
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
      })) || [],
  };

  const categorySlug = window.location.pathname.split('/').pop(); // Get last part of URL
  useEffect(() => {
    if (categorySlug) {
      const foundCategory = categories.find(cat => cat.slug === categorySlug);
      if (foundCategory) {
        setActive(foundCategory.key);
      }
    }
  }, [categorySlug, categories]);

  const filteredData = active === 'all' ? products.data : products.data.filter(p => p.type.includes(active));

  const pageCount = Math.ceil(filteredData.length / limit);
  const paginatedProducts = filteredData.slice((currentPage - 1) * limit, currentPage * limit);

  const generatePagination = (current, total) => {
    const delta = 1;
    const range = [];
    const rangeWithDots = [];
    let l;

    for (let i = 1; i <= total; i++) {
      if (i === 1 || i === total || (i >= current - delta && i <= current + delta)) {
        range.push(i);
      }
    }

    for (let i of range) {
      if (l) {
        if (i - l === 2) {
          rangeWithDots.push(l + 1);
        } else if (i - l !== 1) {
          rangeWithDots.push('...');
        }
      }
      rangeWithDots.push(i);
      l = i;
    }

    return rangeWithDots;
  };

  const breadcrumbRoutes = [{ label: 'الرئيسية', href: '/' }, { label: 'جميع المنتجات' }];

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
                      setCurrentPage(1);
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
            : paginatedProducts.map((p, index) => (
                <div data-aos={`${index % 2 == 0 ? 'zoom-in' : 'zoom-out'}`} key={p.id} className='group product-item  border border-[#EEEEEE] relative bg-white text-black rounded-lg p-3'>
                  <div className='img-switcher-2 relative'>
                    {p.discountLabel && <span className='absolute shadow-xl top-[5px] left-[5px] z-[10] text-[10px] bg-[var(--second)] text-white px-[10px] py-[5px] rounded-[6px]'>{p.discountLabel}</span>}
                    {p.fakeStock?.status && <span className='absolute shadow-xl top-[5px] right-[5px] z-[10] text-[10px] bg-red-500 text-white px-[10px] py-[5px] rounded-[6px]'>متبقي {p.fakeStock.left} فقط</span>}
                    <img src={p.image} alt={p.title} className='base' />
                    <img src={p.secondImage} alt={p.title} className='overlay' />
                  </div>
                  <span className='bg-[#F8F8F9] text-[#A0A9BB] px-[20px] py-[5px] shadow-sm w-fit text-[10px] rounded-[10px] my-[10px] block mx-auto'>{p.cta}</span>
                  <span className='text-center w-full block text-[var(--black-1)] text-base my-[10px]'>{p.title}</span>
                  <div className='flex items-center justify-center gap-[10px]'>
                    <span className='text-[var(--second)] text-[15px]'>
                      {p.salePrice} {products.currency}
                    </span>
                    {p.originalPrice !== p.salePrice && (
                      <span className='text-[var(--black-4)] text-[12px] line-through'>
                        {p.originalPrice} {products.currency}
                      </span>
                    )}
                  </div>
                  <Link to={`/product/${p.slug}`} className='btn-blue w-[calc(100%-30px)] mx-auto mt-[20px]'>
                    {products.btnName}
                    <img src={products.btnIcon} alt='' width={20} height={20} />
                  </Link>
                </div>
              ))}
        </div>

        {/* Pagination */}
        {pageCount > 1 && (
          <div className=' bg-white flex items-center justify-center pt-6 pb-6 gap-2'>
            <svg onClick={() => setCurrentPage(Number(1))} className='bg-white border text-gray-700 cursor-pointer px-3 py-2 w-[40px] h-[40px] hover:scale-[1.1] hover:border-transparent duration-300 group hover:bg-[var(--main)] hover:fill-white  rounded-full' width='17' height='16' viewBox='0 0 17 16' fill='currentColor' xmlns='http://www.w3.org/2000/svg'>
              <path d='M4.7735 4L3.8335 4.94L6.88683 8L3.8335 11.06L4.7735 12L8.7735 8L4.7735 4Z' className='group-hover:!fill-white fill-gray-700' fill='' />
              <path d='M9.16656 4L8.22656 4.94L11.2799 8L8.22656 11.06L9.16656 12L13.1666 8L9.16656 4Z' className='group-hover:!fill-white fill-gray-700' />
            </svg>

            <div className='flex justify-center  gap-2'>
              {generatePagination(currentPage, pageCount).map((item, idx) =>
                item === '...' ? (
                  <span key={idx} className='px-3 py-2 text-gray-500'>
                    ...
                  </span>
                ) : (
                  <button key={idx} onClick={() => setCurrentPage(Number(item))} className={`px-3 py-2 w-[40px] h-[40px] hover:scale-[1.1] hover:border-transparent duration-300 hover:bg-[var(--main)] hover:text-white rounded-full ${currentPage === item ? 'bg-[var(--main)] text-white' : 'bg-white border text-gray-700'}`}>
                    {item}
                  </button>
                ),
              )}
            </div>

            <svg onClick={() => setCurrentPage(Number(pageCount))} className=' rotate-[-180deg] bg-white border text-gray-700 cursor-pointer px-3 py-2 w-[40px] h-[40px] hover:scale-[1.1] hover:border-transparent duration-300 group hover:bg-[var(--main)] hover:fill-white  rounded-full' width='17' height='16' viewBox='0 0 17 16' fill='currentColor' xmlns='http://www.w3.org/2000/svg'>
              <path d='M4.7735 4L3.8335 4.94L6.88683 8L3.8335 11.06L4.7735 12L8.7735 8L4.7735 4Z' className='group-hover:!fill-white fill-gray-700' fill='' />
              <path d='M9.16656 4L8.22656 4.94L11.2799 8L8.22656 11.06L9.16656 12L13.1666 8L9.16656 4Z' className='group-hover:!fill-white fill-gray-700' />
            </svg>
          </div>
        )}

        <FeatureList />
      </div>
    </div>
  );
}
