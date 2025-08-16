import { Link } from "react-router-dom";
import Img from "../../atoms/Image";
import { PriceBlock } from "../../atoms/PriceCurrency";
import { ShoppingCart } from "lucide-react";
import { useAddToCart } from "../../../hooks/cart/useAddToCart";


export default function ProductCard({ product }) {
    const { handleAddToCart } = useAddToCart();

    return <div className='group product-item shadow-sm border border-[#EEEEEE] relative bg-white text-black rounded-lg p-3 h-full'>
        <div className='img-switcher-2 relative   '>
            {product.discount_percentage && <span className='absolute shadow-xl top-[5px] left-[5px] z-[10] text-[10px] bg-[var(--second)] text-white px-[10px] py-[5px] rounded-[6px]'>خصم {product.discount_percentage}%</span>}
            <Img id={`mainImage-${product.id}`} src={product.images?.[0]?.cdn_url} alt={product.title} className='base w-full h-full  object-contain' />
            <Img src={product.images?.[1]?.cdn_url} alt={product.title} className='overlay w-full h-full  object-contain' />
        </div>

        <span className='bg-[#F8F8F9] text-[#A0A9BB] px-[20px] py-[8px] shadow-sm w-fit text-[10px] rounded-[10px] my-[15px] block mx-auto'>{product.category}</span>

        <span className='text-center w-full block text-[var(--black-1)] text-base my-[10px] overflow-hidden text-ellipsis whitespace-nowrap' title={product.title}>
            {product.title}
        </span>

        <PriceBlock originalPrice={product?.price?.regular} salePrice={product?.price?.current} ar />

        <div className='flex items-center justify-between mt-[20px] gap-2'>
            <Link to={`/product/${product.slug}`} className='btn-blue flex-1 text-center py-2 rounded-md'>
                شراء الان
                <img src='/icons/buy.png' alt='' width={20} height={20} />
            </Link>

            <button onClick={() => handleAddToCart(product, `mainImage-${product.id}`)} className='h-[40px] w-[40px] flex items-center justify-center bg-[var(--second)] hover:scale-[0.9] hover:opacity-90 duration-300 text-white p-2 rounded-md transition-all shadow-md' title='أضف إلى السلة'>
                <ShoppingCart size={18} />
            </button>
        </div>
    </div>
}