import { Link, useParams } from 'react-router-dom';
import Breadcrumb from '../components/atoms/Breadcrumb';
import Button from '../components/atoms/Button';
import Input from '../components/atoms/Input';
import ProductCarousel from '../components/atoms/ProductCarousel';
import Title from '../components/atoms/Title';
import FeatureList from '../components/molecules/FeatureList';
import { UseCart } from '../hooks/UseCart';
import { Minus, Plus, ShoppingBag, Star, X } from 'lucide-react';
import { useState, useEffect , useMemo } from 'react';
import { baseImage, useApiGet } from '../config/Api';
import PriceCurrency from '../components/atoms/PriceCurrency';
import MetaTags from '../components/atoms/MetaTags';
import ProductCarouselRelated from '../components/atoms/ProductCarouselRelated';


export default function Product() {
    const { id } = useParams();
    const { register, errors, handleGotToCart, isloading, trigger, clearErrors, setError, getValues, setValue, submit, watch, reset } = UseCart();
    const { data, loading } = useApiGet(`/get-product-by-slug/${id}`);
    const { product, product_variants, frequently_bought_products, product_meta } = !loading && data?.data ? data.data : {};

    const images = product?.medias?.map(media => baseImage + media.url) || [];
    const [selectedImage, setSelectedImage] = useState(images?.[0]);
    useEffect(() => {
        setSelectedImage(images[0]);
    }, [loading]);

    //! bread crumb
    const [isOpen, setIsOpen] = useState(false);
    const breadcrumbRoutes = [{ label: 'الرئيسية', href: '/' }, { label: 'كل المنتجات', href: '/products' }, { label: 'تفاصيل المنتج' }];

    //! select option
    const [selected, setSelected] = useState(product_variants?.[0]?.options?.[0]?.variant_option_name);
    //! counter
    const [quantity, setQuantity] = useState(1);

    const handleIncrement = () => setQuantity(q => q + 1);
    const handleDecrement = () => setQuantity(q => (q > 1 ? q - 1 : 1));

    //! option go to ( cart or buy now)
    const goToCart = true;
    // if (loading == true) return <div>loading</div>;

    //! total price of the frequently bought products
    const totalPrice = useMemo(() => {
        const mainProductPrice = product?.price?.special_price || 0;
        const extrasTotal = frequently_bought_products?.reduce((acc, p) => acc + (p?.price?.special_price || 0), 0);
        return mainProductPrice + extrasTotal;
    }, [product, frequently_bought_products]);



    const seo = product_meta && JSON.parse(product_meta?.seo)
    //! fetch related products
    const { data:relatedProducts, loading:loadingRelatedProducts } = useApiGet(`/get-related-products/${id}`);


    return (
        <div className='bg-[#f8fafb]  '>
            <MetaTags title={seo?.meta_title} description={seo?.meta_description} image={`${baseImage}${product?.medias?.[0]?.url}`} url={`https://yourdomain.com/product/${product?.slug}`} keywords={seo?.meta_keyword} />
            <Breadcrumb cn=' !mt-0  !pt-[30px] container' routes={breadcrumbRoutes} />

            <div className=' !mb-[30px] container  max-md:!px-[20px] pb-[50px] grid max-xl:grid-cols-1 grid-cols-[720px,1fr]  rounded-xl  gap-6 '>
                <div className='   !p-4 bg-white  rounded-md '>
                    <div className=' product-images sticky top-[120px] h-fit  productSwiper grid grid-cols-1 md:grid-cols-[110px,1fr]  gap-[10px]'>
                        {/* Main Image */}
                        <div className='max-sm:order-[-1] relative border border-[#eee] rounded-md overflow-hidden max-xl:h-auto h-[550px] w-full'>
                            <img src={selectedImage} className=' object-fill bg-gray-50 h-full w-full ' alt='Main' id='mainImage' />
                            <svg onClick={() => setIsOpen(true)} className=' absolute left-[10px] bottom-[10px] cursor-pointer hover:scale-[1.05] duration-500 hover:opacity-80  max-md:w-[30px] max-md:h-[30px] ' width='41' height='40' viewBox='0 0 41 40' fill='black' xmlns='http://www.w3.org/2000/svg'>
                                <rect x='1' y='0.5' width='39' height='39' rx='1.5' stroke='#EEEEEE' />
                                <path d='M23.5 18C23.7652 17.9999 24.0195 17.8945 24.207 17.707L28.5 13.414V16C28.5 16.2652 28.6054 16.5196 28.7929 16.7071C28.9804 16.8946 29.2348 17 29.5 17C29.7652 17 30.0196 16.8946 30.2071 16.7071C30.3946 16.5196 30.5 16.2652 30.5 16V11C30.5 10.7348 30.3946 10.4804 30.2071 10.2929C30.0196 10.1054 29.7652 10 29.5 10H24.5C24.2348 10 23.9804 10.1054 23.7929 10.2929C23.6054 10.4804 23.5 10.7348 23.5 11C23.5 11.2652 23.6054 11.5196 23.7929 11.7071C23.9804 11.8946 24.2348 12 24.5 12H27.086L22.793 16.293C22.6532 16.4329 22.558 16.611 22.5194 16.805C22.4808 16.9989 22.5007 17.2 22.5763 17.3827C22.652 17.5654 22.7801 17.7215 22.9445 17.8314C23.109 17.9413 23.3022 18 23.5 18ZM11.5 30H16.5C16.7652 30 17.0196 29.8946 17.2071 29.7071C17.3946 29.5196 17.5 29.2652 17.5 29C17.5 28.7348 17.3946 28.4804 17.2071 28.2929C17.0196 28.1054 16.7652 28 16.5 28H13.914L18.207 23.707C18.3892 23.5184 18.49 23.2658 18.4877 23.0036C18.4854 22.7414 18.3802 22.4906 18.1948 22.3052C18.0094 22.1198 17.7586 22.0146 17.4964 22.0123C17.2342 22.01 16.9816 22.1108 16.793 22.293L12.5 26.586V24C12.5 23.7348 12.3946 23.4804 12.2071 23.2929C12.0196 23.1054 11.7652 23 11.5 23C11.2348 23 10.9804 23.1054 10.7929 23.2929C10.6054 23.4804 10.5 23.7348 10.5 24V29C10.5 29.2652 10.6054 29.5196 10.7929 29.7071C10.9804 29.8946 11.2348 30 11.5 30Z' fill='#EEEEEE' />
                            </svg>
                        </div>

                        {/* Thumbnails */}
                        <div className='md:order-[-2]  product-scroll overflow-x-auto max-md:h-[70px] md:h-[550px] w-full '>
                            <div className='flex flex-row md:flex-col items-center gap-3  h-full w-fit'>
                                {images.map((img, idx) => (
                                    <div key={idx} className={`overflow-hidden rounded-md md:w-[107px] max-md:w-[80px] md:h-[100px] h-full flex-shrink-0 ${selectedImage === img ? 'border-2 border-[var(--main)]' : ''}`}>
                                        <img src={img} className='thumbnail hover:scale-[1.1] hover:rotate-[1deg] duration-300 h-full object-cover w-full cursor-pointer' alt={`Image ${idx + 1}`} onClick={() => setSelectedImage(img)} />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Product Info */}
                <div className='!p-6 bg-white rounded-md h-fit flex-1 space-y-4'>
                    <h2 className='text-2xl max-md:text-xl font-bold text-[#3B2D35]'> {product?.title} </h2>
                    {product?.categories?.length > 0 && (
                        <div className='flex flex-wrap gap-2 items-center'>
                            {product.categories.map(category => (
                                <span key={category.id} className='bg-[var(--second)] text-white text-xs px-3 py-1 rounded-full shadow-sm'>
                                    {category.name}
                                </span>
                            ))}
                        </div>
                    )}

                    <div className='flex items-center gap-2 '>
                        <span className='text-[#123770] font-bold text-lg'>
                            <PriceCurrency price={product?.price?.special_price} />
                        </span>
                        <span className='line-through text-[#A5A5A5] text-base'>
                            <PriceCurrency price={product?.price?.regular_price} />
                        </span>
                        <span className='bg-[var(--second)] text-white text-xs px-2 py-2 rounded-[10px] flex items-center gap-[5px]'>
                            هتوفر <PriceCurrency price={product?.price?.regular_price - product?.price?.special_price} />
                        </span>
                    </div>

                    {product?.review_enable != 0 && (
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
                    )}

                    {/* Product description from data?.product_meta */}
                    <div className='text-[#959FBC] text-base leading-relaxed' dangerouslySetInnerHTML={{ __html: product_meta && JSON?.parse(product_meta?.content)?.excerpt }} />

                    {/* Product variants */}
                    {product_variants?.length > 0 && (
                        <div className='!mt-[30px]'>
                            {product_variants.map(variant => (
                                <div key={variant.id}>
                                    <div className='text-base !mb-[10px] text-[#051959]'>{variant.variant_name}:</div>
                                    {/*! handle is ( is_required ) */}
                                    <div className='flex flex-wrap gap-2 mt-2'>
                                        {variant.options.map((option ) => (
                                            <label onClick={() => setSelected(option.variant_option_name)} key={option.id} className={`${selected === option.variant_option_name ? 'border-[var(--main)] !text-white bg-[var(--main)]' : ''}  hover:scale-[1.04] flex items-center justify-center rounded-md hover:border-[var(--main)] hover:text-white duration-300 hover:bg-[var(--main)]  min-w-[80px] h-[40px] bg-[#F8FAFB] text-[#3F3E3F4D] border border-[#F0F1F1] cursor-pointer`}>
                                                <span>{option.variant_option_name}</span>
                                            </label>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Stock information */}
                    {product?.stock?.stock_manage != 0 && (
                        <div className='grid grid-cols-2 gap-y-2 text-sm text-gray-700' dir='rtl'>
                            <span className='font-medium'>رمز المنتج (SKU):</span>
                            <span className=' text-[var(--main)] font-semibold'>{product?.stock.sku}</span>

                            <span className='font-medium'>الكمية في المخزون:</span>
                            <span className={`font-semibold ${product?.stock.stock_qty > 0 ? ' text-[var(--second)] ' : 'text-red-600'}`}>{product?.stock.stock_qty}</span>

                            <span className='font-medium'>حالة المخزون:</span>
                            <span>{product?.stock.stock_status === 1 ? <span className=' text-[var(--second)] font-semibold'>متوفر</span> : <span className='text-red-600 font-semibold'>غير متوفر</span>}</span>
                        </div>
                    )}

                    {/* Form */}
                    <div className={`${goToCart ? 'hidden' : ''} !mt-[30px] space-y-4`}>
                        <Title title1='يرجى ادخال معلوماتك' title2='لإكمال الطلب' />

                        <Input required={true} KEY={'first_name'} icon={'/icons/user.svg'} error={errors?.first_name} type={'text'} register={register('first_name')} place={'اسمك بالكامل'} label={'اسمك بالكامل'} />
                        <Input required={true} KEY={'phone'} icon={'/icons/phone.svg'} error={errors?.phone} type={'text'} register={register('phone')} place={'رقم الهاتف'} label={'رقم الهاتف'} />
                        <Input required={true} KEY={'locations'} icon={'/icons/location.svg'} error={errors?.location} type={'locations'} register={register('location')} place={'العنوان بالتفصيل'} label={'العنوان بالتفصيل'} />
                    </div>

                    {/* Quantity + Button */}
                    <div className='flex flex-col-reverse items-center gap-[20px] xl:gap-[30px] !mt-8'>
                        <Button loading={isloading} cn='w-full !h-[50px]' onclick={() => (goToCart ? handleGotToCart() : submit())} name='اشترى الان' icon={<ShoppingBag />} />
                        <div className='w-fit ml-auto flex flex-col gap-[10px]'>
                            <div className='text-base text-[#051959] font-medium text-nowrap'> الكمية: </div>
                            <div className='flex px-[5px] py-[5px] items-center gap-2 justify-end border border-[#EEEEEE] rounded-md'>
                                <button onClick={handleIncrement} className='rounded-md px-[10px] h-full py-[10px] hover:bg-gray-300 transition' disabled={data?.data?.stock?.stock_manage && quantity >= data?.data?.stock?.stock_qty}>
                                    <Plus size={18} />
                                </button>
                                <span className='h-[30px] w-[1px] bg-[#eee] block'></span>
                                <span className='w-10 text-center font-bold text-[#051959]'>{quantity}</span>
                                <span className='h-[30px] w-[1px] bg-[#eee] block'></span>
                                <button onClick={handleDecrement} className='rounded-md px-[10px] h-full py-[10px] hover:bg-gray-300 transition' disabled={quantity <= 1}>
                                    <Minus size={18} />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className='!mb-[30px] container  max-md:!px-[20px] pb-[50px] rounded-xl '>
                <div className='!p-4 bg-white w-full '>
                    {/* frequently bought products */}
                    {frequently_bought_products?.length > 0 && (
                        <div className='mt-10'>
                            <h3 className='text-xl text-center font-bold text-[#3B2D35] mb-[30px] '>منتجات غالبًا ما يتم شراؤها مع هذا المنتج</h3>
                            <div className='flex flex-wrap justify-center items-center gap-6'>
                                <Link href={`/product/${product.slug}`} key={product.id} className='  !p-2 !pb-[10px] max-w-[300px] w-full bg-white rounded-md space-y-3 border shadow-sm'>
                                    {product.medias?.[0] && <img src={baseImage + product.medias[0].url} alt={product.title} className='w-full rounded-md object-cover max-h-[200px]' />}

                                    {/* Product Title */}
                                    <h4 className='text-lg truncate text-center font-semibold text-[#3B2D35]'>{product.title}</h4>

                                    {/* Price Section */}
                                    <div className='flex items-center justify-center gap-2'>
                                        <span className='text-[#123770] font-bold text-base'>
                                            <PriceCurrency price={product?.price?.special_price} />
                                        </span>
                                        <span className='line-through text-[#A5A5A5] text-sm'>
                                            <PriceCurrency price={product?.price?.regular_price} />
                                        </span>
                                        <span className='bg-[var(--second)] text-white text-xs px-2 py-1 flex items-center gap-[4px] text-nowrap rounded-xl'>
                                            هتوفر <PriceCurrency price={product?.price?.regular_price - product?.price?.special_price} />
                                        </span>
                                    </div>

                                    {/* Reviews */}
                                    {product.review_enable != 0 && (
                                        <div className='flex items-center gap-2 text-sm text-[#666666]'>
                                            <span className='flex text-[#FFC62A]'>
                                                {Array(5)
                                                    .fill(0)
                                                    .map((_, i) => (
                                                        <Star key={i} className='!fill-[#FFC62A]' />
                                                    ))}
                                            </span>
                                            ({product.no_of_reviews}) تقييمات
                                        </div>
                                    )}
                                </Link>

                                {frequently_bought_products.map(product => (
                                    <>
                                        <Plus size={30} className=" flex-none " />
                                        <Link href={`/product/${product.slug}`} key={product.id} className='flex-none grow-0 !p-2 !pb-[10px] max-w-[300px] w-full bg-white rounded-md space-y-3 border shadow-sm'>
                                            {product.medias?.[0] && <img src={baseImage + product.medias[0].url} alt={product.title} className='w-full rounded-md object-cover max-h-[200px]' />}

                                            {/* Product Title */}
                                            <h4 className='text-lg truncate text-center font-semibold text-[#3B2D35]'>{product.title}</h4>

                                            {/* Price Section */}
                                            <div className='flex items-center justify-center gap-2'>
                                                <span className='text-[#123770] font-bold text-base'>
                                                    <PriceCurrency price={product?.price?.special_price} />
                                                </span>
                                                <span className='line-through text-[#A5A5A5] text-sm'>
                                                    <PriceCurrency price={product?.price?.regular_price} />
                                                </span>
                                                <span className='bg-[var(--second)] text-white text-xs px-2 py-1 flex items-center gap-[4px] text-nowrap rounded-xl'>
                                                    هتوفر <PriceCurrency price={product?.price?.regular_price - product?.price?.special_price} />
                                                </span>
                                            </div>

                                            {/* Reviews */}
                                            {product.review_enable != 0 && (
                                                <div className='flex items-center gap-2 text-sm text-[#666666]'>
                                                    <span className='flex text-[#FFC62A]'>
                                                        {Array(5)
                                                            .fill(0)
                                                            .map((_, i) => (
                                                                <Star key={i} className='!fill-[#FFC62A]' />
                                                            ))}
                                                    </span>
                                                    ({product.no_of_reviews}) تقييمات
                                                </div>
                                            )}
                                        </Link>
                                    </>
                                ))}
                            </div>

                            <div className='mt-10 text-center flex items-center gap-[20px] justify-center '>
                                <Button loading={isloading} cn='w-fit  !h-[50px]' name={`إجمالي السعر: ${totalPrice} `} />
                                <Button loading={isloading} cn='w-fit !h-[50px]' name='اشترى الان' icon={<ShoppingBag />} />
                            </div>
                        </div>
                    )}
                </div>
            </div>


            <ProductCarouselRelated title={"منتجات ذات صلة"} subTitle={"تصفّح منتجات قد تعجبك أيضًا بناءً على هذا المنتج"} cn='max-sm:!px-[10px]' bg=' sm:!px-[20px] py-[40px] bg-white rounded-md border border-[var(--border-bg)] ' products={relatedProducts?.data} loading={loadingRelatedProducts} arrowTop={true} />
            <FeatureList />

            {isOpen && (
                <div className='fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70'>
                    <div className='relative w-[90vw] max-w-4xl'>
                        <div onClick={() => setIsOpen(false)} className=' max-md:w-[30px] max-md:h-[30px] border border-white w-[40px] h-[40px] rounded-sm  flex items-center justify-center cursor-pointer absolute top-[20px] right-[20px] hover:scale-[1.05] duration-500 hover:opacity-80  '>
                            <X className=' stroke-white ' />
                        </div>

                        <img src={selectedImage} alt='Popup' className='w-full h-auto rounded-lg shadow-lg' />
                    </div>
                </div>
            )}
        </div>
    );
}
