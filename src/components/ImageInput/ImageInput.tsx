import React, { useState } from 'react';
import { Upload } from 'lucide-react';
import { FormData } from '@/components/PublishForm/PublishForm';

interface ImageInputProps {
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
}

const ImageInput = ({ setFormData }: ImageInputProps) => {
  const [imageURL, setImageURL] = useState('');
  const handleFiles = (fileList: FileList | null) => {
    if (!fileList) return;
    if (!fileList[0].type.startsWith('image/')) return;
    setImageURL(URL.createObjectURL(fileList[0]));

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
    setImageURL('');
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
          type="file"
          accept="image/png,image/jpeg,image/jpg"
          multiple
          className="hidden"
          onChange={(e) => handleFiles(e.target.files)}
        />
      </label>

      <div className="flex flex-wrap gap-4">
        {imageURL && (
          <div
            key={imageURL}
            className="relative w-24 h-24 border rounded-lg overflow-hidden"
          >
            <img
              src={imageURL}
              alt={`preview-${imageURL}`}
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
