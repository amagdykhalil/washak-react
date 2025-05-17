import { useParams } from 'react-router-dom';
import Breadcrumb from '../components/atoms/Breadcrumb';
import Button from '../components/atoms/Button';
import Input from '../components/atoms/Input';
import ProductCarousel from '../components/atoms/ProductCarousel';
import Title from '../components/atoms/Title';
import FeatureList from '../components/molecules/FeatureList';
import { UseCart } from '../hooks/UseCart';
import { Minus, Plus, ShoppingBag, Star, X } from 'lucide-react';
import React, { useState , useEffect } from 'react';
import { baseImage, useApiGet } from '../config/Api';
import Timer from '../components/atoms/Timer';
import PriceCurrency from '../components/atoms/PriceCurrency';

export default function Product() {
    const { id } = useParams();
    const { register, errors, handleGotToCart, isloading, trigger, clearErrors, setError, getValues, setValue, submit, watch, reset } = UseCart();
    const { data, loading } = useApiGet(`/get-product-by-slug/${id}`);
    const product = data?.data?.product;

    
    const images = product?.medias?.map(media => baseImage + media.url) || [];
    const [selectedImage, setSelectedImage] = useState(images?.[0]);
    useEffect(()=> {
        setSelectedImage(images[0])
    } ,[loading])



    const [isOpen, setIsOpen] = useState(false);

    const breadcrumbRoutes = [{ label: 'الرئيسية', href: '/' }, { label: 'كل المنتجات', href: '/products' }, { label: 'تفاصيل المنتج' }];


    //! select option
    const [selected, setSelected] = useState('قطعة');
    const options = ['قطعة', 'قطعتين', '٣ قطع'];

    //! counter
    const [quantity, setQuantity] = useState(1);

    const handleIncrement = () => setQuantity(q => q + 1);
    const handleDecrement = () => setQuantity(q => (q > 1 ? q - 1 : 1));

    //! static data
    const productsHome = {
        currency: 'ج.م',
        btnName: 'شراء الان',
        btnIcon: '/icons/buy.png',
        title1: 'منتجات   ',
        title2: 'تباع معاً',

        data: [
            {
                id: '7',
                image: '/products/1.png',
                secondImage: '/products/2.png',
                discountLabel: 'خصم 10%',
                cta: 'مستلزمات المطبخ',
                title: 'وصلة الحنفية المتحركة',
                originalPrice: '370 ',
                salePrice: '299 ',
            },
            {
                id: '8',
                image: '/products/3.png',
                secondImage: '/products/4.png',
                cta: 'العناية الشخصية',
                title: 'فرشاة أسنان كهربائية',
                originalPrice: '450 ',
                salePrice: '382 ',
            },
            {
                id: '9',
                image: '/products/5.png',
                secondImage: '/products/6.png',
                discountLabel: 'جديد',
                cta: 'منتجات منزلية',
                title: 'موزع صابون أوتوماتيكي',
                originalPrice: '220 ',
                salePrice: '220 ',
            },
            {
                id: '10',
                image: '/products/7.png',
                secondImage: '/products/8.png',
                cta: 'مستلزمات المطبخ',
                title: 'سكاكين مطبخ من الستانلس ستيل',
                originalPrice: '800 ',
                salePrice: '640 ',
            },
            {
                id: '11',
                image: '/products/9.png',
                secondImage: '/products/10.png',
                discountLabel: 'عرض خاص',
                cta: 'منتجات منزلية',
                title: 'طقم فناجين قهوة سيراميك',
                originalPrice: '150 ',
                salePrice: '120 ',
            },
            {
                id: '12',
                image: '/products/11.png',
                secondImage: '/products/12.png',
                discountLabel: 'جديد',
                cta: 'العناية الشخصية',
                title: 'مجفف شعر احترافي',
                originalPrice: '1,200 ',
                salePrice: '1,200 ',
            },
        ],
    };

    //! option go to ( cart or buy now)
    const [goToCart, setgoToCart] = useState(true);

    console.log(product)

    return (
        <div className='bg-[#f8fafb]  '>
            <Breadcrumb cn=' !mt-0  !pt-[30px] container' routes={breadcrumbRoutes} />

            <div className=' container  max-md:!px-[20px] pb-[50px] grid max-xl:grid-cols-1 grid-cols-[720px,1fr]  rounded-xl  gap-6 '>
                <div className='   !p-4 bg-white  rounded-md '>
                    <div className=' product-images sticky top-[120px] h-fit  productSwiper grid grid-cols-1 gap-[10px]'>
                        {/* Main Image */}
                        <div className='max-sm:order-[-1] relative border border-[#eee] rounded-md overflow-hidden max-xl:h-auto h-[550px] w-full'>
                            <img src={selectedImage} className=' object-contain bg-gray-50 h-full w-full ' alt='Main' id='mainImage' />
                            <svg onClick={() => setIsOpen(true)} className=' absolute left-[10px] bottom-[10px] cursor-pointer hover:scale-[1.05] duration-500 hover:opacity-80  max-md:w-[30px] max-md:h-[30px] ' width='41' height='40' viewBox='0 0 41 40' fill='black' xmlns='http://www.w3.org/2000/svg'>
                                <rect x='1' y='0.5' width='39' height='39' rx='1.5' stroke='#EEEEEE' />
                                <path d='M23.5 18C23.7652 17.9999 24.0195 17.8945 24.207 17.707L28.5 13.414V16C28.5 16.2652 28.6054 16.5196 28.7929 16.7071C28.9804 16.8946 29.2348 17 29.5 17C29.7652 17 30.0196 16.8946 30.2071 16.7071C30.3946 16.5196 30.5 16.2652 30.5 16V11C30.5 10.7348 30.3946 10.4804 30.2071 10.2929C30.0196 10.1054 29.7652 10 29.5 10H24.5C24.2348 10 23.9804 10.1054 23.7929 10.2929C23.6054 10.4804 23.5 10.7348 23.5 11C23.5 11.2652 23.6054 11.5196 23.7929 11.7071C23.9804 11.8946 24.2348 12 24.5 12H27.086L22.793 16.293C22.6532 16.4329 22.558 16.611 22.5194 16.805C22.4808 16.9989 22.5007 17.2 22.5763 17.3827C22.652 17.5654 22.7801 17.7215 22.9445 17.8314C23.109 17.9413 23.3022 18 23.5 18ZM11.5 30H16.5C16.7652 30 17.0196 29.8946 17.2071 29.7071C17.3946 29.5196 17.5 29.2652 17.5 29C17.5 28.7348 17.3946 28.4804 17.2071 28.2929C17.0196 28.1054 16.7652 28 16.5 28H13.914L18.207 23.707C18.3892 23.5184 18.49 23.2658 18.4877 23.0036C18.4854 22.7414 18.3802 22.4906 18.1948 22.3052C18.0094 22.1198 17.7586 22.0146 17.4964 22.0123C17.2342 22.01 16.9816 22.1108 16.793 22.293L12.5 26.586V24C12.5 23.7348 12.3946 23.4804 12.2071 23.2929C12.0196 23.1054 11.7652 23 11.5 23C11.2348 23 10.9804 23.1054 10.7929 23.2929C10.6054 23.4804 10.5 23.7348 10.5 24V29C10.5 29.2652 10.6054 29.5196 10.7929 29.7071C10.9804 29.8946 11.2348 30 11.5 30Z' fill='#EEEEEE' />
                            </svg>
                        </div>

                        {/* Thumbnails */}
                        <div className='product-scroll overflow-x-auto max-md:h-[70px] h-[120px] w-full '>
                            <div className='flex flex-row items-center gap-3  h-full w-fit'>
                                {images.map((img, idx) => (
                                    <div key={idx} className={`overflow-hidden rounded-md w-[161px] max-md:w-[80px] h-full flex-shrink-0 ${selectedImage === img ? 'border-2 border-[var(--main)]' : ''}`}>
                                        <img src={img} className='thumbnail hover:scale-[1.1] hover:rotate-[1deg] duration-300 h-full object-cover w-full cursor-pointer' alt={`Image ${idx + 1}`} onClick={() => setSelectedImage(img)} />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Product Info */}
                <div className='!p-6 bg-white  rounded-md flex-1 space-y-4'>
                    <h2 className='text-2xl max-md:text-xl font-bold text-[#3B2D35]'> {product?.title} </h2>

                    <div className='flex items-center gap-2 '>
                        <span className='text-[#123770] font-bold text-lg '>  <PriceCurrency price={product?.price?.special_price} /> </span>
                        <span className='line-through text-[#A5A5A5] text-base '> <PriceCurrency price={product?.price?.regular_price} /> </span>
                        <span className='bg-[var(--second)] text-white text-xs px-2 py-2 rounded-[10px] flex items-center gap-[5px] '>هتوفر  <PriceCurrency price={product?.price?.regular_price - product?.price?.special_price} /> </span>
                    </div>

                    {product?.review_enable != 0 &&<div className=' flex items-start gap-[10px] text-sm text-[#666666]'>
                        <span className=' flex items-center  text-[#FFC62A]  '>
                            {Array(5)
                                .fill(0)
                                .map((_, i) => (
                                    <Star key={i} className='!fill-[#FFC62A]' />
                                ))}
                        </span>
                        ({product?.no_of_reviews}) تقييمات
                    </div>}

                    <p className='text-[#959FBC] text-base leading-relaxed'>هذا النص هو مثال لنص يمكن أن يستبدل في نفس المساحة، لقد تم توليد هذا النص من مولد النص العربى، حيث يمكنك أن تولد مثل هذا النص أو العديد من النصوص الأخرى إضافة إلى زيادة عدد الحروف التى يولدها التطبيق.</p>

                    {/* Timer */}
                    {!loading && <Timer data={product?.price} />}

                    {/* Package options */}
                    <div className='!mt-[30px]'>
                        <div className='text-base !mb-[10px] text-[#051959]'>
                            عرض القطع : <span className='text-[var(--second)] font-bold'>80 ج.م</span>
                        </div>

                        <div className='flex flex-wrap gap-2 mt-2'>
                            {options.map(label => (
                                <label onClick={() => setSelected(label)} key={label} className={` ${selected === label ? 'border-[var(--main)] !text-white bg-[var(--main)]' : ''} hover:scale-[1.04] flex items-center justify-center rounded-md hover:border-[var(--main)] hover:text-white duration-300 hover:bg-[var(--main)] min-w-[80px] h-[40px] bg-[#F8FAFB] text-[#3F3E3F4D] border border-[#F0F1F1]  cursor-pointer`}>
                                    <span>{label}</span>
                                </label>
                            ))}
                        </div>
                    </div>

                    {/* Form */}
                    <div className={` ${goToCart ? 'hidden' : ''} !mt-[30px] space-y-4`}>
                        <Title title1='يرجى ادخال معلوماتك' title2='لإكمال الطلب' />

                        <Input required={true} KEY={'first_name'} icon={'/icons/user.svg'} error={errors?.first_name} type={'text'} register={register('first_name')} place={'اسمك بالكامل'} label={'اسمك بالكامل'} />
                        <Input required={true} KEY={'phone'} icon={'/icons/phone.svg'} error={errors?.phone} type={'text'} register={register('phone')} place={'رقم الهاتف'} label={'رقم الهاتف'} />
                        <Input required={true} KEY={'locations'} icon={'/icons/location.svg'} error={errors?.location} type={'locations'} register={register('location')} place={'العنوان بالتفصيل'} label={'العنوان بالتفصيل'} />
                    </div>

                    {/* Quantity + Button */}
                    <div className='flex flex-col-reverse items-center gap-[20px] xl:gap-[30px] !mt-8'>
                        <Button loading={isloading} cn='w-full  !h-[50px] ' onclick={() => (goToCart ? handleGotToCart() : submit())} name='اشترى الان' icon={<ShoppingBag />} />
                        <div className=' w-fit ml-auto  flex flex-col  gap-[10px] '>
                            <div className='text-base text-[#051959]  font-medium text-nowrap '> الكمية : </div>

                            <div className='flex px-[5px] py-[5px]  items-center gap-2 justify-end border border-[#EEEEEE]  rounded-md '>
                                <button onClick={handleIncrement} className=' rounded-md px-[10px] h-full py-[10px] hover:bg-gray-300 transition'>
                                    <Plus size={18} />
                                </button>
                                <span className='h-[30px] w-[1px] bg-[#eee] block '></span>
                                <span className='w-10 text-center font-bold text-[#051959]'>{quantity}</span>
                                <span className='h-[30px] w-[1px] bg-[#eee] block '></span>
                                <button onClick={handleDecrement} className=' rounded-md px-[10px] h-full py-[10px] hover:bg-gray-300 transition'>
                                    <Minus size={18} />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <ProductCarousel cn='max-sm:!px-[10px]' bg=' sm:!px-[20px] py-[40px] bg-white rounded-md border border-[var(--border-bg)] ' products={productsHome} arrowTop={true} />
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
