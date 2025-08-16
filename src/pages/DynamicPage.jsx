import NotFoundPage from './NotFound';
import Breadcrumb from '../components/atoms/Breadcrumb';
import FeatureList from '../components/molecules/FeatureList';
import { useStoreDynamicPages } from '../hooks/useStoreDynamicPages';
import { SkeletonBlock } from '../components/skeleton/SkeletonBlock';

const DynamicPage = () => {
  const { data, loading } = useStoreDynamicPages('/store-dynamic-pages');
  const slug = window.location.pathname.split('/').pop();
  const page = data?.data.find(item => item.slug === slug);
  const breadcrumbRoutes = [{ label: 'الرئيسية', href: '/' }, { label: `${page?.title}` }];

  return (
    <div className="bg-gray-50 min-h-[calc(100vh-300px)]">
      {loading ? (
        <div className="container !pt-12 min-h-[calc(100vh-300px)]">
          <Breadcrumb cn="!mt-0 !pt-[30px] container" routes={breadcrumbRoutes} />
          <div className="rounded-3xl p-[30px] min-h-[250px]">
            <SkeletonBlock height='200px' className="mb-4" />
          </div>
          <div className="mt-8">
            <SkeletonBlock height='150px' />
          </div>
        </div>
      ) : page ? (
        <div className="container !pt-12 min-h-[calc(100vh-300px)]">
          <Breadcrumb cn="!mt-0 !pt-[30px] container" routes={breadcrumbRoutes} />
          <div className="bg-white rounded-3xl p-[30px] min-h-[250px]">
            <div
              dangerouslySetInnerHTML={{
                __html: page.content.value,
              }}
            />
          </div>
          <FeatureList />
        </div>
      ) : (
        <NotFoundPage />
      )}
    </div>
  );
};


export default DynamicPage;
