import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import SelectCustom from '@/components/SelectCustom/SelectCustom';
import { Brands } from '@/types/brand';
import { Categories, CategoryInput } from '@/types/category';
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
import { Loader } from 'lucide-react';
import MultiSelectWithSuggestions from '@/components/MultiSelectWithSuggestions';

interface PublishFormProps {
  brands: Brands;
  categories: Categories;
  user?: User | null;
}

type FieldError = {
  field: string;
  message: string;
};

type FormData = {
  categories: CategoryInput[];
  brand: string;
  pieceCount: string;
  condition: string;
  image: File | null;
  width?: number | null;
  height?: number | null;
};

const PublishForm = ({ categories, brands, user }: PublishFormProps) => {
  const [internalError, setInternalError] = useState<string>('');
  const [errors, setErrors] = useState<FieldError[]>([]);
  const [publishButton, setPublishButton] = useState<string | null>(null);
  const initialFormData: FormData = {
    categories: [],
    brand: '',
    pieceCount: '',
    condition: '',
    image: null,
    width: null,
    height: null,
  };
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [keepAdding, setKeepAdding] = useState<boolean>(false);
  const navigate = useNavigate();
  const { open } = useAuthModalStore();
  const queryClient = useQueryClient();
  const handleChange = (
    field: keyof typeof formData,
    value: string | string[] | CategoryInput[]
  ) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
    setErrors((prevErrors) => prevErrors.filter((err) => err.field !== field));
  };

  console.log(formData.categories)

  const publish = useMutation({
    mutationFn: publishPuzzle,
    onSuccess: () => {
      setInternalError('');
      queryClient.invalidateQueries({ queryKey: ['categories'] });
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
    const newErrors: FieldError[] = [];
    if (!formData.condition)
      newErrors.push({
        field: 'condition',
        message: "Tu dois renseigner l'état de ton puzzle",
      });
    if (formData.categories.length < 1)
      newErrors.push({
        field: 'categories',
        message: 'Tu dois renseigner au moins une catégorie pour ton puzzle',
      });
    if (!formData.brand)
      newErrors.push({
        field: 'brand',
        message: 'Tu dois renseigner la marque de ton puzzle',
      });
    if (!formData.pieceCount)
      newErrors.push({
        field: 'pieceCount',
        message: 'Tu dois renseinger le nombre de pièces de ton puzzle ?',
      });
    if (!formData.image)
      newErrors.push({ field: 'image', message: 'Mets nous une petite image' });
    setErrors(newErrors);
    if (newErrors.length > 0) return;
    if (user) {
      publish.mutate({
        category_ids: formData.categories,
        brand_id: Number(formData.brand),
        piece_count: Number(formData.pieceCount),
        image: formData.image || null,
        condition: formData.condition,
        height: formData.height ? Number(formData.height) : null,
        width: formData.width ? Number(formData.width) : null,
        owner: user.id,
      });
    } else {
      open('login');
    }
  };

  return (
    <form className="space-y-6" onSubmit={handleSubmit}>
      <div className="flex flex-col gap-6">
        <div className="flex flex-col sm:flex-row gap-6">
          <div className="flex-1 space-y-2">
            <MultiSelectWithSuggestions
              data={categories}
              values={formData.categories}
              onChange={(vals) => handleChange('categories', vals)}
              className={`
                ${
                  errors.some((err) => err.field == 'categories')
                    ? 'border-red-500'
                    : 'border-emerald-500'
                }
              `}
            />
          </div>

          <div className="flex-1 space-y-2">
            <Input
              id="pieceCount"
              name="pieceCount"
              type="number"
              placeholder="Nombre de pièce"
              value={formData.pieceCount}
              onChange={(e) =>
                handleChange(
                  e.target.name as keyof typeof formData,
                  e.target.value
                )
              }
              className={`border placeholder:text-neutral-800 bg-white w-full h-12 text-sm ${
                errors.some((err) => err.field == 'pieceCount')
                  ? 'border-red-500 focus-visible:border-red-500 focus-visible:ring-0'
                  : 'border-emerald-500 focus-visible:border-emerald-500 focus-visible:ring-0'
              } focus:outline-none`}
            />
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-6">
          <div className="flex-1 space-y-2">
            <SelectCustom
              label="Marque"
              onlyLabel={true}
              data={brands}
              type="brand"
              value={formData.brand}
              onChange={(_, value) => handleChange('brand', value)}
              className={`w-full h-12 focus:border-green-500 ${
                errors.some((err) => err.field == 'brand')
                  ? 'border-red-500'
                  : 'border-emerald-500'
              }`}
            />
          </div>

          <div className="flex-1 space-y-2">
            <SelectCustom
              label="État"
              onlyLabel={true}
              data={CONDITION}
              type="condition"
              value={formData.condition}
              onChange={(_, value) => handleChange('condition', value)}
              className={`w-full h-12 focus:border-green-500 ${
                errors.some((err) => err.field == 'condition')
                  ? 'border-red-500'
                  : 'border-emerald-500'
              }`}
            />
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-6">
          <div className="flex-1 space-y-1">
            <div
              className={`
                relative flex rounded-md transition
                focus-within:ring-2 focus-within:ring-emerald-500 focus-within:ring-offset-2 focus-within:outline-none
                transition-shadow duration-200 ease-in-out
              `}
            >
              <Input
                id="width"
                name="width"
                type="number"
                min={0}
                placeholder="Largeur (optionnel)"
                value={formData.width ?? ''}
                onChange={(e) => handleChange('width', e.target.value)}
                className={`border bg-white w-full h-12 pr-14 rounded-r-none focus-visible:ring-0 placeholder:text-black text-sm ${
                  errors.some((err) => err.field == 'width')
                    ? 'border-red-500'
                    : 'border-emerald-500'
                }`}
              />
              <div
                className={`flex items-center px-3 bg-gray-100 border border-l-0 rounded-r-md text-gray-600 text-sm ${
                  errors.some((err) => err.field == 'width')
                    ? 'border-red-500'
                    : 'border-emerald-500'
                }`}
              >
                cm
              </div>
            </div>
          </div>
          <div className="flex-1 space-y-1">
            <div
              className={`
                relative flex rounded-md transition
                focus-within:ring-2 focus-within:ring-emerald-500 focus-within:ring-offset-2 focus-within:outline-none
                transition-shadow duration-200 ease-in-out
              `}
            >
              <Input
                id="height"
                name="height"
                type="number"
                min={0}
                placeholder="Hauteur (optionnel)"
                value={formData.height ?? ''}
                onChange={(e) => handleChange('height', e.target.value)}
                className={`border bg-white w-full h-12 pr-14 rounded-r-none focus-visible:ring-0 placeholder:text-black text-sm ${
                  errors.some((err) => err.field == 'height')
                    ? 'border-red-500'
                    : 'border-emerald-500'
                }`}
              />
              <div
                className={`flex items-center px-3 bg-gray-100 border border-l-0 rounded-r-md text-gray-600 text-sm ${
                  errors.some((err) => err.field == 'height')
                    ? 'border-red-500'
                    : 'border-emerald-500'
                }`}
              >
                cm
              </div>
            </div>
          </div>
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
      {errors.length > 0 && (
        <div className="text-red-500 text-sm">{errors[0].message}</div>
      )}

      <div
        className="
          flex flex-row sm:flex-row gap-3 sm:gap-5
          w-full z-50
          border-gray-200
          sm:static sm:bg-transparent sm:p-0
        "
      >
        <Button
          className="flex-1 border border-green-500 text-green-500 bg-white hover:bg-green-50 transition-all"
          onClick={() => {
            setKeepAdding(true);
            setPublishButton('publishAndAdd');
          }}
          disabled={publish.isPending}
        >
          Publier et ajouter un autre
          {publish.isPending && publishButton == 'publishAndAdd' && (
            <Loader className="animate-spin" size={16} />
          )}
        </Button>
        <Button
          className="flex-1 bg-gradient-to-r from-green-500 to-emerald-500 text-white hover:shadow-lg transition-all"
          onClick={() => {
            setKeepAdding(false);
            setPublishButton('publish');
          }}
          disabled={publish.isPending}
        >
          Publier
          {publish.isPending && publishButton == 'publish' && (
            <Loader className="animate-spin" size={16} />
          )}
        </Button>
      </div>
    </form>
  );
};

export default PublishForm;
