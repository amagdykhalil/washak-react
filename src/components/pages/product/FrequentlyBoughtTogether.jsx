import { ShoppingBag, Star } from "lucide-react";
import HeadTitle from "../../atoms/HeadTitle";
import Button from "../../atoms/Button";
import PriceCurrency from "../../atoms/PriceCurrency";
import { Link } from "react-router-dom";
import Img from "../../atoms/Image";
import { baseImage } from "../../../config/Api";
import { NotFoundImage } from "../../atoms/NotFoundImage";

export const FrequentlyBoughtTogether = ({
  frequently_bought_products,
  product,
  related_products = [],
  frequentlyBoughtTotalPrice,
  isBuyNowLoading,
  errors,
  checkoutFields,
  getValues,
  handleBuyNow
}) =>
  frequently_bought_products?.length > 0 ? (
    <div className="container max-md:px-4 mb-10 pb-12" data-aos="fade-up">
      <div className="bg-white rounded-md p-6 shadow-sm">
        <HeadTitle title="منتجات غالبًا ما يتم شراؤها مع هذا المنتج" />

        {/* Bought Together Grid */}
        <div className="grid grid-cols-4 max-xl:grid-cols-2 max-md:grid-cols-1 items-stretch mt-6 gap-6 xl:gap-10">
          <ProductCard product={product} />
          {frequently_bought_products.map((prod) => (
            <ProductCard key={prod.id ?? prod.slug} product={prod} />
          ))}
        </div>


        {/* Cart / Price Section */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-gray-100 pt-6">
          <div className="bg-gray-50 rounded-md px-5 py-3 text-lg font-medium text-[var(--main)] shadow-inner">
            إجمالي السعر:{" "}
            <span className="text-[var(--second)] font-bold">
              {frequentlyBoughtTotalPrice.toFixed(2)} ج.م
            </span>
          </div>
          <Button
            loading={isBuyNowLoading}
            cn="disabled !h-[50px] !px-8 text-base shadow hover:shadow-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
            name="اشترِ الآن"
            icon={<ShoppingBag />}
            disabled={
              Object.keys(errors).length > 0 ||
              checkoutFields.some(
                (field) =>
                  field.is_required &&
                  !getValues(field.backend_field_name)
              )
            }
            onclick={handleBuyNow}
          />
        </div>

        {/* Related Products (Optional) */}
        {related_products.length > 0 && (
          <div className="mt-12">
            <HeadTitle title="منتجات ذات صلة" />
            <div className="grid grid-cols-4 max-xl:grid-cols-2 max-md:grid-cols-1 mt-6 gap-6 xl:gap-10">
              {related_products.map((rel, idx) => (
                <ProductCard key={idx} product={rel} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  ) : null;


function ProductCard({ product, className = "" }) {
  const special = Number(product?.price?.special_price || 0);
  const regular = Number(product?.price?.regular_price || 0);
  const saving = regular > special ? regular - special : 0;

  const discountPercentage =
    product?.price?.regular_price && product?.price?.special_price
      ? ((product.price.regular_price - product.price.special_price) / product.price.regular_price) * 100
      : 0;

  return (
    <div
      aria-label={product.title}
      className={
        [
          // layout
          "group w-full h-full min-w-0 p-4 sm:p-5 flex flex-col items-stretch text-center gap-3",
          // visuals
          "bg-white rounded-xl border border-[var(--border-bg)] shadow-sm hover:shadow-md",
          // motion
          "transition-transform hover:-translate-y-1",
          className
        ].join(" ")
      }
      data-aos="fade-up"
    >
      {/* image + discount badge */}
      <div className="relative w-full aspect-square rounded-md overflow-hidden bg-gray-100">
        <Link
          to={`/product/${product.slug}`}
        >
          {product.medias?.[0] ? (
            <Img
              src={baseImage + product.medias[0].url}
              alt={product.title}
              className="absolute inset-0 w-full h-full object-cover"
            />
          ) : (
            <NotFoundImage productId={product?.id} unique={Math.random()} />
          )}

          {discountPercentage && discountPercentage.toFixed(0) > 0 && (
            <div className="absolute top-3 left-3 bg-red-600 text-white text-xs font-semibold px-2 py-1 rounded-full shadow-sm">
              خصم <span className="font-bold">{discountPercentage.toFixed(0)}%</span>
            </div>
          )}
        </Link>
      </div>


      {/* title */}
      <Link to={`/product/${product.slug}`}>
        <h4 className="w-full text-sm sm:text-base font-semibold text-[#3B2D35] leading-tight line-clamp-2">
          {product.title}
        </h4>
      </Link>

      {/* price block */}
      <div className="flex items-end gap-3 justify-center flex-wrap">
        <div className="flex items-baseline gap-1">
          <span className="text-[var(--second)] font-extrabold text-base sm:text-lg">
            <PriceCurrency currency="ج.م" price={special} />
          </span>
          {regular > 0 && regular !== special && (
            <span className="text-xs text-gray-400 line-through">
              <PriceCurrency currency="ج.م" price={regular} />
            </span>
          )}
        </div>
      </div>

      {/* reviews */}
      {product.review_enable != 0 && (
        <div className="flex items-center justify-center gap-2 text-xs text-gray-600">
          <div className="flex items-center gap-0.5">
            {Array(5)
              .fill(0)
              .map((_, i) => (
                <Star key={i} className="w-4 h-4" fill="yellow" />
              ))}
          </div>
          <span>({product.no_of_reviews}) تقييمات</span>
        </div>
      )}

      {/* small CTA */}
      <div className="w-full mt-auto">
        <div className="mt-1 flex items-center justify-center">
          <Link to={`/product/${product.slug}`} className="text-xs sm:text-sm px-4 py-2 rounded-md border border-[var(--border-bg)] bg-white shadow-inner transition">
            عرض المنتج
          </Link>
        </div>
      </div>
    </div>
  );
}


