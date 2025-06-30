import { Search, X } from 'lucide-react';
import { useState } from 'react';
import { ProductsData } from './ProductCarousel';
export default function SearchIcon() {
    const [open, setOpen] = useState(false);
    const [query, setQuery] = useState('');

    const filtered = query ? ProductsData.products.filter(product => product.title.toLowerCase().includes(query.toLowerCase())) : ProductsData.products.slice(0, 10);

    const handleClick = () => setOpen(prev => !prev);

    return (
        <div className='relative inline-block'>
            <div className={`flex items-center gap-2 bg-gray-100 p-2 rounded-full transition-all duration-300 ${open ? 'w-64' : 'w-[55px]'} overflow-hidden`}>
                <div className={`flex-none flex items-center justify-center ${!open ? ' bg-gray-200/70 ' : 'text-white bg-red-500 '}  w-[40px] h-[40px] rounded-full  cursor-pointer`} onClick={handleClick}>
                    {!open ? <i className='fa-solid fa-magnifying-glass text-2xl '></i> : <X size={24} />}
                </div>
                {open && <input type='text' className='bg-transparent focus:outline-none w-full' placeholder='بحث...' value={query} onChange={e => setQuery(e.target.value)} />}
            </div>

            {open && (
                <ul className='absolute left-0 mt-2 w-64 bg-gray-100 text-[#333]/70 rounded-md shadow-lg z-10 max-h-[300px] overflow-auto'>
                    {filtered.length ? (
                        filtered.map(item => (
                            <li key={item.id} className='px-4 py-2 hover:bg-gray-200 cursor-pointer flex items-center gap-2'>
                                <img src={item.images[0]?.cdn_url} alt={item.title} className='w-10 h-10 rounded object-cover' />
                                <span className='text-sm'>{item.title}</span>
                            </li>
                        ))
                    ) : (
                        <li className='px-4 py-2'>لا يوجد نتائج</li>
                    )}
                </ul>
            )}
        </div>
    );
}
