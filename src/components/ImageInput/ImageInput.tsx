import React, { useRef, useState } from 'react';
import { Upload, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { CategoryInput } from '@/types/category';
import { BrandInput } from '@/types/brand';
import CropModal from '@/components/CropModal';

type FormData = {
  categories: CategoryInput[];
  brand: BrandInput | null;
  pieceCount: string;
  condition: string;
  image: File | null;
};

type FieldError = {
  field: string;
  message: string;
};

interface ImageInputProps {
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
  errors: FieldError[];
}

const ImageInput = ({ setFormData, errors }: ImageInputProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [dragOver, setDragOver] = useState(false);
  const [isCropOpen, setIsCropOpen] = useState(false);
  const [imageToCrop, setImageToCrop] = useState<string | null>(null);

  const handleFiles = (fileList: FileList | null) => {
    if (!fileList || fileList.length === 0) return;
    const file = fileList[0];
    if (!file.type.startsWith('image/')) return;

    setImageToCrop(URL.createObjectURL(file));
    setIsCropOpen(true);
  };

  const handleDrop = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    setDragOver(false);
    handleFiles(e.dataTransfer.files);
  };

  const handleCropComplete = (croppedFile: File) => {
    const croppedUrl = URL.createObjectURL(croppedFile);
    setPreview(croppedUrl);
    setFormData((prev) => ({ ...prev, image: croppedFile }));
  };

  return (
    <div className="w-full">
      <label
        className={`flex flex-col items-center justify-center w-full border-2 border-dashed rounded-2xl p-6 cursor-pointer transition
          ${
            dragOver
              ? 'border-green-500 bg-green-50'
              : 'border-emerald-500 bg-transparent'
          }
          ${errors.some((e) => e.field === 'image') ? 'border-red-500' : ''}
        `}
        onDragOver={(e) => {
          e.preventDefault();
          setDragOver(true);
        }}
        onDragLeave={() => setDragOver(false)}
        onDrop={handleDrop}
        onClick={() => inputRef.current?.click()}
      >
        <AnimatePresence mode="wait">
          {preview ? (
            <motion.div
              key="preview"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              className="relative w-full"
            >
              <img
                src={preview}
                alt="Prévisualisation"
                className="w-full h-64 object-contain rounded-xl"
              />
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setPreview(null);
                  setFormData((prev) => ({ ...prev, image: null }));
                }}
                className="absolute top-2 right-2 bg-transparent hover:text-green-600 text-green-500 p-1 rounded-full shadow-sm cursor-pointer"
              >
                <X size={16} />
              </button>
            </motion.div>
          ) : (
            <motion.div
              key="upload-prompt"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="flex flex-col items-center text-center gap-3 py-6"
            >
              <div className="p-3 bg-emerald-100 rounded-full">
                <Upload className="text-emerald-600" size={28} />
              </div>
              <p className="text-sm text-gray-500">
                <span className="font-medium text-emerald-500">
                  Clique ou glisse une image
                </span>
                <br />
                JPG, PNG, WebP jusqu’à 5 Mo
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </label>

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => handleFiles(e.target.files)}
      />

      <CropModal
        open={isCropOpen}
        onOpenChange={setIsCropOpen}
        imageUrl={imageToCrop}
        onCropComplete={handleCropComplete}
        onCancel={() => setIsCropOpen(false)}
      />
    </div>
  );
};

export default ImageInput;
