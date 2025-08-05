import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useApiGet } from '../config/Api';

const DynamicPage = () => {
  const [dynamicPageData, setDynamicPageData] = useState(null);
  const [loading, setLoading] = useState(true); // Loading state
    const { data } = useApiGet('/store-dynamic-pages');

  const slug = window.location.pathname.split('/').pop(); // Extract slug from URL

  useEffect(() => {
    const page = data?.data.find(item => item.slug === slug);
    if (page) {
      setDynamicPageData(page);
      setLoading(false);
    }
  }, [slug , data]);

  // Render dynamic page or loading state
  return (
    <div className="container !py-12 min-h-[calc(100vh-300px)] " >
      {loading ? (
        <div>Loading dynamic page...</div> // Show loading state
      ) : dynamicPageData ? (
        <div>
          <h1>{dynamicPageData.title}</h1> {/* Render the title */}
          <div
            dangerouslySetInnerHTML={{
              __html: dynamicPageData.content.value, // Render the content (HTML)
            }}
          />
        </div>
      ) : (
        <div>Page not found</div> // In case no matching page is found
      )}
    </div>
  );
};

export default DynamicPage;
