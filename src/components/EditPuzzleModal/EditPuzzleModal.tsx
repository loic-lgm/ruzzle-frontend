import MultiSelectWithSuggestions from '@/components/MultiSelectWithSuggestions';
import SelectCustom from '@/components/SelectCustom/SelectCustom';
import SingleSelectWithSuggestions from '@/components/SingleSelectWithSuggestions';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { editPuzzle } from '@/service/puzzle';
import { Brand, BrandInput } from '@/types/brand';
import { Category, CategoryInput } from '@/types/category';
import { PublishOrEditPuzzleData, Puzzle } from '@/types/puzzle';
import { CONDITION } from '@/utils/constants';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useState } from 'react';
import { toast } from 'sonner';

interface EditPuzzleModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  puzzle: Puzzle;
  categories: Category[];
  brands: Brand[];
}

export type FormData = {
  categories: CategoryInput[];
  brand: BrandInput;
  pieceCount: number;
  condition: string;
  image: File | null;
  width?: number | null;
  height?: number | null;
};

type ConditionType = 'used' | 'new' | 'damage';

const EditPuzzleModal = ({
  open,
  onOpenChange,
  puzzle,
  brands,
  categories,
}: EditPuzzleModalProps) => {
  const [imageURL, setImageURL] = useState('');
  const [formData, setFormData] = useState<FormData>({
    categories: puzzle.categories.map((c) => c.id) as CategoryInput[],
    brand: puzzle.brand.id as BrandInput,
    pieceCount: puzzle.piece_count,
    condition: puzzle.condition!,
    image: null,
    width: puzzle.width ?? null,
    height: puzzle.height ?? null,
  });
  const queryClient = useQueryClient();

  const conditionLabels: Record<ConditionType, string> = {
    used: 'Usé',
    new: 'Neuf',
    damage: 'Abîmé',
  };

  const handleChange = (
    field: keyof typeof formData,
    value: string | File | CategoryInput[] | BrandInput | null
  ) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleFiles = (fileList: FileList | null) => {
    if (!fileList) return;
    if (!fileList[0].type.startsWith('image/')) return;
    setImageURL(URL.createObjectURL(fileList[0]));

    setFormData((prev) => ({
      ...prev,
      image: fileList[0],
    }));
  };

  const update = useMutation({
    mutationFn: ({
      hashid,
      data,
    }: {
      hashid: string;
      data: PublishOrEditPuzzleData;
    }) => editPuzzle(hashid, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['userPuzzles'] });
      queryClient.invalidateQueries({ queryKey: ['categories'] });
      queryClient.invalidateQueries({ queryKey: ['brands'] });
      queryClient.invalidateQueries({ queryKey: ['puzzle', variables.hashid] });
      onOpenChange(false);
      toast.success('Puzzle mis à jour avec succès !');
    },
    onError: (error) => {
      const axiosError = error as AxiosError<{ error: string }>;
      toast.error(
        axiosError.response?.data?.error || 'Une erreur est survenue'
      );
    },
  });

  const handleEdit = () => {
    update.mutate({
      hashid: puzzle.hashid!,
      data: {
        brand_input: formData.brand,
        category_inputs: formData.categories,
        piece_count: formData.pieceCount,
        condition: formData.condition,
        height: formData.height ?? null,
        width: formData.width ?? null,
        owner: puzzle.owner.id,
        ...(formData.image && { image: formData.image }),
      },
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange} modal={false}>
      <DialogContent className="sm:max-w-[500px] max-h-[90vh] flex flex-col pb-0 overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Modifier le puzzle</DialogTitle>
          <DialogDescription>
            Modifiez les informations de votre puzzle
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 pt-4">
          <div className="grid gap-2">
            <Label>Image du puzzle</Label>
            <div className="flex items-center gap-4">
              <div className="relative">
                <img
                  src={imageURL || puzzle.image}
                  alt="Aperçu"
                  className="w-20 h-20 object-cover rounded border"
                />
              </div>
              <div className="flex-1">
                <Input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleFiles(e.target.files)}
                  className="cursor-pointer"
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Sélectionnez une nouvelle image pour remplacer l&apos;actuelle
                </p>
              </div>
            </div>
          </div>
          <div className="grid gap-2">
            <Label>Catégories</Label>
            <MultiSelectWithSuggestions
              data={categories}
              values={formData.categories}
              onChange={(values) => handleChange('categories', values)}
              className="focus:border-green-500"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="brand">Marque</Label>
            <SingleSelectWithSuggestions
              data={brands}
              value={formData.brand}
              onChange={(value) => handleChange('brand', value)}
              className="focus:border-green-500"
            />
          </div>
          <div className="grid gap-2">
            <div className="space-y-2">
              <Label htmlFor="condition">Nombre de pièces</Label>
              <Input
                id="pieceCount"
                name="pieceCount"
                type="number"
                placeholder="1500"
                value={formData.pieceCount}
                onChange={(e) =>
                  handleChange(
                    e.target.name as keyof typeof formData,
                    e.target.value
                  )
                }
              />
            </div>
          </div>
          <div className="grid gap-2">
            <div className="space-y-2">
              <Label htmlFor="condition">État</Label>
              <SelectCustom
                label={conditionLabels[puzzle.condition as ConditionType]}
                onlyLabel={true}
                data={CONDITION}
                value={formData.condition}
                type="condition"
                onChange={(_, value) => handleChange('condition', value)}
                className="focus:border-green-500"
              />
            </div>
          </div>
        </div>
        <div className="grid gap-2">
          <Label htmlFor="width">Largeur (optionnel)</Label>
          <div className="relative flex">
            <Input
              id="width"
              name="width"
              type="number"
              min={0}
              value={formData.width ?? ''}
              onChange={(e) => handleChange('width', e.target.value)}
              className="border bg-white w-full pr-14 rounded-r-none"
            />
            <div className="flex items-center px-3 bg-gray-100 border border-l-0 rounded-r-md text-gray-600 text-sm">
              cm
            </div>
          </div>
        </div>
        <div className="grid gap-2">
          <Label htmlFor="width">Hauteur (optionnel)</Label>
          <div className="relative flex">
            <Input
              id="height"
              name="height"
              type="number"
              min={0}
              value={formData.height ?? ''}
              onChange={(e) => handleChange('height', e.target.value)}
              className="border bg-white w-full pr-14 rounded-r-none"
            />
            <div className="flex items-center px-3 bg-gray-100 border border-l-0 rounded-r-md text-gray-600 text-sm">
              cm
            </div>
          </div>
        </div>
        <DialogFooter className="flex flex-row justify-center sticky bottom-0 gap-2 bg-gradient-to-t from-white to-transparent border-gray-200 py-4">
          <Button variant="outline" onClick={() => onOpenChange(!open)}>
            Annuler
          </Button>
          <Button
            className="bg-green-500 hover:bg-green-600"
            onClick={handleEdit}
          >
            Enregistrer
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EditPuzzleModal;
