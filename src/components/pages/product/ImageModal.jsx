
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import Img from "../../atoms/Image";
import { createPortal } from 'react-dom';
import { useOutsideClick } from "../../../hooks/useOutsideClick";
import { useRef } from "react";

export const ImageModal = ({ isModalOpen, setIsModalOpen, selectedImage, product }) => {
  const modalRoot = document.getElementById('root');
  const modalContentRef = useRef(null);
  useOutsideClick(modalContentRef, () => setIsModalOpen(false));

  if (!modalRoot) return null;

  return createPortal(<AnimatePresence>
    {isModalOpen && (
      <motion.div className='fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70' initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
        <motion.div ref={modalContentRef} className='relative w-[90vw] max-w-4xl' initial={{ scale: 0.9 }} animate={{ scale: 1 }} exit={{ scale: 0.9 }}>
          <motion.button onClick={() => setIsModalOpen(false)} className='max-md:w-[30px] max-md:h-[30px] border border-white w-[40px] h-[40px] rounded-sm flex items-center justify-center cursor-pointer absolute top-[20px] right-[20px] hover:scale-[1.05] duration-500 hover:opacity-80' aria-label='Close modal' whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
            <X className='stroke-white' />
          </motion.button>
          <Img src={selectedImage} alt={product?.title} className='w-full h-auto rounded-lg shadow-lg' />
        </motion.div>
      </motion.div>
    )}
  </AnimatePresence>, modalRoot)
};