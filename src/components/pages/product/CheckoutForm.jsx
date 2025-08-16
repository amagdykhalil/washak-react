import { motion } from "framer-motion";
import Title from '../../atoms/Title';

export const CheckoutForm = ({ checkoutFields, register, errors }) => {
  return (
    <motion.form
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: 'auto' }}
      exit={{ opacity: 0, height: 0 }}
      className='space-y-4 !my-8 bg-white rounded-lg overflow-hidden'
      data-aos='fade-up'
    >
      <Title title1='يرجى ادخال معلوماتك ' title2='لإكمال الطلب' />
      {checkoutFields.map(field => {
        if (!field.is_enable) return null;

        const hasError = errors[field.backend_field_name];

        return (
          <div key={field.id} className='flex flex-col gap-[10px] relative'>
            <FieldLabel field={field} />
            <FieldWrapper field={field} hasError={hasError}>
              {field.type === 'select' ? (
                <FieldSelect field={field} register={register} />
              ) : field.type === 'textarea' ? (
                <FieldTextarea field={field} register={register} />
              ) : field.type === 'hidden' ? (
                <FieldHidden field={field} register={register} />
              ) : (
                <FieldInput field={field} register={register} />
              )}
            </FieldWrapper>
            <FieldError error={hasError} />
          </div>
        );
      })}
    </motion.form>
  );
};

const FieldLabel = ({ field }) => (
  field.type !== 'hidden' && (
    <label htmlFor={field.backend_field_name} className='text-[#333333] text-base font-normal'>
      {field.field_text}
      {field.is_required ? <span className='text-[#ff4b55]'>*</span> : ""}
    </label>
  )
);

const FieldWrapper = ({ field, children, hasError }) => (
  <div className={`${field.type !== 'textarea' && 'h-[50px]'} ${field.type === 'hidden' && 'hidden'} relative overflow-hidden rounded-[8px] text-sm border ${hasError ? 'border-[#ff4b55]' : 'border-[#EEEEEE]'} w-full`}>
    {children}
  </div>
);

const FieldInput = ({ field, register }) => (
  <input
    type={field.type?.toLowerCase() || 'text'}
    id={field.backend_field_name}
    {...register(field.backend_field_name, {
      required: field.is_required ? `${field.field_text} مطلوب` : false,
      ...(field.min_length && {
        minLength: {
          value: field.min_length,
          message: `${field.field_text} يجب أن يحتوي على ${field.min_length} أحرف على الأقل`,
        },
      }),
      ...(field.max_length && {
        maxLength: {
          value: field.max_length,
          message: `${field.field_text} يجب ألا يتجاوز ${field.max_length} `,
        },
      }),
    })}
    min={field.min_length ? field.min_length : undefined}
    max={field.max_length ? field.max_length : undefined}
    placeholder={field.field_placeholder}
    className='placeholder:text-[#A5A5A5] text-[#222] font-normal w-full px-[10px] h-full outline-none'
  />
);

const FieldTextarea = ({ field, register }) => (
  <textarea
    id={field.backend_field_name}
    {...register(field.backend_field_name, {
      required: field.is_required ? `${field.field_text} مطلوب` : false,
      ...(field.min_length && {
        minLength: {
          value: field.min_length,
          message: `${field.field_text} يجب أن يحتوي على ${field.min_length} أحرف على الأقل`,
        },
      }),
      ...(field.max_length && {
        maxLength: {
          value: field.max_length,
          message: `${field.field_text} يجب ألا يتجاوز ${field.max_length} حرفًا`,
        },
      }),
    })}
    placeholder={field.field_placeholder}
    className={`placeholder:text-[#A5A5A5] text-[#222] font-normal w-full px-[10px] py-[8px] outline-none resize-none 
    ${field.min_length && field.min_length > 100 ? 'h-[150px]' : 'h-[100px]'}`}
  />
);

const FieldSelect = ({ field, register }) => (
  <select
    id={field.backend_field_name}
    defaultValue={field.default_option || ''}
    {...register(field.backend_field_name, {
      required: field.is_required ? `${field.field_text} مطلوب` : false,
    })}
    className='text-[#222] font-normal w-full px-[10px] h-full outline-none bg-white'
  >
    <option value="" disabled>{field.field_placeholder || 'اختر خياراً'}</option>
    {field.settings?.split(',').map(option => (
      <option key={option.trim()} value={option.trim()}>
        {option.trim()}
      </option>
    ))}
  </select>
);

const FieldHidden = ({ field, register }) => (
  <input
    type="hidden"
    id={field.backend_field_name}
    value={field.default_value ?? ''}
    {...register(field.backend_field_name)}
  />
);

const FieldError = ({ error }) => (
  error && <div className='text-[#ff4b55] mt-[-10px] text-sm'>{error.message}</div>
);


