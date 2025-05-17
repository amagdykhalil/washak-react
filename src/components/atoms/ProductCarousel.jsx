import React, { useEffect, useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay, EffectSlide } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Link } from 'react-router-dom';
import HeadTitle from './HeadTitle';


export const ProductsData = {
    "section_info": {
        "id": 948,
        "section_id": 4351,
        "title": "\u0627\u0644\u0645\u0646\u062a\u062c\u0627\u062a \u0627\u0644\u0627\u0643\u062b\u0631 \u0645\u0628\u064a\u0639\u0627\u064b",
        "sub_titile": null,
        "product_limit": 0,
        "view_type": "Slider",
        "scroll_type": "Auto",
        "title_color": "#000000",
        "section_color": "#ffffff",
        "sub_title_color": "#000000",
        "created_at": "1970-01-01T00:33:45.000000Z",
        "updated_at": "1970-01-01T00:33:45.000000Z"
    },
    "products": [
        {
            "id": 3845,
            "title": "2 \u0645\u062c\u0645\u0648\u0639\u0629 \u062d\u0628\u0627\u0644 \u0627\u0644\u0645\u0642\u0627\u0648\u0645\u0629",
            "slug": "mgmoaa-hbal-almkaom",
            "discount_percentage": 40,
            "price": {
                "current": "$ 310",
                "regular": "$ 520",
                "starting_date": "2023-08-22"
            },
            "category": "\u0645\u0646\u062a\u062c\u0627\u062a \u0645\u0646\u0632\u0644\u064a\u0629",
            "images": [
                {
                    "url": "\/uploads\/647\/23\/05\/comp_6453eaaf28aa60405231683221167medium.webp",
                    "cdn_url": "https:\/\/cdn.washak.net\/uploads\/647\/23\/05\/comp_6453eaaf28aa60405231683221167medium.webp"
                },
                {
                    "url": "\/uploads\/647\/23\/05\/comp_6453eaae5b86d0405231683221166medium.webp",
                    "cdn_url": "https:\/\/cdn.washak.net\/uploads\/647\/23\/05\/comp_6453eaae5b86d0405231683221166medium.webp"
                },
                {
                    "url": "\/uploads\/647\/23\/05\/comp_6453eab1e0f910405231683221169medium.webp",
                    "cdn_url": "https:\/\/cdn.washak.net\/uploads\/647\/23\/05\/comp_6453eab1e0f910405231683221169medium.webp"
                },
                {
                    "url": "\/uploads\/647\/23\/05\/comp_6453eab3aacbb0405231683221171medium.webp",
                    "cdn_url": "https:\/\/cdn.washak.net\/uploads\/647\/23\/05\/comp_6453eab3aacbb0405231683221171medium.webp"
                },
                {
                    "url": "\/uploads\/647\/23\/05\/comp_6453eab2699a20405231683221170medium.webp",
                    "cdn_url": "https:\/\/cdn.washak.net\/uploads\/647\/23\/05\/comp_6453eab2699a20405231683221170medium.webp"
                }
            ]
        },
        {
            "id": 3846,
            "title": "\u0643\u0631\u0633\u064a \u0647\u0648\u0627\u0626\u064a \u0628\u064a\u0646 \u0628\u0627\u062c \u0644\u0644\u0627\u0633\u062a\u0631\u062e\u0627\u0621 \u0645\u0639 \u0645\u0633\u0646\u062f \u0644\u0644\u0642\u062f\u0645",
            "slug": "krsy-hoayy-byn-bag-llastrkhaaa-maa-msnd-llkdm",
            "discount_percentage": 19,
            "price": {
                "current": "$ 780",
                "regular": "$ 960",
                "starting_date": "2023-08-22"
            },
            "category": "\u0645\u0646\u062a\u062c\u0627\u062a \u0645\u0646\u0632\u0644\u064a\u0629",
            "images": [
                {
                    "url": "\/uploads\/647\/23\/05\/comp_6453f5ad24c3f0405231683223981medium.webp",
                    "cdn_url": "https:\/\/cdn.washak.net\/uploads\/647\/23\/05\/comp_6453f5ad24c3f0405231683223981medium.webp"
                },
                {
                    "url": "\/uploads\/647\/23\/05\/comp_6453f5ad3657f0405231683223981medium.webp",
                    "cdn_url": "https:\/\/cdn.washak.net\/uploads\/647\/23\/05\/comp_6453f5ad3657f0405231683223981medium.webp"
                },
                {
                    "url": "\/uploads\/647\/23\/05\/comp_6453f5ae4a7c50405231683223982medium.webp",
                    "cdn_url": "https:\/\/cdn.washak.net\/uploads\/647\/23\/05\/comp_6453f5ae4a7c50405231683223982medium.webp"
                },
                {
                    "url": "\/uploads\/647\/23\/05\/comp_6453f5ae520e70405231683223982medium.webp",
                    "cdn_url": "https:\/\/cdn.washak.net\/uploads\/647\/23\/05\/comp_6453f5ae520e70405231683223982medium.webp"
                }
            ]
        },
        {
            "id": 3847,
            "title": "\u0645\u0635\u0628\u0627\u062d LED \u0635\u063a\u064a\u0631 \u0645\u062d\u0645\u0648\u0644",
            "slug": "msbah-led-sghyr-mhmol",
            "discount_percentage": 35,
            "price": {
                "current": "$ 268",
                "regular": "$ 412",
                "starting_date": "2023-08-22"
            },
            "category": "\u0645\u0646\u062a\u062c\u0627\u062a \u0645\u0646\u0632\u0644\u064a\u0629",
            "images": [
                {
                    "url": "\/uploads\/647\/23\/05\/comp_6465081a8c2ab1705231684342810medium.webp",
                    "cdn_url": "https:\/\/cdn.washak.net\/uploads\/647\/23\/05\/comp_6465081a8c2ab1705231684342810medium.webp"
                },
                {
                    "url": "\/uploads\/647\/23\/05\/comp_64650822114491705231684342818medium.webp",
                    "cdn_url": "https:\/\/cdn.washak.net\/uploads\/647\/23\/05\/comp_64650822114491705231684342818medium.webp"
                },
                {
                    "url": "\/uploads\/647\/23\/05\/comp_646508225b6421705231684342818medium.webp",
                    "cdn_url": "https:\/\/cdn.washak.net\/uploads\/647\/23\/05\/comp_646508225b6421705231684342818medium.webp"
                },
                {
                    "url": "\/uploads\/647\/23\/05\/comp_64650823062081705231684342819medium.webp",
                    "cdn_url": "https:\/\/cdn.washak.net\/uploads\/647\/23\/05\/comp_64650823062081705231684342819medium.webp"
                },
                {
                    "url": "\/uploads\/647\/23\/05\/comp_64650823925be1705231684342819medium.webp",
                    "cdn_url": "https:\/\/cdn.washak.net\/uploads\/647\/23\/05\/comp_64650823925be1705231684342819medium.webp"
                },
                {
                    "url": "\/uploads\/647\/23\/05\/comp_64650824245011705231684342820medium.webp",
                    "cdn_url": "https:\/\/cdn.washak.net\/uploads\/647\/23\/05\/comp_64650824245011705231684342820medium.webp"
                }
            ]
        },
        {
            "id": 3848,
            "title": "\u0645\u0643\u0628\u0633 \u0627\u0644\u0642\u0637\u0627\u064a\u0641",
            "slug": "mkbs-alktayf",
            "discount_percentage": 30,
            "price": {
                "current": "$ 365",
                "regular": "$ 520",
                "starting_date": "2023-08-22"
            },
            "category": "\u0645\u0633\u062a\u0644\u0632\u0645\u0627\u062a \u0627\u0644\u0645\u0637\u0628\u062e",
            "images": [
                {
                    "url": "\/uploads\/647\/23\/05\/comp_646509c4a1c531705231684343236medium.webp",
                    "cdn_url": "https:\/\/cdn.washak.net\/uploads\/647\/23\/05\/comp_646509c4a1c531705231684343236medium.webp"
                },
                {
                    "url": "\/uploads\/647\/23\/05\/comp_646509d7f2d151705231684343255medium.webp",
                    "cdn_url": "https:\/\/cdn.washak.net\/uploads\/647\/23\/05\/comp_646509d7f2d151705231684343255medium.webp"
                },
                {
                    "url": "\/uploads\/647\/23\/05\/comp_646509d80c9c41705231684343256medium.webp",
                    "cdn_url": "https:\/\/cdn.washak.net\/uploads\/647\/23\/05\/comp_646509d80c9c41705231684343256medium.webp"
                },
                {
                    "url": "\/uploads\/647\/23\/05\/comp_646509d8e198d1705231684343256medium.webp",
                    "cdn_url": "https:\/\/cdn.washak.net\/uploads\/647\/23\/05\/comp_646509d8e198d1705231684343256medium.webp"
                },
                {
                    "url": "\/uploads\/647\/23\/05\/comp_646509d91c7391705231684343257medium.webp",
                    "cdn_url": "https:\/\/cdn.washak.net\/uploads\/647\/23\/05\/comp_646509d91c7391705231684343257medium.webp"
                },
                {
                    "url": "\/uploads\/647\/23\/05\/comp_646509da28eac1705231684343258medium.webp",
                    "cdn_url": "https:\/\/cdn.washak.net\/uploads\/647\/23\/05\/comp_646509da28eac1705231684343258medium.webp"
                }
            ]
        },
        {
            "id": 3849,
            "title": "\u0648\u0635\u0644\u0629 \u0627\u0644\u062d\u0646\u0641\u064a\u0629 \u0627\u0644\u0645\u062a\u062d\u0631\u0643\u0629",
            "slug": "osl-alhnfy-almthrk",
            "discount_percentage": 19,
            "price": {
                "current": "$ 299",
                "regular": "$ 370",
                "starting_date": "2023-08-22"
            },
            "category": "\u0645\u0633\u062a\u0644\u0632\u0645\u0627\u062a \u0627\u0644\u0645\u0637\u0628\u062e",
            "images": [
                {
                    "url": "\/uploads\/647\/23\/05\/comp_64650d27581bd1705231684344103medium.webp",
                    "cdn_url": "https:\/\/cdn.washak.net\/uploads\/647\/23\/05\/comp_64650d27581bd1705231684344103medium.webp"
                },
                {
                    "url": "\/uploads\/647\/23\/05\/comp_64650d275a39e1705231684344103medium.webp",
                    "cdn_url": "https:\/\/cdn.washak.net\/uploads\/647\/23\/05\/comp_64650d275a39e1705231684344103medium.webp"
                },
                {
                    "url": "\/uploads\/647\/23\/05\/comp_64650d28224eb1705231684344104medium.webp",
                    "cdn_url": "https:\/\/cdn.washak.net\/uploads\/647\/23\/05\/comp_64650d28224eb1705231684344104medium.webp"
                },
                {
                    "url": "\/uploads\/647\/23\/05\/comp_64650d28378601705231684344104medium.webp",
                    "cdn_url": "https:\/\/cdn.washak.net\/uploads\/647\/23\/05\/comp_64650d28378601705231684344104medium.webp"
                },
                {
                    "url": "\/uploads\/647\/23\/05\/comp_64650d28f086f1705231684344104medium.webp",
                    "cdn_url": "https:\/\/cdn.washak.net\/uploads\/647\/23\/05\/comp_64650d28f086f1705231684344104medium.webp"
                },
                {
                    "url": "\/uploads\/647\/23\/05\/comp_64650d293f5981705231684344105medium.webp",
                    "cdn_url": "https:\/\/cdn.washak.net\/uploads\/647\/23\/05\/comp_64650d293f5981705231684344105medium.webp"
                }
            ]
        },
        {
            "id": 3850,
            "title": "\u0642\u0637\u0627\u0639\u0647 \u0627\u0644\u062e\u0636\u0627\u0631 5 \u0641\u064a 1",
            "slug": "ktaaah-alkhdar-5-fy-1",
            "discount_percentage": 26,
            "price": {
                "current": "$ 355",
                "regular": "$ 480",
                "starting_date": "2023-08-22"
            },
            "category": "\u0645\u0633\u062a\u0644\u0632\u0645\u0627\u062a \u0627\u0644\u0645\u0637\u0628\u062e",
            "images": [
                {
                    "url": "\/uploads\/647\/23\/05\/comp_64651035756121705231684344885medium.webp",
                    "cdn_url": "https:\/\/cdn.washak.net\/uploads\/647\/23\/05\/comp_64651035756121705231684344885medium.webp"
                },
                {
                    "url": "\/uploads\/647\/23\/05\/comp_646510368a23d1705231684344886medium.webp",
                    "cdn_url": "https:\/\/cdn.washak.net\/uploads\/647\/23\/05\/comp_646510368a23d1705231684344886medium.webp"
                },
                {
                    "url": "\/uploads\/647\/23\/05\/comp_646510380c7291705231684344888medium.webp",
                    "cdn_url": "https:\/\/cdn.washak.net\/uploads\/647\/23\/05\/comp_646510380c7291705231684344888medium.webp"
                },
                {
                    "url": "\/uploads\/647\/23\/05\/comp_6465103722bd81705231684344887medium.webp",
                    "cdn_url": "https:\/\/cdn.washak.net\/uploads\/647\/23\/05\/comp_6465103722bd81705231684344887medium.webp"
                },
                {
                    "url": "\/uploads\/647\/23\/05\/comp_646510396e1761705231684344889medium.webp",
                    "cdn_url": "https:\/\/cdn.washak.net\/uploads\/647\/23\/05\/comp_646510396e1761705231684344889medium.webp"
                },
                {
                    "url": "\/uploads\/647\/23\/05\/comp_64651035952461705231684344885medium.webp",
                    "cdn_url": "https:\/\/cdn.washak.net\/uploads\/647\/23\/05\/comp_64651035952461705231684344885medium.webp"
                }
            ]
        },
        {
            "id": 3851,
            "title": "\u0645\u0643\u0646\u0633\u0629 \u0644\u0627\u0633\u0644\u0643\u064a\u0629 4 \u0641\u064a 1",
            "slug": "mkns-laslky-4-fy-1",
            "discount_percentage": 31,
            "price": {
                "current": "$ 524",
                "regular": "$ 759",
                "starting_date": "2023-08-22"
            },
            "category": "\u0627\u0644\u0639\u0646\u0627\u064a\u0629 \u0627\u0644\u0634\u062e\u0635\u064a\u0629",
            "images": [
                {
                    "url": "\/uploads\/647\/23\/05\/comp_64651103462221705231684345091medium.webp",
                    "cdn_url": "https:\/\/cdn.washak.net\/uploads\/647\/23\/05\/comp_64651103462221705231684345091medium.webp"
                },
                {
                    "url": "\/uploads\/647\/23\/05\/comp_64651111f2f0d1705231684345105medium.webp",
                    "cdn_url": "https:\/\/cdn.washak.net\/uploads\/647\/23\/05\/comp_64651111f2f0d1705231684345105medium.webp"
                },
                {
                    "url": "\/uploads\/647\/23\/05\/comp_64651112088bc1705231684345106medium.webp",
                    "cdn_url": "https:\/\/cdn.washak.net\/uploads\/647\/23\/05\/comp_64651112088bc1705231684345106medium.webp"
                },
                {
                    "url": "\/uploads\/647\/23\/05\/comp_646511138699c1705231684345107medium.webp",
                    "cdn_url": "https:\/\/cdn.washak.net\/uploads\/647\/23\/05\/comp_646511138699c1705231684345107medium.webp"
                },
                {
                    "url": "\/uploads\/647\/23\/05\/comp_64651114094f41705231684345108medium.webp",
                    "cdn_url": "https:\/\/cdn.washak.net\/uploads\/647\/23\/05\/comp_64651114094f41705231684345108medium.webp"
                }
            ]
        },
        {
            "id": 3852,
            "title": "\u0645\u0627\u0643\u064a\u0646\u0629 \u0627\u0644\u062d\u0644\u0627\u0642\u0629 VGR (V-228)",
            "slug": "makyn-alhlak-vgr-v-228",
            "discount_percentage": 38,
            "price": {
                "current": "$ 450",
                "regular": "$ 730",
                "starting_date": "2023-08-22"
            },
            "category": "\u0627\u0644\u0639\u0646\u0627\u064a\u0629 \u0627\u0644\u0634\u062e\u0635\u064a\u0629",
            "images": [
                {
                    "url": "\/uploads\/647\/23\/05\/comp_646513c5dfeec1705231684345797medium.webp",
                    "cdn_url": "https:\/\/cdn.washak.net\/uploads\/647\/23\/05\/comp_646513c5dfeec1705231684345797medium.webp"
                },
                {
                    "url": "\/uploads\/647\/23\/05\/comp_646513c5e98241705231684345797medium.webp",
                    "cdn_url": "https:\/\/cdn.washak.net\/uploads\/647\/23\/05\/comp_646513c5e98241705231684345797medium.webp"
                },
                {
                    "url": "\/uploads\/647\/23\/05\/comp_646513c6dacf81705231684345798medium.webp",
                    "cdn_url": "https:\/\/cdn.washak.net\/uploads\/647\/23\/05\/comp_646513c6dacf81705231684345798medium.webp"
                },
                {
                    "url": "\/uploads\/647\/23\/05\/comp_646513c7275691705231684345799medium.webp",
                    "cdn_url": "https:\/\/cdn.washak.net\/uploads\/647\/23\/05\/comp_646513c7275691705231684345799medium.webp"
                },
                {
                    "url": "\/uploads\/647\/23\/05\/comp_646513c861d591705231684345800medium.webp",
                    "cdn_url": "https:\/\/cdn.washak.net\/uploads\/647\/23\/05\/comp_646513c861d591705231684345800medium.webp"
                }
            ]
        }
    ]
}


export default function ProductCarousel({btnName='شراء الان' , order , btnIcon='/icons/buy.png' , loading , bg , cn , arrowTop , products= ProductsData, delay = 5000 }) {
	const [count, setCount] = useState(4);

	useEffect(() => {
	  const updateCount = () => {
		const width = window.innerWidth;
		if (width >= 1400) setCount(4);
		else if (width >= 950) setCount(3);
		else if (width >= 650) setCount(2);
		else setCount(1);
	  };
  
	  updateCount();
	  window.addEventListener('resize', updateCount);
	  return () => window.removeEventListener('resize', updateCount);
	}, []);


    const config = {
        spaceBetween: 10,
        loop: true,
        speed: 1000,
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
            delay: delay,
            disableOnInteraction: false,
        },
        breakpoints: {
            1400: { slidesPerView: 4 },
            950: { slidesPerView: 3 },
            650: { slidesPerView: 2 },
            0: { slidesPerView: 1 },
        },
    };

    const SkeletonCard = () => (
        <div className=' animate-pulse flex-1 group shadow-sm border border-[#EEEEEE] bg-white rounded-lg p-3'>
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

    const showArrows = products?.products?.length > count;

    return (
        <div className={`relative max-sm:!px-[20px]   `} style={{order : order}} >
        <div className={`container ${cn} `}>
            <div className={`relative ${bg} `} >
                <HeadTitle desc={products?.section_info?.sub_titile} title={products?.section_info?.title} arrowTop={arrowTop} />


            {loading  ? (
                <div className=' flex flex-nowrap overflow-x-hidden gap-4 py-[50px] px-[20px]'>
                    {Array(count).fill(0).map((_, i) => (<SkeletonCard key={i} />))}
                </div>
            ) : (
                <>
                    <Swiper  {...config} className={`!py-[50px] ${arrowTop ?"!px-0" : "md:!px-[5px]"}`}>
                        {products?.products?.map(p => (
                            <SwiperSlide key={p.id}>
                                <div className='group   product-item shadow-sm border  border-[#EEEEEE] relative bg-white text-black rounded-lg p-3'>
                                    <div className='img-switcher-2 relative '>
                                        {p.discount_percentage && <span className='absolute shadow-xl top-[5px] left-[5px] z-[10] text-[10px] bg-[var(--second)] text-white px-[10px] py-[5px] rounded-[6px]  '> خصم {p.discount_percentage}%  </span>}
                                        <img src={p.images?.[0]?.cdn_url} alt={p.title} className='base' />
                                        <img src={p.images?.[1]?.cdn_url} alt={p.title} className='overlay' />
                                    </div>

                                    <span className='bg-[#F8F8F9] text-[#A0A9BB] px-[20px] py-[8px] shadow-sm w-fit text-[10px] rounded-[10px] my-[15px] block mx-auto '> {p.category} </span>
                                    <span className='text-center w-full block text-[var(--black-1)] text-base my-[10px] overflow-hidden text-ellipsis whitespace-nowrap ' title={p.title} > {p.title} </span>
                                    <div className='flex items-center justify-center gap-[10px] '>
                                        <span className='text-[var(--second)] text-[15px]  '>
                                            {p?.price?.current}
                                        </span>
                                        <span className='text-[var(--black-4)] text-[12px] line-through decoration-1  '>
                                            {p?.price?.regular}
                                        </span>
                                    </div>

                                    <Link to={`/product/${p.slug}`} className='btn-blue w-[calc(100%-30px)] mx-auto mt-[20px] '>
                                        {btnName}
                                        <img src={btnIcon} alt='' width={20} height={20} />
                                    </Link>
                                </div>
                            </SwiperSlide>
                        ))}
                        <div className='swiper-pagination !mt-6' />
                    </Swiper>
                    
                    {showArrows && (<>
                    <button className={` ${arrowTop ? "absolute !top-[55px] !left-[20px] " : ""} max-sm:hidden  bg-[var(--main)] hover:bg-[var(--hover-main)] hover:scale-[1.1]  custom-prev w-[35px] h-[35px] rounded-full flex items-center justify-center absolute left-2 top-1/2 transform -translate-y-1/2 z-10 transition-colors  `}>
                        <svg width='15' height='9' viewBox='0 0 15 9' fill='none' xmlns='http://www.w3.org/2000/svg'>
                            <path d='M4.71592 0.920471L1.13637 4.50002M1.13637 4.50002L4.71592 8.07956M1.13637 4.50002H13.8636' stroke='#fff' strokeWidth='1.5' strokeLinecap='round' strokeLinejoin='round' />
                        </svg>
                    </button>
                    <button className={`  ${arrowTop ? "absolute !top-[55px]  !right-[calc(100%-95px)] " : ""}  max-sm:hidden  bg-[var(--main)] hover:bg-[var(--hover-main)] hover:scale-[1.1]  custom-next w-[35px] h-[35px] rounded-full flex items-center justify-center absolute right-2 top-1/2 transform -translate-y-1/2 z-10 transition-colors`}>
                        <svg width='15' height='9' viewBox='0 0 15 9' fill='none' xmlns='http://www.w3.org/2000/svg'>
                            <path d='M10.284 0.920471L13.8635 4.50002M13.8635 4.50002L10.284 8.07956M13.8635 4.50002H1.13623' stroke='white' strokeWidth='1.5' strokeLinecap='round' strokeLinejoin='round' />
                        </svg>
                    </button>
                    </>)}
                </>
            )}
            </div>
        </div>
        </div>
    );
}
