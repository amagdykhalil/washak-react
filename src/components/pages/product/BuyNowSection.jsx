 import Button from "../../atoms/Button";
import {  motion } from "framer-motion";
import { Minus, Plus, ShoppingBag  } from "lucide-react";

export const BuyNowSection = ({  showValidation, isBuyNowLoading,  handleBuyNow,   getValues, setValue, increaseQuantity, decreaseQuantity }) => (
  <div className='w-full flex flex-col items-center gap-3 mt-8 px-4 sm:px-0' data-aos='fade-up' >

    {showValidation && (
      <div className='w-full p-3 bg-red-100 text-red-700 rounded-md text-sm text-center' initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
        يرجى تحديد جميع الخيارات المطلوبة قبل الشراء
      </div>
    )}

    <div className='flex items-center w-full gap-6'>
      <Button loading={isBuyNowLoading} cn='w-full flex-row-reverse h-[50px] rounded-md text-white bg-primary hover:bg-primary/90 transition' onclick={handleBuyNow} name={"اشترِ الآن"} icon={<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7.17132 1.66699L4.22461 4.69199" stroke="white" strokeWidth="1.5" stroke-miterlimit="10" strokeLinecap="round" strokeLinejoin="round"/><path d="M12.3652 1.66699L15.3119 4.69199" stroke="white" strokeWidth="1.5" stroke-miterlimit="10" strokeLinecap="round" strokeLinejoin="round"/><path d="M1.62891 6.54167C1.62891 5 2.43478 4.875 3.43601 4.875H16.102C17.1032 4.875 17.9091 5 17.9091 6.54167C17.9091 8.33333 17.1032 8.20833 16.102 8.20833H3.43601C2.43478 8.20833 1.62891 8.33333 1.62891 6.54167Z" stroke="white" strokeWidth="1.5"/><path d="M7.94531 11.667V14.6253" stroke="white" strokeWidth="1.5" strokeLinecap="round"/><path d="M11.6895 11.667V14.6253" stroke="white" strokeWidth="1.5" strokeLinecap="round"/><path d="M3.99609 15.533C4.25658 17.1497 4.88336 18.333 7.21143 18.333H12.1199C14.6515 18.333 15.0259 17.1997 15.319 15.633L16.6865 8.33301" stroke="white" strokeWidth="1.5" strokeLinecap="round"/><path d="M2.84961 8.33301L3.4357 11.983" stroke="white" strokeWidth="1.5" strokeLinecap="round"/></svg>} />
      <QuantityControl  getValues={getValues} setValue={setValue} increaseQuantity={increaseQuantity} decreaseQuantity={decreaseQuantity} />
    </div>
  </div>
);




export const QuantityControl = ({ getValues, setValue, increaseQuantity, decreaseQuantity }) => (
  <div className='w-fit flex items-center gap-2' data-aos='fade-up'  >
    <div className='text-base text-[#051959] font-medium'>الكمية:</div>
    <div className='flex items-center justify-between gap-2 border border-[#EEEEEE] rounded-md px-2 py-2 bg-white'>
      <button onClick={increaseQuantity} className='rounded-md px-3 py-2 hover:bg-gray-200 transition' disabled={getValues('qty') >= 999} aria-label='زيادة الكمية'>
        <Plus size={18} />
      </button>
      <span className='h-6 w-[1px] bg-[#eee]'></span>
      <span className='w-10 text-center font-bold text-[#051959]'>{getValues('qty') || 1}</span>
      <span className='h-6 w-[1px] bg-[#eee]'></span>
      <button onClick={decreaseQuantity} className='rounded-md px-3 py-2 hover:bg-gray-200 transition' disabled={(getValues('qty') || 1) <= 1} aria-label='تقليل الكمية'>
        <Minus size={18} />
      </button>
    </div>
  </div>
);