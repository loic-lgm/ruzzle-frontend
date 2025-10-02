import React from 'react';
import { Upload } from 'lucide-react';
import { CategoryInput } from '@/types/category';
import { BrandInput } from '@/types/brand';

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
  formData: FormData;
  errors: FieldError[];
}

const ImageInput = ({ setFormData, formData, errors }: ImageInputProps) => {
  const handleFiles = (fileList: FileList | null) => {
    if (!fileList) return;
    if (!fileList[0].type.startsWith('image/')) return;
    setFormData((prev) => ({
      ...prev,
      image: fileList[0],
    }));
  };

  const handleDrop = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    handleFiles(e.dataTransfer.files);
  };

  const removeImage = () => {
    setFormData((prev) => ({
      ...prev,
      image: null,
    }));
  };
  return (
    <div className="space-y-4">
      <label
        htmlFor="puzzle-image"
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
        className={`border-2 border-dashed ${
          (errors.some((err) => err.field == 'image') && !formData.image) ? 'border-red-500' : 'border-emerald-500'
        } rounded-lg p-8 text-center hover:border-green-500 transition-colors cursor-pointer block`}
      >
        <Upload className="h-8 w-8 mx-auto mb-4 text-emerald-500" />
        <div className="space-y-2">
          <p className="text-sm text-gray-600">
            {/* Glisser et déposez vos images ici, ou cliquez pour les sélectionner */}
            Glisser et déposez votre image ici, ou cliquez pour la sélectionner
          </p>
          <p className="text-xs text-gray-500">
            {/* Télécharger jusqu&apos;à 5 images (PNG, JPG, JPEG • 5MB max par
            image) */}
            Télécharger votre image (PNG, JPG, JPEG • 5MB max par image)
          </p>
        </div>
        <input
          id="puzzle-image"
          type="file"
          accept="image/png,image/jpeg,image/jpg"
          className="hidden"
          onChange={(e) => handleFiles(e.target.files)}
        />
      </label>

      <div className="flex flex-wrap gap-4">
        {formData.image && (
          <div
            key={URL.createObjectURL(formData.image)}
            className="relative w-24 h-24 border rounded-lg overflow-hidden"
          >
            <img
              src={URL.createObjectURL(formData.image)}
              alt={`preview-${URL.createObjectURL(formData.image)}`}
              className="object-cover w-full h-full"
            />
            <button
              onClick={removeImage}
              className="absolute top-1 right-1 bg-black bg-opacity-50 text-white rounded-full px-1 text-xs"
            >
              ✕
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageInput;
