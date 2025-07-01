import Breadcrumb from'../../components/atoms/Breadcrumb';
import Button from'../../components/atoms/Button';
import Input from'../../components/atoms/Input';
import ProductCarousel from'../../components/atoms/ProductCarousel';
import Title from'../../components/atoms/Title';
import FeatureList from'../../components/molecules/FeatureList';
import { UseCart } from'../../hooks/UseCart';
import { Minus, Plus, ShoppingBag, Star, X } from 'lucide-react';
import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';

export default function Cart() {
    const { register, errors, isloading, trigger, clearErrors, setError, getValues, setValue, submit, watch, reset } = UseCart();

    const breadcrumbRoutes = [{ label: 'الرئيسية', href: '/' }, { label: 'كل المنتجات', href: '/products' }, { label: 'تفاصيل المنتج' }];

    const products = Array(4).fill({
        name: 'الممسحة الذكية مع دلو التجفيف',
        oldPrice: '100.00 ر.س',
        newPrice: '80 ر.س',
        image: '/mop.png', // Place the image in `public/mop.png`
        quantity: 123,
    });



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

    return (
        <div className='bg-[#f8fafb]  '>
            <Breadcrumb cn=' !mt-0  !pt-[30px] container' routes={breadcrumbRoutes} />

            <div className='  !mb-[30px] container max-md:grid-cols-1  grid grid-cols-2 gap-[20px] '>
                <div className='bg-white p-4 rounded-md border border-[var(--border-bg)]  '>
                    <Title cn="!mb-[30px]" title1='بيانات ' title2='المنتجات' />

                    {[1, 2 , 3 , 4 , 5 , 6].map((_, i) => (
                        <div key={i} className='flex items-center mb-[20px]  max-md:gap-[10px] gap-[30px]'>
                            <img
                                src={`/products/product/${1 + i}.png`} // replace with actual product image URL
                                alt='product'
                                className='w-[88px] max-md:w-[60px] max-md:h-[45px] h-[60px] rounded-md object-cover'
                            />
                            <div className='flex-1 max-sm:flex-col max-sm:items-start flex items-center justify-between text-sm'>
                                <div>
                                    <p className='font-medium text-[#333333] '>الممسحة الذكية مع دلو التجفيف</p>
                                    <p className='text-base text-[#BFC2D4]'>عدد القطع : 8</p>
                                </div>
                                <p className='text-base text-[#123770] text-nowrap '>80 ر.س</p>
                            </div>
                        </div>
                    ))}
                </div>
                <div className='bg-white p-4 rounded-md border border-[var(--border-bg)]  '>
                    {/* Form */}
                    <div className={`space-y-4`}>
                        <Title cn="!mb-[20px]" title1='يرجى ادخال معلوماتك' title2='لإكمال الطلب' />

                        <Input required={true} KEY={'first_name'} icon={'/icons/user.svg'} error={errors?.first_name} type={'text'} register={register('first_name')} place={'اسمك بالكامل'} label={'اسمك بالكامل'} />
                        <Input required={true} KEY={'phone'} icon={'/icons/phone.svg'} error={errors?.phone} type={'text'} register={register('phone')} place={'رقم الهاتف'} label={'رقم الهاتف'} />
                        <Input required={true} KEY={'locations'} icon={'/icons/location.svg'} error={errors?.location} type={'locations'} register={register('location')} place={'العنوان بالتفصيل'} label={'العنوان بالتفصيل'} />
                    </div>

                    <div className=' !mt-[20px] text-base text-[#838BA1] flex justify-between'> <span> تكلفة الشحن </span> <span className='text-[var(--main)] text-sm '> 15ر.س</span> </div>
                    <div className=' !mt-[15px] text-base text-[var(--second)] flex justify-between'> <span> المبلغ الاجمالى </span> <span className='text-[var(--second)] text-sm '> 200 ر.س</span> </div>

                    {/* Quantity + Button */}
                    <div className='flex flex-col-reverse items-center gap-[20px] xl:gap-[30px] !mt-[20px]'>
                        <Button loading={isloading} cn='w-full  !h-[50px] ' onclick={submit} name='اشترى الان' icon={<ShoppingBag />} />
                        <div className=' w-fit ml-auto  flex items-center gap-[10px] '>
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
        </div>
    );
}
