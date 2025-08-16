import ReactDOM from 'react-dom/client';
import App from './App';
import './globals.css';
import Meta from './components/atoms/Meta';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { AppProvider } from './contexts/AppContext';
import { CartProvider } from './contexts/cartContext';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <AppProvider> 
        <CartProvider>
            <Meta />
            <App /> 
        </CartProvider>
    </AppProvider>
);


