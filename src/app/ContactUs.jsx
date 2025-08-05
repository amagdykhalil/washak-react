import { Phone, Mail, MapPin, Loader2 } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { api, BaseUrl, useApiGet } from '../config/Api';
import Input from '../components/atoms/Input';
import TextArea from '../components/atoms/TextArea';
import Button from '../components/atoms/Button';

// Yup validation schema
const contactSchema = yup.object().shape({
  name: yup.string().required('الاسم الكامل مطلوب'),
  phone: yup.string().required('رقم الجوال مطلوب'),
  email: yup.string().email('البريد الإلكتروني غير صحيح').required('البريد الإلكتروني مطلوب'),
  message: yup.string().required('الرسالة مطلوبة').min(10, 'الرسالة يجب أن تحتوي على الأقل 10 أحرف'),
});



export default function ContactUsPage() {
  const { data, loading } = useApiGet('/get-store-options');
  const contactData = data?.data?.contactus_page_data;

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({ resolver: yupResolver(contactSchema) });

  const onSubmit = async formData => {
    const toastId = toast.loading('جاري إرسال الرسالة...');

    await api
      .post(`/contact-us-query`, JSON.stringify(formData), {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then(res => {
        toast.success('تم إرسال رسالتك بنجاح!', { id: toastId });
        reset()
      })
      .catch(err => {
        toast.error(err.message || 'حدث خطأ أثناء إرسال الرسالة', { id: toastId });
      });
  };

  // Extract contact data with fallbacks
  const { contactus_page_title = 'اتصل بنا', contactus_page_content = '<p>نحن هنا للرد على جميع استفساراتك</p>', contactus_page_form_status = 'yes', contactus_page_map_status = 'no', contactus_page_map_latitude = '', contactus_page_map_longitude = '' } = contactData?.value || {};

  const showForm = contactus_page_form_status === 'yes';
  const showMap = contactus_page_map_status === 'yes' && contactus_page_map_latitude && contactus_page_map_longitude;

  return (
    <main className='bg-white'>
      {/* Header Section with Skeleton */}
      <section className='bg-gradient-to-b from-[var(--main)] to-[var(--hover-main)] text-white !py-12 px-4 text-center'>
        {loading ? (
          <div className='max-w-2xl mx-auto space-y-4'>
            <div className='h-8 bg-white/20 rounded-full w-1/2 mx-auto animate-pulse'></div>
            <div className='h-4 bg-white/20 rounded-full w-3/4 mx-auto animate-pulse'></div>
          </div>
        ) : (
          <>
            <h1 className='text-3xl font-bold mb-3'>{contactus_page_title}</h1>
            <div className='max-w-2xl mx-auto text-white/90' dangerouslySetInnerHTML={{ __html: contactus_page_content }} />
          </>
        )}
      </section>

      {/* Form and Contact Info */}
      <div className='max-w-6xl mx-auto p-4 grid md:grid-cols-2 gap-8 my-10'>
        {/* Contact Form with Skeleton */}
        {showForm ? (
          <div className='bg-gray-100/30 p-6 rounded-md shadow-lg border border-gray-200/60'>
            {loading ? (
              <div className='space-y-4'>
                <div className='h-8 bg-gray-200 rounded-full w-1/3 animate-pulse'></div>
                {[...Array(4)].map((_, i) => (
                  <div key={i} className='h-12 bg-gray-200 rounded-lg animate-pulse'></div>
                ))}
                <div className='h-32 bg-gray-200 rounded-lg animate-pulse'></div>
                <div className='h-12 bg-gray-300 rounded-lg animate-pulse'></div>
              </div>
            ) : (
              <>
                <h2 className='text-xl font-bold mb-6 text-[#002c5f]'>أرسل رسالة</h2>
                <form className='space-y-4'>
                  <Input name='name' type='text' place='الاسم الكامل' KEY='name' register={register('name')} error={errors?.name} required cn='w-full' cnInput='border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#002c5f] focus:border-transparent' />

                  <Input name='phone' type='tel' place='رقم الجوال' KEY='phone' register={register('phone')} error={errors?.phone} required cn='w-full' cnInput='border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#002c5f] focus:border-transparent' />

                  <Input name='email' type='email' place='البريد الإلكتروني' KEY='email' register={register('email')} error={errors?.email} required cn='w-full' cnInput='border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#002c5f] focus:border-transparent' />

                  <TextArea name='message' place='اكتب رسالتك هنا' KEY='message' register={register('message')} error={errors?.message} required cn='w-full' cnInput='border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#002c5f] focus:border-transparent h-32' />

                  <Button onclick={handleSubmit(onSubmit)} name={isSubmitting ? 'جاري الإرسال...' : 'إرسال الآن'} disabled={isSubmitting} loading={isSubmitting} icon={isSubmitting && <Loader2 className='animate-spin' />} />
                </form>
              </>
            )}
          </div>
        ) : null}

        {/* Contact Info with Skeleton */}
        <div className='space-y-6'>
          <div className='bg-gray-100/30 p-6 rounded-md shadow-lg border border-gray-200/60'>
            {loading ? (
              <div className='space-y-4'>
                <div className='h-8 bg-gray-200 rounded-full w-1/3 animate-pulse'></div>
                {[...Array(3)].map((_, i) => (
                  <div key={i} className='flex items-center gap-4'>
                    <div className='w-6 h-6 bg-gray-300 rounded-full'></div>
                    <div className='h-4 bg-gray-200 rounded-full w-3/4 animate-pulse'></div>
                  </div>
                ))}
              </div>
            ) : (
              <>
                <h2 className='text-xl font-bold text-[#002c5f] mb-6'>معلومات التواصل</h2>
                <div className='space-y-4'>
                  <div className='flex items-start gap-4'>
                    <MapPin className='text-[#ff8000] mt-1 flex-shrink-0' />
                    <span className='text-gray-700'>الرياض، المملكة العربية السعودية</span>
                  </div>
                  <div className='flex items-center gap-4'>
                    <Phone className='text-[#ff8000] flex-shrink-0' />
                    <a href='tel:+966555555555' className='text-gray-700 hover:text-[#002c5f] transition'>
                      +966 555 555 555
                    </a>
                  </div>
                  <div className='flex items-center gap-4'>
                    <Mail className='text-[#ff8000] flex-shrink-0' />
                    <a href='mailto:info@example.com' className='text-gray-700 hover:text-[#002c5f] transition'>
                      info@example.com
                    </a>
                  </div>
                </div>
              </>
            )}
          </div>
          {/* Map with Skeleton */}
          {loading ? (
            // Skeleton loader while loading
            <div className='bg-gray-100/30 p-1 rounded-md shadow-lg overflow-hidden border border-gray-200/60'>
              <div className='relative w-full h-64 rounded-lg overflow-hidden'>
                {/* Animated gradient background */}
                <div className='absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 animate-pulse'></div>

                {/* Map-like placeholder elements */}
                <div className='absolute top-4 left-4 w-8 h-8 bg-gray-300 rounded-full'></div>
                <div className='absolute bottom-8 right-8 w-16 h-4 bg-gray-300 rounded'></div>
                <div className='absolute bottom-20 left-1/2 w-24 h-6 bg-gray-300 rounded transform -translate-x-1/2'></div>

                {/* Grid pattern */}
                <div className='absolute inset-0 opacity-30'>
                  <div className='grid grid-cols-3 grid-rows-3 h-full w-full'>
                    {[...Array(9)].map((_, i) => (
                      <div key={i} className='border border-gray-200'></div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ) : showMap ? (
            // Actual map when loaded and showMap is true
            <div className='bg-gray-100/30 p-1 rounded-md shadow-lg overflow-hidden border border-gray-200/60'>
              <iframe className='w-full h-64 rounded-lg border-0' src={`https://maps.google.com/maps?q=${contactus_page_map_latitude},${contactus_page_map_longitude}&z=15&output=embed`} allowFullScreen loading='lazy' />
            </div>
          ) : null}{' '}
        </div>
      </div>
    </main>
  );
}
