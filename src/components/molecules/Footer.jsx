import { ChevronRight, Mail, Phone } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

import useJsonParser from '../../hooks/useJsonParser';
import { useAppContext } from '../../contexts/AppContext';
import { getFullPath } from '../../helper/getFullPath';
import { useIsActiveLink } from '../../hooks/useIsActiveLink';

export default function Footer() {
  const { menu, loadingMenu, menuSetting, loadingSetting } = useAppContext();
  const settings = useJsonParser(
    menuSetting?.footer?.[0]?.settings,
    'Failed to parse footer settings:'
  );

  const {
    footer_enable_switch = '1',
    footer_logo_switch = '1',
    text_under_logo_status = 'yes',
    footer_text_under_logo = '',
    footer_phone_number = '',
    footer_email = '',
    footer_copyright = '',
    footer_copyrights_switch = '1',
    footer_alignment = 'horizontal',
    footer_social_icons = []
  } = settings;

  // Show fallback footer if no settings or footer is disabled
  if (!menuSetting?.footer && !loadingSetting) {
    return <FallbackFooter />;
  }

  const isVertical = footer_alignment !== 'horizontal';
  const isLogoSideEnabled = footer_logo_switch === '1' || (text_under_logo_status === 'yes' && footer_text_under_logo !== '');

  if (footer_enable_switch !== '1') return null;

  const alignmentClasses =
    footer_alignment === 'vertical'
      ? 'text-center'
      : 'lg:grid lg:grid-cols-4 grid-cols-1 lg:items-start';

  return (
    <footer className="bg-[var(--main)] text-white">
      <div className="container !py-10 md:py-12">
        {/* Main Footer Grid */}
        <div className={`flex flex-col justify-center items-center gap-9  ${alignmentClasses}`}>
          <FooterBrand
            footer_logo_switch={footer_logo_switch}
            footer_text_under_logo={footer_text_under_logo}
            text_under_logo_status={text_under_logo_status}
            footer_alignment={footer_alignment}
            isLogoSideEnabled={isLogoSideEnabled}
          />

          <div className={`${isLogoSideEnabled ? "lg:col-span-2" : "lg:col-span-3"}`}>
            {loadingMenu ? (
              <FooterSkeleton />
            ) : (
              <div
                className={`grid gap-8 grid-cols-1 text-center lg:text-right lg:grid-cols-3 ${footer_alignment === 'vertical'
                  ? '!grid-cols-1 !place-items-center text-center'
                  : ''
                  }`}
              >
                <FooterLinks menu={menu} isVertical={isVertical} />
              </div>
            )}
          </div>

          <FooterContact
            footer_alignment={footer_alignment}
            footer_phone_number={footer_phone_number}
            footer_email={footer_email}
            footer_social_icons={footer_social_icons}
          />
        </div>

        {/* Copyright */}
        {!loadingSetting &&
          footer_copyrights_switch === '1' &&
          footer_copyright && (
            <div className="border-t border-white/10 mt-12 pt-8 text-center">
              <div
                className="text-sm text-white/60"
                dangerouslySetInnerHTML={{ __html: footer_copyright }}
              />
            </div>
          )}
      </div>
    </footer>
  );
}

function FooterBrand({
  footer_logo_switch,
  footer_text_under_logo,
  text_under_logo_status,
  footer_alignment,
  isLogoSideEnabled
}) {
  return (
    <div
      className={`flex flex-col gap-4 sm:gap-6 ${footer_alignment === 'vertical' ? 'items-center text-center ' : 'items-center lg:items-start'} ${!isLogoSideEnabled && "hidden"} `}
    >
      {footer_logo_switch === '1' && (
        <Link to="/" className="group">
          <img
            src="/logo-white.png"
            alt="Logo"
            className="w-32 sm:w-40 h-auto object-contain opacity-90 hover:opacity-100 transition-opacity duration-200"
            loading="lazy"
          />
        </Link>
      )}

      {text_under_logo_status === 'yes' && footer_text_under_logo && (
        <div
          className="text-white/80 font-light leading-relaxed max-w-md text-xs sm:text-sm md:text-base"
          dangerouslySetInnerHTML={{ __html: footer_text_under_logo }}
        />
      )}
    </div>
  );
}

function FooterLinks({ menu, isVertical }) {
  return ["left", "center", "right"].map((position) => {
    const section = menu?.footer?.[position];

    if (!section || !section?.data.length) return null;

    return (
      <div key={position} className={`flex flex-col gap-4 ${isVertical ? 'items-center text-center' : ''}`}>
        <h3 className="text-base sm:text-lg font-semibold text-white tracking-wide">
          روابط هامة
        </h3>
        <FooterLinksList links={section.data} position={position} isVertical={isVertical} />
      </div>
    );
  });
}

const FooterLinksList = ({ links, position, level = 0, isVertical, parentSlug = "" }) => {

  return (
    <ul className={`flex gap-2 sm:gap-3 ${isVertical ? "flex-row" : "flex-row lg:flex-col justify-center lg:justify-start"}`} style={{ paddingRight: `${level * 0.3}rem` }} >
      {links.map((link, index) => {

        return (
          <FooteItem
            key={`${position}-${level}-${index}`}
            link={link}
            index={index}
            isVertical={isVertical}
            level={level}
            position={position}
            parentSlug={level > 0 ? parentSlug : link.page_slug}
          />
        );
      })}
    </ul >
  );
};

const FooteItem = ({ link, position, level, isVertical, index, parentSlug }) => {
  const fullHref = getFullPath(parentSlug, link.href);
  const isActive = useIsActiveLink(fullHref);

  return <li className={`flex gap-2 sm:gap-3 ${isVertical ? 'flex-row justify-center' : 'flex-row lg:flex-col'}`}>
    <Link
      to={
        fullHref?.startsWith("/")
          ? fullHref
          : `/${fullHref || "#"} `
      }
      className={`footer-item-link ${isActive ? "active" : ""} relative flex items-center gap-1 sm:gap-2 transition-all duration-200 w-fit text-xs sm:text-sm ${level > 0 ? "text-white/70 hover:text-white/100" : "text-white/80 hover:text-white/100"
        } `}
    >
      {level > 0 && (
        <ChevronRight
          size={12}
          className="footer-item-icon text-white/50 transition-colors sm:w-3.5 sm:h-3.5 w-3 h-3"
        />
      )}
      <span
        className={`relative transition-colors duration-100 `}
      >
        {link.text || `Link ${index + 1} `}
        <span className={`block footer-item-line absolute-bottom-1 right-0 h-0.5 bg-[var(--second)] transition-all duration-200 w-0`} />
      </span>
    </Link>

    {Array.isArray(link.children) &&
      link.children.length > 0 &&

      <FooterLinksList links={link.children} position={position} level={level + 1} isVertical={isVertical} parentSlug={parentSlug} />}
  </li>
}

function FooterContact({
  footer_alignment,
  footer_phone_number,
  footer_email,
  footer_social_icons
}) {
  return (
    <div
      className={`flex flex-col gap-4 sm:gap-6 ${footer_alignment === 'vertical' ? 'items-center text-center' : 'items-center text-center lg:items-start lg:text-left'
        } `}
    >
      {(footer_phone_number || footer_email || footer_social_icons?.length > 0) && <h3 className="text-base sm:text-lg font-semibold text-white tracking-wide">
        إتصل بنا
      </h3>}

      <div className={`flex flex-col gap-2 sm:gap-3`}>
        {footer_phone_number && (
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-lg bg-white/10 flex items-center justify-center">
              <Phone className="w-3 h-3 sm:w-4 sm:h-4 text-white/80" />
            </div>
            <a
              href={`tel:${footer_phone_number} `}
              className="text-white/80 hover:text-white transition-colors text-xs sm:text-sm"
            >
              {footer_phone_number}
            </a>
          </div>
        )}

        {footer_email && (
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-lg bg-white/10 flex items-center justify-center">
              <Mail className="w-3 h-3 sm:w-4 sm:h-4 text-white/80" />
            </div>
            <a
              href={`mailto:${footer_email} `}
              className="text-white/80 hover:text-white transition-colors text-xs sm:text-sm"
            >
              {footer_email}
            </a>
          </div>
        )}
      </div>

      {footer_social_icons?.length > 0 && (
        <div className="flex flex-wrap gap-2 sm:gap-3 mt-2">
          {footer_social_icons.map((icon, index) => (
            <a
              key={index}
              href={icon.iconURL}
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center bg-white/10 rounded-lg hover:bg-white/20 transition-colors duration-200"
              aria-label={`Social media link ${index + 1} `}
            >
              <i className={`${icon.icon} text-sm sm:text-lg text-white`} />
            </a>
          ))}
        </div>
      )}
    </div>
  );
}

const FooterSkeleton = () => (
  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 w-full">
    {Array(3)
      .fill(0)
      .map((_, index) => (
        <div key={index} className="flex flex-col gap-3 sm:gap-4">
          <div className="w-24 sm:w-32 h-5 sm:h-6 bg-white/10 animate-pulse rounded-full" />
          <div className="flex flex-col gap-2 sm:gap-3">
            {Array(4)
              .fill(0)
              .map((_, i) => (
                <div
                  key={i}
                  className="w-full h-3 sm:h-4 bg-white/10 animate-pulse rounded-full"
                />
              ))}
          </div>
        </div>
      ))}
  </div>
);

// Fallback Footer Component
function FallbackFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[var(--main)] text-white">
      <div className="container !py-6 sm:!py-8 md:!py-10">
        <div className="flex flex-col items-center gap-4 sm:gap-6 text-center">
          {/* Logo */}
          <Link to="/" className="group">
            <img
              src="/logo-white.png"
              alt="Logo"
              className="w-28 sm:w-32 h-auto object-contain opacity-90 hover:opacity-100 transition-opacity duration-200"
              loading="lazy"
            />
          </Link>

          {/* Description */}
          <p className="text-white/80 font-light leading-relaxed max-w-md text-xs sm:text-sm md:text-base px-4">
            متجر إلكتروني متخصص في بيع المنتجات عالية الجودة بأفضل الأسعار
          </p>

          {/* Quick Links */}
          <div className="flex flex-wrap justify-center gap-4 sm:gap-6 text-xs sm:text-sm">
            <Link to="/" className="text-white/80 hover:text-white transition-colors duration-200">
              الرئيسية
            </Link>
            <Link to="/products" className="text-white/80 hover:text-white transition-colors duration-200">
              المنتجات
            </Link>
            <Link to="/contact-us" className="text-white/80 hover:text-white transition-colors duration-200">
              اتصل بنا
            </Link>
          </div>

          {/* Copyright */}
          {/* <div className="border-t border-white/10 pt-4 sm:pt-6 w-full">
            <p className="text-xs sm:text-sm text-white/60">
              جميع الحقوق محفوظة © {currentYear}
            </p>
          </div> */}
        </div>
      </div>
    </footer>
  );
}
