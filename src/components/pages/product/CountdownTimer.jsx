import {useState , useEffect} from "react"

export const CountdownTimer = ({ countdownData, text }) => {
  const [timeLeft, setTimeLeft] = useState({ ...countdownData });

  useEffect(() => {
    const totalSeconds = parseInt(timeLeft.day) * 86400 + parseInt(timeLeft.hour) * 3600 + parseInt(timeLeft.min) * 60 + parseInt(timeLeft.sec);

    if (totalSeconds <= 0) return;

    const interval = setInterval(() => {
      setTimeLeft(prev => {
        let seconds = parseInt(prev.day) * 86400 + parseInt(prev.hour) * 3600 + parseInt(prev.min) * 60 + parseInt(prev.sec) - 1;

        if (seconds <= 0) {
          clearInterval(interval);
          return { day: '0', hour: '0', min: '0', sec: '0' };
        }

        const d = Math.floor(seconds / 86400);
        seconds %= 86400;
        const h = Math.floor(seconds / 3600);
        seconds %= 3600;
        const m = Math.floor(seconds / 60);
        const s = seconds % 60;

        return {
          day: String(d),
          hour: String(h),
          min: String(m),
          sec: String(s),
        };
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  if (!countdownData?.status) return null;

  return (
    <div className='flex flex-col justify-start w-fit mt-6 mb-4' data-aos='fade-up' data-aos-delay='300'>
      <div className='text-lg font-medium text-[var(--main)]'>{text || 'الوقت المتبقي على نهاية العرض'} :</div>
      <div className='flex gap-2 rtl:flex-row-reverse rtl:justify-end mt-2'>
        <TimeBox value={String(timeLeft.day).padStart(2, '0')} label='يوم' />
        <TimeBox value={String(timeLeft.hour).padStart(2, '0')} label='ساعة' />
        <TimeBox value={String(timeLeft.min).padStart(2, '0')} label='دقيقة' />
        <TimeBox value={String(timeLeft.sec).padStart(2, '0')} label='ثانية' highlighted />
      </div>
    </div>
  );
};

const TimeBox = ({ value, label, highlighted = false }) => (
  <div className='flex flex-col items-center gap-1'>
    <div className={`w-[65px] h-[65px] flex items-center justify-center rounded-[6px] text-2xl shadow border ${highlighted ? 'bg-[#0a2a5c] text-white' : 'bg-[#f8fafb] border-[#f0f1f1] text-gray-700'}`} style={{ fontFamily: 'Numbers' }}>
      {value}
    </div>
    <div className='text-sm text-[#0a2a5c] font-bold'>{label}</div>
  </div>
);
