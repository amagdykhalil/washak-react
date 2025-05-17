import { Link } from 'react-router-dom'; // or 'next/link' if you're using Next.js
import Button from '../components/atoms/Button';

export default function NotFoundPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-430px)] bg-white px-4 text-center">
      <div className="max-w-md">
        <img
          src="/404.jpg" // replace with a real image or use an icon
          alt="404 Not Found"
          className="w-72 h-72 mx-auto mb-6"
        />
        <h1 className="text-4xl font-bold text-gray-800 mb-2">الصفحة غير موجودة</h1>
        <p className="text-gray-500 mb-[40px]  mt-[20px]">عذرًا، الصفحة التي تحاول الوصول إليها غير موجودة أو تم نقلها.</p>
		<Button name="العودة إلى الصفحة الرئيسية" href={"/"} cn={"!rounded-full"} />
      </div>
    </div>
  );
}
