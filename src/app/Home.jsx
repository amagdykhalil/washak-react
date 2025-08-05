'use client';
import { useApiGet } from '../config/Api';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay, EffectCreative, EffectFade } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-creative';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart } from 'lucide-react';
import Img from '../components/atoms/Image';
import { addToCart } from '../hooks/hookCart';
import HeadTitle from '../components/atoms/HeadTitle.jsx';
import { PriceBlock } from '../components/atoms/PriceCurrency.jsx';
import Button from '../components/atoms/Button.jsx';

export default function Home() {
  const { data, loading } = useApiGet('/get-store-home-sections');
  const sortedSections = data?.data?.sections?.sort((a, b) => a.sort_order - b.sort_order) || [];

  return (
    <div className='pt-[30px] max-sm:!pt-[10px] flex flex-col   min-h-screen '>
      {sortedSections.map(section => {
        switch (section.section) {
          case 'Slider_Section':
            return (
              <div className='pb-8 md:pb-12' style={{ background: section.sort_order % 2 == 0 ? '#fff' : '#f9fafb', order: section.sort_order }}>
                <BannerSlider key={section.id} order={section.sort_order} loading={loading} data={section.data} />
              </div>
            );
          case 'Banners_Section':
            return (
              <div className=' py-8 md:py-16  ' style={{ background: section.sort_order % 2 == 0 ? '#fff' : '#f9fafb', order: section.sort_order }}>
                <BannerSection key={section.id} order={section.sort_order} loading={loading} data={section.data} />
              </div>
            );
          case 'Dynamic_Products':
            return (
              <div className=' py-8 md:py-16  ' style={{ background: section.sort_order % 2 == 0 ? '#fff' : '#f9fafb', order: section.sort_order }}>
                <ProductSection key={section.id} sectionData={section} loading={loading} />
              </div>
            );
          case 'Product_List':
            return (
              <div className=' py-8 md:py-16  ' style={{ background: section.sort_order % 2 == 0 ? '#fff' : '#f9fafb', order: section.sort_order }}>
                <ProductSection key={section.id} sectionData={section} loading={loading} />
              </div>
            );
          case 'Categories':
            return (
              <div className=' py-8 md:py-16  ' style={{ background: section.sort_order % 2 == 0 ? '#fff' : '#f9fafb', order: section.sort_order }}>
                <CategoryList key={section.id} order={section.sort_order} Categories={section.data} loading={loading} />
              </div>
            );
          case 'Content_With_Icon':
            return (
              <div className=' py-8 md:py-16  ' style={{ background: section.sort_order % 2 == 0 ? '#fff' : '#f9fafb', order: section.sort_order }}>
                <FeatureList key={section.id} order={section.sort_order} data={section.data} loading={loading} />
              </div>
            );
          case 'Map_Section':
            return (
              <div className=' py-8 md:py-16  ' style={{ background: section.sort_order % 2 == 0 ? '#fff' : '#f9fafb', order: section.sort_order }}>
                <MapSection key={section.id} order={section.sort_order} data={section.data} loading={loading} />
              </div>
            );
          case 'Html_Content':
            return (
              <div className=' py-8 md:py-16  ' style={{ background: section.sort_order % 2 == 0 ? '#fff' : '#f9fafb', order: section.sort_order }}>
                <HtmlContentSection key={section.id} order={section.sort_order} data={section.data} loading={loading} />
              </div>
            );
          default:
            return null;
        }
      })}
    </div>
  );
}

// Banner Slider Component
export function BannerSlider({ data, order, loading = true }) {
  const SkeletonBanner = () => <div className='w-full max-md:!h-[230px] !h-[400px] skeleton' />;

  return (
    <div className={`container max-sm:!px-[10px]`} style={{ order }}>
      {loading ? (
        <SkeletonBanner />
      ) : data?.images?.length > 0 ? (
        <Swiper
          loop={true}
          autoplay={{
            delay: 4000,
            disableOnInteraction: false,
          }}
          effect='fade'
          speed={1000}
          pagination={{ clickable: true }}
          modules={[Autoplay, Pagination, EffectFade]}
          className='w-full h-[400px] max-md:h-[240px]'>
          {data?.images.map((src, i) => (
            <SwiperSlide key={i}>
              <Img className='bg-gray-200 rounded-[20px] w-full h-full object-cover' src={src?.image} alt={`Banner ${i + 1}`} width={1500} height={500} />
            </SwiperSlide>
          ))}
        </Swiper>
      ) : null}
    </div>
  );
}

// Banner Section Component (for Banners_Section)
export function BannerSection({ data, order, loading = true }) {
  const SkeletonBanner = () => <div className='h-[400px] rounded-lg skeleton' />;

  return (
    <div className='container max-sm:!px-[10px]' style={{ order }}>
      {loading ? (
        <SkeletonBanner />
      ) : data?.images?.length > 0 ? (
        <Swiper
          loop={true}
          autoplay={{
            delay: 4000,
            disableOnInteraction: false,
          }}
          speed={1000}
          slidesPerView={1}
          pagination={{ clickable: true }}
          modules={[Autoplay, Pagination]}
          className='w-full h-[400px] rounded-lg overflow-hidden'>
          {data.images.map((banner, i) => (
            <SwiperSlide key={i}>
              <Img src={banner.image} alt={`Banner ${i}`} className='w-full h-full object-cover rounded-lg' width={600} height={200} />
            </SwiperSlide>
          ))}
        </Swiper>
      ) : null}
    </div>
  );
}

// Product Section Component (handles both Dynamic_Products and Product_List)
export function ProductSection({ sectionData, loading = true }) {
  const { section_info, products } = sectionData.data || {};
  const isSlider = section_info?.view_type === 'Slider';
  const isGrid = section_info?.view_type === 'Grid';

  const [slidesPerView, setSlidesPerView] = useState(4);

  useEffect(() => {
    const updateSlidesPerView = () => {
      const width = window.innerWidth;
      if (width >= 1400) setSlidesPerView(5);
      else if (width >= 1200) setSlidesPerView(4); // Fixed condition
      else if (width >= 950) setSlidesPerView(3);
      else if (width >= 650) setSlidesPerView(2);
      else setSlidesPerView(1);
    };

    updateSlidesPerView();
    window.addEventListener('resize', updateSlidesPerView);
    return () => window.removeEventListener('resize', updateSlidesPerView);
  }, []);

  const sliderConfig = {
    spaceBetween: 10,
    loop: true,
    speed: 1000,
    slidesPerView: slidesPerView,
    slideToClickedSlide: true,
    modules: [Navigation, Autoplay, Pagination],
    navigation: {
      prevEl: '.custom-prev',
      nextEl: '.custom-next',
    },
    pagination: {
      clickable: true,
    },
    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
    },
  };

  const SkeletonCard = () => (
    <div className='animate-pulse flex-1 group shadow-sm border border-[#EEEEEE] bg-white rounded-lg px-3'>
      <div className='bg-gray-200 h-[230px] rounded mb-4' />
      <div className='h-3 bg-gray-200 rounded w-1/3 mx-auto mb-2' />
      <div className='h-4 bg-gray-200 rounded w-1/2 mx-auto mb-4' />
      <div className='flex justify-center gap-2 mb-4'>
        <div className='h-4 bg-gray-200 rounded w-1/4' />
        <div className='h-4 bg-gray-200 rounded w-1/6' />
      </div>
      <div className='h-8 bg-gray-200 rounded w-full' />
    </div>
  );

  const ProductCard = ({ product }) => (
    <div className='group product-item shadow-sm border border-[#EEEEEE] relative bg-white text-black rounded-lg p-3 h-full'>
      <div className='img-switcher-2 relative   '>
        {product.discount_percentage && <span className='absolute shadow-xl top-[5px] left-[5px] z-[10] text-[10px] bg-[var(--second)] text-white px-[10px] py-[5px] rounded-[6px]'>خصم {product.discount_percentage}%</span>}
        <Img id={`mainImage-${product.id}`} src={product.images?.[0]?.cdn_url} alt={product.title} className='base w-full h-full  object-contain' />
        <Img src={product.images?.[1]?.cdn_url} alt={product.title} className='overlay w-full h-full  object-contain' />
      </div>

      <span className='bg-[#F8F8F9] text-[#A0A9BB] px-[20px] py-[8px] shadow-sm w-fit text-[10px] rounded-[10px] my-[15px] block mx-auto'>{product.category}</span>

      <span className='text-center w-full block text-[var(--black-1)] text-base my-[10px] overflow-hidden text-ellipsis whitespace-nowrap' title={product.title}>
        {product.title}
      </span>

      <PriceBlock originalPrice={product?.price?.regular} salePrice={product?.price?.current} ar />

      <div className='flex items-center justify-between mt-[20px] gap-2'>
        <Link to={`/product/${product.slug}`} className='btn-blue flex-1 text-center py-2 rounded-md'>
          شراء الان
          <img src='/icons/buy.png' alt='' width={20} height={20} />
        </Link>

        <button onClick={() => addToCart(product, `mainImage-${product.id}`)} className='h-[40px] w-[40px] flex items-center justify-center bg-[var(--second)] hover:scale-[0.9] hover:opacity-90 duration-300 text-white p-2 rounded-md transition-all shadow-md' title='أضف إلى السلة'>
          <ShoppingCart size={18} />
        </button>
      </div>
    </div>
  );
  const [visibleCount, setVisibleCount] = useState(4); // عرض 4 منتجات في البداية

  const loadMore = () => {
    setVisibleCount(prevCount => prevCount + 4);
  };
  return (
    <div className='relative max-sm:!px-[20px]' style={{ order: sectionData.sort_order }}>
      <div className='container'>
        <div className='relative'>
          <HeadTitle desc={section_info?.sub_titile} title={section_info?.title} />

          {loading ? (
            <div className='flex flex-nowrap overflow-x-hidden gap-4 py-[50px] px-[20px]'>
              {Array(isSlider ? slidesPerView : 4)
                .fill(0)
                .map((_, i) => (
                  <SkeletonCard key={i} />
                ))}
            </div>
          ) : products?.length > 0 ? (
            <>
              {isSlider && (
                <div className='relative'>
                  <Swiper {...sliderConfig} className='!py-[50px] md:!px-[5px]'>
                    {products.map(product => (
                      <SwiperSlide key={product.id}>
                        <ProductCard product={product} />
                      </SwiperSlide>
                    ))}
                    <div className='swiper-pagination !mt-6' />
                  </Swiper>

                  {products.length > slidesPerView && (
                    <>
                      <button className='max-sm:hidden bg-[var(--main)] hover:bg-[var(--hover-main)] hover:scale-[1.1] custom-prev w-[35px] h-[35px] rounded-full flex items-center justify-center absolute left-2 top-1/2 transform -translate-y-1/2 z-10 transition-colors'>
                        <svg width='15' height='9' viewBox='0 0 15 9' fill='none' xmlns='http://www.w3.org/2000/svg'>
                          <path d='M4.71592 0.920471L1.13637 4.50002M1.13637 4.50002L4.71592 8.07956M1.13637 4.50002H13.8636' stroke='#fff' strokeWidth='1.5' strokeLinecap='round' strokeLinejoin='round' />
                        </svg>
                      </button>
                      <button className='max-sm:hidden bg-[var(--main)] hover:bg-[var(--hover-main)] hover:scale-[1.1] custom-next w-[35px] h-[35px] rounded-full flex items-center justify-center absolute right-2 top-1/2 transform -translate-y-1/2 z-10 transition-colors'>
                        <svg width='15' height='9' viewBox='0 0 15 9' fill='none' xmlns='http://www.w3.org/2000/svg'>
                          <path d='M10.284 0.920471L13.8635 4.50002M13.8635 4.50002L10.284 8.07956M13.8635 4.50002H1.13623' stroke='white' strokeWidth='1.5' strokeLinecap='round' strokeLinejoin='round' />
                        </svg>
                      </button>
                    </>
                  )}
                </div>
              )}

              {isGrid && (
                <>
                  <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6 py-[50px]'>
                    {products.slice(0, visibleCount).map(product => (
                      <ProductCard key={product.id} product={product} />
                    ))}
                  </div>
                  {visibleCount < products.length && (
                    <div className='flex justify-center py-4'>
                      <Button name='عرض المزيد' onclick={loadMore} cn='!px-8' />
                    </div>
                  )}
                </>
              )}
            </>
          ) : (
            <div className='py-12 text-center text-gray-500'>لا توجد منتجات متاحة حالياً</div>
          )}
        </div>
      </div>
    </div>
  );
}

// Category List Component
export const CategoryList = ({ Categories, order, loading = true }) => {
  return (
    <div className='container flex flex-col gap-12' style={{ order }}>
      {/* العنوان */}
      {loading ? <div className='skeleton w-[150px] h-6 mx-auto rounded-md' /> : <HeadTitle title={Categories?.section_info?.title} desc={Categories?.section_info?.sub_titile} />}

      {/* القائمة أو الـ Skeleton */}
      {loading ? (
        <div className='flex flex-wrap justify-center gap-6'>
          {Array(5)
            .fill(0)
            .map((_, i) => (
              <div key={i} className='flex flex-col items-center gap-3'>
                <div className='skeleton w-[180px] h-[110px] rounded-md' />
                <div className='skeleton w-[100px] h-4 rounded-md' />
              </div>
            ))}
        </div>
      ) : Categories?.categories?.length > 0 ? (
        <div className='flex flex-wrap justify-center gap-4 md:gap-6 xl:gap-8'>
          {Categories.categories.map((category, i) => (
            <Link to={`${category.slug}`} key={i} className='  w-[160px] flex flex-col items-center transition-transform duration-300 hover:scale-105 group'>
              <div className='overflow-hidden w-full h-[110px] shadow-inner p-2 rounded-lg border border-gray-200 '>
                <Img src={category.image_url} alt={category.name} width={160} height={110} className='w-full h-full object-cover rounded-md transition-transform duration-500 group-hover:scale-110' />
              </div>
              <span className='mt-4 text-sm text-center text-gray-700 group-hover:text-primary transition-colors duration-300'>{category.name}</span>
            </Link>
          ))}
        </div>
      ) : (
        <div className='py-12 text-center text-gray-500'>لا توجد تصنيفات متاحة حالياً</div>
      )}
    </div>
  );
};

// Feature List Component
export function FeatureList({ order, data, loading = true }) {
  const renderSkeleton = () => (
    <div className='container grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6'>
      {[...Array(4)].map((_, idx) => (
        <div key={idx} className='flex flex-col items-center text-center p-4'>
          <div className='!w-[50px] !h-[50px] mb-4 bg-gray-300 rounded-full skeleton'></div>
          <div className='!w-24 !h-4 bg-gray-300 rounded mb-2 skeleton'></div>
          <div className='!w-32 !h-3 bg-gray-200 rounded skeleton'></div>
        </div>
      ))}
    </div>
  );

  return (
    <div style={{ order }}>
      {loading ? (
        renderSkeleton()
      ) : data?.icons?.length > 0 ? (
        <div className='container grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6'>
          {data.icons.map((feature, idx) => (
            <div key={idx} className='flex flex-col items-center text-center p-4'>
              <i className={`fas ${feature.icon_name} text-4xl text-[var(--main)] mb-[20px]`}></i>
              <h3 className='text-lg font-semibold text-[#252A50] mb-1'>{feature.title}</h3>
              <p className='text-[#77839D] text-sm'>{feature.sub_title || 'وصف'}</p>
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
}

// Map Section Component
export function MapSection({ order, data, loading = true }) {
  const [mapError, setMapError] = useState(false);

  return (
    <div>
      <div className='container '>
        {loading ? (
          <div className='skeleton h-[400px] rounded-xl' />
        ) : data ? (
          <div className='py-8 px-4 md:px-8 lg:px-20 rounded-xl'>
            <div className='max-w-6xl mx-auto text-center'>
              <h2 className='text-2xl md:text-3xl font-bold text-gray-800 mb-3'>{data.title}</h2>
              <p className='text-gray-600 mb-8'>{data.sub_titile}</p>

              {/* حالة الخطأ */}
              {mapError ? (
                <div className='w-full h-[400px] flex items-center justify-center bg-red-50 border border-red-200 rounded-xl shadow'>
                  <p className='text-red-600 text-lg font-medium'>⚠️ لا يمكن عرض الخريطة حالياً. يرجى من مسؤول المتجر التأكد من صلاحية Google Maps API Key.</p>
                </div>
              ) : (
                <div className='w-full h-[400px] rounded-xl overflow-hidden shadow-lg border border-gray-200'>
                  {/* <iframe width='100%' height='100%' style={{ border: 0 }} loading='lazy' allowFullScreen referrerPolicy='no-referrer-when-downgrade' src={`https://www.google.com/maps/embed/v1/place?key=YOUR_API_KEY&zoom=14&q=${data.map_latitude},${data.map_longitude}`} onError={() => setMapError(true)}></iframe> */}

                  <iframe width='100%' height='100%' style={{ border: 0 }} className='w-full h-full rounded-lg border-0' src={`https://maps.google.com/maps?q=${data.map_latitude},${data.map_longitude}&z=15&output=embed`} onError={() => setMapError(true)} allowFullScreen loading='lazy' />
                </div>
              )}
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}

// HTML Content Section Component
export function HtmlContentSection({ data, loading = true }) {
  let html = '';

  if (!loading && data?.description) {
    try {
      // فك ترميز HTML
      const decoded = decodeHtml(data.description);
      html = decoded;
    } catch (error) {
      console.error('فشل في فك تشفير HTML:', error);
    }
  }

  return <div className='container '>{loading ? <div className='skeleton !h-[200px] rounded-xl' /> : html ? <div className='prose max-w-none prose-img:rounded-xl prose-h2:text-2xl prose-p:text-gray-700' dangerouslySetInnerHTML={{ __html: html }} /> : null}</div>;
}

// الدالة المساعدة لفك ترميز HTML
function decodeHtml(html) {
  const txt = document.createElement('textarea');
  txt.innerHTML = html;
  return txt.value;
}
