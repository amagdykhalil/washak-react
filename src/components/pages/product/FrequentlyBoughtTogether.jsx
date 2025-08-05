import { Plus, ShoppingBag ,Star} from "lucide-react";
 import HeadTitle from "../../atoms/HeadTitle";
import Button from "../../atoms/Button";
 import PriceCurrency from "../../atoms/PriceCurrency";
import { Link } from "react-router-dom";
import Img from "../../atoms/Image";
import { baseImage } from "../../../config/Api";



export const FrequentlyBoughtTogether = ({ frequently_bought_products, product, frequentlyBoughtTotalPrice, isBuyNowLoading, errors, checkoutFields, getValues, handleBuyNow }) =>
  frequently_bought_products?.length > 0 && (
    <div className='container max-md:px-4 mb-10 pb-12' data-aos='fade-up'>
      <div className='bg-white rounded-md p-6 shadow-sm'>
        <HeadTitle title='منتجات غالبًا ما يتم شراؤها مع هذا المنتج' />

        <div className='justify-center grid grid-cols-4 max-xl:grid-cols-2 max-md:grid-cols-1 mt-6 gap-6 xl:gap-10'>
          <ProductCard product={product} />

          {frequently_bought_products.map((product, index) => (
            <div key={index} className='relative flex items-center gap-2'>
              <Plus className='w-[26px] max-xl:w-[15px] max-xl:-right-5 absolute -translate-y-1/2 top-1/2 -right-8 flex-1 text-gray-400 hidden sm:block' />
              <ProductCard product={product} />
            </div>
          ))}
        </div>

        <div className='mt-10 flex flex-col sm:flex-row items-center justify-center gap-4'>
          <Button cn='!h-[50px] !px-6 text-base' name={`إجمالي السعر: ${frequentlyBoughtTotalPrice}`} />
          <Button loading={isBuyNowLoading} cn='!h-[50px] !px-8 text-base' name={"اشترِ الآن"} icon={<ShoppingBag />} disabled={Object.keys(errors).length > 0 || checkoutFields.some(field => field.is_required && !getValues(field.backend_field_name))} onclick={handleBuyNow} />
        </div>
      </div>
    </div>
  );




export const ProductCard = ({ product }) => (
  <Link to={`/product/${product.slug}`} className='p-3 mx-auto h-full max-w-full w-full bg-white border rounded-lg shadow-inner hover:shadow-md transition space-y-3' data-aos='fade-up'>
    {product.medias?.[0] && <Img src={baseImage + product.medias[0].url} alt={product.title} className='w-full h-[200px] object-cover rounded-md' />}

    <h4 className='text-center text-lg max-xl:text-base font-semibold text-[#3B2D35] truncate'>{product.title}</h4>

    <div className='flex items-center flex-wrap justify-center gap-2'>
      <span className='flex flex-nowrap items-center w-fit text-[#123770] font-bold text-base'>
        <PriceCurrency currency='ج.م' price={product?.price?.special_price} />
      </span>

      {product?.price?.regular_price && (
        <span className='line-through text-[#A5A5A5] flex items-center flex-nowrap text-sm'>
          <PriceCurrency currency='ج.م' price={product?.price?.regular_price} />
        </span>
      )}
      {product?.price?.regular_price && (
        <span className='flex items-center !flex-nowrap bg-[var(--second)] text-white text-xs px-2 py-1 rounded-xl'>
          هتوفر <PriceCurrency currency='ج.م' price={product?.price?.regular_price - product?.price?.special_price} />
        </span>
      )}
    </div>

    {product.review_enable != 0 && (
      <div className='flex items-center gap-1 justify-center text-sm text-[#666]'>
        <span className='flex text-[#FFC62A]'>
          {Array(5)
            .fill(0)
            .map((_, i) => (
              <Star key={i} className='fill-[#FFC62A]' />
            ))}
        </span>
        <span className='text-xs'>({product.no_of_reviews}) تقييمات</span>
      </div>
    )}
  </Link>
);