import { useNavigate } from "react-router-dom";
import { useAppContext } from "../../contexts/AppContext";
import { useCartContext } from "../../contexts/cartContext";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { api, useApiGet } from "../../config/Api";
import { useCheckoutSettings } from "../useCheckoutSettings";
import useProductsByIds from "./useProductsByIds";
import useVariantQueries from "./useVariantQueries";
import { Notification } from "../../config/Notification";

export const useCart = () => {
  const navigate = useNavigate();
  const { storeOptions } = useAppContext();

  // Cart context should be the single source of truth (provides items and mutation methods)
  const {
    cartItems: contextCartItems = [],
    setSelectedOptions,
    removeItem: removeItemFromContext,
    decreaseQty,
    increaseQty
  } = useCartContext();
    // collect product ids from cart
    const productIdsKey = useMemo(
      () => contextCartItems.map(i => i.id).filter(Boolean),
      [contextCartItems]
    );
    // use the hook
    const { data: products, isLoading: loading } = useProductsByIds(productIdsKey);

    // local UI state kept here
    const [submitError, setSubmitError] = useState(null);
    const [isBuyNowLoading, setIsBuyNowLoading] = useState(false);
    // checkout settings 
    const { data: checkoutSettings, loading: checkoutLoading } = useCheckoutSettings();
    const checkoutFields = useMemo(() => checkoutSettings?.data || [], [checkoutSettings]);

    // related products hook 
    const { data: relatedProducts, loading: loadingRelatedProducts } = useApiGet(
      contextCartItems.length > 0 ? `/get-related-products/${contextCartItems[0]?.slug}` : null
    );
    // Cache to avoid re-requesting the same variant combos
    const variantFetchCache = useRef(new Map());

    /*
    Build a list of variant requests and run them with useQueries.
    Each query key is ['variantPrice', productId, joinedVariantIds] so react-query caches per combo.
  */

    const variantRequests = useMemo(() => {
      if (!products?.length || !contextCartItems?.length) return [];
    
      const result = products
        .map(product => {
          const cartItem = contextCartItems.find(c => c.id === product.id);
          if (!cartItem || !product.product_variants?.length) return null;
    
          const variantIds = cartItem.selectedOptions
            ? cartItem.selectedOptions.map(o => o.split('_')[1])
            : product.product_variants.map(v => v.options?.[0]?.id).filter(Boolean);
    
          if (!variantIds.length) return null;
    
          return { productId: product.id, variantIds: variantIds?.sort()};
        })
        .filter(Boolean); // remove nulls
  
      return result;
    }, [products, contextCartItems]);
    
    

    // 👇 use the hook to get prices
  const { data: variantData, isLoading: loadingVariantPrices } = useVariantQueries(variantRequests);

    // 👇 normalize results into an object keyed by productId
  const variantPrices = useMemo(() => {
    const prices = {};
    variantRequests?.forEach((req, idx) => {
      const result = variantData[idx];
      if (result) {
        prices[req.productId] = {
          price: result.price,
          compare_at_price: result.compare_at_price,
          inventory: result.inventory,
        };
      }
    });
    return prices;
  }, [variantRequests, variantData]);
  
  // Totals are memoized to avoid unnecessary recomputations in render
  const totals = useMemo(() => {
    let subtotal = 0;
    let discount = 0;
    let shipping = 0; // still exposed to caller to set if needed
    let tax = 0;

    contextCartItems.forEach(item => {
      const product = products.find(p => p.id === item.id);
      if (!product) return;

      let price = 0;
      let regularPrice = 0;

      if (variantPrices[item.id]) {
        price = variantPrices[item.id].price ?? 0;
        regularPrice = variantPrices[item.id].compare_at_price ?? price;
      } else {
        price = product.price?.special_price ?? product.price?.price ?? 0;
        regularPrice = product.price?.regular_price ?? price;
      }

      subtotal += price * (item.quantity || 1);
      if (regularPrice > price) discount += (regularPrice - price) * (item.quantity || 1);
    });

    const total = subtotal + shipping + tax;
    return { subtotal, discount, shipping, tax, total };
  }, [contextCartItems, products, variantPrices]);


    // Cart mutation helpers — these update the CartContext so the hook and rest of app stay in sync
    const removeItem = useCallback(id => {
      removeItemFromContext(id);
    }, [removeItemFromContext]);

    const handleVariantSelection = useCallback((productId, options = []) => {
      
      // Update selection in cart context
      setSelectedOptions({id:productId,  selectedOptions: options });
    }, [setSelectedOptions, products]);

     // validate required variants before checkout
  const validateVariants = useCallback(() => {
    let isValid = true;
    contextCartItems.forEach(item => {
      const product = products.find(p => p.id === item.id);
      if (product?.product_variants?.length > 0) {
        const required = product.product_variants.filter(v => v.is_required);
        required.forEach(v => {
          const has = item.selectedOptions?.some(opt => opt.startsWith(`${v.id}_`));
          if (!has) isValid = false;
        });
      }
    });
    return isValid;
  }, [contextCartItems, products]);

  // handleCheckout: returns the API response (caller can navigate or handle success)
  const handleCheckout = useCallback(async (data, { skipVariantValidation = false } = {}) => {
    setSubmitError(null);

    // basic validation
    if (!skipVariantValidation && !validateVariants()) {
      setSubmitError('الرجاء اختيار جميع الخيارات المطلوبة للمنتجات');
      throw new Error('variants_validation_failed');
    }

    setIsBuyNowLoading(true);
    try {
      const checkoutItems = contextCartItems.map(item => {
        const product = products.find(p => p.id === item.id) || {};
        let price = 0;
        let regularPrice = 0;

        if (variantPrices[item.id]) {
          price = variantPrices[item.id].price ?? 0;
          regularPrice = variantPrices[item.id].compare_at_price ?? price;
        } else {
          price = product.price?.special_price ?? product.price?.price ?? 0;
          regularPrice = product.price?.regular_price ?? price;
        }

        return {
          product_id: item.id,
          quantity: item.quantity || 1,
          regular_price: regularPrice,
          special_price: price,
          total_price: price * (item.quantity || 1),
          options: item.selectedOptions ? item.selectedOptions.map(o => o.split('_')[1]) : [],
          variations: [],
          upsell_option: 1,
        };
      });

      const checkoutData = {
        cart_items: checkoutItems,
        cart_totals: {
          subtotal: totals.subtotal,
          tax: totals.tax,
          shipping: totals.shipping,
          discount: totals.discount,
          total: totals.total - totals.discount,
          weight: 0,
        },
        customer_info: {
          name: data.name || '.',
          first_name: data.first_name || '.',
          last_name: data.last_name || '.',
          email: data.email || '',
          phone: data.phone || '',
          delivery_address: data.delivery_address || '',
          city: data.city || '',
          country: data.country || '',
          zip_code: data.zip_code || '',
          comment: data.comment || '',
        },
        payment_method: data.payment_method || 2,
        currency_name: storeOptions?.data?.currency.value.currency_name || '',
        user_ip: data.user_ip || '127.0.0.1',
      };

      const response = await api.post('/submit-checkout', checkoutData);

      // store checkout payload for other pages (keep parity with previous behavior)
      try {
        sessionStorage.setItem('checkout_data', JSON.stringify({ cart: { details: checkoutItems, products }, orderSummary: "", res: "", productData: "" }));
      } catch (e) {
        // ignore storage errors
      }

      if (response.data?.status_code === 200) {
        // allow caller to decide whether to clear cart / navigate
        return response.data;
      }

      setSubmitError(response.data?.message || 'حدث خطأ أثناء إتمام الطلب');
      return response.data;
    } catch (err) {
      console.error('Checkout error', err);
      const errorMessage = err?.response?.data?.message || err?.response?.data?.error || 'حدث خطأ أثناء إتمام الطلب. الرجاء المحاولة مرة أخرى';
      setSubmitError(errorMessage);
      throw err;
    } finally {
      setIsBuyNowLoading(false);
    }
  }, [contextCartItems, products, variantPrices, totals, validateVariants, storeOptions]);

  // ✅ Prevent increase over stock
const increaseQuantity = useCallback(
  ({id}) => {
    const product = products.find(p => p.id === id);
    if (!product) return;
    
    // check if variant-specific inventory exists
    const variantStock = variantPrices[id]?.inventory ?? null;
    const baseStock = product?.stock?.stock_qty ?? null;
    

    // current item in cart
    const cartItem = contextCartItems.find(c => c.id === id);
    const currentQty = cartItem?.quantity || 0;

    // decide which stock to use (prefer variant stock if available)
    const availableStock = variantStock ?? baseStock;
    
    if (availableStock != null && currentQty >= availableStock) {
      // 🚫 Prevent going beyond stock
      Notification(
        `عذراً، لا يمكن زيادة الكمية: تبقى فقط ${availableStock} قطعة في المخزون للمنتج "${product.title}"`
      );
      
      return;
    }

    increaseQty({id});
  },
  [contextCartItems, products, variantPrices, increaseQty]
);

  // expose everything the component previously used, but now wired to CartContext and optimized
  return {
    // data
    cartItems: contextCartItems,
    products,
    loading,
    checkoutLoading,
    loadingRelatedProducts,
    loadingVariantPrices,
    totals,
    variantPrices,
    relatedProducts,
    submitError,
    isBuyNowLoading,
    checkoutFields,

    // actions
    removeItem,
    // clearCart,
    decreaseQuantity: decreaseQty,
    increaseQuantity,
    // decreaseQuantity,
    handleVariantSelection,
    handleCheckout,
  };
};