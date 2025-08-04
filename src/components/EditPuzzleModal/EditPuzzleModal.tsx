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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface EditPuzzleModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const EditPuzzleModal = ({ open, onOpenChange }: EditPuzzleModalProps) => {
  console.log(open);
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
              {/* {previewUrl && ( */}
              <div className="relative">
                <img
                  // src={previewUrl}
                  alt="Aperçu"
                  className="w-20 h-20 object-cover rounded border"
                />
              </div>
              {/* )} */}
              <div className="flex-1">
                <Input
                  type="file"
                  accept="image/*"
                  //   onChange={handleFileChange}
                  className="cursor-pointer"
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Sélectionnez une nouvelle image pour remplacer l&apos;actuelle
                </p>
              </div>
            </div>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="brand">Marque</Label>
            <Input
              id="brand"
              //   value={formData.brand}
              //   onChange={(e) =>
              //     setFormData({ ...formData, brand: e.target.value })
              //   }
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="category">Catégorie</Label>
            <Input
              id="category"
              //   value={formData.category}
              //   onChange={(e) =>
              //     setFormData({ ...formData, category: e.target.value })
              //   }
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="pieceCount">Nombre de pièces</Label>
            <Input
              id="pieceCount"
              type="number"
              //   value={formData.pieceCount}
              //   onChange={(e) =>
              //     setFormData({
              //       ...formData,
              //       pieceCount: parseInt(e.target.value),
              //     })
              //   }
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="condition">État</Label>
            <Select
            //   value={formData.condition}
            //   onValueChange={(value: 'Excellent' | 'Good' | 'Fair') =>
            //     setFormData({ ...formData, condition: value })
            //   }
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Excellent">Excellent</SelectItem>
                <SelectItem value="Good">Bon</SelectItem>
                <SelectItem value="Fair">Correct</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <DialogFooter>
          <Button
            variant="outline"
            //   onClick={onOpenChange}
          >
            Annuler
          </Button>
          <Button
          //   onClick={handleSave}
          >
            Enregistrer
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EditPuzzleModal;
