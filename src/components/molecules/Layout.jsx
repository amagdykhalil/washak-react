'use client';
import React, { useState } from 'react';
import Navbar from '@/components/molecules/Navbar';
import Footer from '@/components/molecules/Footer';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
import { GlobalProvider } from '@/context/GlobalContext';

export default function Layout({ children, params }) {

    useEffect(() => {
        AOS.init({
            duration: 350,
            easing: 'ease-in-out',
            once: true,
        });
    }, []);

    return (
        <GlobalProvider>
            <main>
                <Navbar />
                <div className='min-h-[calc(100vh-430px)]'>{children}</div>
                <Footer />
            </main>
            <Toaster position='top-center' reverseOrder={false} />
        </GlobalProvider>
    );
}
