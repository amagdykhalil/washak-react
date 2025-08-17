import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect, useState } from 'react';
import Lottie from 'lottie-react';
import lottieAnimation from './lottie/Cart Glassmorphism.json';
import { AppProviders } from './config/providers/AppProviders';
import toast, { Toaster, useToasterStore } from 'react-hot-toast';

function App() {
  useEffect(() => {
    AOS.init({
      duration: 500,
      easing: 'ease-in-out',
      once: true,
      mirror: false,
      offset: -120, // Triggers animations a bit earlier
    });
  }, []);

  const { toasts } = useToasterStore();
  const TOAST_LIMIT = process.env.REACT_APP_TOAST_LIMIT || 3

  useEffect(() => {
    toasts
      .filter((t) => t.visible) // Only consider visible toasts
      .filter((_, i) => i >= TOAST_LIMIT) // Is toast index over limit?
      .forEach((t) => toast.dismiss(t.id)); // Dismiss – Use toast.remove(t.id) for no exit animation
  }, [toasts]);


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

  return (
    <AppProviders>
      <Toaster
        position="top-center"
        reverseOrder={false}
        toastOptions={{
          maxToasts: 3, // ✅ limit to 3
        }}
      />
    </AppProviders>
  );
}

export default App;
