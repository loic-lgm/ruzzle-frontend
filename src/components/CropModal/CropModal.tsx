import { useState } from 'react';
import Cropper, { Area } from 'react-easy-crop';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { RotateCw, ZoomIn, ZoomOut, Crop } from 'lucide-react';
import { getCroppedImg } from '@/utils/getCroppedImg';

interface CropModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  imageUrl: string | null;
  onCropComplete: (croppedFile: File) => void;
  onCancel: () => void;
}

const CropModal = ({
  open,
  onOpenChange,
  imageUrl,
  onCropComplete,
  onCancel,
}: CropModalProps) => {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);
  const [rotation, setRotation] = useState<number>(0);

  const handleCropComplete = (_: Area, croppedArea: Area) => {
    setCroppedAreaPixels(croppedArea);
  };

  const handleApplyCrop = async () => {
    if (!imageUrl || !croppedAreaPixels) return;
    const croppedBase64 = await getCroppedImg(imageUrl, croppedAreaPixels, rotation);
    const file = dataURLtoFile(croppedBase64, 'cropped.jpg');
    onCropComplete(file);
    onOpenChange(false);
    setCrop({ x: 0, y: 0 });
    setZoom(1);
  };

  const dataURLtoFile = (dataurl: string, filename: string) => {
    const arr = dataurl.split(',');
    const mime = arr[0].match(/:(.*?);/)![1];
    const bstr = atob(arr[1]);
    const n = bstr.length;
    const u8arr = new Uint8Array(n);
    for (let i = 0; i < n; i++) u8arr[i] = bstr.charCodeAt(i);
    return new File([u8arr], filename, { type: mime });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl p-0 gap-0 overflow-hidden">
        <DialogHeader className="px-6 pt-6 pb-4 border-b border-border/50">
          <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-green-500 to-teal-500 bg-clip-text text-transparent">
            Recadre votre image
          </DialogTitle>
          <DialogDescription className="text-muted-foreground">
            Ajuste le cadrage de ton image pour obtenir le meilleur rendu
          </DialogDescription>
        </DialogHeader>

        <div className="px-6 py-3 bg-muted/30 border-b border-border/50">
          <div className="flex items-center justify-center gap-2">
            <Button
              variant="outline"
              size="sm"
              className="gap-2 hover:bg-accent"
              onClick={() => setZoom((z) => Math.min(z + 0.1, 3))}
            >
              <ZoomIn className="h-4 w-4" /> Zoom +
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="gap-2 hover:bg-accent"
              onClick={() => setZoom((z) => Math.max(z - 0.1, 1))}
            >
              <ZoomOut className="h-4 w-4" /> Zoom -
            </Button>
            <div className="w-px h-6 bg-border mx-2" />
            <Button
              variant="outline"
              size="sm"
              className="gap-2 hover:bg-accent"
              onClick={() => setRotation((r) => (r + 90) % 360)}
            >
              <RotateCw className="h-4 w-4" /> Rotation
            </Button>
          </div>
        </div>

        <div className="relative bg-muted/20 p-8">
          {imageUrl ? (
            <div className="relative mx-auto max-w-2xl aspect-video bg-background rounded-lg overflow-hidden border-2 border-dashed border-primary/30 shadow-xl">
              <Cropper
                image={imageUrl}
                crop={crop}
                zoom={zoom}
                rotation={rotation}
                aspect={1}
                onCropChange={setCrop}
                onZoomChange={setZoom}
                onCropComplete={handleCropComplete}
              />
            </div>
          ) : (
            <div className="flex items-center justify-center h-64 text-muted-foreground">
              <div className="text-center">
                <Crop className="h-12 w-12 mx-auto mb-2 opacity-50" />
                <p>Aucune image sélectionnée</p>
              </div>
            </div>
          )}
        </div>

        <DialogFooter className="px-6 py-4 bg-muted/20 border-t border-border/50">
          <Button
            variant="outline"
            onClick={onCancel}
            className="hover:bg-accent"
          >
            Annuler
          </Button>
          <Button
            onClick={handleApplyCrop}
            className="bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-500/90 hover:to-teal-500/90"
          >
            <Crop className="mr-2 h-4 w-4" /> Valider
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CropModal;
