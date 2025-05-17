import HeadTitle from'../atoms/HeadTitle';

const CategoryList = ({ Categories , order , loading }) => {
    return (
        <div className='container  flex flex-col gap-[50px]' style={{ order:order }}>
			{
				loading 
				?<div className='skeleton !w-[150px] mx-auto '></div>
				:<HeadTitle title={Categories?.section_info?.title} desc={Categories?.section_info?.sub_titile} />
			}
            

            {/* Show a loading skeleton or spinner while data is loading */}
            {loading ? (
                <div className='flex gap-[20px] flex-wrap justify-center items-center'>
                    {Array(5)
                        .fill(0)
                        .map((_, i) => (
							<div key={i} className='flex flex-col gap-[10px] '>
                            <div className='skeleton !w-[180px] !h-[110px] '></div>
                            <div className='skeleton !w-[150px] mx-auto '></div>
							</div>
                        ))}
                </div>
            ) : (
                <div className='flex items-center flex-wrap justify-center gap-[10px] md:gap-[20px] xl:gap-[30px] 2xl:gap-[50px]'>
                    {Categories?.categories?.map((e, i) => (
                        <div key={i} className='cursor-pointer duration-300 group max-w-[200px] max-lg:max-w-[150px] max-sm:max-w-[120px] w-full'>
                            <div className='group-hover:scale-[1.1] duration-500 overflow-hidden h-[110px] p-[10px] max-lg:p-[5px] rounded-[10px]' style={{ boxShadow: '0px 0px 8px 0px #00000026' }}>
                                <img className='group-hover:scale-[1.1] duration-500  rounded-[10px] w-full h-full object-cover' src={e.image_url} alt={e.name} width={160} height={130} />
                            </div>
                            <span className='text-base mb-[10px] max-lg:mt-[10px] max-lg:text-sm text-center block mt-[15px] text-[#4A4A4A]'>{e.name}</span>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default CategoryList;
