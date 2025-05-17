// src/components/atoms/Meta.jsx
import { Helmet } from 'react-helmet';

export default function Meta({ 
	title="Washak | تسوق أفضل المنتجات المنزلية بسهولة", 
	description="اكتشف أفضل المنتجات المنزلية بأسعار مذهلة وخدمة توصيل سريعة مع واشك. تسوق الآن وتمتع بتجربة فريدة."
}) {
  return (
    <Helmet>
      <title>{title}</title>
      {description && <meta name="description" content={description} />}
      <link rel="icon" href="/favicon.png" />

      {/* Open Graph */}
      <meta property="og:title" content={title} />
      {description && <meta property="og:description" content={description} />}
      <meta property="og:image" content="/favicon.png" />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={window.location.href} />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      {description && <meta name="twitter:description" content={description} />}
      <meta name="twitter:image" content="/favicon.png" />
    </Helmet>
  );
}
