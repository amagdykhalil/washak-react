import { Link, useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect, useMemo, useRef } from 'react';
import { AlertTriangleIcon, Star } from 'lucide-react';
import { ProductInfoSkeleton, ProductImageSkeleton } from '../components/skeleton/ProductSkeleton';
import { useForm } from 'react-hook-form';
import Breadcrumb from '../components/atoms/Breadcrumb';
import FeatureList from '../components/molecules/FeatureList';
import PriceCurrency from '../components/atoms/PriceCurrency';
import MetaTags from '../components/atoms/MetaTags';
import ProductCarouselRelated from '../components/atoms/ProductCarouselRelated';
import { api, baseImage, BaseUrl, useApiGet } from '../config/Api';
import { ProductImageGallery } from '../components/pages/product/ProductImageGallery';
import { CountdownTimer } from '../components/pages/product/CountdownTimer';
import { VariantSelector } from '../components/pages/product/VariantSelector';
import { StockInfo } from '../components/pages/product/StockInfo';
import { CheckoutForm } from '../components/pages/product/CheckoutForm';
import { BuyNowSection } from '../components/pages/product/BuyNowSection';
import { FrequentlyBoughtTogether } from '../components/pages/product/FrequentlyBoughtTogether';
import { ImageModal } from '../components/pages/product/ImageModal';
import { useAppContext } from '../AppContext';

export default function Product() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { storeOptions } = useAppContext();

  const {
    register,
    formState: { errors },
    setValue,
    getValues,
    trigger,
    handleSubmit,
    reset,
  } = useForm({ defaultValues: { qty: 1, options: [], product_id: '' } });
  const [isBuyNowLoading, setIsBuyNowLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showValidation, setShowValidation] = useState(false);
  const [frequentlyBoughtQty] = useState(1);

  // Fetch product data
  const { error, data: productData, loading: productLoading } = useApiGet(`/get-product-by-slug/${id}`);
  const { product, product_variants, frequently_bought_products, product_meta, product_style_settings, product_term_global_options } = !productLoading && productData?.data ? productData.data : {};

  // Fetch checkout settings
  const { data: checkoutSettings, loading: checkoutLoading } = useApiGet('/get-checkout-settings');
  const checkoutFields = checkoutSettings?.data || [];

  // Image handling
  const images = product?.medias?.map(media => baseImage + media.url) || [];
  const [selectedImage, setSelectedImage] = useState(images?.[0]);

  useEffect(() => {
    setSelectedImage(images[0]);
  }, [productLoading]);

  // Set product ID when data loads
  useEffect(() => {
    if (product?.id) {
      setValue('product_id', product.id);
    }
  }, [product?.id, product_term_global_options]);

  // Breadcrumb
  const breadcrumbRoutes = [{ label: 'الرئيسية', href: '/' }, { label: 'كل المنتجات', href: '/products' }, { label: 'تفاصيل المنتج' }];

  // Price calculations
  const mainProductPrice = product?.price?.special_price || 0;
  const extrasTotal = frequently_bought_products?.reduce((acc, p) => acc + (p?.price?.special_price || 0), 0);

  // Total price for Frequently Bought Together (fixed quantity)
  const frequentlyBoughtTotalPrice = useMemo(() => {
    return (mainProductPrice + extrasTotal) * frequentlyBoughtQty;
  }, [mainProductPrice, extrasTotal, frequentlyBoughtQty]);

  // SEO
  const seo = product_meta && JSON.parse(product_meta?.seo);
  const hurryUpText = product_meta?.hurry_option && JSON.parse(product_meta?.hurry_option)?.content;

  // Countdown timer data
  const countdownData = product?.price?.count_down_timer_end ? JSON.parse(product?.price?.count_down_timer_end) : null;

  // Related products
  const { data: relatedProducts, loading: loadingRelatedProducts } = useApiGet(`/get-related-products/${id}`);

  // Quantity handlers
  const increaseQuantity = () => {
    const currentQty = getValues('qty') || 1;
    setValue('qty', currentQty + 1, { shouldValidate: true });
  };

  const decreaseQuantity = () => {
    const currentQty = getValues('qty') || 1;
    setValue('qty', Math.max(1, currentQty - 1), { shouldValidate: true });
  };

  // Handle buy now click
  const handleBuyNow = async () => {
    const isValid = await trigger();
    if (!isValid) return;

    const missingVariants = product_variants?.filter(variant => variant.is_required && !getValues('options')?.some(opt => opt.startsWith(`${variant.id}_`)));

    if (missingVariants?.length > 0) {
      setShowValidation(true);
      return;
    }

    const data = getValues();
    setIsBuyNowLoading(true);

    const orderSummary = {
      ...data,
      currency_name: storeOptions?.data?.currency.value.currency_name,
      zip_code: data.zip_code || '10001',
      ip_address: '127.0.0.1',
      options: data.options.map(opt => opt.split('_')[1]),
    };

    try {

      const res = await api.post(`/submit-quick-checkout`, orderSummary);
      sessionStorage.setItem('checkout_data', JSON.stringify({ orderSummary, res : res.data.data, productData }));

      // reset();
      navigate('/thank-you-page');
    } catch (error) {
      console.error('Error submitting order:', error);
    } finally {
      setIsBuyNowLoading(false);
    }
  };

  if (productLoading || checkoutLoading) {
    return (
      <div className='bg-[#f8fafb] min-h-[calc(100vh-300px)] '>
        <Breadcrumb cn='!mt-0 !pt-[30px] container' routes={breadcrumbRoutes} />
        <div className='!mb-[30px] container max-md:!px-[20px] pb-[50px] grid max-xl:grid-cols-1 grid-cols-[720px,1fr] rounded-xl gap-6'>
          <ProductImageSkeleton />
          <ProductInfoSkeleton />
        </div>

        <div className='!mb-[30px] container max-md:!px-[20px] pb-[50px] flex flex-nowrap overflow-x-hidden gap-4 py-[50px] px-[20px]'>
          {Array(5)
            .fill(0)
            .map((_, i) => (
              <div key={i} className='animate-pulse flex-none max-w-[365px] w-full shadow-sm border border-[#EEEEEE] bg-white rounded-lg p-3'>
                <div className='bg-gray-200 h-[230px] rounded mb-4' />
                <div className='h-3 bg-gray-200 rounded w-1/3 mx-auto mb-2' />
                <div className='h-4 bg-gray-200 rounded w-1/2 mx-auto mb-4' />
                <div className='flex justify-center gap-2 mb-4'>
                  <div className='h-4 bg-gray-200 rounded w-1/4' />
                  <div className='h-4 bg-gray-200 rounded w-1/6' />
                </div>
                <div className='h-8 bg-gray-200 rounded w-full' />
              </div>
            ))}
        </div>
      </div>
    );
  }

  // if (error) {
  //   navigate('/not-found');
  //   return null;
  // }

  return (
    <div className='bg-[#f8fafb]'>
      <MetaTags title={seo?.meta_title} description={seo?.meta_description} image={`${baseImage}${product?.medias?.[0]?.url}`} url={`${BaseUrl}/product/${product?.slug}`} keywords={seo?.meta_keyword} />

      <Breadcrumb cn='!mt-0 !pt-[30px] container' routes={breadcrumbRoutes} />

      <div className='!mb-[30px] container max-md:!px-[20px] pb-[50px] grid max-xl:grid-cols-1 grid-cols-[720px,1fr] rounded-xl gap-6'>
        <ProductImageGallery images={images} selectedImage={selectedImage} setSelectedImage={setSelectedImage} setIsModalOpen={setIsModalOpen} product={product} />

        <div className='!p-6 bg-white  rounded-md h-fit flex-1 space-y-4'>
          <Categories categories={product?.categories} />
          <ProductTitle title={product?.title} />
          <PriceDisplay price={product?.price} />
          <Reviews reviewEnable={product?.review_enable} noOfReviews={product?.no_of_reviews} />
          <Description content={product?.product_short_description} />

          <CountdownTimer countdownData={countdownData} text={product_term_global_options?.[0]?.text_above_counter} />
          <HurryUpAlert text={hurryUpText} />
          <VariantSelector variants={product_variants} getValues={getValues} setValue={setValue} showValidation={showValidation} setShowValidation={setShowValidation} />
          <StockInfo stock={product?.stock} />
          <CheckoutForm checkoutFields={checkoutFields} register={register} errors={errors} />
          <BuyNowSection showValidation={showValidation} isBuyNowLoading={isBuyNowLoading} handleBuyNow={handleBuyNow} getValues={getValues} setValue={setValue} increaseQuantity={increaseQuantity} decreaseQuantity={decreaseQuantity} />
        </div>
      </div>

      {/* <FrequentlyBoughtTogether frequently_bought_products={frequently_bought_products} product={product} frequentlyBoughtTotalPrice={frequentlyBoughtTotalPrice} isBuyNowLoading={isBuyNowLoading} errors={errors} checkoutFields={checkoutFields} getValues={getValues} handleBuyNow={handleBuyNow} /> */}

      <ProductCarouselRelated title={product_style_settings?.related_prod_name_custom || 'منتجات ذات صلة'} subTitle={'تصفّح منتجات قد تعجبك أيضًا بناءً على هذا المنتج'} cn='max-sm:!px-[10px] !mt-6' bg='sm:!px-[20px] py-[40px] bg-white rounded-md border border-[var(--border-bg)]' products={relatedProducts?.data} loading={loadingRelatedProducts} arrowTop={true} />

      <FeatureList />

      <ImageModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} selectedImage={selectedImage} product={product} />
    </div>
  );
}

export const ProductTitle = ({ title }) => (
  <h2 className='text-2xl max-md:text-xl font-bold text-[#3B2D35]' data-aos='fade-up'>
    {title}
  </h2>
);

export const Categories = ({ categories }) =>
  categories?.length > 0 && (
    <div className='flex flex-wrap gap-2 items-center' data-aos='fade-up' data-aos-delay='100'>
      {categories.map(category => (
        <Link to={`/${category.slug}`} key={category.id} className='bg-[var(--second)] text-white text-xs  px-3 py-1 rounded-full shadow-sm hover:opacity-90 transition'>
          {category.name}
        </Link>
      ))}
    </div>
  );

export const PriceDisplay = ({ price }) => (
  <div className='flex items-center gap-2' data-aos='fade-up' data-aos-delay='200'>
    <span className='text-[#123770] font-bold text-lg'>
      <PriceCurrency currency={'ج.م'} price={price?.special_price} />
    </span>
    {price?.regular_price && (
      <>
        <span className='line-through text-[#A5A5A5] text-base'>
          <PriceCurrency currency={'ج.م'} price={price?.regular_price} />
        </span>
        <span className='bg-[var(--second)] text-white text-xs px-2 py-1 rounded-full flex items-center gap-[5px]'>
          هتوفر <PriceCurrency currency={'ج.م'} price={price?.regular_price - price?.special_price} />
        </span>
      </>
    )}
  </div>
);

export const HurryUpAlert = ({ text }) =>
  text && (
    <div className='bg-red-50 text-red-800 border border-red-200 px-4 py-3 rounded-lg flex items-center gap-3 animate-pulse shadow-sm' data-aos='fade-up' data-aos-delay='400'>
      <AlertTriangleIcon className='w-5 h-5 text-red-500' />
      <span className='text-sm font-medium'>{text}</span>
    </div>
  );

export const Reviews = ({ reviewEnable, noOfReviews }) =>
  reviewEnable != 0 && (
    <div className='flex items-center gap-[10px] text-sm text-[#666666]' data-aos='fade-up' data-aos-delay='500'>
      <span className='flex items-center text-[#FFC62A]'>
        {Array(5)
          .fill(0)
          .map((_, i) => (
            <Star key={i} className='!fill-[#FFC62A]' />
          ))}
      </span>
      ({noOfReviews}) تقييمات
    </div>
  );

export const Description = ({ content }) => content && <div className='text-[#959FBC] text-base leading-relaxed' dangerouslySetInnerHTML={{ __html: content }} data-aos='fade-up' data-aos-delay='600' />;
