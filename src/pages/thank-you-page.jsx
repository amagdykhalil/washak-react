import { useNavigate } from 'react-router-dom';
import Breadcrumb from '../components/atoms/Breadcrumb';
import Button from '../components/atoms/Button';
import Title from '../components/atoms/Title';
import FeatureList from '../components/molecules/FeatureList';
import { useState, useEffect } from 'react';
import Lottie from 'lottie-react';
import thankyouAnimation from '../lottie/Success Check.json';
import { baseImage } from '../config/Api';



export default function ThankYouPage() {
  const breadcrumbRoutes = [
    {
      label: '  الرئيسية',
      href: '/',
    },
    {
      label: '  تم إكمال الطلب',
    },
  ];

  const [orderData, setOrderData] = useState(null);
  const [showAnimation, setShowAnimation] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const stored = sessionStorage.getItem('checkout_data');
    if (stored) {
      setOrderData(JSON.parse(stored));
    } else {
      navigate('/');
    }
  }, []);

  if (!orderData) return null;

  // Extract data from order
  const { cart, orderSummary, res, productData } = orderData;
  const isCartPurchase = !!cart;

  // For single product purchase
  const product = productData?.data?.product;
  const variants = productData?.data?.product_variants;
  const selectedOptions = orderSummary?.options || [];

  // Helper to get variant option name
  const getOptionName = (variantOptions, optionId) => {
    for (const variant of variantOptions || []) {
      const option = variant.options.find(o => o.id == optionId);
      if (option) return option.variant_option_name;
    }
    return '';
  };

  // Calculate total quantity for cart
  const totalCartQuantity = isCartPurchase
    ? cart.details.reduce((sum, item) => sum + item.quantity, 0)
    : orderSummary.qty;

  // Calculate total price for cart
  const totalCartPrice = isCartPurchase
    ? cart.details.reduce((sum, item) => sum + item.total_price, 0)
    : res.total;

  return (
    <div className='bg-[#f8fafb]'>
      <Breadcrumb cn='!mt-0 !pt-[30px] container' routes={breadcrumbRoutes} />

      {showAnimation && (
        <div className={` bg-white absolute inset-0 z-50  flex items-center justify-center`}>
          <Lottie animationData={thankyouAnimation} loop={false} onComplete={() => setShowAnimation(false)} className='w-full h-full  max-w-md ' />
        </div>
      )}

      {!showAnimation && (
        <div className={` container max-md:!px-[15px]`}>
          <div className='text-right text-gray-800'>
            {/* Success Message */}
            <div className='rounded-lg border border-[var(--border-bg)] text-center space-y-2 bg-white min-h-[40vh] flex items-center justify-center flex-col gap-[10px] mb-[20px]' data-aos='fade-up' data-aos-delay='100'>
              <h2 className='text-2xl max-md:text-xl text-[#404145] font-semibold'>
                تم إتمام طلبك <span className='text-[var(--second)]'>بنجاح !</span>
              </h2>
              <p className='text-base text-[#768497] max-w-[320px] w-full' data-aos='fade-up' data-aos-delay='200'>
                تم استلام طلبك و سنتواصل معك في أقرب فرصة. يرجى الانتظار لحين تلقي مكالمتنا.
              </p>
              <Button name={'استكمال التسوق'} href={'/products'} cn={'!w-fit !px-[100px] !mx-auto'} data-aos='fade-up' data-aos-delay='300' />
            </div>

            <div className='grid md:grid-cols-3 gap-6'>
              <div className='md:col-span-2 gap-6 flex flex-col'>
                {/* Product Info */}
                <div className='bg-white border border-[var(--border-bg)] p-4 rounded-lg' data-aos='fade-right' data-aos-delay='200'>
                  <Title cn='!mb-[20px] border-b border-b-[var(--border-bg)] pb-2' title1='بيانات' title2='المنتجات' />

                  {isCartPurchase ? (
                    cart.details.map((item, index) => {
                      const cartProduct = cart.products.find(p => p.id === item.product_id);
                      const productVariants = cartProduct?.product_variants || [];
                      return (
                        <div key={index} className='flex items-center mt-4 max-md:gap-[10px] gap-[30px]' data-aos='fade-right' data-aos-delay={300 + (index * 100)}>
                          <img
                            src={baseImage + cartProduct?.medias?.[0]?.url || '/placeholder-product.jpg'}
                            alt={cartProduct?.title}
                            className='w-[88px] max-md:w-[60px] max-md:h-[45px] h-[60px] rounded-md object-cover'
                          />
                          <div className='flex-1 max-sm:flex-col max-sm:items-start flex items-center justify-between text-sm'>
                            <div className="flex-1 space-y-2">
                              <p className='font-medium text-[#333333]'>{cartProduct?.title}</p>
                              <p className='text-base text-[#BFC2D4]'>عدد القطع : {item.quantity}</p>
                              {/* Display selected variants */}
                              {item.options?.map((opt, i) => (
                                <p key={i} className='text-sm inline-block mx-1 text-gray-500'>
                                  {getOptionName(productVariants, opt)}
                                </p>
                              ))}
                            </div>
                            <p className='text-base text-[#123770] text-nowrap'>
                              {item.total_price} {res?.currency}
                            </p>
                          </div>
                        </div>
                      );
                    })
                  ) : (
                    <div className='flex items-center mt-4 max-md:gap-[10px] gap-[30px]' data-aos='fade-right' data-aos-delay='300'>
                      <img src={baseImage + product?.medias?.[0]?.url || '/placeholder-product.jpg'} alt={product?.title} className='w-[88px] max-md:w-[60px] max-md:h-[45px] h-[60px] rounded-md object-cover' />
                      <div className='flex-1 max-sm:flex-col max-sm:items-start flex items-center justify-between text-sm'>
                        <div className="flex-1 space-y-2">
                          <p className='font-medium text-[#333333]'>{product?.title}</p>
                          <p className='text-base text-[#BFC2D4]'>عدد القطع : {orderSummary.qty}</p>
                          {/* Display selected variants */}
                          {selectedOptions.map((opt, i) => (
                            <p key={i} className='text-sm inline-block mx-1 text-gray-500'>
                              {getOptionName(variants, opt)}
                            </p>
                          ))}
                        </div>
                        <p className='text-base text-[#123770] text-nowrap'>
                          {res.total} {res.currency}
                        </p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Order Summary */}
                {orderSummary && (
                  <div className='bg-white border border-[var(--border-bg)] p-4 rounded-lg space-y-2' data-aos='fade-right' data-aos-delay='400'>
                    <Title cn='border-b !mb-[20px] border-b-[var(--border-bg)] pb-2' title1='بيانات ' title2='التوصيل' />

                    <div className='text-base text-[#838BA1] flex justify-between' data-aos='fade-right' data-aos-delay='450'>
                      <span>اسم العميل</span>
                      <span className='text-[#A6AFB9] text-sm'>{orderSummary.name}</span>
                    </div>

                    <div className='text-base text-[#838BA1] flex justify-between' data-aos='fade-right' data-aos-delay='500'>
                      <span>رقم الجوال</span>
                      <span className='text-[#A6AFB9] text-sm'>{orderSummary.phone}</span>
                    </div>

                    <div className='text-base text-[#838BA1] flex justify-between' data-aos='fade-right' data-aos-delay='550'>
                      <span>العنوان</span>
                      <span className='text-[#A6AFB9] text-sm'>{orderSummary.delivery_address}</span>
                    </div>

                    {orderSummary.zip_code && (
                      <div className='text-base text-[#838BA1] flex justify-between' data-aos='fade-right' data-aos-delay='600'>
                        <span>الرمز البريدي</span>
                        <span className='text-[#A6AFB9] text-sm'>{orderSummary.zip_code}</span>
                      </div>
                    )}

                    <div className='text-base text-[#838BA1] flex justify-between' data-aos='fade-right' data-aos-delay='650'>
                      <span>بيانات الدفع</span>
                      <span className='text-[#A6AFB9] text-sm'>الدفع عند الاستلام</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Shipping Info */}
              <div className='bg-white border border-[var(--border-bg)] p-4 rounded-lg space-y-2' data-aos='fade-left' data-aos-delay='300'>
                <Title cn='border-b !mb-[20px] border-b-[var(--border-bg)] pb-2' title1='ملخص' title2='الطلب' />

                <div className='!mt-[20px] text-base text-[#838BA1] flex justify-between' data-aos='fade-left' data-aos-delay='350'>
                  <span>عدد المنتجات</span>
                  <span className='text-[var(--second)] text-sm'>{totalCartQuantity} منتج</span>
                </div>

                <div className='!mt-[20px] text-base text-[#838BA1] flex justify-between' data-aos='fade-left' data-aos-delay='400'>
                  <span>اجمالى المنتجات</span>
                  <span className='text-[var(--main)] text-sm'>
                    {totalCartPrice} {res?.currency}
                  </span>
                </div>

                <div className='!mt-[20px] text-base text-[#838BA1] flex justify-between' data-aos='fade-left' data-aos-delay='450'>
                  <span>المبلغ المستحق</span>
                  <span className='text-[var(--main)] text-sm'>
                    {totalCartPrice} {res?.currency}
                  </span>
                </div>

                <div className='!mt-[20px] text-base text-[#838BA1] flex justify-between' data-aos='fade-left' data-aos-delay='500'>
                  <span>المبلغ الاجمالى</span>
                  <span className='text-[var(--second)] text-sm'>
                    {totalCartPrice} {res?.currency}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <FeatureList />
    </div>
  );
}