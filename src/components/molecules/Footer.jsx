import { Mail, Phone } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

// const links = [
//     { href: '/shipping-policy', name: 'سياسة الخصوصية' },
//     { href: '/returns-and-exchanges', name: 'الاستبدال و الاسترجاع' },
//     { href: '/terms-of-service', name: 'شروط الخدمة' },
//     { href: '/shipping-and-delivery', name: 'الشحن و التوصيل' },
// ];

export default function Footer({ menu, loading, menuSetting, loadingSetting }) {
    const path = useLocation().pathname;
    const settings = JSON.parse(menuSetting?.footer?.[0]?.settings || '{}');

    const { footer_enable_switch, footer_logo_switch, text_under_logo_status, footer_text_under_logo, footer_phone_number, footer_email, footer_copyright, footer_copyrights_switch, footer_alignment, footer_social_icons } = settings;

    if (footer_enable_switch != '1') return null;

    const renderLinks = () => {
        return ['left', 'center', 'right'].map(position => {
            const section = menu?.footer?.[position];
            if (!section || !Array.isArray(section.data)) return null;

            return (
                <div key={position} className='flex flex-col gap-[10px] max-sm:w-[300px] max-sm:mx-auto max-sm:text-center text-start'>
                    <h3 className='text-xl max-md:text-lg mb-1'>{section.name}</h3>
                    <ul className='flex flex-col gap-[6px]'>
                        {section.data.map(link => {
                            const isActive = path == link.href || path == `/${link.href}`;
                            return (
                                <li key={`${position}-${link.href}`} className='transition-all duration-300 hover:opacity-80 hover:-translate-x-2'>
                                    <Link to={link.href.startsWith('/') ? link.href : `/${link.href}`}>
                                        <span className={`text-sm font-[400] transition-colors duration-200 ${isActive ? 'text-[var(--second)]' : 'text-white'}`}>{link.text}</span>
                                    </Link>
                                </li>
                            );
                        })}
                    </ul>
                </div>
            );
        });
    };

    const renderSkeleton = () =>
        Array(3)
            .fill(0)
            .map((_, index) => (
                <div key={index} className='flex flex-col gap-[10px]'>
                    <li className='w-24 h-4 bg-gray-600 animate-pulse rounded' />
                    <li className='w-20 h-4 bg-gray-600 animate-pulse rounded' />
                </div>
            ));

    return (
        <footer className='bg-[var(--main)] pt-[50px] pb-[40px] text-white'>
            <div className='container flex flex-col items-center gap-[20px]'>
                <div className={`flex flex-wrap justify-center items-start gap-[100px] pt-[30px] ${footer_alignment == 'vertical' ? '!flex-col !items-center' : ''} `}>
                    <div className='max-w-[250px] flex flex-col items-center  gap-[20px]  w-full  '>
                        {footer_logo_switch != 0 && <img src='/logo-white.png' alt='Logo' width={150} height={50} />}
                        {text_under_logo_status == 'yes' && footer_text_under_logo && <p className='text-sm text-center' dangerouslySetInnerHTML={{ __html: footer_text_under_logo }} />}
                    </div>

                    {/* Footer Links */}
                    {loading ? renderSkeleton() : renderLinks()}
                    <div className="flex flex-col gap-[10px]  " >
                        {footer_phone_number && (
                            <div className=' flex items-center gap-[5px] text-lg '>
                                <p className="w-[35px] h-[35px] border-white flex items-center justify-center border-[2px]     " > <i className="fa-solid fa-phone"></i> </p>
                                {footer_phone_number}
                            </div>
                        )}
                        {footer_email && (
                            <div className=' flex items-center gap-[5px] text-lg '>
                                <p className="w-[35px] h-[35px] border-white flex items-center justify-center border-[2px]     " > <i className="fa-solid fa-envelope"></i> </p>
                                {footer_email}
                            </div>
                        )}
                        {footer_social_icons?.length > 0 && (
                            <div className='flex items-center  gap-4 '>
                                {footer_social_icons.map((icon, index) => (
                                    <a key={index} href={icon.iconURL} target='_blank' rel='noopener noreferrer' className='text-white w-[35px] h-[35px] flex items-center justify-center border-[2px] hover:bg-white duration-300 border-white  hover:text-[var(--second)] text-lg transition-colors'>
                                        <i className={icon.icon}></i>
                                    </a>
                                ))}
                            </div>
                        )}

                    </div>
                </div>


                <div className='flex items-center w-full justify-center border-t border-t-white/20   gap-[5px] mt-[20px] '>
                    {!loadingSetting && footer_copyrights_switch == 1 && footer_copyright && <div className='mt-[20px] text-sm text-center' dangerouslySetInnerHTML={{ __html: footer_copyright }} />}
                </div>
            </div>
        </footer>
    );
}
