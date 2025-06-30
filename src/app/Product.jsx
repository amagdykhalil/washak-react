import { Link, useParams } from 'react-router-dom';
import { useState, useEffect, useMemo, useRef } from 'react';
import { AlertTriangleIcon, CheckCircle, ChevronDown, Maximize2, Minus, Plus, ShoppingBag, Star, Tag, X, XCircle } from 'lucide-react';
import { FormSkeleton, ProductInfoSkeleton, ProductImageSkeleton } from '../components/skeleton/ProductSkeleton';
import { motion, AnimatePresence } from 'framer-motion';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';

// Components
import Breadcrumb from '../components/atoms/Breadcrumb';
import Button from '../components/atoms/Button';
import FeatureList from '../components/molecules/FeatureList';
import PriceCurrency from '../components/atoms/PriceCurrency';
import Title from '../components/atoms/Title';
import MetaTags from '../components/atoms/MetaTags';
import ProductCarouselRelated from '../components/atoms/ProductCarouselRelated';
import HeadTitle from '../components/atoms/HeadTitle';

// Config
import { baseImage, useApiGet } from '../config/Api';

// Schema
import { SignUpSchema } from '../schema/SignUpSchema';

const UseCart = () => {
  const {
    register,
    trigger,
    handleSubmit,
    formState: { errors },
    clearErrors,
    setError,
    getValues,
    setValue,
    watch,
    reset,
  } = useForm({ resolver: yupResolver(SignUpSchema) });
  const route = useNavigate();

  function animateToCart() {
    const mainImage = document.getElementById('mainImage');
    const cartCount = document.getElementById('cart-count');
    const cartIcon = document.getElementById('cart-icon');

    if (!mainImage || !cartIcon || !cartCount) return;

    const imageRect = mainImage.getBoundingClientRect();
    const cartRect = cartIcon.getBoundingClientRect();

    const clone = mainImage.cloneNode(true);
    clone.classList.add('clone-image');

    Object.assign(clone.style, {
      position: 'fixed',
      top: `${imageRect.top + imageRect.height / 2}px`,
      left: `${imageRect.left + imageRect.width / 2}px`,
      transform: 'translate(-50%, -50%)',
      width: `${imageRect.width}px`,
      height: `${imageRect.height}px`,
      zIndex: '1000',
      pointerEvents: 'none',
      opacity: '1',
      transition: 'all 1s ease-in-out',
    });

    document.body.appendChild(clone);

    void clone.offsetHeight;

    requestAnimationFrame(() => {
      Object.assign(clone.style, {
        top: `${cartRect.top + cartRect.height / 2}px`,
        left: `${cartRect.left + cartRect.width / 2}px`,
        width: '64px',
        height: '64px',
        opacity: '0.6',
      });
    });

    setTimeout(() => {
      clone.remove();

      const currentCount = parseInt(cartCount.textContent || '0');
      cartCount.textContent = (currentCount + 1).toString();

      cartIcon.classList.add('animate-shake');
      setTimeout(() => cartIcon.classList.remove('animate-shake'), 500);
    }, 1000);
  }

  const [isloading, setisloading] = useState(false);

  const submitOrder = async data => {
    setisloading(true);
    try {
      const response = await fetch('https://dukanomar.com/api/submit-quick-checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      animateToCart();
      return true;
    } catch (error) {
      console.error('Error submitting order:', error);
      return false;
    } finally {
      setTimeout(() => {
        setisloading(false);
      }, 1500);
    }
  };

  const submit = handleSubmit(async data => {
    const success = await submitOrder(data);
    if (success) {
      setTimeout(() => {
        route('/thank-you-page');
      }, 1000);
    }
  });

  const handleGotToCart = async () => {
    setisloading(true);
    animateToCart();
    setTimeout(() => {
      route('/cart');
    }, 1000);
    setTimeout(() => {
      setisloading(false);
    }, 1500);
  };

  return { register, handleGotToCart, isloading, errors, trigger, clearErrors, setError, getValues, setValue, submit, watch, reset, submitOrder };
};

const TimeBox = ({ value, label, highlighted = false }) => (
  <div className='flex flex-col items-center gap-1'>
    <div className={`w-[65px] h-[65px] flex items-center justify-center rounded-[6px] text-2xl shadow border ${highlighted ? 'bg-[#0a2a5c] text-white' : 'bg-[#f8fafb] border-[#f0f1f1] text-gray-700'}`} style={{ fontFamily: 'Numbers' }}>
      {value}
    </div>
    <div className='text-sm text-[#0a2a5c] font-bold'>{label}</div>
  </div>
);

const ProductCard = ({ product }) => (
  <Link to={`/product/${product.slug}`} className='p-3 mx-auto h-full max-w-full w-full bg-white border rounded-lg shadow-inner hover:shadow-md transition space-y-3'>
    {product.medias?.[0] && <img src={baseImage + product.medias[0].url} alt={product.title} className='w-full h-[200px] object-cover rounded-md' />}

    <h4 className='text-center text-lg max-xl:text-base font-semibold text-[#3B2D35] truncate'>{product.title}</h4>

    <div className='flex items-center flex-wrap justify-center gap-2'>
      <span className='flex flex-nowrap items-center w-fit text-[#123770] font-bold text-base'>
        <PriceCurrency currency='ج.م' price={product?.price?.special_price} />
      </span>

      {product?.price?.regular_price && (
        <span className='line-through text-[#A5A5A5] flex items-center flex-nowrap text-sm'>
          <PriceCurrency currency='ج.م' price={product?.price?.regular_price} />
        </span>
      )}
      {product?.price?.regular_price && (
        <span className='flex items-center !flex-nowrap bg-[var(--second)] text-white text-xs px-2 py-1 rounded-xl'>
          هتوفر <PriceCurrency currency='ج.م' price={product?.price?.regular_price - product?.price?.special_price} />
        </span>
      )}
    </div>

    {product.review_enable != 0 && (
      <div className='flex items-center gap-1 justify-center text-sm text-[#666]'>
        <span className='flex text-[#FFC62A]'>
          {Array(5)
            .fill(0)
            .map((_, i) => (
              <Star key={i} className='fill-[#FFC62A]' />
            ))}
        </span>
        <span className='text-xs'>({product.no_of_reviews}) تقييمات</span>
      </div>
    )}
  </Link>
);

export default function Product() {
  const formContainerRef = useRef(null);
  const lastScrollPosition = useRef(0);

  const { id } = useParams();
  const { register, handleGotToCart, isloading , setisloading , route , errors, trigger, clearErrors, setError, getValues, setValue, submit, watch, reset, submitOrder } = UseCart();

  const { data: productData, loading: productLoading } = useApiGet(`/get-product-by-slug/${id}`);
  const { product, product_variants, frequently_bought_products, product_meta, product_style_settings, product_term_global_options } = !productLoading && productData?.data ? productData.data : {};

  // Get Checkout Forms
  const { data: checkoutSettings, loading: checkoutLoading } = useApiGet('/get-checkout-settings');
  const checkoutFields = checkoutSettings?.data || [];

  // Form state
  const [formErrors, setFormErrors] = useState({});
  const [formValues, setFormValues] = useState({});

  // Image handling
  const images = product?.medias?.map(media => baseImage + media.url) || [];
  const [selectedImage, setSelectedImage] = useState(images?.[0]);
  useEffect(() => {
    setSelectedImage(images[0]);
  }, [productLoading]);

  // UI State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [selectedVariants, setSelectedVariants] = useState({});
  const [showValidation, setShowValidation] = useState(false);
  const goToCart = true;

  // Breadcrumb
  const breadcrumbRoutes = [{ label: 'الرئيسية', href: '/' }, { label: 'كل المنتجات', href: '/products' }, { label: 'تفاصيل المنتج' }];

  // Quantity handlers
  const increaseQuantity = () => setQuantity(q => q + 1);
  const decreaseQuantity = () => setQuantity(q => (q > 1 ? q - 1 : 1));

  // Price calculations
  const totalPrice = useMemo(() => {
    const mainProductPrice = product?.price?.special_price || 0;
    const extrasTotal = frequently_bought_products?.reduce((acc, p) => acc + (p?.price?.special_price || 0), 0);
    return (mainProductPrice + extrasTotal) * quantity;
  }, [product, frequently_bought_products, quantity]);

  // SEO
  const seo = product_meta && JSON.parse(product_meta?.seo);
  const productDescription = product_meta && JSON.parse(product_meta?.content)?.excerpt;
  const hurryUpText = product_meta?.hurry_option && JSON.parse(product_meta?.hurry_option)?.content;

  // Countdown timer data
  const countdownData = product?.price?.count_down_timer_end ? JSON.parse(product?.price?.count_down_timer_end) : null;

  // Related products
  const { data: relatedProducts, loading: loadingRelatedProducts } = useApiGet(`/get-related-products/${id}`);

  // Handle form input changes
  const handleInputChange = (fieldName, value) => {
    setFormValues(prev => ({
      ...prev,
      [fieldName]: value,
    }));

    // Clear error when user starts typing
    if (formErrors[fieldName]) {
      setFormErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[fieldName];
        return newErrors;
      });
    }
  };

  // Validate form before submission
  const validateForm = () => {
    const newErrors = {};
    let isValid = true;

    checkoutFields.forEach(field => {
      if (field.is_required && !formValues[field.backend_field_name]) {
        newErrors[field.backend_field_name] = `${field.field_text} مطلوب`;
        isValid = false;
      }
    });

    setFormErrors(newErrors);
    return isValid;
  };

  // Handle form submission
  const handleFormSubmit = e => {
    e.preventDefault();
    if (validateForm()) {
      submit(formValues);
    }
  };

  // Handle variant selection
  const handleVariantSelect = (variantId, optionId, optionName) => {
    setSelectedVariants(prev => ({
      ...prev,
      [variantId]: { optionId, optionName },
    }));
    setShowValidation(false);
  };

  // Handle buy now click
  const handleBuyNow = async () => {
    // Check required variants
    const missingVariants = product_variants?.filter(variant => variant.is_required && !selectedVariants[variant.id]);

    if (missingVariants?.length > 0) {
      setShowValidation(true);
      return;
    }

    // Check required checkout fields
    const missingFields = checkoutFields.filter(field => field.is_required && !formValues[field.backend_field_name]);

    if (missingFields.length > 0) {
      setFormErrors(
        missingFields.reduce((acc, field) => {
          acc[field.backend_field_name] = `${field.field_text} مطلوب`;
          return acc;
        }, {}),
      );
      return;
    }

    // Prepare the data
    const requestData = {
      qty: quantity,
      options: Object.values(selectedVariants).map(v => v.optionId),
      currency_name: 'USD',
      ip_address: '127.0.0.1',
      email: formValues.email || '',
      phone: formValues.phone || '',
      location: formValues.location || '',
      delivery_address: formValues.delivery_address || '',
      zip_code: formValues.zip_code || '',
      name: formValues.name || '',
      first_name: formValues.first_name || '',
      last_name: formValues.last_name || '',
      product_id: product.id,
      comment: formValues.comment || '',
    };

    try {
      setisloading(true);

      // Send the request
      const success = await submitOrder(requestData);

      if (success && goToCart) {
        setTimeout(() => {
          route('/cart');
        }, 1000);
      }
    } catch (error) {
      console.error('Error submitting order:', error);
    }
  };

  // Animation variants
  const imageVariants = {
    hidden: {
      opacity: 0,
      y: 50,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        ease: 'easeOut',
      },
    },
    exit: {
      opacity: 0,
      y: 50,
      transition: {
        duration: 0.3,
        ease: 'easeIn',
      },
    },
  };

  const thumbnailVariants = {
    hover: { scale: 1.05 },
    tap: { scale: 0.95 },
    selected: {
      scale: 1.05,
      border: '2px solid var(--main)',
      boxShadow: '0 0 10px rgba(0,0,0,0.1)',
    },
  };

  const zoomButtonVariants = {
    hover: {
      scale: 1.1,
      backgroundColor: 'rgba(0,0,0,0.2)',
      transition: { duration: 0.2 },
    },
    tap: { scale: 0.95 },
  };

  // Group sections into logical components
  const ProductTitleSection = () => <h2 className='text-2xl max-md:text-xl font-bold text-[#3B2D35]'>{product?.title}</h2>;

  const CategoriesSection = () =>
    product?.categories?.length > 0 && (
      <div className='flex flex-wrap gap-2 items-center'>
        {product.categories.map(category => (
          <Link to={`/${category.slug}`} key={category.id} className='bg-[var(--second)] text-white text-xs py-2 px-3 py-1 rounded-full shadow-sm hover:opacity-90 transition'>
            {category.name}
          </Link>
        ))}
      </div>
    );

  const PriceSection = () => (
    <div className='flex items-center gap-2'>
      <span className='text-[#123770] font-bold text-lg'>
        <PriceCurrency currency={'ج.م'} price={product?.price?.special_price} />
      </span>
      {product?.price?.regular_price && (
        <>
          <span className='line-through text-[#A5A5A5] text-base'>
            <PriceCurrency currency={'ج.م'} price={product?.price?.regular_price} />
          </span>
          <span className='bg-[var(--second)] text-white text-xs px-2 py-1 rounded-full flex items-center gap-[5px]'>
            هتوفر <PriceCurrency currency={'ج.م'} price={product?.price?.regular_price - product?.price?.special_price} />
          </span>
        </>
      )}
    </div>
  );

  const CountdownTimerSection = () => {
    const [timeLeft, setTimeLeft] = useState({ ...countdownData });
    useEffect(() => {
      const totalSeconds = parseInt(timeLeft.day) * 86400 + parseInt(timeLeft.hour) * 3600 + parseInt(timeLeft.min) * 60 + parseInt(timeLeft.sec);

      if (totalSeconds <= 0) return;

      const interval = setInterval(() => {
        setTimeLeft(prev => {
          let seconds = parseInt(prev.day) * 86400 + parseInt(prev.hour) * 3600 + parseInt(prev.min) * 60 + parseInt(prev.sec) - 1;

          if (seconds <= 0) {
            clearInterval(interval);
            return { day: '0', hour: '0', min: '0', sec: '0' };
          }

          const d = Math.floor(seconds / 86400);
          seconds %= 86400;
          const h = Math.floor(seconds / 3600);
          seconds %= 3600;
          const m = Math.floor(seconds / 60);
          const s = seconds % 60;

          return {
            day: String(d),
            hour: String(h),
            min: String(m),
            sec: String(s),
          };
        });
      }, 1000);

      return () => clearInterval(interval);
    }, []);

    if (!countdownData?.status) return null;

    return (
      <div className='flex flex-col justify-start w-fit mt-6 mb-4'>
        <div className='text-lg font-medium text-[var(--main)]'>{product_term_global_options?.[0]?.text_above_counter || 'الوقت المتبقي على نهاية العرض'} :</div>
        <div className='flex gap-2 rtl:flex-row-reverse rtl:justify-end mt-2'>
          <TimeBox value={String(timeLeft.day).padStart(2, '0')} label='يوم' />
          <TimeBox value={String(timeLeft.hour).padStart(2, '0')} label='ساعة' />
          <TimeBox value={String(timeLeft.min).padStart(2, '0')} label='دقيقة' />
          <TimeBox value={String(timeLeft.sec).padStart(2, '0')} label='ثانية' highlighted />
        </div>
      </div>
    );
  };

  const HurryUpSection = () =>
    hurryUpText && (
      <div className='bg-red-50 text-red-800 border border-red-200 px-4 py-3 rounded-lg flex items-center gap-3 animate-pulse shadow-sm'>
        <AlertTriangleIcon className='w-5 h-5 text-red-500' />
        <span className='text-sm font-medium'>{hurryUpText}</span>
      </div>
    );

  const ReviewsSection = () =>
    product?.review_enable != 0 && (
      <div className='flex items-center gap-[10px] text-sm text-[#666666]'>
        <span className='flex items-center text-[#FFC62A]'>
          {Array(5)
            .fill(0)
            .map((_, i) => (
              <Star key={i} className='!fill-[#FFC62A]' />
            ))}
        </span>
        ({product?.no_of_reviews}) تقييمات
      </div>
    );

  const DescriptionSection = () => productDescription && <div className='text-[#959FBC] text-base leading-relaxed' dangerouslySetInnerHTML={{ __html: productDescription }} />;

  const VariantsSection = () => {
    const [openSelectId, setOpenSelectId] = useState(null);

    const CustomSelect = ({ variant }) => {
      const selectedOption = variant.options.find(opt => opt.id === selectedVariants[variant.id]?.optionId);

      return (
        <div className='relative'>
          <button type='button' className='w-full p-3 border border-gray-200 rounded-lg flex justify-between items-center bg-white' onClick={() => setOpenSelectId(openSelectId === variant.id ? null : variant.id)}>
            <span className='text-gray-700'>{selectedOption ? selectedOption.variant_option_name : `اختر ${variant.variant_name}`}</span>
            <span className={`transform duration-300 transition-transform ${openSelectId === variant.id ? 'rotate-180' : ''}`}>
              <ChevronDown />
            </span>
          </button>

          {openSelectId === variant.id && (
            <div className='absolute z-10 mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-lg'>
              {variant.options.map(option => (
                <div
                  key={option.id}
                  className={`p-3 cursor-pointer hover:bg-gray-100 ${selectedVariants[variant.id]?.optionId === option.id ? 'bg-[var(--main-light)]' : ''}`}
                  onClick={() => {
                    handleVariantSelect(variant.id, option.id, option.variant_option_name);
                    setOpenSelectId(null);
                  }}>
                  {option.variant_option_name}
                </div>
              ))}
            </div>
          )}
        </div>
      );
    };

    const CustomRadio = ({ variant }) => {
      return (
        <div className='space-y-2'>
          {variant.options.map(option => (
            <label key={option.id} className='flex items-center gap-3 cursor-pointer'>
              <input type='radio' name={`variant-${variant.id}`} className='hidden' checked={selectedVariants[variant.id]?.optionId === option.id} onChange={() => handleVariantSelect(variant.id, option.id, option.variant_option_name)} />
              <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${selectedVariants[variant.id]?.optionId === option.id ? 'border-[var(--main)]' : 'border-gray-300'}`}>{selectedVariants[variant.id]?.optionId === option.id && <div className='w-2 h-2 rounded-full bg-[var(--main)]'></div>}</div>
              <span className='text-gray-700'>{option.variant_option_name}</span>
            </label>
          ))}
        </div>
      );
    };

    const renderVariantOptions = variant => {
      switch (variant.type) {
        case 1: // Dropdown
          return <CustomSelect variant={variant} />;
        case 2: // Textual buttons
          return (
            <div className='flex flex-wrap gap-2'>
              {variant.options.map(option => (
                <button key={option.id} onClick={() => handleVariantSelect(variant.id, option.id, option.variant_option_name)} className={`px-4 py-2 rounded-md border bg-white ${selectedVariants[variant.id]?.optionId === option.id ? '!border-[var(--main)] !bg-[var(--main)] !text-white' : ''}`}>
                  {option.variant_option_name}
                </button>
              ))}
            </div>
          );
        case 3: // Color buttons
          return (
            <div className='flex flex-wrap gap-3'>
              {variant.options.map(option => {
                const isSelected = selectedVariants[variant.id]?.optionId === option.id;
                return (
                  <div key={option.id} onClick={() => handleVariantSelect(variant.id, option.id, option.variant_option_name)} className={`w-10 h-10 rounded-full border-2 flex items-center justify-center cursor-pointer transition-all duration-200 ${isSelected ? 'border-[var(--main)] scale-110' : 'border-gray-300'}`} style={{ backgroundColor: option.preview || '#ccc' }} title={option.variant_option_name}>
                    {isSelected && (
                      <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='white' className='w-5 h-5'>
                        <path d='M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z' />
                      </svg>
                    )}
                  </div>
                );
              })}
            </div>
          );
        case 4: // Radio buttons
          return <CustomRadio variant={variant} />;
        case 7: // Text area
          return <textarea className='!outline-none w-full p-3 border border-gray-200 rounded-lg focus:border-[var(--main)] focus:ring-1 focus:ring-[var(--main-light)]' placeholder={`أدخل ${variant.variant_name}`} onChange={e => handleVariantSelect(variant.id, null, e.target.value)} />;
        default:
          return (
            <div className='flex flex-wrap gap-2'>
              {variant.options.map(option => (
                <button key={option.id} onClick={() => handleVariantSelect(variant.id, option.id, option.variant_option_name)} className={`px-4 py-2 rounded-md border ${selectedVariants[variant.id]?.optionId === option.id ? 'border-[var(--main)] bg-[var(--main-light)]' : ''}`}>
                  {option.variant_option_name}
                </button>
              ))}
            </div>
          );
      }
    };

    return (
      product_variants?.length > 0 && (
        <div className='space-y-6 border border-gray-200 rounded-md p-4 shadow-inner'>
          {product_variants.map(variant => (
            <div key={variant.id} className='space-y-3'>
              <h3 className='text-base font-medium text-gray-700'>
                {variant.variant_name}
                {Boolean(variant.is_required) && <span className='text-red-500 mr-1'>*</span>}
              </h3>
              {renderVariantOptions(variant)}
            </div>
          ))}
        </div>
      )
    );
  };

  const StockInfoSection = () =>
    product?.stock && (
      <div className='border border-gray-200 rounded-md p-4 shadow-inner text-sm text-gray-700 space-y-3' dir='rtl'>
        {product?.stock?.sku && (
          <div className='flex items-center justify-between'>
            <span className='font-medium flex items-center gap-1'>
              <Tag size={16} className='text-[var(--main)]' />
              رمز المنتج (SKU):
            </span>
            <span className='text-[var(--main)] font-semibold'>{product?.stock.sku}</span>
          </div>
        )}

        {product?.stock?.stock_manage != 0 && (
          <div className='flex items-center justify-between'>
            <span className='font-medium'>الكمية في المخزون:</span>
            <span className={`font-semibold ${product?.stock.stock_qty > 0 ? 'text-[var(--second)]' : 'text-red-600'}`}>{product?.stock.stock_qty}</span>
          </div>
        )}

        <div className='flex items-center justify-between'>
          <span className='font-medium'>حالة المخزون:</span>
          <span className='font-semibold flex items-center gap-1'>
            {product?.stock.stock_status === 1 ? (
              <>
                <CheckCircle size={16} className='text-[var(--second)]' />
                <span className='text-[var(--second)]'>متوفر</span>
              </>
            ) : (
              <>
                <XCircle size={16} className='text-red-600' />
                <span className='text-red-600'>غير متوفر</span>
              </>
            )}
          </span>
        </div>
      </div>
    );

  const CheckoutFormSection = () =>
    checkoutLoading ? (
      <FormSkeleton />
    ) : (
      <form
        onSubmit={handleFormSubmit}
        className='space-y-4 !my-8 bg-white rounded-lg'
        onKeyDown={e => {
          if (e.key === 'Enter') {
            e.preventDefault();
          }
        }}
        ref={formContainerRef}
      >
        <Title title1='يرجى ادخال معلوماتك ' title2='لإكمال الطلب' />
        {checkoutFields.map(
          field =>
            field.is_enable && (
              <div key={field.id} className='flex flex-col gap-[10px] relative'>
                <label htmlFor={field.backend_field_name} className='text-[#333333] text-base font-normal'>
                  {field.field_text}
                  {field.is_required && <span className='text-[#ff4b55]'>*</span>}
                </label>

                <div className={`h-[50px] relative overflow-hidden rounded-[8px] text-sm border ${formErrors[field.backend_field_name] ? 'border-[#ff4b55]' : 'border-[#EEEEEE]'} w-full`}>
                  <input
                    type={field.type || 'text'}
                    id={field.backend_field_name}
                    name={field.backend_field_name}
                    required={field.is_required}
                    placeholder={field.field_placeholder}
                    value={formValues[field.backend_field_name] || ''}
                    onChange={e => handleInputChange(field.backend_field_name, e.target.value)}
                    className='placeholder:text-[#A5A5A5] text-[#222] font-normal w-full px-[10px] h-full outline-none'
                  />
                </div>

                {formErrors[field.backend_field_name] && <div className='text-[#ff4b55] mt-[-10px] text-sm'>{formErrors[field.backend_field_name]}</div>}
              </div>
            ),
        )}
      </form>
    );

  const BuyNowSection = () => (
    <div className='w-full flex flex-col items-center gap-3 mt-8 px-4 sm:px-0'>
      {/* الكمية */}
      <div className='w-fit ml-auto flex flex-col gap-2'>
        <div className='text-base text-[#051959] font-medium'>الكمية:</div>

        <div className='flex items-center justify-between gap-2 border border-[#EEEEEE] rounded-md px-2 py-2 bg-white'>
          <button onClick={increaseQuantity} className='rounded-md px-3 py-2 hover:bg-gray-200 transition' disabled={product?.stock?.stock_manage && quantity >= product?.stock?.stock_qty} aria-label='زيادة الكمية'>
            <Plus size={18} />
          </button>
          <span className='h-6 w-[1px] bg-[#eee]'></span>
          <span className='w-10 text-center font-bold text-[#051959]'>{quantity}</span>
          <span className='h-6 w-[1px] bg-[#eee]'></span>
          <button onClick={decreaseQuantity} className='rounded-md px-3 py-2 hover:bg-gray-200 transition' disabled={quantity <= 1} aria-label='تقليل الكمية'>
            <Minus size={18} />
          </button>
        </div>
      </div>

      {/* رسالة التحقق */}
      {showValidation && (
        <motion.div className='w-full p-3 bg-red-100 text-red-700 rounded-md text-sm text-center' initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
          يرجى تحديد جميع الخيارات المطلوبة قبل الشراء
        </motion.div>
      )}

      {/* زر الشراء */}
      <Button loading={isloading} cn='w-full h-[50px] rounded-md text-white bg-primary hover:bg-primary/90 transition' onclick={handleBuyNow} name={product_term_global_options?.[0]?.buy_now_button_text || 'اشترِ الآن'} icon={<ShoppingBag />} />
    </div>
  );

  const ImageSliderSection = () => (
    <div className='!p-4 bg-white rounded-md'>
      <div className='product-images sticky top-[120px] h-fit productSwiper grid grid-cols-1 md:grid-cols-[110px,1fr] gap-[10px]'>
        {/* Main Image */}
        <div className='max-sm:order-[-1] relative border border-[#eee] rounded-md overflow-hidden max-xl:h-auto h-[550px] w-full'>
          <AnimatePresence mode='wait'>
            <motion.img key={selectedImage} src={selectedImage} className='object-fill bg-gray-50 h-full w-full' alt={product?.title} initial='hidden' animate='visible' exit='exit' variants={imageVariants} id='mainImage' />
          </AnimatePresence>

          <motion.button onClick={() => setIsModalOpen(true)} className='border border-white p-2 absolute left-[10px] bottom-[10px] cursor-pointer rounded-md' aria-label='Zoom image' variants={zoomButtonVariants} whileHover='hover' whileTap='tap'>
            <Maximize2 className='text-white' />
          </motion.button>
        </div>

        {/* Thumbnails */}
        <div className='md:order-[-2] product-scroll overflow-x-auto max-md:h-[70px] md:h-[550px] w-full'>
          <div className='flex flex-row md:flex-col items-center gap-3 h-full w-fit'>
            {images.map((img, idx) => (
              <motion.div key={idx} className={`overflow-hidden rounded-md md:w-[107px] max-md:w-[80px] md:h-[100px] h-full flex-shrink-0 cursor-pointer border border-gray-200`} variants={thumbnailVariants} onClick={() => setSelectedImage(img)} animate={selectedImage === img ? 'selected' : ''} whileHover='hover' whileTap='tap'>
                <motion.img src={img} className='h-full object-cover w-full' alt={`${product?.title} - Image ${idx + 1}`} />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  // Group sections into logical blocks
  const ProductInfoSections = () => {
    return (
      <div className='!p-6 bg-white rounded-md h-fit flex-1 space-y-4'>
        <CategoriesSection />
        <ProductTitleSection />
        <PriceSection />
        <ReviewsSection />
        <DescriptionSection />

        <CountdownTimerSection />
        <HurryUpSection />
        <VariantsSection />
        <StockInfoSection />
        <CheckoutFormSection />
        <BuyNowSection />
      </div>
    );
  };

  if (productLoading || checkoutLoading)
    return (
      <div className='bg-[#f8fafb]'>
        <Breadcrumb cn='!mt-0 !pt-[30px] container' routes={breadcrumbRoutes} />
        <div className='!mb-[30px] container max-md:!px-[20px] pb-[50px] grid max-xl:grid-cols-1 grid-cols-[720px,1fr] rounded-xl gap-6'>
          <ProductImageSkeleton />
          <ProductInfoSkeleton />
        </div>
      </div>
    );

  if (!productData?.data) return <div>لا توجد بيانات.</div>;

  return (
    <div className='bg-[#f8fafb]'>
      {/* Meta Tags */}
      <MetaTags title={seo?.meta_title} description={seo?.meta_description} image={`${baseImage}${product?.medias?.[0]?.url}`} url={`https://yourdomain.com/product/${product?.slug}`} keywords={seo?.meta_keyword} />

      {/* Breadcrumb */}
      <Breadcrumb cn='!mt-0 !pt-[30px] container' routes={breadcrumbRoutes} />

      {/* Main Product Section */}
      <div className='!mb-[30px] container max-md:!px-[20px] pb-[50px] grid max-xl:grid-cols-1 grid-cols-[720px,1fr] rounded-xl gap-6'>
        <ImageSliderSection />
        <ProductInfoSections />
      </div>

      {/* Frequently Bought Together */}
      {frequently_bought_products?.length > 0 && (
        <div className='container max-md:px-4 mb-10 pb-12'>
          <div className='bg-white rounded-md p-6 shadow-sm'>
            <HeadTitle title='منتجات غالبًا ما يتم شراؤها مع هذا المنتج' />

            <div className='justify-center grid grid-cols-4 max-xl:grid-cols-2 max-md:grid-cols-1 mt-6 gap-6 xl:gap-10'>
              {/* المنتج الأساسي */}
              <ProductCard product={product} />

              {/* المنتجات المرافقة */}
              {frequently_bought_products.map((product, index) => (
                <div key={index} className='relative flex items-center gap-2'>
                  <Plus className='w-[26px] max-xl:w-[15px] max-xl:-right-5 absolute -translate-y-1/2 top-1/2 -right-8 flex-1 text-gray-400 hidden sm:block' />
                  <ProductCard product={product} />
                </div>
              ))}
            </div>

            {/* أزرار الشراء */}
            <div className='mt-10 flex flex-col sm:flex-row items-center justify-center gap-4'>
              <Button loading={isloading} cn='!h-[50px] !px-6 text-base' name={`إجمالي السعر: ${totalPrice}`} />
              <Button loading={isloading} cn='!h-[50px] !px-8 text-base' name='اشترِ الآن' icon={<ShoppingBag />} disabled={Object.keys(formErrors).length > 0 || checkoutFields.some(field => field.is_required && !formValues[field.backend_field_name])} />
            </div>
          </div>
        </div>
      )}

      {/* Related Products */}
      <ProductCarouselRelated title={product_style_settings?.related_prod_name_custom || 'منتجات ذات صلة'} subTitle={'تصفّح منتجات قد تعجبك أيضًا بناءً على هذا المنتج'} cn='max-sm:!px-[10px] !mt-6' bg='sm:!px-[20px] py-[40px] bg-white rounded-md border border-[var(--border-bg)]' products={relatedProducts?.data} loading={loadingRelatedProducts} arrowTop={true} />

      {/* Features */}
      <FeatureList />

      {/* Image Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div className='fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70' initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <motion.div className='relative w-[90vw] max-w-4xl' initial={{ scale: 0.9 }} animate={{ scale: 1 }} exit={{ scale: 0.9 }}>
              <motion.button onClick={() => setIsModalOpen(false)} className='max-md:w-[30px] max-md:h-[30px] border border-white w-[40px] h-[40px] rounded-sm flex items-center justify-center cursor-pointer absolute top-[20px] right-[20px] hover:scale-[1.05] duration-500 hover:opacity-80' aria-label='Close modal' whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
                <X className='stroke-white' />
              </motion.button>
              <img src={selectedImage} alt={product?.title} className='w-full h-auto rounded-lg shadow-lg' />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}