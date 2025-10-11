import EditImageCropper from '@/components/EditImageCropper';
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
import { fileCropped, urlToFile } from '@/utils/crop';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useState } from 'react';
import { Area } from 'react-easy-crop';
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
  const [formData, setFormData] = useState<FormData>({
    categories: puzzle.categories.map((c) => c.id) as CategoryInput[],
    brand: puzzle.brand.id as BrandInput,
    pieceCount: puzzle.piece_count,
    condition: puzzle.condition!,
    image: null,
    width: puzzle.width ?? null,
    height: puzzle.height ?? null,
  });
  const [croppedArea, setCroppedArea] = useState<Area | null>(null);
  const [rotation, setRotation] = useState<number>(0);
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

  const handleEdit = async () => {
    let imageToCrop: File;
    const urlParts = puzzle.image.split('/');
    const originalName = urlParts[urlParts.length - 1] || 'puzzle.jpg';
    const uniqueName = `${Date.now()}_${originalName}`;
    if (formData.image) {
      imageToCrop = formData.image;
    } else {
      imageToCrop = await urlToFile(puzzle.image, uniqueName);
    }
    const imageElement = new Image();
    imageElement.src = URL.createObjectURL(imageToCrop);
    await new Promise((resolve) => (imageElement.onload = resolve));
    const area = croppedArea || {
      x: 0,
      y: 0,
      width: imageElement.width,
      height: imageElement.height,
    };
    const finalImage = await fileCropped(imageToCrop, area, rotation);
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
        ...(finalImage && { image: finalImage }),
      },
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange} modal={false}>
      <DialogContent className="sm:max-w-[500px] max-h-[90vh] flex flex-col pb-0 overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Modifier le puzzle</DialogTitle>
          <DialogDescription>Modifie les infos de ton puzzle</DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 pt-4">
          <div className="grid gap-2">
            <div className="relative w-full">
              <Input
                type="text"
                readOnly
                placeholder="Clique pour sélectionner une image"
                value={formData.image?.name || ''}
                onClick={() => document.getElementById('file-input')?.click()}
                className="cursor-pointer bg-white"
              />
              <input
                id="file-input"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) =>
                  handleChange('image', e.target.files?.[0] || null)
                }
              />
            </div>
            <EditImageCropper
              initialImageUrl={
                formData.image
                  ? URL.createObjectURL(formData.image)
                  : puzzle.image
              }
              onChange={(file) =>
                setFormData((prev) => ({ ...prev, image: file }))
              }
              setCroppedArea={setCroppedArea}
              setRotation={setRotation}
              rotation={rotation}
            />
            <p className="text-xs text-muted-foreground mt-1">
              Recadrer l&apos;image si nécessaire
            </p>
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
              <Label htmlFor="pieceCount">Nombre de pièces</Label>
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
