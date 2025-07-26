import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import SelectCustom from '@/components/SelectCustom/SelectCustom';
import { Brands } from '@/types/brand';
import { Categories } from '@/types/category';
import { CONDITION, PIECE_COUNT } from '@/utils/constants';
import { useAuthModalStore } from '@/stores/useAuthModalStore';
import { User } from '@/types/user';
import ImageInput from '@/components/ImageInput';
import { useMutation } from '@tanstack/react-query';
import { publishPuzzle } from '@/service/puzzle';
import { AxiosError } from 'axios';
import { useNavigate } from 'react-router';
import { toast } from 'sonner';

interface PublishFormProps {
  brands: Brands;
  categories: Categories;
  user?: User | null;
}

export type FormData = {
  category: string;
  brand: string;
  pieceCount: string;
  condition: string;
  image: File | null;
};

const PublishForm = ({ categories, brands, user }: PublishFormProps) => {
  const [internalError, setInternalError] = useState<string>('');
  const [errors, setErrors] = useState<string[]>([]);
  const [formData, setFormData] = useState<FormData>({
    category: '',
    brand: '',
    pieceCount: '',
    condition: '',
    image: null,
  });
  const navigate = useNavigate();
  const { open } = useAuthModalStore();
  const handleChange = (field: keyof typeof formData, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
    setErrors((prevErrors) => prevErrors.filter((err) => err !== field));
  };

  const publish = useMutation({
    mutationFn: publishPuzzle,
    onSuccess: () => {
      setInternalError('');
      toast.success('Puzzle publié avec succès !');
      navigate('/puzzles');
    },
    onError: (error) => {
      const axiosError = error as AxiosError<{ error: string }>;
      console.error(axiosError);
      setInternalError(
        axiosError.response?.data?.error || 'Une erreur est survenue'
      );
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newErrors: string[] = [];
    if (!formData.condition) newErrors.push('condition');
    if (!formData.category) newErrors.push('category');
    if (!formData.brand) newErrors.push('brand');
    if (!formData.pieceCount) newErrors.push('pieceCount');
    setErrors(newErrors);
    if (newErrors.length > 0) return;
    if (user) {
      publish.mutate({
        category_id: Number(formData.category),
        brand_id: Number(formData.brand),
        piece_count: Number(formData.pieceCount),
        image: formData.image || null,
        condition: formData.condition,
        owner: user.id,
      });
    } else {
      open('login');
    }
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
            className={`focus:border-green-500 ${
              errors.includes('category')
                ? 'border-red-500'
                : 'border-emerald-500'
            }`}
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
              className={`focus:border-green-500 ${
                errors.includes('pieceCount')
                  ? 'border-red-500'
                  : 'border-emerald-500'
              }`}
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
            className={`focus:border-green-500 ${
              errors.includes('brand') ? 'border-red-500' : 'border-emerald-500'
            }`}
          />
        </div>

        <div className="space-y-2">
          <SelectCustom
            label="État"
            onlyLabel={true}
            data={CONDITION}
            type="condition"
            onChange={(_, value) => handleChange('condition', value)}
            className={`focus:border-green-500 ${
              errors.includes('condition')
                ? 'border-red-500'
                : 'border-emerald-500'
            }`}
          />
        </div>
      </div>
      <ImageInput setFormData={setFormData} />
      {internalError && (
        <div className="text-red-500 text-sm">{internalError}</div>
      )}
      <div className="pt-4">
        <Button className="w-full bg-gradient-to-r from-green-500 to-emerald-500 text-white hover:shadow-lg transition-all">
          Publier
        </Button>
      </div>
    </form>
  );
};

export default PublishForm;
