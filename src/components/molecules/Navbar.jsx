import React, { useState, useEffect, useMemo } from 'react';
import { ChevronDown, Menu, X } from 'lucide-react';
import { useLocation, Link } from 'react-router-dom';
import SearchIcon from '../atoms/SearchIcon';

export default function Navbar({ menu, loading, menuSetting, loadingSetting }) {
  const settings = JSON.parse(menuSetting?.header?.[0]?.settings || '{}');
  const { header_text, header_enable_switch, site_logo_enable, search_enable, cart_enable, cart_icon, language_enable, navbar_enable, bar_icon } = settings;

  const location = useLocation();
  const path = location.pathname;

  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [openDropdownIndex, setOpenDropdownIndex] = useState(null);

  // Extract menu items safely
  const menuItems = menu?.header?.data;

  // Scroll effect
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 0);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Toggle mobile dropdown
  const toggleDropdown = index => {
    setOpenDropdownIndex(prev => (prev === index ? null : index));
  };

  if (navbar_enable != 1) return;

  return (
    <div className='sticky top-0 z-50'>
      {/* Free shipping banner */}
      {header_enable_switch != null && (
        <header className={`text-white w-full flex items-center justify-center gap-4 text-base max-md:text-xs duration-500 transition-all ${scrolled ? 'max-h-0 overflow-hidden' : 'max-h-[55px]'}`} style={{ background: 'var(--main)' }}>
          <img src='/icons/car.png' alt='' width={28} height={28} className='max-sm:hidden object-contain' />
          <p className='md:leading-[55px] max-md:py-[10px] text-center' dangerouslySetInnerHTML={{ __html: header_text }} />
        </header>
      )}

      {/* Main nav */}
      <div className='bg-white' style={{ boxShadow: '0px 4px 4px 0px #CFCFCF40' }}>
        <nav className='container !h-[80px] mx-auto flex items-center justify-between py-4 !px-4 lg:px-0'>
          {site_logo_enable == 1 && (
            <Link to='/'>
              <img src='/logo.png' alt='Logo' width={126} height={50} className={`object-contain duration-500 ${scrolled ? 'w-[160px]' : 'w-[120px]'}`} />
            </Link>
          )}

          {/* Desktop links */}
          <ul className={`hidden lg:flex items-center text-base duration-500 ${scrolled ? 'gap-2' : 'gap-6'}`}>
            {loading
              ? Array.from({ length: 4 }).map((_, index) => <li key={index} className='w-[80px] h-5 bg-gray-200 skeleton rounded' />)
              : menuItems.map((item, index) => {
                  const isActive = path === item.href;
                  return (
                    <li key={index} className='relative group'>
                      <Link to={item.href == "alaanay-alshkhsy" ? "/products" : item.href } className='flex items-center'>
                        <span className={`px-2 py-1 font-medium transition-colors duration-200 ${isActive ? 'text-[var(--main)]' : 'text-[var(--black-2)]'}`}>{item.text}</span>
                        {item.children?.length > 0 && <ChevronDown className='w-4 h-4 stroke-[3px] transition-transform !mt-[4px] duration-300 group-hover:rotate-180' />}
                      </Link>

                      {item.children?.length > 0 && (
                        <ul className='absolute right-0 mt-2 bg-white shadow-lg rounded-lg overflow-hidden max-h-0 group-hover:max-h-[400px] transition-all duration-500 ease-in-out min-w-[180px] z-50'>
                          {item.children.map((child, idx) => (
                            <li key={idx}>
                              <Link to={child.href.startsWith('/') ? child.href : `/${child.href}`} className='block text-right px-4 py-2 hover:bg-gray-100 text-[var(--black-2)]'>
                                {child.text}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      )}
                    </li>
                  );
                })}
          </ul>

          {/* Icons + Hamburger */}
          <div className='flex items-center gap-[15px]'>
            {search_enable == 1 && <SearchIcon />}
            {cart_enable == 1 && (
              <Link id='cart-icon' to='/cart' className='relative cursor-pointer  p-1 w-8 h-8 duration-500'>
                <span id='cart-count' className='absolute top-[-5px] right-[-5px] w-4 h-4 rounded-full text-white text-[10px] flex items-center justify-center' style={{ background: 'var(--main)' }}>
                  {' '}
                  2{' '}
                </span>
                {cart_icon ? <i className={cart_icon + ' fa-solid text-2xl '} /> : <img src='/icons/cart.png' alt='Cart' width={30} height={30} />}
              </Link>
            )}
            <i onClick={() => setMenuOpen(o => !o)} className={`${bar_icon} fa-solid text-[26px] cursor-pointer`} />
          </div>
        </nav>

        {/* Mobile menu */}
        <div className={`fixed top-0 right-0 h-full w-3/4 max-w-xs bg-white shadow-lg transform transition-transform duration-300 lg:hidden ${menuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
          <div className='p-4 flex justify-end'>
            <X className='cursor-pointer hover:text-red-500 duration-500' onClick={() => setMenuOpen(false)} />
          </div>

          <ul className='flex flex-col gap-2 px-4'>
            {loading
              ? Array.from({ length: 4 }).map((_, index) => <li key={index} className='w-[80px] h-5 bg-gray-200 animate-pulse rounded' />)
              : menuItems.map((item, index) => {
                  const isOpen = openDropdownIndex === index;

                  return (
                    <li key={index}>
                      <div
                        className='flex justify-between items-center px-2 py-2 cursor-pointer'
                        onClick={() => {
                          if (item.children?.length > 0) toggleDropdown(index);
                          else setMenuOpen(false);
                        }}>
                        <Link to={item.href} onClick={() => setMenuOpen(false)}>
                          <span className='font-medium text-[var(--black-2)]'>{item.text}</span>
                        </Link>
                        {item.children?.length > 0 && <ChevronDown className={`w-4 h-4 stroke-[3px] transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />}
                      </div>

                      {item.children?.length > 0 && isOpen && (
                        <ul className='ml-4 mt-1'>
                          {item.children.map((child, idx) => (
                            <li key={idx}>
                              <Link to={child.href.startsWith('/') ? child.href : `/${child.href}`} onClick={() => setMenuOpen(false)}>
                                <span className='block px-2 py-1 text-sm text-gray-600 hover:text-[var(--main)]'>{child.text}</span>
                              </Link>
                            </li>
                          ))}
                        </ul>
                      )}
                    </li>
                  );
                })}
          </ul>
        </div>
      </div>
    </div>
  );
}
