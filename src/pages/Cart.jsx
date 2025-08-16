/**
 * here i thing there is an issue in the variant to get his price it also give me the first product that have the variant 
    but i have items and for the first time get the price of the variant if exist for teh default valeus
 * and check form my code if have any probelm solve it 
 */

import Breadcrumb from '../components/atoms/Breadcrumb';
import Title from '../components/atoms/Title';
import FeatureList from '../components/molecules/FeatureList';
import ProductCarouselRelated from '../components/atoms/ProductCarouselRelated';
import EmptyState from '../components/atoms/EmptyState';
import { useCart } from '../hooks/cart/useCart';
import { CartItem } from '../components/pages/cart/CartItem';
import CartTotalSummary from '../components/pages/cart/CartTotalSummary';


export default function Cart() {
  const {
    // data
    cartItems,
    products,
    loading,
    checkoutLoading,
    loadingRelatedProducts,
    loadingVariantPrices,
    totals,
    variantPrices,
    relatedProducts,
    submitError,
    checkoutFields,
    isBuyNowLoading,

    // actions
    removeItem,
    handleVariantSelection,
    handleCheckout,
    increaseQuantity,
    decreaseQuantity
  } = useCart();
  const { subtotal, discount, shipping, tax, total } = totals;
  const breadcrumbRoutes = [{ label: 'الرئيسية', href: '/' }, { label: 'عربة التسوق' }];
  // const { storeOptions } = useAppContext();
  // const breadcrumbRoutes = [{ label: 'الرئيسية', href: '/' }, { label: 'عربة التسوق' }];
  // const [cartItems, setCartItems] = useState([]);
  // const [products, setProducts] = useState([]);
  // const [loading, setLoading] = useState(true);
  // const [subtotal, setSubtotal] = useState(0);
  // const [discount, setDiscount] = useState(0);
  // const [shipping, setShipping] = useState(0);
  // const [tax, setTax] = useState(0);
  // const [total, setTotal] = useState(0);
  // const [submitError, setSubmitError] = useState(null);
  // const [showVariantDetails, setShowVariantDetails] = useState({});
  // const [variantPrices, setVariantPrices] = useState({});
  // const navigate = useNavigate();

  // const { data: relatedProducts, loading: loadingRelatedProducts } = useApiGet(cartItems.length > 0 ? `/get-related-products/${cartItems[0]?.slug}` : null);

  // const { data: checkoutSettings, loading: checkoutLoading } = useCheckoutSettings();
  // const checkoutFields = useMemo(() => checkoutSettings?.data || [], [checkoutSettings]);

  // // Initialize form with default values from checkout fields
  // const defaultValues = useMemo(() => {
  //   const values = { qty: 1, options: [], product_id: '' };
  //   checkoutFields.forEach(field => {
  //     values[field.backend_field_name] = '';
  //   });

  //   return values;
  // }, [checkoutFields]);

  // const {
  //   register,
  //   formState: { errors },
  //   setValue,
  //   getValues,
  //   trigger,
  //   handleSubmit,
  //   reset,
  //   watch,
  //   setError,
  //   clearErrors,
  //   control,
  // } = useForm({ defaultValues });

  // const [isBuyNowLoading, setIsBuyNowLoading] = useState(false);

  // // Toggle variant details visibility
  // const toggleVariantDetails = productId => {
  //   setShowVariantDetails(prev => ({
  //     ...prev,
  //     [productId]: !prev[productId],
  //   }));
  // };

  // // Fetch cart items from localStorage
  // useEffect(() => {
  //   const cart = JSON.parse(localStorage.getItem('cart') || '[]');
  //   setCartItems(cart);
  // }, []);

  // // Fetch products data based on cart items
  // useEffect(() => {
  //   if (cartItems.length > 0) {
  //     const productIds = cartItems.map(item => item.id);
  //     console.log(productIds)
  //     fetchProducts(productIds);
  //   } else {
  //     setLoading(false);
  //   }
  // }, [cartItems]);

  // // Calculate totals whenever products or cart items change
  // useEffect(() => {
  //   if (products.length > 0) {
  //     calculateTotals();
  //   }
  // }, [products, cartItems, variantPrices]);

  // const fetchProducts = async ids => {
  //   try {
  //     const response = await api.post('/get-products-by-ids', { product_ids: ids });
  //     setProducts(response.data.data);

  //     // Initialize variant details visibility
  //     const initialVisibility = {};
  //     response.data.data.forEach(product => {
  //       if (product.product_variants?.length > 0) {
  //         initialVisibility[product.id] = false;
  //       }
  //     });
  //     setShowVariantDetails(initialVisibility);
  //   } catch (error) {
  //     console.error('Error fetching products:', error);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  // const fetchVariantPrice = async (productId, variantIds) => {
  //   try {
  //     const response = await api.post('/get-variant-combinations', {
  //       product_id: productId,
  //       variant_ids: variantIds,
  //     });

  //     if (response.data.data?.length > 0) {
  //       const variantData = response.data.data[0];
  //       setVariantPrices(prev => ({
  //         ...prev,
  //         [productId]: {
  //           price: variantData.price,
  //           compare_at_price: variantData.compare_at_price,
  //           inventory: variantData.inventory,
  //         },
  //       }));
  //     }
  //   } catch (error) {
  //     console.error('Error fetching variant price:', error);
  //   }
  // };

  // const calculateTotals = () => {
  //   let calculatedSubtotal = 0;
  //   let calculatedDiscount = 0;

  //   cartItems.forEach(item => {
  //     const product = products.find(p => p.id === item.id);
  //     if (product) {
  //       let price, regularPrice;

  //       // Check if this product has variant prices
  //       if (variantPrices[product.id]) {
  //         price = variantPrices[product.id].price;
  //         regularPrice = variantPrices[product.id].compare_at_price || price;
  //       } else {
  //         price = product.price?.special_price || product.price?.price || 0;
  //         regularPrice = product.price?.regular_price || price;
  //       }

  //       calculatedSubtotal += price * item.quantity;

  //       // Calculate discount if there's a regular price higher than current price
  //       if (regularPrice > price) {
  //         calculatedDiscount += (regularPrice - price) * item.quantity;
  //       }
  //     }
  //   });

  //   setSubtotal(calculatedSubtotal);
  //   setDiscount(calculatedDiscount);
  //   setTotal(calculatedSubtotal + shipping + tax);
  // };

  // const updateLocalStorage = updatedCart => {
  //   localStorage.setItem('cart', JSON.stringify(updatedCart));
  //   setCartItems(updatedCart);
  // };

  // const updateQuantity = (id, newQuantity) => {
  //   const updatedCart = cartItems.map(item => (item.id === id ? { ...item, quantity: newQuantity } : item));
  //   updateLocalStorage(updatedCart);
  // };

  // const increaseQuantity = id => {
  //   const item = cartItems.find(item => item.id === id);
  //   if (item) {
  //     updateQuantity(id, item.quantity + 1);
  //   }
  // };

  // const decreaseQuantity = id => {
  //   const item = cartItems.find(item => item.id === id);
  //   if (item && item.quantity > 1) {
  //     updateQuantity(id, item.quantity - 1);
  //   }
  // };

  // const removeItem = id => {
  //   const updatedCart = cartItems.filter(item => item.id !== id);
  //   updateLocalStorage(updatedCart);

  //   // Remove variant price if exists
  //   setVariantPrices(prev => {
  //     const newPrices = { ...prev };
  //     delete newPrices[id];
  //     return newPrices;
  //   });
  // };

  // const handleVariantSelection = (productId, options) => {
  //   const updatedCart = cartItems.map(item =>
  //     item.id === productId ? { ...item, selectedOptions: options } : item
  //   );
  //   updateLocalStorage(updatedCart);

  //   // Fetch variant price if options exist
  //   if (options?.length > 0) {
  //     const variantIds = options.map(opt => opt.split('_')[1]);
  //     fetchVariantPrice(productId, variantIds);
  //   } else {
  //     // If no options selected, check if product has variants
  //     const product = products.find(p => p.id === productId);
  //     if (product?.product_variants?.length > 0) {
  //       // Use first options if none selected
  //       const defaultOptions = product.product_variants
  //         .filter(v => v.options?.length > 0)
  //         .map(v => `${v.id}_${v.options[0].id}`);

  //       if (defaultOptions.length > 0) {
  //         const variantIds = defaultOptions.map(opt => opt.split('_')[1]);
  //         fetchVariantPrice(productId, variantIds);
  //       }
  //     }
  //   }
  // };

  // const validateVariants = () => {
  //   let isValid = true;

  //   cartItems.forEach(item => {
  //     const product = products.find(p => p.id === item.id);
  //     if (product?.product_variants?.length > 0) {
  //       const requiredVariants = product.product_variants.filter(v => v.is_required);

  //       requiredVariants.forEach(variant => {
  //         const hasSelection = item.selectedOptions?.some(opt => opt.startsWith(`${variant.id}_`));
  //         if (!hasSelection) {
  //           isValid = false;
  //           setError(`variant_${item.id}_${variant.id}`, {
  //             type: 'manual',
  //             message: `الرجاء اختيار ${variant.variant_name}`,
  //           });
  //         }
  //       });
  //     }
  //   });

  //   return isValid;
  // };

  // const handleCheckout = async data => {
  //   setSubmitError(null);
  //   clearErrors();

  //   // Validate required fields from checkout settings
  //   const isFormValid = await trigger(checkoutFields.filter(f => f.is_required).map(f => f.backend_field_name));

  //   if (!isFormValid) {
  //     setSubmitError('الرجاء تعبئة جميع الحقول المطلوبة');
  //     return;
  //   }

  //   // Validate variants
  //   // const areVariantsValid = validateVariants();
  //   // if (!areVariantsValid) {
  //   //   setSubmitError('الرجاء اختيار جميع الخيارات المطلوبة للمنتجات');
  //   //   return;
  //   // }

  //   setIsBuyNowLoading(true);

  //   try {
  //     // Prepare cart items for checkout
  //     const checkoutItems = cartItems.map(item => {
  //       const product = products.find(p => p.id === item.id);
  //       let price, regularPrice;

  //       // Use variant price if available
  //       if (variantPrices[item.id]) {
  //         price = variantPrices[item.id].price;
  //         regularPrice = variantPrices[item.id].compare_at_price || price;
  //       } else {
  //         price = product.price?.special_price || product.price?.price || 0;
  //         regularPrice = product.price?.regular_price || price;
  //       }

  //       return {
  //         product_id: item.id,
  //         quantity: item.quantity,
  //         regular_price: regularPrice,
  //         special_price: price,
  //         total_price: price * item.quantity,
  //         options: item.selectedOptions ? item.selectedOptions.map(opt => opt.split('_')[1]) : [],
  //         variations: [],
  //         upsell_option: 1,
  //       };
  //     });

  //     // Prepare checkout data according to API schema
  //     const checkoutData = {
  //       cart_items: checkoutItems,
  //       cart_totals: {
  //         subtotal: subtotal,
  //         tax: tax,
  //         shipping: shipping,
  //         discount: discount,
  //         total: total - discount,
  //         weight: 0,
  //       },
  //       customer_info: {
  //         name: data.name || '.',
  //         first_name: data.first_name || '.',
  //         last_name: data.last_name || '.',
  //         email: data.email || '',
  //         phone: data.phone || '',
  //         delivery_address: data.delivery_address || '',
  //         city: data.city || '',
  //         country: data.country || '',
  //         zip_code: data.zip_code || '',
  //         comment: data.comment || '',
  //       },
  //       payment_method: 2,
  //       currency_name: storeOptions?.data?.currency.value.currency_name || '',
  //       user_ip: '127.0.0.1',
  //     };

  //     // Submit checkout
  //     const response = await api.post('/submit-checkout', checkoutData);
  //     sessionStorage.setItem('checkout_data', JSON.stringify({ cart: { details: checkoutItems, products }, orderSummary: "", res: "", productData: "" }));

  //     if (response.data.status_code === 200) {
  //       // Clear cart on successful checkout
  //       // localStorage.removeItem('cart');
  //       // setCartItems([]);

  //       navigate('/thank-you-page', { state: { orderData: response.data } });
  //     } else {
  //       setSubmitError(response.data.message || 'حدث خطأ أثناء إتمام الطلب');
  //     }
  //   } catch (error) {
  //     console.error('Checkout error:', error);
  //     const errorMessage = error.response?.data?.message || error.response?.data?.error || 'حدث خطأ أثناء إتمام الطلب. الرجاء المحاولة مرة أخرى';
  //     setSubmitError(errorMessage);
  //   } finally {
  //     setIsBuyNowLoading(false);
  //   }
  // };


  // useEffect(() => {
  //   if (products.length > 0 && cartItems.length > 0) {
  //     cartItems.forEach(item => {
  //       const product = products.find(p => p.id === item.id);
  //       if (product?.product_variants?.length > 0) {
  //         // If item has selectedOptions, use them, otherwise use first options
  //         const variantIds = item.selectedOptions
  //           ? item.selectedOptions.map(opt => opt.split('_')[1])
  //           : product.product_variants.map(v => v.options[0]?.id).filter(Boolean);

  //         if (variantIds.length > 0) {
  //           fetchVariantPrice(product.id, variantIds);
  //         }
  //       }
  //     });
  //   }
  // }, [products, cartItems]);



  return (
    <div className='bg-[#f8fafb]'>
      <Breadcrumb cn='!mt-0 !pt-[30px] container' routes={breadcrumbRoutes} />

      <div className='!mb-[30px] container max-lg:grid-cols-1 grid grid-cols-2 gap-[20px]'>
        <div className={`${cartItems.length === 0 && 'col-span-2'} bg-white p-4 rounded-md border border-[var(--border-bg)]`}>
          <Title cn='!mb-[30px]' title1='بيانات' title2='المنتجات' />

          {loading ? (
            <div className='space-y-4'>
              {[1, 2, 3].map(i => (
                <div key={i} className='flex gap-4 p-4 rounded-lg border border-[var(--border-bg)] bg-[#fafafa] animate-pulse'>
                  <div className='w-[100px] h-[80px] bg-gray-200 rounded-md'></div>
                  <div className='flex-1 space-y-3'>
                    <div className='h-4 bg-gray-200 rounded w-3/4'></div>
                    <div className='flex gap-2'>
                      <div className='h-8 w-8 bg-gray-200 rounded'></div>
                      <div className='h-8 w-8 bg-gray-200 rounded'></div>
                      <div className='h-8 w-8 bg-gray-200 rounded'></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : cartItems.length > 0 ? (
            <div className='grid gap-2'>
              {cartItems.map(item => {
                return (
                  <CartItem
                    item={item}
                    products={products}
                    variantPrices={variantPrices}
                    removeItem={removeItem}
                    handleVariantSelection={handleVariantSelection}
                    increaseQuantity={increaseQuantity}
                    decreaseQuantity={decreaseQuantity} />
                );
              })}
            </div>
          ) : (
            <EmptyState href='/products' name_href='تصفح المنتجات' type_animation='box' message='🛒 سلتك فارغة حاليًا' subtext='ابدأ بالتسوق الآن وأضف منتجاتك المفضلة!' />
          )}
        </div>

        {cartItems.length > 0 && (
          <div className='bg-white p-4 rounded-md border border-[var(--border-bg)]'>
            {checkoutLoading ? (
              <div className='bg-white rounded-lg p-4 space-y-5 my-8'>
                <div className='h-6 w-[220px] bg-gray-200 rounded-md animate-pulse'></div>
                {Array.from({ length: checkoutFields.length }).map((_, i) => (
                  <div key={i} className='space-y-2'>
                    <div className='h-5 w-[160px] bg-gray-200 rounded-md animate-pulse'></div>
                    <div className='h-[50px] w-full bg-gray-200 rounded-lg animate-pulse'></div>
                  </div>
                ))}
              </div>
            ) : (
              <form className='space-y-4 !my-8 bg-white rounded-lg overflow-hidden'>
                <Title title1='يرجى ادخال معلوماتك' title2='لإكمال الطلب' />

                {submitError && <div className='bg-red-50 border border-red-200 text-red-600 p-3 rounded-md'>{submitError}</div>}

                {/* {checkoutFields.map(
                  field =>
                    field.is_enable && (
                      <div key={field.id} className='flex flex-col gap-[10px] relative'>
                        <label htmlFor={field.backend_field_name} className='text-[#333333] text-base font-normal'>
                          {field.field_text}
                          {field.is_required && <span className='text-[#ff4b55]'>*</span>}
                        </label>

                        <div className={`h-[50px] relative overflow-hidden rounded-[8px] text-sm border ${errors[field.backend_field_name] ? 'border-[#ff4b55]' : 'border-[#EEEEEE]'} w-full`}>
                          <input
                            type={field.type || 'text'}
                            id={field.backend_field_name}
                            {...register(field.backend_field_name, {
                              required: field.is_required ? `${field.field_text} مطلوب` : false,
                              minLength: field.min_length
                                ? {
                                  value: parseInt(field.min_length),
                                  message: `يجب أن يكون ${field.field_text} على الأقل ${field.min_length} أحرف`,
                                }
                                : undefined,
                              maxLength: field.max_length
                                ? {
                                  value: parseInt(field.max_length),
                                  message: `يجب أن يكون ${field.field_text} على الأكثر ${field.max_length} أحرف`,
                                }
                                : undefined,
                            })}
                            placeholder={field.field_placeholder}
                            className='placeholder:text-[#A5A5A5] text-[#222] font-normal w-full px-[10px] h-full outline-none'
                          />
                        </div>

                        {errors[field.backend_field_name] && <div className='text-[#ff4b55] mt-[-10px] text-sm'>{errors[field.backend_field_name].message}</div>}
                      </div>
                    ),
                )} */}

                <CartTotalSummary
                  subtotal={subtotal}
                  discount={discount}
                  tax={tax}
                  shipping={shipping}
                  total={total}
                  loadingVariantPrices={loadingVariantPrices}
                />


                {/* <Button onclick={handleSubmit(handleCheckout)} type='submit' loading={isBuyNowLoading} cn='w-full !mt-8 flex-row-reverse h-[50px] rounded-md text-white bg-primary hover:bg-primary/90 transition' name='إتمام الطلب' icon={<ShoppingBag size={20} className='mr-2' />} /> */}
              </form>
            )}
          </div>
        )}
      </div>

      {cartItems.length > 0 && <ProductCarouselRelated title='منتجات مشابهة' subTitle='تصفّح منتجات قد تعجبك أيضًا' cn='max-sm:!px-[10px] !mt-6' bg='sm:!px-[20px] py-[40px] bg-white rounded-md border border-[var(--border-bg)]' products={relatedProducts?.data} loading={loadingRelatedProducts} arrowTop={true} />}

      <FeatureList />
    </div>
  );
}
