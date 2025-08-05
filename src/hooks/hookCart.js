export const addToCart = (product, imageId) => {
   const existingCart = JSON.parse(localStorage.getItem('cart') || '[]');
  function animateToCart() {
    const mainImage = document.getElementById(imageId);
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

  animateToCart();
  const existingProductIndex = existingCart.findIndex(item => item.id === product.id);

  if (existingProductIndex !== -1) {
    // إذا كان موجود، نزيد الكمية بمقدار 1
    existingCart[existingProductIndex].quantity += 1;
  } else {
    // إذا غير موجود، نضيفه مع quantity = 1
    const productWithQuantity = {
      ...product,
      quantity: 1,
    };
    existingCart.push(productWithQuantity);
  }

  // حفظ السلة بعد التعديل في localStorage
  localStorage.setItem('cart', JSON.stringify(existingCart));
};

export const getCart = () => {
  return JSON.parse(localStorage.getItem('cart') || '[]');
};
