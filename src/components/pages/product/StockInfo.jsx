import { CheckCircle, Tag, XCircle } from 'lucide-react';

export const StockInfo = ({ stock }) =>
  stock && (
    <div className=' text-sm text-gray-800 space-y-4 transition-all duration-300'  data-aos='fade-up' >
      {stock?.sku && (
        <div className='grid grid-cols-[135px,1fr] '>
          <span className='font-[600] text-sm flex items-center gap-2 text-gray-800'>
            <Tag size={18} className='text-[var(--main)]' />
            رمز المنتج (SKU)
          </span>
          <span className='text-[var(--main)] font-semibold tracking-wide'>{stock.sku}</span>
        </div>
      )}

      {stock?.stock_manage != 0 && (
        <div className='grid grid-cols-[135px,1fr] '>
          <span className='font-[600] text-sm  text-gray-800'>الكمية في المخزون</span>
          <span className={`font-bold ${stock.stock_qty > 0 ? 'text-[var(--second)]' : 'text-red-600'}`}>{stock.stock_qty}</span>
        </div>
      )}

      <div className='grid grid-cols-[135px,1fr] '>
        <span className='font-[600] text-sm text-gray-800'>حالة المخزون</span>
        <span className='font-semibold flex items-center gap-2'>
          {stock.stock_status === 1 ? (
            <>
              <CheckCircle size={18} className='text-[var(--second)]' />
              <span className='text-[var(--second)]'>متوفر</span>
            </>
          ) : (
            <>
              <XCircle size={18} className='text-red-600' />
              <span className='text-red-600'>غير متوفر</span>
            </>
          )}
        </span>
      </div>
    </div>
  );
