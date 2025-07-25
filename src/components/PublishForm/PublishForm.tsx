import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import SelectCustom from '@/components/SelectCustom/SelectCustom';
import { Brands } from '@/types/brand';
import { Categories } from '@/types/category';
import { CONDITION, PIECE_COUNT } from '@/utils/constants';
import { useAuthModalStore } from '@/stores/useAuthModalStore';
import { User } from '@/types/user';
import ImageInput from '@/components/ImageInput';

interface PublishFormProps {
  brands: Brands;
  categories: Categories;
  user?: User | null;
}

const PublishForm = ({ categories, brands, user }: PublishFormProps) => {
  const [formData, setFormData] = useState({
    category: '',
    brand: '',
    pieceCount: '',
    condition: '',
    images: [] as string[],
  });
  const { open } = useAuthModalStore();
  const handleChange = (field: keyof typeof formData, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };


  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!user) open('login');
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
      <ImageInput formData={formData} setFormData={setFormData}/>
      <div className="pt-4">
        <Button className="w-full bg-gradient-to-r from-green-500 to-emerald-500 text-white hover:shadow-lg transition-all">
          Publier
        </Button>
      </div>
    </form>
  );
};

export default PublishForm;
