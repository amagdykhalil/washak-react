'use client';
import Breadcrumb from'@/components/atoms/Breadcrumb';
import Button from'@/components/atoms/Button';
import Title from'@/components/atoms/Title';
import FeatureList from'@/components/molecules/FeatureList';

export default function page() {

    const breadcrumbRoutes = [{ label: 'الرئيسية', href: '/' }, { label: 'اكمال الطلب' }];

    return (
        <div className='bg-[#f8fafb]  '>
            <Breadcrumb cn=' !mt-0  !pt-[30px] container' routes={breadcrumbRoutes} />
            <div className='container max-md:!px-[15px] '>
                <div className=' text-right text-gray-800 '>
                    {/* Success Message */}
                    <div className='rounded-lg border  border-[var(--border-bg)] text-center space-y-2 bg-white min-h-[40vh] flex items-center justify-center flex-col gap-[10px] mb-[20px] '>
                        <h2 className='text-2xl max-md:text-xl text-[#404145]  font-semibold'>
                            تم إتمام طلبك <span className='text-[var(--second)]'>بنجاح !</span>
                        </h2>
                        <p className='text-base text-[#768497] max-w-[320px] w-full  '>تم استلام طلبك و سنتواصل معك في أقرب فرصة. يرجى الانتظار لحين تلقي مكالمتنا.</p>
                        <Button name={'استكمال التسوق'} href={'/products'} cn={' !w-fit !px-[100px] !mx-auto '} />
                    </div>

                    <div className='grid md:grid-cols-3 gap-6'>
                        <div className=' md:col-span-2  gap-6 flex flex-col   ' >
                            {/* Product Info */}
                            <div className='bg-white border  border-[var(--border-bg)] p-4 rounded-lg'>
                                <Title cn=' !mb-[20px]   border-b border-b-[var(--border-bg)] pb-2' title1='بيانات' title2='المنتجات' />

                                {[1, 2].map((_, i) => (
                                    <div key={i} className='flex items-center mt-4 max-md:gap-[10px] gap-[30px]'>
                                        <img
                                            src={`/products/product/${5+i}.png`} // replace with actual product image URL
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

                            {/* Order Summary */}
                            <div className='bg-white border  border-[var(--border-bg)] p-4 rounded-lg space-y-2'>
                                <Title cn='border-b !mb-[20px] border-b-[var(--border-bg)] pb-2' title1='بيانات ' title2='التوصيل' />

                                <div className='text-base text-[#838BA1] flex justify-between'> <span> اسم العميل </span> <span className='text-[#A6AFB9] text-sm '> يسرا محمد</span> </div>
                                <div className='text-base text-[#838BA1] flex justify-between'> <span> رقم الجوال </span> <span className='text-[#A6AFB9] text-sm '> +201007766559</span> </div>
                                <div className='text-base text-[#838BA1] flex justify-between'> <span> البريد الالكتروني </span> <span className='text-[#A6AFB9] text-sm '> yosra@gmail.com</span> </div>
                                <div className='text-base text-[#838BA1] flex justify-between'> <span> الدولة </span> <span className='text-[#A6AFB9] text-sm '> السعودية</span> </div>
                                <div className='text-base text-[#838BA1] flex justify-between'> <span> المدينة </span> <span className='text-[#A6AFB9] text-sm '> الدمام</span> </div>
                                <div className='text-base text-[#838BA1] flex justify-between'> <span> العنوان </span> <span className='text-[#A6AFB9] text-sm '> شارع ال سعود</span> </div>
                                <div className='text-base text-[#838BA1] flex justify-between'> <span> بيانات الدفع </span> <span className='text-[#A6AFB9] text-sm '> COD</span> </div>
                                

                              
                            </div>
                        </div>

                        {/* Shipping Info */}
                        <div className='bg-white border  border-[var(--border-bg)] p-4 rounded-lg space-y-2'>
                                <Title cn='border-b !mb-[20px] border-b-[var(--border-bg)] pb-2' title1='ملخص' title2='الطلب' />
                                <div className=' !mt-[20px] text-base text-[#838BA1] flex justify-between'> <span> عدد المنتجات </span> <span className='text-[var(--second)] text-sm '> 2 منتج</span> </div>
                                <div className=' !mt-[20px] text-base text-[#838BA1] flex justify-between'> <span> اجمالى المنتجات </span> <span className='text-[var(--main)] text-sm '> 180 ر.س</span> </div>
                                <div className=' !mt-[20px] text-base text-[#838BA1] flex justify-between'> <span> المبلغ المستحق </span> <span className='text-[var(--main)] text-sm '> 185 ر.س</span> </div>
                                <div className=' !mt-[20px] text-base text-[#838BA1] flex justify-between'> <span> تكلفة الشحن </span> <span className='text-[var(--main)] text-sm '> 15ر.س</span> </div>
                                <div className=' !mt-[20px] text-base text-[var(--second)] flex justify-between'> <span> المبلغ الاجمالى </span> <span className='text-[var(--second)] text-sm '> 200 ر.س</span> </div>
                            </div>
                    </div>
                </div>
            </div>

            <FeatureList />
        </div>
    );
}
