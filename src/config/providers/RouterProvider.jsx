import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AppLayout } from "../../components/molecules/AppLayout";
import Home from "../../pages/Home";
import ContactUsPage from "../../pages/ContactUs";
import Cart from "../../pages/Cart";
import Products from "../../pages/Products";
import Product from "../../pages/Product";
import DynamicPage from "../../pages/DynamicPage";
import NotFoundPage from "../../pages/NotFound";
import ThankYouPage from "../../pages/thank-you-page";

export function RouterProvider() {

    return (
        <BrowserRouter>
            <Routes>
                <Route element={<AppLayout />}>
                    <Route path="/" index element={<Home />} />
                    <Route path="/contact-us" element={<ContactUsPage />} />
                    <Route path="/cart" element={<Cart />} />
                    <Route path="/thank-you-page" element={<ThankYouPage />} />
                    <Route path="/category" element={<Products />} />
                    <Route path="/pages/:page" element={<DynamicPage />} />
                    <Route path="/category/:id" element={<Products />} />
                    <Route path="/products" element={<Products />} />
                    <Route path="/product/:id" element={<Product />} />
                </Route>
                <Route path="*" element={<NotFoundPage />} />
            </Routes>
        </BrowserRouter>
    );
}