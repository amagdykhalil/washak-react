"use client"
import BannerSlider from'../components/atoms/BannerSlider';
import ProductCarousel from'../components/atoms/ProductCarousel.jsx';
import CategoryList from'../components/molecules/CateogryList';
import FeatureList from'../components/molecules/FeatureList';
import { useApiGet } from'../config/Api';

export default function Home() {

  const { data, loading } = useApiGet( '/get-store-home-sections');

  const Banners_Section = data?.data?.sections?.find(e => e.section === 'Banners_Section' );
  const Dynamic_Products = data?.data?.sections?.find(e => e.section === 'Dynamic_Products' );
  const Home_supplies = data?.data?.sections?.find(e => e.section === 'Product_List' );
  const Categories = data?.data?.sections?.find(e => e.section === 'Categories' );
  const Content_With_Icon = data?.data?.sections?.find(e => e.section === 'Content_With_Icon' );

  // this dublicated two times
  const Slider_Section = data?.data?.sections?.find(e => e.section === 'Slider_Section' );
  const Html_Content = data?.data?.sections?.find(e => e.section === 'Html_Content' );
  
    
    const category = {
        title1 : "أقسام ",
        title2 : "المنتجات",
        data : [
            {img : "/cta/1.png" , name : "مستلزمات المطبخ"},
            {img : "/cta/2.png" , name : "منتجات منزلية"},
            {img : "/cta/3.png" , name : "وعاء طهي"},
            {img : "/cta/4.png" , name : "ديكورات"},
            {img : "/cta/5.png" , name : "أثاث"},
            {img : "/cta/6.png" , name : "العناية الشخصية"},
            
        ]
    }

 
    return (
        <div className='pt-[30px] max-sm:!pt-[10px] flex flex-col gap-[50px] '>
            <BannerSlider order={Banners_Section?.sort_order} loading={loading} data={Banners_Section?.data} />

            <ProductCarousel order={Dynamic_Products?.sort_order} loading={loading}  products={Dynamic_Products?.data} />
            <ProductCarousel order={Home_supplies?.sort_order} loading={loading} delay={4500} products={Home_supplies?.data} />

            <CategoryList order={Categories?.sort_order}  Categories={Categories?.data} loading={loading} />


            <FeatureList order={Content_With_Icon?.sort_order} data={Content_With_Icon?.data} loading={loading}  />
        </div>
    );
}
