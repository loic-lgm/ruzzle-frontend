import SelectCustom from '@/components/SelectCustom/SelectCustom';
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
import { Brand } from '@/types/brand';
import { Category } from '@/types/category';
import { PublishOrEditPuzzleData, Puzzle } from '@/types/puzzle';
import { CONDITION } from '@/utils/constants';
import { useMutation, useQueryClient } from '@tanstack/react-query';
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
  category: number;
  brand: number;
  pieceCount: number;
  condition: string;
  image: File | null;
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
    category: puzzle.category.id,
    brand: puzzle.brand.id,
    pieceCount: puzzle.piece_count,
    condition: puzzle.condition!,
    image: null,
  });
  const queryClient = useQueryClient();

  const conditionLabels: Record<ConditionType, string> = {
    used: 'Usé',
    new: 'Neuf',
    damage: 'Abîmé',
  };

  const handleChange = (field: keyof typeof formData, value: string | File) => {
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
      queryClient.invalidateQueries({ queryKey: ['puzzle', variables.hashid] });
      onOpenChange(false);
      toast.success('Puzzle mis à jour avec succès !');
    },
    onError: (error) => {
      toast.error('Une erreur est survenue');
      console.log(error);
    },
  });

  const handleEdit = () => {
    update.mutate({
      hashid: puzzle.hashid!,
      data: {
        brand_id: formData.brand,
        category_id: formData.category,
        piece_count: formData.pieceCount,
        condition: formData.condition,
        owner: puzzle.owner.id,
        ...(formData.image && { image: formData.image }),
      },
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Modifier le puzzle</DialogTitle>
          <DialogDescription>
            Modifiez les informations de votre puzzle
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
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
          <div className="grid gap-2">
            <div className="space-y-2">
              <Label htmlFor="brand">Marque</Label>
              <SelectCustom
                label={puzzle.brand.name}
                onlyLabel={true}
                data={brands}
                type="brand"
                onChange={(_, value) => handleChange('brand', value)}
                className="focus:border-green-500"
                value={brands.find((brand) => formData.brand == brand.id)!.name}
              />
            </div>
          </div>
          <div className="grid gap-2">
            <div className="space-y-2">
              <Label htmlFor="category">Catégorie</Label>
              <SelectCustom
                label={puzzle.category.name}
                onlyLabel={true}
                data={categories}
                type="brand"
                onChange={(_, value) => handleChange('category', value)}
                className="focus:border-green-500"
                value={
                  categories.find(
                    (category) => formData.category == category.id
                  )!.name
                }
              />
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(!open)}>
            Annuler
          </Button>
          <Button className="bg-green-500" onClick={handleEdit}>
            Enregistrer
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EditPuzzleModal;
