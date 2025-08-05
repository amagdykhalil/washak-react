import React, { useState, useEffect, useMemo } from 'react';
import { ChevronDown, Menu, X } from 'lucide-react';
import { useLocation, Link } from 'react-router-dom';
import SearchIcon from '../atoms/SearchIcon';

export default function Navbar({ menu, loading, menuSetting, loadingSetting }) {
  const settings = useMemo(() => {
    try {
      return JSON.parse(menuSetting?.header?.[0]?.settings || '{}');
    } catch (error) {
      console.error('Error parsing menu settings:', error);
      return {};
    }
  }, [menuSetting]);
  const [cart, setCart] = useState(JSON.parse(localStorage.getItem('cart')) || []);
  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
    setCart(storedCart);
  }, []);

  const { header_text = '', header_enable_switch = '1', site_logo_enable = '1', search_enable = '1', cart_enable = '1', cart_icon = '', language_enable = '1', navbar_enable = '1', bar_icon = 'fa-bars' } = settings;

  const location = useLocation();

  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [openDropdownIndex, setOpenDropdownIndex] = useState(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024); // lg breakpoint


  // Handle window resize and scroll
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 0);
    const handleResize = () => {
      const mobile = window.innerWidth < 1024;
      setIsMobile(mobile);

      // Close menu when resizing to desktop
      if (!mobile && menuOpen) {
        setMenuOpen(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, [menuOpen]);

  const toggleDropdown = index => {
    setOpenDropdownIndex(prev => (prev === index ? null : index));
  };

  // if (navbar_enable !== '1') return <NotFoundHeader /> ;

  if (loading || loadingSetting) {
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
  const menuItems = menu?.header?.data || [];

  return menu?.header ? (
    <div className='sticky top-0 z-50'>
      {header_enable_switch === '1' && header_text && (
        <header className={`text-white w-full flex items-center justify-center gap-4 text-base max-md:text-xs duration-500 transition-all ${scrolled ? 'max-h-0 overflow-hidden' : 'max-h-[55px]'}`} style={{ background: 'var(--main)' }}>
          <img src='/icons/car.png' alt='' width={28} height={28} className='max-sm:hidden object-contain' />
          <p className='md:leading-[55px] max-md:py-[10px] text-center' dangerouslySetInnerHTML={{ __html: header_text }} />
        </header>
      )}

      {/* Main nav */}
      <div className='bg-white' style={{ boxShadow: '0px 4px 4px 0px #CFCFCF40' }}>
        <nav className='container !h-[80px] mx-auto flex items-center justify-between py-4 !px-4 lg:px-0'>
          {site_logo_enable === '1' && (
            <Link to='/'>
              <img src='/logo.png' alt='Logo' width={126} height={50} className={`object-contain duration-500 ${scrolled ? 'w-[160px]' : 'w-[120px]'}`} />
            </Link>
          )}

          {/* Desktop links - hidden on mobile */}
          <ul className={`hidden lg:flex items-center text-base duration-500 ${scrolled ? 'gap-2' : 'gap-6'}`}>
            {menuItems.map((item, index) => {
              // Determine the path based on page_slug and href
              const fullPath = item.page_slug ? `/${item.page_slug}${item.href}` : `${item.href}`;
              const isActive = window.location.pathname === fullPath;

              return (
                <li key={index} className='relative group'>
                  {/* Main menu link */}
                  <Link to={fullPath || '#'} className='flex items-center'>
                    <span className={`px-2 py-1 font-medium transition-colors duration-200 ${isActive ? 'text-[var(--main)]' : 'text-[var(--black-2)]'}`}>{item.text || 'Menu Item'}</span>

                    {/* Dropdown icon for submenus */}
                    {item.children?.length > 0 && <ChevronDown className='w-4 h-4 stroke-[3px] transition-transform !mt-[4px] duration-300 group-hover:rotate-180' />}
                  </Link>

                  {/* Submenu items */}
                  {item.children?.length > 0 && (
                    <ul className='absolute right-0 mt-2 bg-white shadow-lg rounded-lg overflow-hidden max-h-0 group-hover:max-h-[400px] transition-all duration-500 ease-in-out min-w-[180px] z-50'>
                      {item.children.map((child, idx) => {
                        // Handle child items with page_slug
                        const childFullPath = item.page_slug ? `/${item.page_slug}${child.href}` : `/${child.href}`;

                        return (
                          <li key={idx}>
                            <Link to={childFullPath || '#'} className='block text-right px-4 py-2 hover:bg-gray-100 text-[var(--black-2)]'>
                              {child.text || 'Submenu Item'}
                            </Link>
                          </li>
                        );
                      })}
                    </ul>
                  )}
                </li>
              );
            })}
          </ul>

          {/* Icons - show bar icon only on mobile */}
          <div className='flex items-center gap-[15px]'>
            {search_enable === '1' && <SearchIcon />}
            {cart_enable === '1' && (
              <Link id='cart-icon' to='/cart' className='relative cursor-pointer p-1 w-8 h-8 duration-500'>
                <span id='cart-count' className='absolute top-[-5px] right-[-5px] w-4 h-4 rounded-full text-white text-[10px] flex items-center justify-center' style={{ background: 'var(--main)' }}>
                  {cart?.length}
                </span>
                {cart_icon ? <i className={`${cart_icon} fa-solid text-2xl`} /> : <img src='/icons/cart.png' alt='Cart' width={30} height={30} />}
              </Link>
            )}

            {/* Show bar icon only on mobile */}
            {isMobile && (
              <button onClick={() => setMenuOpen(o => !o)} className='focus:outline-none lg:hidden' aria-label='Toggle menu'>
                {bar_icon ? <i className={`${bar_icon} fa-solid text-[26px] cursor-pointer`} /> : <Menu className='w-6 h-6' />}
              </button>
            )}
          </div>
        </nav>

        {/* Mobile menu - only show if isMobile and menuOpen */}
        {isMobile && (
          <div className={`fixed top-0 right-0 h-full w-4/5 max-w-xs bg-white shadow-2xl rounded-l-xl z-50 transform transition-transform duration-300 ease-in-out ${menuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
            {/* Close Button */}
            <div className='p-4 flex justify-end border-b'>
              <X className='cursor-pointer text-gray-600 hover:text-red-500 transition duration-300' onClick={() => setMenuOpen(false)} />
            </div>

            {/* Menu Items */}
            <ul className='flex flex-col px-4 py-6 space-y-3'>
              {menuItems.map((item, index) => {
                const isOpen = openDropdownIndex === index;

                // Dynamically combine page_slug and href
                const fullPath = item.page_slug ? `/${item.page_slug}${item.href}` : `${item.href}`;

                return (
                  <li key={index} className='group'>
                    <div
                      className='flex justify-between items-center py-2 px-3 rounded-md cursor-pointer bg-gray-50 hover:bg-[var(--main-light)] transition'
                      onClick={() => {
                        if (item.children?.length > 0) toggleDropdown(index);
                        else setMenuOpen(false);
                      }}>
                      <Link to={fullPath || '#'} onClick={() => setMenuOpen(false)} className='w-full text-[var(--black-2)] font-semibold'>
                        {item.text || 'Menu Item'}
                      </Link>

                      {/* Chevron for dropdown */}
                      {item.children?.length > 0 && <ChevronDown className={`w-4 h-4 text-gray-500 group-hover:text-[var(--main)] transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />}
                    </div>

                    {/* Submenu items */}
                    {item.children?.length > 0 && isOpen && (
                      <ul className='mt-2 ml-4 space-y-1 pl-2 border-l border-gray-200'>
                        {item.children.map((child, idx) => {
                          // Dynamically combine page_slug and href for child items as well
                          const childFullPath = item.page_slug ? `/${item.page_slug}${child.href}` : `/${child.href}`;

                          return (
                            <li key={idx}>
                              <Link to={childFullPath || '#'} onClick={() => setMenuOpen(false)} className='block text-sm text-gray-600 hover:text-[var(--main)] px-2 py-1 transition'>
                                {child.text || 'Submenu Item'}
                              </Link>
                            </li>
                          );
                        })}
                      </ul>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
        )}
      </div>
    </div>
  ) : (
    <NotFoundHeader />
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
