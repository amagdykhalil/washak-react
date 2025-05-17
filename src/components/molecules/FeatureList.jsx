
export default function FeatureList({ order, data, loading }) {
  const featureList = [
    {
      img: '/icons/feature-list/1.png',
      title: 'جودة مضمونة',
      desc: 'نقوم بفحص كل منتج على موقعنا بخطوات صارمة',
    },
    {
      img: '/icons/feature-list/2.png',
      title: 'استرجاع سهل',
      desc: 'استرجع شحنت بطريقة سهله حال كان هناك مشكله',
    },
    {
      img: '/icons/feature-list/3.png',
      title: 'توصيل سريع',
      desc: 'نعمل علي توصيل شحنتك باسرع وقت',
    },
    {
      img: '/icons/feature-list/4.png',
      title: 'خصومات حصرية',
      desc: 'أفضل العروض والأسعار على القطع الفاخرة',
    },
  ];

	
	const renderSkeleton = () => (
    <div className="container grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {[...Array(4)].map((_, idx) => (
        <div key={idx} className="flex flex-col items-center text-center p-4 ">
          <div className="!w-[50px] !h-[50px] mb-4 bg-gray-300 rounded-full skeleton "></div>
          <div className="!w-24 !h-4 bg-gray-300 rounded mb-2 skeleton "></div>
          <div className="!w-32 !h-3 bg-gray-200 rounded skeleton "></div>
        </div>
      ))}
    </div>
  );

  const renderContent = () => (
    <div className="container grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {data?.icons.map((feature, idx) => (
        <div key={idx} className="flex flex-col items-center text-center p-4">
          {/* <img src={feature.img || `/icons/feature-list/default.png`} alt={feature?.title} className="w-[50px] h-[50px] mb-4" /> */}
		  <i className={`fas ${feature.icon_name}  text-4xl  text-[var(--main)]  mb-[20px]`}></i>

          <h3 className="text-lg font-semibold text-[#252A50] mb-1"> {feature.title} </h3>
          <p className="text-[#77839D] text-sm">{ feature.sub_title || 'وصف'}</p>
        </div>
      ))}
    </div>
  );

  return (
    <div className="bg-[#f8fafb] pt-[50px] pb-[50px]" style={{ order }}>
      {loading ? renderSkeleton() : renderContent()}
    </div>
  );
}
