import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Navbar, { data } from './components/molecules/Navbar';
import Footer from './components/molecules/Footer';
import './globals.css';
import Meta from './components/atoms/Meta';
import Home from './app/Home';
import { useAppContext } from './AppContext';
import Products from './app/Products';
import Product from './app/Product';
import NotFoundPage from './app/NotFound';


function resolveComponentByHref(href) {
    const map = {
        site_type_url: Home,
        category_type_url: Products,
    };

    const Component = map[href.toLowerCase()];
    return Component ? <Component /> : <NotFoundPage />;
}

function App() {
    const { menu, loading , menuSetting , loadingSetting  } = useAppContext();

    const generateRoutes = items => {
        const routes = [];

        const traverse = list => {
            for (const item of list) {
                if (item?.href && item?.url_type) {
                    const path = item.href.startsWith('/') ? item.href : `/${item.href}`;
                    routes.push(<Route key={path} path={path} element={resolveComponentByHref(item.url_type)} />);
                }

                if (item.children?.length) {
                    traverse(item.children);
                }
            }
        };

        traverse(items);
        return routes;
    };

    if (loading) {
        return (
            <div className='flex items-center justify-center h-screen bg-white'>
                <div className='animate-spin rounded-full h-12 w-12 border-t-4 border-[var(--main)] border-solid'></div>
            </div>
        );
    }

    return (
        <>
            <Router>
                <Navbar menu={menu} loading={loading} menuSetting={menuSetting} loadingSetting={loadingSetting} />
                <Routes>
                    {generateRoutes(menu?.header?.data)}
                    <Route path='/product/:id' element={<Product />} />
                    <Route path='*' element={<NotFoundPage />} />
                </Routes>
                <Footer menu={menu} loading={loading} menuSetting={menuSetting} loadingSetting={loadingSetting} />
            </Router>
        </>
    );
}

export default App;
