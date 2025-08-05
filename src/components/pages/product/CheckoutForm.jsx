import { AnimatePresence , motion } from "framer-motion";
import Title from '../../atoms/Title';


export const CheckoutForm = ({ checkoutFields, register, errors }) => (

      <motion.form initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className='space-y-4 !my-8 bg-white rounded-lg overflow-hidden' data-aos='fade-up'>
        <Title title1='يرجى ادخال معلوماتك ' title2='لإكمال الطلب' />
        {checkoutFields.map(
          field =>
            field.is_enable && (
              <div key={field.id} className='flex flex-col gap-[10px] relative'>
                <label htmlFor={field.backend_field_name} className='text-[#333333] text-base font-normal'>
                  {field.field_text}
                  {field.is_required && <span className='text-[#ff4b55]'>*</span>}
                </label>

                <div className={`h-[50px] relative overflow-hidden rounded-[8px] text-sm border ${errors[field.backend_field_name] ? 'border-[#ff4b55]' : 'border-[#EEEEEE]'} w-full`}>
                  <input
                    type={field.type || 'text'}
                    id={field.backend_field_name}
                    {...register(field.backend_field_name, {
                      required: field.is_required ? `${field.field_text} مطلوب` : false,
                    })}
                    placeholder={field.field_placeholder}
                    className='placeholder:text-[#A5A5A5] text-[#222] font-normal w-full px-[10px] h-full outline-none'
                  />
                </div>

                {errors[field.backend_field_name] && <div className='text-[#ff4b55] mt-[-10px] text-sm'>{errors[field.backend_field_name].message}</div>}
              </div>
            ),
        )}
      </motion.form>
);
