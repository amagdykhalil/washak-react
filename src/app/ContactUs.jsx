'use client';

import { useState } from 'react';
import { Phone, Mail, MapPin, Loader2 } from 'lucide-react';
import { useApiGet } from '../config/Api';

export default function ContactUsPage() {
  const { data, loading } = useApiGet('/get-store-options');
  const contactData = data?.data?.contact_us_page_data;
// {
//     "value": {
//         "contactus_page_title": "اتصل بنا",
//         "contactus_page_content": "<h2 style=\"text-align:center;\">يسعدنا تواصلك معنا</h2><p style=\"text-align:center;\">&nbsp;</p><p style=\"text-align:center;\">&nbsp;</p><p style=\"text-align:center;\"> إذا كنت تواجه أي مشكلة أو ترغب في إسترجاع أو إستبدال المنتج لا تتردد بنا</p><p>&nbsp;</p>",
//         "contactus_page_form_status": "yes",
//         "contactus_page_map_status": "no",
//         "contactus_page_map_latitude": "",
//         "contactus_page_map_longitude": "",
//         "contactus_page_map_title": "",
//         "contactus_page_map_sub_title": "",
//         "contactus_page_map_title_color": "#000000",
//         "contactus_page_map_sub_title_color": "#000000",
//         "contactus_page_url": "https://alitest256.dukanomar.com/contact-us"
//     },
//     "status": 1
// }
  const [form, setForm] = useState({
    name: '',
    phone: '',
    email: '',
    message: '',
  });

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Extract contact data with fallbacks
  const { contactus_page_title = 'اتصل بنا', contactus_page_content = '<p>نحن هنا للرد على جميع استفساراتك</p>', contactus_page_form_status = 'yes', contactus_page_map_status = 'no', contactus_page_map_latitude = '', contactus_page_map_longitude = '' } = contactData?.value || {};

  const showForm = contactus_page_form_status === 'yes';
  const showMap = contactus_page_map_status === 'yes' && contactus_page_map_latitude && contactus_page_map_longitude;

  return (
    <main className='bg-white  '>
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
          <div className='bg-gray-50 p-6 rounded-xl shadow-lg border border-gray-100'>
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
                  <input name='name' type='text' placeholder='الاسم الكامل' className='w-full p-3 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-[#002c5f] focus:border-transparent' value={form.name} onChange={handleChange} />
                  <input name='phone' type='tel' placeholder='رقم الجوال' className='w-full p-3 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-[#002c5f] focus:border-transparent' value={form.phone} onChange={handleChange} />
                  <input name='email' type='email' placeholder='البريد الإلكتروني' className='w-full p-3 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-[#002c5f] focus:border-transparent' value={form.email} onChange={handleChange} />
                  <textarea name='message' placeholder='اكتب رسالتك هنا' className='w-full p-3 border border-gray-300 rounded-lg text-sm h-32 resize-none focus:ring-2 focus:ring-[#002c5f] focus:border-transparent' value={form.message} onChange={handleChange} />
                  <button type='submit' className='bg-[#002c5f] text-white px-8 py-3 rounded-lg hover:bg-[#001d3f] transition-all duration-300 w-full font-medium flex items-center justify-center gap-2'>
                    إرسال الآن
                  </button>
                </form>
              </>
            )}
          </div>
        ) : null}

        {/* Contact Info with Skeleton */}
        <div className='space-y-6'>
          <div className='bg-gray-50 p-6 rounded-xl shadow-lg border border-gray-100'>
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
          {showMap ? <div className='bg-gray-50 p-1 rounded-xl shadow-lg overflow-hidden'>{loading ? <div className='w-full h-64 bg-gray-200 rounded-lg animate-pulse'></div> : <iframe className='w-full h-64 rounded-lg border-0' src={`https://maps.google.com/maps?q=${contactus_page_map_latitude},${contactus_page_map_longitude}&z=15&output=embed`} allowFullScreen loading='lazy' />}</div> : null}
        </div>
      </div>
    </main>
  );
}
