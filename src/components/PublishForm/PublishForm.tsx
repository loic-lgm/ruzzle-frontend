import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import SelectCustom from '@/components/SelectCustom/SelectCustom';
import { Brands } from '@/types/brand';
import { Categories } from '@/types/category';
import { CONDITION } from '@/utils/constants';
import { useAuthModalStore } from '@/stores/useAuthModalStore';
import { User } from '@/types/user';
import ImageInput from '@/components/ImageInput';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { publishPuzzle } from '@/service/puzzle';
import { AxiosError } from 'axios';
import { useNavigate } from 'react-router';
import { toast } from 'sonner';
import { Input } from '@/components/ui/input';

interface PublishFormProps {
  brands: Brands;
  categories: Categories;
  user?: User | null;
}

type FormData = {
  category: string;
  brand: string;
  pieceCount: string;
  condition: string;
  image: File | null;
};

const PublishForm = ({ categories, brands, user }: PublishFormProps) => {
  const [internalError, setInternalError] = useState<string>('');
  const [errors, setErrors] = useState<string[]>([]);
  const initialFormData: FormData = {
    category: '',
    brand: '',
    pieceCount: '',
    condition: '',
    image: null,
  };
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [keepAdding, setKeepAdding] = useState<boolean>(false);
  const navigate = useNavigate();
  const { open } = useAuthModalStore();
  const queryClient = useQueryClient();
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
      queryClient.invalidateQueries({ queryKey: ['userPuzzles'] });
      toast.success('Puzzle publié avec succès !');
      setErrors([]);
      setInternalError('');
      setFormData(initialFormData);
      if (!keepAdding) navigate('/puzzles');
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
    if (!formData.image) newErrors.push('image');
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
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 items-stretch">
        <div className="space-y-2">
          <SelectCustom
            label="Catégorie"
            onlyLabel={true}
            data={categories}
            type="category"
            value={formData.category}
            onChange={(_, value) => handleChange('category', value)}
            className={`w-full h-12 focus:border-green-500 ${
              errors.includes('category')
                ? 'border-red-500'
                : 'border-emerald-500'
            }`}
          />
        </div>
        <div className="space-y-2">
          <Input
            id="pieceCount"
            name="pieceCount"
            type="number"
            placeholder="Nombre de pièces"
            value={formData.pieceCount}
            onChange={(e) =>
              handleChange(
                e.target.name as keyof typeof formData,
                e.target.value
              )
            }
            className={`border placeholder:text-neutral-800 bg-white w-full h-12 ${
              errors.includes('pieceCount')
                ? 'border-red-500 focus-visible:border-red-500 focus-visible:ring-0'
                : 'border-emerald-500 focus-visible:border-emerald-500 focus-visible:ring-0'
            } focus:outline-none`}
          />
        </div>
        <div className="space-y-2">
          <SelectCustom
            label="Marque"
            onlyLabel={true}
            data={brands}
            type="brand"
            value={formData.brand}
            onChange={(_, value) => handleChange('brand', value)}
            className={`w-full h-12 focus:border-green-500 ${
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
            value={formData.condition}
            onChange={(_, value) => handleChange('condition', value)}
            className={`w-full h-12 focus:border-green-500 ${
              errors.includes('condition')
                ? 'border-red-500'
                : 'border-emerald-500'
            }`}
          />
        </div>
      </div>

      <ImageInput
        setFormData={setFormData}
        formData={formData}
        errors={errors}
      />

      {internalError && (
        <div className="text-red-500 text-sm">{internalError}</div>
      )}

      <div className="pt-4 flex flex-col sm:flex-row gap-3 sm:gap-5">
        <Button
          className="flex-1 border border-green-500 text-green-500 bg-white hover:bg-green-50 transition-all"
          onClick={() => setKeepAdding(true)}
        >
          Publier et ajouter un autre
        </Button>
        <Button
          className="flex-1 bg-gradient-to-r from-green-500 to-emerald-500 text-white hover:shadow-lg transition-all"
          onClick={() => setKeepAdding(false)}
        >
          Publier
        </Button>
      </div>
    </form>
  );
};

export default PublishForm;
