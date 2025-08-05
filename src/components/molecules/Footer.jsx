import { Mail, Phone } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useMemo } from 'react';

export default function Footer({ menu, loading, menuSetting, loadingSetting }) {
  const path = useLocation().pathname;

  // Safely parse settings with fallbacks
  const settings = useMemo(() => {
    try {
      return JSON.parse(menuSetting?.footer?.[0]?.settings || '{}');
    } catch (error) {
      console.error('Error parsing footer settings:', error);
      return {};
    }
  }, [menuSetting]);

  // Destructure settings with defaults
  const { footer_enable_switch = '1', footer_logo_switch = '1', text_under_logo_status = 'yes', footer_text_under_logo = '', footer_phone_number = '', footer_email = '', footer_copyright = '', footer_copyrights_switch = '1', footer_alignment = 'horizontal', footer_social_icons = [] } = settings;

  if (footer_enable_switch !== '1') return null;

const renderLinks = () => {
  return ['left', 'center', 'right'].map(position => {
    const section = menu?.footer?.[position];
    if (!section || !Array.isArray(section?.data)) return null;

    return (
      <div key={position} className='flex flex-col gap-4'>
        <h3 className='text-lg font-semibold text-white tracking-wide'>{section.name || `Links ${position}`}</h3>
        <ul className='flex flex-col gap-3'>
          {section.data.map((link, index) => {
            const isActive = path === link.href || path === `/${link.href}`;

            // تحقق إذا كان يوجد `page_slug` في الرابط
            const fullHref = link.page_slug ? `${link.page_slug}${link.href}` : link.href;

            return (
              <li key={`${position}-${index}`} className='group'>
                <Link to={fullHref?.startsWith('/') ? fullHref : `/${fullHref || '#'}`} className='relative block transition-all duration-200'>
                  <span className={`relative text-white/80 hover:text-white transition-colors duration-200 ${isActive ? 'font-medium text-white' : ''}`}>
                    {link.text || `Link ${index + 1}`}
                    <span className={`absolute -bottom-1 left-0 h-0.5 bg-[var(--second)] transition-all duration-300 ${isActive ? 'w-full' : 'w-0 group-hover:w-full'}`}></span>
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    );
  });
};


  const renderSkeleton = () => (
    <div className='grid grid-cols-1 md:grid-cols-3 gap-8 w-full'>
      {Array(3)
        .fill(0)
        .map((_, index) => (
          <div key={index} className='flex flex-col gap-4'>
            <div className='w-32 h-6 bg-white/10 animate-pulse rounded-full' />
            <div className='flex flex-col gap-3'>
              {Array(4)
                .fill(0)
                .map((_, i) => (
                  <div key={i} className='w-full h-4 bg-white/10 animate-pulse rounded-full' />
                ))}
            </div>
          </div>
        ))}
    </div>
  );

  return (
    <footer className='bg-[var(--main)] text-white'>
      <div className='container  !py-12'>
        {/* Main Footer Grid */}
        <div className={`grid grid-cols-1 lg:grid-cols-4 gap-12  ${footer_alignment === 'vertical' ? '!grid-cols-1 !place-items-center' : ''}`}>
          {/* Brand Column */}
          <div className={`flex flex-col gap-6 ${footer_alignment === 'vertical' ? 'items-center text-center' : ''}`}>
            {footer_logo_switch === '1' && (
              <Link to='/' className='group'>
                <img src='/logo-white.png' alt='Logo' className='w-40 h-auto object-contain opacity-90 hover:opacity-100 transition-opacity duration-200' loading='lazy' />
              </Link>
            )}

            {text_under_logo_status === 'yes' && footer_text_under_logo && <div className='text-white/80 font-light leading-relaxed' dangerouslySetInnerHTML={{ __html: footer_text_under_logo }} />}
          </div>

          {/* Links Columns */}
          <div className='lg:col-span-2'>{loading ? renderSkeleton() : <div className={`grid grid-cols-1 md:grid-cols-3 gap-8 ${footer_alignment === 'vertical' ? '!grid-cols-1 !place-items-center !text-center' : ''}`}>{renderLinks()}</div>}</div>

          {/* Contact Column */}
          <div className={`flex flex-col gap-6 ${footer_alignment === 'vertical' ? 'items-center text-center' : ''}`}>
            <h3 className='text-lg font-semibold text-white tracking-wide'>Contact Us</h3>

            <div className='flex flex-col gap-2'>
              {footer_phone_number && (
                <div className='flex items-center gap-3'>
                  <div className='w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center flex-shrink-0'>
                    <Phone className='w-4 h-4 text-white/80' />
                  </div>
                  <a href={`tel:${footer_phone_number}`} className='text-white/80 hover:text-white transition-colors'>
                    {footer_phone_number}
                  </a>
                </div>
              )}

              {footer_email && (
                <div className='flex items-center gap-3'>
                  <div className='w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center flex-shrink-0'>
                    <Mail className='w-4 h-4 text-white/80' />
                  </div>
                  <a href={`mailto:${footer_email}`} className='text-white/80 hover:text-white transition-colors'>
                    {footer_email}
                  </a>
                </div>
              )}
            </div>

            {/* Social Icons */}
            {footer_social_icons?.length > 0 && (
              <div className='flex flex-wrap gap-3 mt-2'>
                {footer_social_icons.map((icon, index) => (
                  <a key={index} href={icon.iconURL} target='_blank' rel='noopener noreferrer' className='w-10 h-10 flex items-center justify-center bg-white/10 rounded-lg hover:bg-white/20 transition-colors duration-200' aria-label={`Social media link ${index + 1}`}>
                    <i className={`${icon.icon} text-lg text-white`}></i>
                  </a>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Copyright Section */}
        {!loadingSetting && footer_copyrights_switch === '1' && footer_copyright && (
          <div className='border-t border-white/10 mt-12 pt-8 text-center'>
            <div className='text-sm text-white/60' dangerouslySetInnerHTML={{ __html: footer_copyright }} />
          </div>
        )}
      </div>
    </footer>
  );
}
