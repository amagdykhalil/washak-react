'use client';

import FeatureList from '../components/molecules/FeatureList';
import ProductSkeleton from '../components/skeleton/ProductSkeleton';
import { useEffect, useState } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';
import Breadcrumb from '../components/atoms/Breadcrumb';
import { Link } from 'react-router-dom';

export default function Products() {
    const loading = false;
    const [active, setActive] = useState('all');
    const [currentPage, setCurrentPage] = useState(1);
    const limit = 12;

    const categories = [
        { key: 'all', label: 'جميع المنتجات' },
        { key: 'kitchen', label: 'مستلزمات المطبخ' },
        { key: 'personal', label: 'العناية الشخصية' },
        { key: 'home', label: 'منتجات منزلية' },
    ];

    const products = {
        currency: 'ج.م',
        btnName: 'شراء الان',
        btnIcon: '/icons/buy.png',
        title1: 'المنتجات الاكثر ',
        title2: 'مبيعاً',

        data: [
            {
                id: '1',
                image: '/products/1.png',
                secondImage: '/products/2.png',
                discountLabel: 'خصم 10%',
                cta: 'مستلزمات المطبخ',
                type: 'kitchen',
                title: 'وصلة الحنفية المتحركة',
                originalPrice: '370 ',
                salePrice: '299 ',
            },
            {
                id: '2',
                image: '/products/3.png',
                secondImage: '/products/4.png',
                cta: 'العناية الشخصية',
                type: 'personal',
                title: 'فرشاة أسنان كهربائية',
                originalPrice: '450 ',
                salePrice: '382 ',
            },
            {
                id: '3',
                image: '/products/5.png',
                secondImage: '/products/6.png',
                discountLabel: 'جديد',
                cta: 'منتجات منزلية',
                type: 'home',
                title: 'موزع صابون أوتوماتيكي',
                originalPrice: '220 ',
                salePrice: '220 ',
            },
            {
                id: '4',
                image: '/products/7.png',
                secondImage: '/products/8.png',
                discountLabel: 'خصم 20%',
                cta: 'مستلزمات المطبخ',
                type: 'kitchen',
                title: 'سكاكين مطبخ من الستانلس ستيل',
                originalPrice: '800 ',
                salePrice: '640 ',
            },
            {
                id: '5',
                image: '/products/9.png',
                secondImage: '/products/10.png',
                cta: 'منتجات منزلية',
                type: 'home',
                title: 'طقم فناجين قهوة سيراميك',
                originalPrice: '150 ',
                salePrice: '120 ',
            },
            {
                id: '6',
                image: '/products/11.png',
                secondImage: '/products/12.png',
                cta: 'العناية الشخصية',
                type: 'personal',
                title: 'مجفف شعر احترافي',
                originalPrice: '1,200 ',
                salePrice: '1,200 ',
            },
            {
                id: '7',
                image: '/products/1.png',
                secondImage: '/products/2.png',
                discountLabel: 'خصم 10%',
                cta: 'مستلزمات المطبخ',
                type: 'kitchen',
                title: 'وصلة الحنفية المتحركة',
                originalPrice: '370 ',
                salePrice: '299 ',
            },
            {
                id: '8',
                image: '/products/3.png',
                secondImage: '/products/4.png',
                cta: 'العناية الشخصية',
                type: 'personal',
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
                type: 'home',
                title: 'موزع صابون أوتوماتيكي',
                originalPrice: '220 ',
                salePrice: '220 ',
            },
            {
                id: '10',
                image: '/products/7.png',
                secondImage: '/products/8.png',
                discountLabel: 'خصم 20%',
                cta: 'مستلزمات المطبخ',
                type: 'kitchen',
                title: 'سكاكين مطبخ من الستانلس ستيل',
                originalPrice: '800 ',
                salePrice: '640 ',
            },
            {
                id: '11',
                image: '/products/9.png',
                secondImage: '/products/10.png',
                cta: 'منتجات منزلية',
                type: 'home',
                title: 'طقم فناجين قهوة سيراميك',
                originalPrice: '150 ',
                salePrice: '120 ',
            },
            {
                id: '12',
                image: '/products/11.png',
                secondImage: '/products/12.png',
                cta: 'العناية الشخصية',
                type: 'personal',
                title: 'مجفف شعر احترافي',
                originalPrice: '1,200 ',
                salePrice: '1,200 ',
            },
            {
                id: '13',
                image: '/products/1.png',
                secondImage: '/products/2.png',
                discountLabel: 'خصم 10%',
                cta: 'مستلزمات المطبخ',
                type: 'kitchen',
                title: 'وصلة الحنفية المتحركة',
                originalPrice: '370 ',
                salePrice: '299 ',
            },
            {
                id: '14',
                image: '/products/3.png',
                secondImage: '/products/4.png',
                cta: 'العناية الشخصية',
                type: 'personal',
                title: 'فرشاة أسنان كهربائية',
                originalPrice: '450 ',
                salePrice: '382 ',
            },
            {
                id: '15',
                image: '/products/5.png',
                secondImage: '/products/6.png',
                discountLabel: 'جديد',
                cta: 'منتجات منزلية',
                type: 'home',
                title: 'موزع صابون أوتوماتيكي',
                originalPrice: '220 ',
                salePrice: '220 ',
            },
            {
                id: '16',
                image: '/products/7.png',
                secondImage: '/products/8.png',
                discountLabel: 'خصم 20%',
                cta: 'مستلزمات المطبخ',
                type: 'kitchen',
                title: 'سكاكين مطبخ من الستانلس ستيل',
                originalPrice: '800 ',
                salePrice: '640 ',
            },
            {
                id: '17',
                image: '/products/9.png',
                secondImage: '/products/10.png',
                cta: 'منتجات منزلية',
                type: 'home',
                title: 'طقم فناجين قهوة سيراميك',
                originalPrice: '150 ',
                salePrice: '120 ',
            },
            {
                id: '18',
                image: '/products/11.png',
                secondImage: '/products/12.png',
                cta: 'العناية الشخصية',
                type: 'personal',
                title: 'مجفف شعر احترافي',
                originalPrice: '1,200 ',
                salePrice: '1,200 ',
            },
            {
                id: '19',
                image: '/products/1.png',
                secondImage: '/products/2.png',
                discountLabel: 'خصم 10%',
                cta: 'مستلزمات المطبخ',
                type: 'kitchen',
                title: 'وصلة الحنفية المتحركة',
                originalPrice: '370 ',
                salePrice: '299 ',
            },
            {
                id: '20',
                image: '/products/3.png',
                secondImage: '/products/4.png',
                cta: 'العناية الشخصية',
                type: 'personal',
                title: 'فرشاة أسنان كهربائية',
                originalPrice: '450 ',
                salePrice: '382 ',
            },
            {
                id: '21',
                image: '/products/5.png',
                secondImage: '/products/6.png',
                discountLabel: 'جديد',
                cta: 'منتجات منزلية',
                type: 'home',
                title: 'موزع صابون أوتوماتيكي',
                originalPrice: '220 ',
                salePrice: '220 ',
            },
            {
                id: '22',
                image: '/products/7.png',
                secondImage: '/products/8.png',
                discountLabel: 'خصم 20%',
                cta: 'مستلزمات المطبخ',
                type: 'kitchen',
                title: 'سكاكين مطبخ من الستانلس ستيل',
                originalPrice: '800 ',
                salePrice: '640 ',
            },
            {
                id: '23',
                image: '/products/9.png',
                secondImage: '/products/10.png',
                cta: 'منتجات منزلية',
                type: 'home',
                title: 'طقم فناجين قهوة سيراميك',
                originalPrice: '150 ',
                salePrice: '120 ',
            },
            {
                id: '24',
                image: '/products/11.png',
                secondImage: '/products/12.png',
                cta: 'العناية الشخصية',
                type: 'personal',
                title: 'مجفف شعر احترافي',
                originalPrice: '1,200 ',
                salePrice: '1,200 ',
            },
            {
                id: '25',
                image: '/products/1.png',
                secondImage: '/products/2.png',
                discountLabel: 'خصم 10%',
                cta: 'مستلزمات المطبخ',
                type: 'kitchen',
                title: 'وصلة الحنفية المتحركة',
                originalPrice: '370 ',
                salePrice: '299 ',
            },
            {
                id: '26',
                image: '/products/3.png',
                secondImage: '/products/4.png',
                cta: 'العناية الشخصية',
                type: 'personal',
                title: 'فرشاة أسنان كهربائية',
                originalPrice: '450 ',
                salePrice: '382 ',
            },
            {
                id: '27',
                image: '/products/5.png',
                secondImage: '/products/6.png',
                discountLabel: 'جديد',
                cta: 'منتجات منزلية',
                type: 'home',
                title: 'موزع صابون أوتوماتيكي',
                originalPrice: '220 ',
                salePrice: '220 ',
            },
            {
                id: '28',
                image: '/products/7.png',
                secondImage: '/products/8.png',
                discountLabel: 'خصم 20%',
                cta: 'مستلزمات المطبخ',
                type: 'kitchen',
                title: 'سكاكين مطبخ من الستانلس ستيل',
                originalPrice: '800 ',
                salePrice: '640 ',
            },
            {
                id: '29',
                image: '/products/9.png',
                secondImage: '/products/10.png',
                cta: 'منتجات منزلية',
                type: 'home',
                title: 'طقم فناجين قهوة سيراميك',
                originalPrice: '150 ',
                salePrice: '120 ',
            },
            {
                id: '30',
                image: '/products/11.png',
                secondImage: '/products/12.png',
                cta: 'العناية الشخصية',
                type: 'personal',
                title: 'مجفف شعر احترافي',
                originalPrice: '1,200 ',
                salePrice: '1,200 ',
            },
        ],
    };

    const [searchParams] = useSearchParams();
    const category = searchParams.get('category') || 'all';

    useEffect(() => {
        if (category == 'home-products') setActive('home');
        if (category == 'personal-care') setActive('personal');
        if (category == 'kitchen-supplies') setActive('kitchen');
    }, [category]);

    const filteredData = active === 'all' ? products.data : products.data.filter(p => p.type.includes(active) || p.type.toLowerCase().includes(active));

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

    const breadcrumbRoutes = [
        { label: 'الرئيسية', href: '/' },
        { label: 'جميع المنتجات' }, // last item, no link
    ];

    return (
        <div className='bg-[#f8fafb]'>
            <div className='container max-sm:!px-[20px] py-[30px]'>
                <div className=' py-6 space-y-4'>
                    <div data-aos='fade-up' className='flex flex-wrap gap-3'>
                        {categories.map(cat => (
                            <button
                                key={cat.key}
                                onClick={() => {
                                    setActive(cat.key);
                                    setCurrentPage(1);
                                }}
                                className={`px-4 py-2 hover:bg-[var(--main)] hover:border-transparent hover:text-white min-h-[45px] hover:scale-[1.05] duration-300 rounded-full text-sm font-medium transition-all ${active === cat.key ? 'bg-[var(--main)] text-white scale-[1.1]' : 'bg-white text-[#58749A] border border-[#EEF0F7]'}`}>
                                {' '}
                                {cat.label}{' '}
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
                                      <img src={p.image} alt={p.title} className='base' />
                                      <img src={p.secondImage} alt={p.title} className='overlay' />
                                  </div>
                                  <span className='bg-[#F8F8F9] text-[#A0A9BB] px-[20px] py-[5px] shadow-sm w-fit text-[10px] rounded-[10px] my-[10px] block mx-auto'>{p.cta}</span>
                                  <span className='text-center w-full block text-[var(--black-1)] text-base my-[10px]'>{p.title}</span>
                                  <div className='flex items-center justify-center gap-[10px]'>
                                      <span className='text-[var(--second)] text-[15px]'>
                                          {p.salePrice} {products.currency}
                                      </span>
                                      <span className='text-[var(--black-4)] text-[12px] line-through'>
                                          {p.originalPrice} {products.currency}
                                      </span>
                                  </div>
                                  <Link to={`/product/${p.slug }`} className='btn-blue w-[calc(100%-30px)] mx-auto mt-[20px]'>
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
                                        {' '}
                                        {item}{' '}
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
