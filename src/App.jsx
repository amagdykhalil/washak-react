import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/molecules/Navbar';
import Footer from './components/molecules/Footer';
import Home from './app/Home';
import { useAppContext } from './AppContext';
import Products from './app/Products';
import Product from './app/Product';
import Cart from './app/cart/Cart';
import NotFoundPage from './app/NotFound';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect, useState } from 'react';
import ContactUsPage from './app/ContactUs';
import { Toaster } from 'react-hot-toast';
import ThankYouPage from './app/thank-you-page/page';
import Lottie from 'lottie-react';
import lottieAnimation from './lottie/Cart Glassmorphism.json';
import DynamicPage from './app/DynamicPage'; // Dynamic Page Component

function App() {
  const { menu, loading, menuSetting, loadingSetting } = useAppContext();

  useEffect(() => {
    AOS.init({
      duration: 500,
      easing: 'ease-in-out',
      once: true,
      mirror: false,
      offset: -120, // Triggers animations a bit earlier
    });
  }, []);

  const [animLoading, setAnimLoading] = useState(true);
  if (animLoading) {
    return (
      <div className='flex items-center justify-center h-screen bg-white'>
        <div className={`bg-white absolute inset-0 z-50 flex items-center justify-center`}>
          <Lottie animationData={lottieAnimation} loop={false} onComplete={() => setAnimLoading(false)} className='w-full h-full max-w-2xl' />
        </div>
      </div>
    );
  }

  // Simplify route handling
  const generateRoutes = items => {
    return items.map(item => {
      let path = '';

      if (item.page_type === 'product_page'||  item.page_type === 'category_page') {
        path = item?.page_slug !== '' ? `/${item.page_slug}:id` : `/${item.href}`; 
      } else {
        path = item?.page_slug !== '' ? `/${item.page_slug}${item.href}` : `/${item.href}`; // Default route pattern
      }
      let component = null;

      switch (item.page_type) {
        case 'home_page':
          component = <Home />;
          break;
        case 'contact_page':
          component = <ContactUsPage />;
          break;
        case 'category_page':
          component = <Products />;
          break;
        case 'dynamic_page':
          component = <DynamicPage slug={item.page_slug} />;
          break;
        case 'product_page':
          component = <Product />;
          break;
        case 'custom_page':
          component = <Cart />;
          break;
        // default:
        //   component = <NotFoundPage />;
        //   break;
      }

      return <Route key={path} path={path} element={component} />;
    });
  };

  return (
    <Router>
      <Navbar menu={menu} loading={loading} menuSetting={menuSetting} loadingSetting={loadingSetting} />

      <Routes>
        {/* Home route */}
        <Route path='/' element={<Home />} />

        {/* Static routes */}
        <Route path='/category' element={<Products />} />
        <Route path='/products' element={<Products />} />
        <Route path='/product/:id' element={<Product />} />
        <Route path='/thank-you-page' element={<ThankYouPage />} />
        <Route path='/cart' element={<Cart />} />

        {/* Generated routes from menu */}
        {menu?.header?.data && generateRoutes(menu?.header?.data)}
        {menu?.footer?.left && generateRoutes(menu?.footer?.left?.data)}
        {menu?.footer?.center && generateRoutes(menu?.footer?.center?.data)}
        {menu?.footer?.right && generateRoutes(menu?.footer?.right?.data)}


        {/* Catch-all route for unmatched paths */}
        <Route path='*' element={<NotFoundPage />} />
      </Routes>
      <Toaster />
      <Footer menu={menu} loading={loading} menuSetting={menuSetting} loadingSetting={loadingSetting} />
    </Router>
  );
}

export default App;
