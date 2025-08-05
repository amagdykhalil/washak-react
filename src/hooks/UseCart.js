import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { BaseUrl } from '../config/Api';
import {useState} from "react"

export const UseCart = () => {
  const {
    register,
    trigger,
    handleSubmit,
    formState: { errors },
    clearErrors,
    setError,
    getValues,
    setValue,
    watch,
    reset,
  } = useForm({
    // resolver: yupResolver(SignUpSchema),
    defaultValues: {
      qty: 1,
      options: [],
      currency_name: 'USD',
      ip_address: '127.0.0.1',
      email: '',
      phone: '',
      location: '',
      delivery_address: '',
      zip_code: '',
      name: '',
      first_name: '',
      last_name: '',
      product_id: '',
      comment: '',
    },
  });
  const route = useNavigate();

  function animateToCart() {
    const mainImage = document.getElementById('mainImage');
    const cartCount = document.getElementById('cart-count');
    const cartIcon = document.getElementById('cart-icon');
    
     if (!mainImage || !cartIcon || !cartCount) return;

    const imageRect = mainImage.getBoundingClientRect();
    const cartRect = cartIcon.getBoundingClientRect();

    const clone = mainImage.cloneNode(true);
    clone.classList.add('clone-image');

    Object.assign(clone.style, {
      position: 'fixed',
      top: `${imageRect.top + imageRect.height / 2}px`,
      left: `${imageRect.left + imageRect.width / 2}px`,
      transform: 'translate(-50%, -50%)',
      width: `${imageRect.width}px`,
      height: `${imageRect.height}px`,
      zIndex: '1000',
      pointerEvents: 'none',
      opacity: '1',
      transition: 'all 1s ease-in-out',
    });

    document.body.appendChild(clone);

    void clone.offsetHeight;

    // Then trigger the animation
    requestAnimationFrame(() => {
      Object.assign(clone.style, {
        top: `${cartRect.top + cartRect.height / 2}px`,
        left: `${cartRect.left + cartRect.width / 2}px`,
        width: '64px',
        height: '64px',
        opacity: '0.6',
      });
    });

    setTimeout(() => {
      clone.remove();

      const currentCount = parseInt(cartCount.textContent || '0');
      cartCount.textContent = (currentCount + 1).toString();

      cartIcon.classList.add('animate-shake');
      setTimeout(() => cartIcon.classList.remove('animate-shake'), 500);
    }, 1000);
  }

  const [isloading, setisloading] = useState(false);

  const submitOrder = async (data, redirectToCart = false) => {
    
  };

  const submit = handleSubmit(async data => {
    // await submitOrder(data);
  });

  const handleGotToCart = async () => {
    setisloading(true);
    animateToCart();
    setTimeout(() => {
      route('/cart');
    }, 1000);
    setTimeout(() => {
      setisloading(false);
    }, 1500);
  };

  return {
    register,
    handleSubmit,
    formState: { errors },
    trigger,
    clearErrors,
    setError,
    getValues,
    setValue,
    watch,
    reset,
    route ,
    handleGotToCart,
    isloading,
    submit,
    submitOrder,
    animateToCart
  };
};
