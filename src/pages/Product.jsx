import { Link } from 'react-router-dom';
import { useState } from 'react';
import { AlertTriangleIcon, Star } from 'lucide-react';
import { ProductInfoSkeleton, ProductImageSkeleton } from '../components/skeleton/ProductSkeleton';
import Breadcrumb from '../components/atoms/Breadcrumb';
import FeatureList from '../components/molecules/FeatureList';
import PriceCurrency from '../components/atoms/PriceCurrency';
import MetaTags from '../components/atoms/MetaTags';
import ProductCarouselRelated from '../components/atoms/ProductCarouselRelated';
import { baseImage, BaseUrl } from '../config/Api';
import { ProductImageGallery } from '../components/pages/product/ProductImageGallery';
import { CountdownTimer } from '../components/pages/product/CountdownTimer';
import { VariantSelector } from '../components/pages/product/VariantSelector';
import { StockInfo } from '../components/pages/product/StockInfo';
import { CheckoutForm } from '../components/pages/product/CheckoutForm';
import { BuyNowSection } from '../components/pages/product/BuyNowSection';
import { FrequentlyBoughtTogether } from '../components/pages/product/FrequentlyBoughtTogether';
import { useProduct } from '../hooks/Product/useProduct';

export default function Product() {
  const { breadcrumbRoutes,
    navigate,
    seo,
    product,
    loading,
    loadingLiveVariantPrice,
    error,
    loadingRelatedProducts,
    relatedProducts,
    productOptions,
    countdownData,
    hurryUpOptions,
    variant,
    product_variants,
    getValues,
    setValue,
    showValidation,
    setShowValidation,
    isQuickCheckout,
    checkoutFields,
    register,
    frequently_bought_products,
    frequentlyBoughtTotalPrice,
    isBuyNowLoading,
    errors,
    handleBuyNow,
    quantity,
    defaultVariantCombination,
    product_style_settings } = useProduct();


  if (loading) {
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

  if (error) {
    navigate('/not-found');
    return null;
  }

  return (
    <div className='bg-[#f8fafb]'>
      <MetaTags title={seo?.meta_title} description={seo?.meta_description} image={`${baseImage}${product?.medias?.[0]?.url}`} url={`${BaseUrl}/product/${product?.slug}`} keywords={seo?.meta_keyword} />

      <Breadcrumb cn='!mt-0 !pt-[30px] container' routes={breadcrumbRoutes} />

      <div className='!mb-[30px] container max-md:!px-[20px] pb-[50px] grid max-xl:grid-cols-1 grid-cols-[720px,1fr] rounded-xl gap-6 items-stretch'>
        <ProductImageGallery product={product} />

        <div className='flex flex-col !p-6 bg-white  rounded-md  flex-1 space-y-4 h-full'>
          <Categories categories={product?.categories} />
          <ProductTitle title={product?.title} />
          <ProductHeader isEnabled={productOptions?.product_header === "1"} text={productOptions?.product_header_text} />
          <PriceDisplay price={product?.price} />


          <Reviews reviewEnable={product?.review_enable} noOfReviews={product?.no_of_reviews} />
          <Description content={product?.product_content} shortDescription={product?.product_short_description} isShortEnabled={product_style_settings?.product_short_description_status === 'yes'} isDescriptionEnabled={productOptions?.description_switch} />

          <CountdownTimer countdownData={countdownData} text={productOptions?.text_above_counter} />
          <HurryUpAlert text={hurryUpOptions?.hurryUpText} />
          <LiveVariantPrice
            loading={loadingLiveVariantPrice}
            price={variant?.price}
            comparePrice={variant?.compare_at_price}
            quantity={quantity}
          />
          <VariantSelector
            key={product.id}
            variants={product_variants}
            isVariantSelected={(variant) => {
              const selectedOptions = getValues('options');
              return selectedOptions.some(opt => opt.startsWith(`${variant.id}_`));
            }
            }
            setNewOption={(variantId, optionId) => {
              const selectedOptions = getValues('options') || [];
              // Remove any existing option for this variant
              const newOptions = selectedOptions.filter(opt => !opt.startsWith(`${variantId}_`));
              console.log("newOptions", newOptions)
              // Add the new one if valid
              if (optionId !== null && optionId !== undefined && optionId !== '') {
                newOptions.push(`${variantId}_${optionId}`);
              }

              setValue('options', newOptions, { shouldValidate: false });
            }}
            getValues={() => {
              return getValues('options') || [];
            }}
            showValidation={showValidation}
            setShowValidation={setShowValidation}
            defaultCvariantCombinations={defaultVariantCombination}
          />
          <StockInfo stock={product?.stock} options={productOptions} />
          {isQuickCheckout ? <CheckoutForm checkoutFields={checkoutFields} register={register} errors={errors} className='!mt-8' /> : null}
          <BuyNowSection showValidation={showValidation} isBuyNowLoading={isBuyNowLoading} handleBuyNow={handleBuyNow} getValues={getValues} setValue={setValue} isSticky={productOptions?.product_footer_buy_sticky === '1'} buttonText={productOptions?.buy_now_button_text} />
        </div>
      </div>

      <FrequentlyBoughtTogether frequently_bought_products={frequently_bought_products} product={product} frequentlyBoughtTotalPrice={frequentlyBoughtTotalPrice} isBuyNowLoading={isBuyNowLoading} errors={errors} checkoutFields={checkoutFields} getValues={getValues} handleBuyNow={handleBuyNow} />

      {product_style_settings?.related_product_button_enable_custom === '1' ?
        <ProductCarouselRelated title={product_style_settings?.related_prod_name_custom || 'منتجات ذات صلة'} subTitle={'تصفّح منتجات قد تعجبك أيضًا بناءً على هذا المنتج'} cn='max-sm:!px-[10px] !mt-6' bg='sm:!px-[20px] py-[40px] bg-white rounded-md border border-[var(--border-bg)]' products={relatedProducts?.data} loading={loadingRelatedProducts} arrowTop={true} />
        : null}

      <FeatureList />

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

export const LiveVariantPrice = ({ loading, price, comparePrice, quantity = 1 }) => {
  if (loading) {
    return (
      <div
        aria-live="polite"
        className="mt-3 flex items-center gap-2 bg-amber-50 text-amber-800 px-3 py-1.5 rounded-full text-sm font-semibold shadow-sm"
      >
        <span className="animate-spin border-2 border-amber-400 border-t-transparent rounded-full w-4 h-4" />
        <span>جارٍ تحديث السعر...</span>
      </div>
    );
  }

  if (price == null) return null;

  // Calculate totals based on quantity
  const totalPrice = price * quantity;
  const totalCompare = comparePrice != null ? comparePrice * quantity : null;

  // Savings is totalCompare - totalPrice
  const savings =
    totalCompare && totalCompare > totalPrice ? totalCompare - totalPrice : 0;

  return (
    <div
      aria-live="polite"
      className="mt-3 flex flex-wrap items-center gap-3 bg-amber-50 text-amber-800 px-3 py-1 rounded-lg text-sm font-semibold shadow-sm animate-fadeIn"
    >
      <span>🎯 السعر حسب اختيارك:</span>

      {/* السعر الحالي */}
      <span className="text-base font-bold text-green-700 transition-all duration-700 ease-out transform scale-95">
        <PriceCurrency currency={'ج.م'} price={totalPrice} />
      </span>

      {/* السعر قبل الخصم */}
      {totalCompare && totalCompare > totalPrice && (
        <span className="line-through text-gray-500 text-xs transition-all duration-700 ease-out transform scale-95">
          <PriceCurrency currency={'ج.م'} price={totalCompare} />
        </span>
      )}

      {/* التوفير */}
      {savings > 0 && (
        <span className="bg-green-100 text-green-800 text-[11px] px-2 py-0.5 rounded-full transition-all duration-700 ease-out transform scale-95">
          هتوفر <PriceCurrency currency={'ج.م'} price={savings} />
        </span>
      )}
    </div>
  );
};


export const ProductHeader = ({ isEnabled, text }) => (
  isEnabled ? <div
    className="text-green-600 text-sm font-medium my-2"
    dangerouslySetInnerHTML={{ __html: text }}
  /> : null
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

export const Description = ({
  content,
  shortDescription,
  isShortEnabled,
  isDescriptionEnabled
}) => {
  const [expanded, setExpanded] = useState(false);

  // If nothing exists or both are disabled → show nothing
  const hasShort = Boolean(shortDescription && isShortEnabled);
  const hasFull = Boolean(content && isDescriptionEnabled);

  if (!hasShort && !hasFull) return null;

  return (
    <div data-aos="fade-up" data-aos-delay="600">
      {/* Show short description if enabled */}
      {hasShort && (
        <div
          className="text-[#959FBC] text-base leading-relaxed mb-2"
          dangerouslySetInnerHTML={{ __html: shortDescription }}
        />
      )}

      {/* If both are enabled → toggle full content */}
      {hasShort && hasFull ? (
        <>
          {expanded && (
            <div
              className="text-[#959FBC] text-base leading-relaxed"
              dangerouslySetInnerHTML={{ __html: content }}
            />
          )}
          <button
            type="button"
            onClick={() => setExpanded((prev) => !prev)}
            className="text-blue-600 hover:underline focus:outline-none mt-1"
          >
            {expanded ? "عرض أقل" : "عرض المزيد"}
          </button>
        </>
      ) : (
        // If only full content is enabled → show it directly
        !hasShort &&
        hasFull && (
          <div
            className="text-[#959FBC] text-base leading-relaxed"
            dangerouslySetInnerHTML={{ __html: content }}
          />
        )
      )}
    </div>
  );
};


