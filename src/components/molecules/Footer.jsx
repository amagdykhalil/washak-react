import { ChevronRight, Mail, Phone } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

import useJsonParser from '../../hooks/useJsonParser';
import { useAppContext } from '../../contexts/AppContext';

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
      className={`flex flex-col gap-6 ${footer_alignment === 'vertical' ? 'items-center text-center ' : 'items-center lg:items-start'} ${!isLogoSideEnabled && "hidden"} `}
    >
      {footer_logo_switch === '1' && (
        <Link to="/" className="group">
          <img
            src="/logo-white.png"
            alt="Logo"
            className="w-40 h-auto object-contain opacity-90 hover:opacity-100 transition-opacity duration-200"
            loading="lazy"
          />
        </Link>
      )}

      {text_under_logo_status === 'yes' && footer_text_under_logo && (
        <div
          className="text-white/80 font-light leading-relaxed max-w-md"
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
        <h3 className="text-lg font-semibold text-white tracking-wide">
          روابط هامة
        </h3>
        <FooterLinksList links={section.data} position={position} isVertical={isVertical} />
      </div>
    );
  });
}

const FooterLinksList = ({ links, position, level = 0, isVertical }) => {
  const location = useLocation();
  const path = location.pathname;


  return (
    <ul className={`flex gap-3 ${isVertical ? "flex-row" : "flex-row lg:flex-col justify-center lg:justify-start"}`} style={{ paddingRight: `${level * 0.3}rem` }} >
      {links.map((link, index) => {
        const isActive = path === link.href || path === `/${link.href}`;
        const fullHref = link.page_slug
          ? `${link.page_slug}${link.href} `
          : link.href;

        return (
          <li key={`${position} -${level} -${index} `} className={`flex gap-3 ${isVertical ? 'flex-row justify-center' : 'flex-row lg:flex-col'}`}>
            <Link
              to={
                fullHref?.startsWith("/")
                  ? fullHref
                  : `/${fullHref || "#"} `
              }
              className={`footer-item-link relative flex items-center gap-2 transition-all duration-200 w-fit ${level > 0 ? "text-white/70 hover:text-white/100" : "text-white/80 hover:text-white/100"
                } `}
            >
              {level > 0 && (
                <ChevronRight
                  size={14}
                  className="footer-item-icon text-white/50 transition-colors"
                />
              )}
              <span
                className={`relative transition-colors duration-100 ${isActive ? "font-medium text-white" : ""} `}
              >
                {link.text || `Link ${index + 1} `}
                <span
                  className={`block footer-item-line absolute-bottom-1 right-0 h-0.5 bg-[var(--second)] transition-all duration-200 ${isActive ? "w-full" : "w-0"
                    } `}
                />
              </span>
            </Link>

            {Array.isArray(link.children) &&
              link.children.length > 0 &&

              <FooterLinksList links={link.children} position={position} level={level + 1} isVertical={isVertical} />}
          </li>
        );
      })}
    </ul >
  );
};

function FooterContact({
  footer_alignment,
  footer_phone_number,
  footer_email,
  footer_social_icons
}) {
  return (
    <div
      className={`flex flex-col gap-6 ${footer_alignment === 'vertical' ? 'items-center text-center' : 'items-center text-center lg:items-start lg:text-left'
        } `}
    >
      <h3 className="text-lg font-semibold text-white tracking-wide">
        إتصل بنا
      </h3>

      <div className={`flex flex-col gap-3`}>
        {footer_phone_number && (
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center">
              <Phone className="w-4 h-4 text-white/80" />
            </div>
            <a
              href={`tel:${footer_phone_number} `}
              className="text-white/80 hover:text-white transition-colors"
            >
              {footer_phone_number}
            </a>
          </div>
        )}

        {footer_email && (
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center">
              <Mail className="w-4 h-4 text-white/80" />
            </div>
            <a
              href={`mailto:${footer_email} `}
              className="text-white/80 hover:text-white transition-colors"
            >
              {footer_email}
            </a>
          </div>
        )}
      </div>

      {footer_social_icons?.length > 0 && (
        <div className="flex flex-wrap gap-3 mt-2">
          {footer_social_icons.map((icon, index) => (
            <a
              key={index}
              href={icon.iconURL}
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 flex items-center justify-center bg-white/10 rounded-lg hover:bg-white/20 transition-colors duration-200"
              aria-label={`Social media link ${index + 1} `}
            >
              <i className={`${icon.icon} text-lg text-white`} />
            </a>
          ))}
        </div>
      )}
    </div>
  );
}

const FooterSkeleton = () => (
  <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
    {Array(3)
      .fill(0)
      .map((_, index) => (
        <div key={index} className="flex flex-col gap-4">
          <div className="w-32 h-6 bg-white/10 animate-pulse rounded-full" />
          <div className="flex flex-col gap-3">
            {Array(4)
              .fill(0)
              .map((_, i) => (
                <div
                  key={i}
                  className="w-full h-4 bg-white/10 animate-pulse rounded-full"
                />
              ))}
          </div>
        </div>
      ))}
  </div>
);
