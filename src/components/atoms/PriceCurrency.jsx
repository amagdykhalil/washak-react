
import React, { useEffect, useState } from 'react';
import { useAppContext } from '../../contexts/AppContext';


export default function PriceCurrency({ cn = '', price }) {
  const { storeOptions: { currency: { value } } } = useAppContext()

  if (price == null) return null;

  const formattedPrice = Number(price).toFixed(2);

  return (
    <div className={`flex items-center text-nowrap ${cn}`}>
      {value?.currency_position === 'left' ? (
        <>
          {value?.currency_icon} {formattedPrice}
        </>
      ) : (
        <>
          {formattedPrice} {value?.currency_icon}
        </>
      )}
    </div>
  );
}


export function PriceBlock({ ar = true, salePrice, originalPrice, className = '', size = 'md' }) {
  const {
    storeOptions: {
      currency: { value },
    },
  } = useAppContext();


  const getFontSize = () => {
    switch (size) {
      case 'sm':
        return { current: 'text-sm', original: 'text-xs' };
      case 'lg':
        return { current: 'text-lg', original: 'text-base' };
      default:
        return { current: 'text-[15px]', original: 'text-[12px]' };
    }
  };

  const fontSize = getFontSize();

  const extractNumber = (price) => {
    if (!price) return 0;
    const number = typeof price == "string" ? price?.replace(/[^0-9.-]+/g, '') : price;
    return parseFloat(number);
  };


  return (
    <div className={`flex items-center justify-center gap-2 ${className}`}>
      <span className={`text-[var(--second)] font-medium ${fontSize.current}`}>
        {value?.currency_position === 'left'
          ? `${ar ? value?.currency_icon : value?.currency_name} ${extractNumber(salePrice)}`
          : `${extractNumber(salePrice)} ${ar ? value?.currency_icon : value?.currency_name}`}
      </span>

      {/* السعر الأصلي إذا مختلف */}
      {originalPrice !== undefined && originalPrice !== salePrice && (
        <span className={`text-[var(--black-4)] line-through ${fontSize.original}`}>
          {value?.currency_position === 'left'
            ? `${ar ? value?.currency_icon : value?.currency_name} ${extractNumber(originalPrice)}`
            : `${extractNumber(originalPrice)} ${ar ? value?.currency_icon : value?.currency_name}`}
        </span>
      )}
    </div>
  );
}
