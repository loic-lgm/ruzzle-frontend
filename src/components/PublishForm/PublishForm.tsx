import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Upload } from 'lucide-react';
import SelectCustom from '@/components/SelectCustom/SelectCustom';
import { Brands } from '@/types/brand';
import { Categories } from '@/types/category';
import { CONDITION, PIECE_COUNT } from '@/utils/constants';

interface PublishFormProps {
  brands: Brands;
  categories: Categories;
}

const PublishForm = ({ categories, brands }: PublishFormProps) => {
  const [formData, setFormData] = useState({
    category: '',
    brand: '',
    pieceCount: '',
    condition: '',
  });

  const handleChange = (field: keyof typeof formData, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <form className="space-y-6" onSubmit={handleSubmit}>
      <div className="flex justify-between gap-6">
        <div className="space-y-2">
          <SelectCustom
            label="Catégorie"
            onlyLabel={true}
            data={categories}
            type="category"
            onChange={(_, value) => handleChange('category', value)}
            className="border-emerald-500 focus:border-green-500"
          />
        </div>

        <div className="space-y-2">
          <div className="space-y-2">
            <SelectCustom
              label="Nombre de pièce"
              onlyLabel={true}
              data={PIECE_COUNT}
              type="pieceCount"
              onChange={(_, value) => handleChange('pieceCount', value)}
              className="border-emerald-500 focus:border-green-500"
            />
          </div>
        </div>

        <div className="space-y-2">
          <SelectCustom
            label="Marque"
            onlyLabel={true}
            data={brands}
            type="brand"
            onChange={(_, value) => handleChange('brand', value)}
            className="border-emerald-500 focus:border-green-500"
          />
        </div>

        <div className="space-y-2">
          <SelectCustom
            label="État"
            onlyLabel={true}
            data={CONDITION}
            type="condition"
            onChange={(_, value) => handleChange('condition', value)}
            className="border-emerald-500 focus:border-green-500"
          />
        </div>
      </div>

      <div className="space-y-2">
        <div className="border-2 border-dashed border-emerald-500 rounded-lg p-8 text-center hover:border-green-500 transition-colors">
          <Upload className="h-8 w-8 mx-auto mb-4 text-emerald-500" />
          <div className="space-y-2">
            <p className="text-sm text-gray-600">
              Glisser et déposez vos images de puzzle ici, ou cliquez pour
              sélectionner les fichiers
            </p>
            <p className="text-xs text-gray-500">
              Télécharger jusqu&apos;à 5 images (PNG, JPG, JPEG • 5MB max par
              image)
            </p>
          </div>
          <input type="file" multiple accept="image/*" className="hidden" />
        </div>
      </div>

      <div className="pt-4">
        <Button className="w-full bg-gradient-to-r from-green-500 to-emerald-500 text-white hover:shadow-lg transition-all">
          Publier
        </Button>
      </div>
    </form>
  );
};

export default PublishForm;
