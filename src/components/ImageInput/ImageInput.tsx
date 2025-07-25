import React from 'react';
import { Upload } from 'lucide-react';

type FormData = {
  category: string;
  brand: string;
  pieceCount: string;
  condition: string;
  images: string[];
};

interface ImageInputProps {
  formData: FormData;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
}

const ImageInput = ({ formData, setFormData }: ImageInputProps) => {
  const handleFiles = (fileList: FileList | null) => {
    if (!fileList) return;

    const newImages = Array.from(fileList)
      .slice(0, 5 - formData.images.length)
      .filter((file) => file.type.startsWith('image/'))
      .map((file) => URL.createObjectURL(file));

    setFormData((prev) => ({
      ...prev,
      images: [...prev.images, ...newImages],
    }));
  };

  const handleDrop = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    handleFiles(e.dataTransfer.files);
  };

  const removeImage = (url: string) => {
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((img) => img !== url),
    }));
  };
  return (
    <div className="space-y-4">
      <label
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
        className="border-2 border-dashed border-emerald-500 rounded-lg p-8 text-center hover:border-green-500 transition-colors cursor-pointer block"
      >
        <Upload className="h-8 w-8 mx-auto mb-4 text-emerald-500" />
        <div className="space-y-2">
          <p className="text-sm text-gray-600">
            Glisser et déposez vos images ici, ou cliquez pour les sélectionner
          </p>
          <p className="text-xs text-gray-500">
            Télécharger jusqu&apos;à 5 images (PNG, JPG, JPEG • 5MB max par
            image)
          </p>
        </div>
        <input
          type="file"
          accept="image/png,image/jpeg,image/jpg"
          multiple
          className="hidden"
          onChange={(e) => handleFiles(e.target.files)}
        />
      </label>

      <div className="flex flex-wrap gap-4">
        {formData.images.map((src, idx) => (
          <div
            key={idx}
            className="relative w-24 h-24 border rounded-lg overflow-hidden"
          >
            <img
              src={src}
              alt={`preview-${idx}`}
              className="object-cover w-full h-full"
            />
            <button
              onClick={() => removeImage(src)}
              className="absolute top-1 right-1 bg-black bg-opacity-50 text-white rounded-full px-1 text-xs"
            >
              ✕
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageInput;
