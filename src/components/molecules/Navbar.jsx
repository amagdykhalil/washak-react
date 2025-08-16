import React, { useState, useEffect, useMemo, useRef } from 'react';
import { ChevronDown, ChevronLeft, Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import SearchIcon from '../atoms/SearchIcon';
import { useAppContext } from '../../contexts/AppContext';
import MenuItem from '../atoms/MenuItem';
import { getFullPath } from '../../helper/getFullPath';
import useMenuNavigation from '../../hooks/useMenuNavigation';

export default function Navbar() {
  const { menu, loadingMenu, menuSetting, loadingSetting } = useAppContext();

  const menuItems = menu?.header?.data || [];
  const {
    currentMenu,
    isMain,
    mainPageSlug,
    settings,
    goToSubmenu,
    goBack,
    menuOpen,
    setMenuOpen,
    history,
    count
  } = useMenuNavigation(menuItems, menuSetting);

  const { header_text = '', header_enable_switch = '1', site_logo_enable = '1', search_enable = '1', cart_enable = '1', cart_icon = '', navbar_enable = '1', bar_icon = 'fa-bars' } = settings;

  if (loadingMenu || loadingSetting) {
    return (
      <div className='sticky top-0 z-50 bg-white' style={{ boxShadow: '0px 4px 4px 0px #CFCFCF40' }}>
        <nav className='container !h-[80px] mx-auto flex items-center justify-between py-4 !px-4 lg:px-0'>
          <div className='w-[120px] h-[50px] bg-gray-200 rounded animate-pulse'></div>
          <div className='flex items-center gap-[15px]'>
            <div className='w-8 h-8 bg-gray-200 rounded animate-pulse'></div>
            <div className='w-8 h-8 bg-gray-200 rounded animate-pulse'></div>
          </div>
        </nav>
      </div>
    );
  }



  return menu?.header ? (
    <div className={`sticky top-0 z-50 main-header ${menuOpen ? "menu-open" : ""}`}>
      {header_enable_switch === '1' && header_text && (
        <header
          className="header-bar text-white w-full flex items-center justify-center gap-4 text-base max-md:text-xs duration-500 transition-all"
          style={{ background: 'var(--main)' }}
        >
          <img
            src="/icons/car.png"
            alt=""
            width={28}
            height={28}
            className="max-sm:hidden object-contain"
          />
          <p
            className="md:leading-[55px] max-md:py-[10px] text-center"
            dangerouslySetInnerHTML={{ __html: header_text }}
          />
        </header>
      )}

      {/* Main nav */}
      {navbar_enable === '1' &&
        <div
          className="bg-white"
          style={{ boxShadow: '0px 4px 4px 0px #CFCFCF40' }}
        >
          <nav className="container !h-[80px] mx-auto flex items-center lg:justify-between py-4 !px-4 lg:px-0">
            {site_logo_enable === '1' && (
              <Link to="/">
                <img
                  src="/logo.png"
                  alt="Logo"
                  width={126}
                  height={50}
                  className="logo object-contain duration-500"
                />
              </Link>
            )}

            {/* Desktop links - hidden on mobile */}
            <ul className="nav-menu hidden lg:flex items-center text-base duration-500">
              {menuItems.map((item, index) => (
                <MenuItem key={index} item={item} />
              ))}
            </ul>

            {/* Icons - show bar icon only on mobile */}
            <div className={`flex items-center flex-1 lg:flex-none gap-[15px] ${site_logo_enable ? "justify-end" : "justify-between"} lg:justify-normal `}>
              <div className='flex items-center gap-[15px]'>
                {search_enable === '1' && <SearchIcon />}
                {cart_enable === '1' && (
                  <Link
                    id="cart-icon"
                    to="/cart"
                    className="relative cursor-pointer p-1 w-8 h-8 duration-500"
                  >
                    <span
                      id="cart-count"
                      className="absolute top-[-5px] right-[-5px] w-4 h-4 rounded-full text-white text-[10px] flex items-center justify-center"
                      style={{ background: 'var(--main)' }}
                    >
                      {count}
                    </span>
                    {cart_icon ? (
                      <i className={`${cart_icon} fa-solid text-2xl`} />
                    ) : (
                      <img src="/icons/cart.png" alt="Cart" width={30} height={30} />
                    )}
                  </Link>
                )}
              </div>

              <MobileMenuToggle bar_icon={bar_icon} menuOpen={menuOpen} setMenuOpen={setMenuOpen} />

            </div>
          </nav>

          <MobileMenu
            menuOpen={menuOpen}
            setMenuOpen={setMenuOpen}
            currentMenu={currentMenu}
            history={history}
            isMain={isMain}
            mainPageSlug={mainPageSlug}
            goToSubmenu={goToSubmenu}
            goBack={goBack}
          />

        </div>}
    </div>
  ) : (
    <NotFoundHeader />
  );

}

function MobileMenuToggle({ bar_icon, menuOpen, setMenuOpen }) {
  return (
    <button
      onClick={() => setMenuOpen(prev => !prev)}
      className="lg:hidden focus:outline-none"
      aria-label="Toggle menu"
    >
      {bar_icon ? (
        bar_icon === "fa-toggle-off" || bar_icon === "fa-toggle-on" ? (
          <i
            className={`${menuOpen ? "fa-toggle-on" : "fa-toggle-off"} fa-solid text-[26px] cursor-pointer`}
          />
        ) : (
          <i
            className={`${bar_icon} fa-solid text-[26px] cursor-pointer`}
          />
        )
      ) : (
        <Menu className="w-6 h-6 cursor-pointer" />
      )}

    </button>
  );
}

function MenuList({ items = [], goToSubmenu, setMenuOpen, fullPathFactory }) {
  return (
    <ul className="flex flex-col px-4 py-6 space-y-3">
      {items.map((item, index) => {
        const fullPath = fullPathFactory(item, index);

        return (
          <li key={index} className="group">
            <div className="flex justify-between items-center py-2 px-3 rounded-md cursor-pointer bg-white hover:bg-gray-100 transition">
              {item?.page_type === 'custom_page' ? (
                <a
                  href={fullPath || '#'}
                  target={item.target || '_self'}
                  rel={item.target === '_blank' ? 'noopener noreferrer' : undefined}
                  onClick={() => setMenuOpen(false)}
                  className="w-full text-[var(--black-2)] font-semibold"
                >
                  {item.text || 'Menu Item'}
                </a>
              ) : (
                <Link
                  to={fullPath || '#'}
                  target={item.target || '_self'}
                  onClick={() => setMenuOpen(false)}
                  className="w-full text-[var(--black-2)] font-semibold"
                >
                  {item.text || 'Menu Item'}
                </Link>
              )}

              {item.children?.length > 0 && (
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    goToSubmenu(index);
                  }}
                  className="p-2 text-gray-500 hover:text-[var(--main)] transition-transform rotate-90 group/mobile-menu-nav"
                  aria-label={`Open submenu for ${item.text}`}
                >
                  <ChevronDown className="w-4 h-4 text-gray-500 group-hover:text-[var(--main)] animate-none group-hover/mobile-menu-nav:animate-[arrow-wiggle_1s_ease-in-out_infinite]" />
                </button>
              )}
            </div>
          </li>
        );
      })}
    </ul>
  );
}

function MobileMenu({
  menuOpen,
  setMenuOpen,
  currentMenu,
  history,
  isMain,
  mainPageSlug,
  goToSubmenu,
  goBack,
}) {
  const fullPathFactory = (item) => getFullPath(isMain ? item.page_slug : mainPageSlug, item.href);

  return (
    <div className={`mobile-menu lg:hidden fixed top-0 right-0 h-full w-4/5 max-w-xs bg-white shadow-2xl rounded-l-xl z-50 transform transition-transform duration-300 ease-in-out ${menuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
      <div className="p-4 flex justify-end border-b">
        <X className="cursor-pointer text-gray-600 hover:text-red-500 transition duration-300" onClick={() => setMenuOpen(false)} />
      </div>

      <div className="px-4 py-3 border-b border-gray-200 flex items-center justify-between">
        <p className="font-bold ml-2">{currentMenu.title}</p>

        {history.length > 0 && (
          <button onClick={goBack} className="flex items-center text-base hover:text-[var(--main)]" aria-label="Back">
            Back
            <ChevronLeft className="w-4 h-4 mr-1" />
          </button>
        )}
      </div>

      <MenuList
        items={currentMenu.items}
        goToSubmenu={goToSubmenu}
        setMenuOpen={setMenuOpen}
        fullPathFactory={fullPathFactory}
      />
    </div>
  );
}

const NotFoundHeader = () => {
  return (
    <div className='flex items-center justify-center w-full bg-red-50   shadow-sm mx-auto py-6 '>
      <div className='flex items-center gap-3'>
        <svg xmlns='http://www.w3.org/2000/svg' className='h-6 w-6 text-red-500' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
          <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M12 9v2m0 4h.01M12 5.5a7.5 7.5 0 11-7.5 7.5A7.51 7.51 0 0112 5.5z' />
        </svg>
        <div className='text-center'>
          <h2 className='text-red-600 font-semibold text-lg'>لا توجد قائمة للتنقل, يرجى التحقق من إعدادات القائمة</h2>
        </div>
      </div>
    </div>
  );
};
