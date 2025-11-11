import React, { useState } from 'react';
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
// import { getCroppedImg } from '@/utils/crop';

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
  const [zoom, setZoom] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [rotation, setRotation] = useState<number>(0);

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setDragStart({
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    setPosition({
      x: e.clientX - dragStart.x,
      y: e.clientY - dragStart.y,
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleApplyCrop = async () => {
    if (!imageUrl) return;

    const canvas = document.createElement('canvas');
    canvas.width = 800;
    canvas.height = 800;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(0, 0, 800, 800);

    const img = new Image();
    img.crossOrigin = 'anonymous';

    await new Promise((resolve, reject) => {
      img.onload = resolve;
      img.onerror = reject;
      img.src = imageUrl;
    });

    // Calculer le ratio entre le cadre de preview et le cadre final
    const previewSize = 200; // Taille du cadre de preview
    const finalSize = 800; // Taille du cadre final
    const ratio = finalSize / previewSize; // 800 / 300 = 2.67

    // Appliquer les transformations avec le ratio
    ctx.save();
    ctx.translate(400, 400);
    ctx.rotate((rotation * Math.PI) / 180);
    ctx.scale(zoom, zoom);
    // Multiplier la position par le ratio
    ctx.translate((position.x * ratio) / zoom, (position.y * ratio) / zoom);
    ctx.drawImage(img, -img.width / 2, -img.height / 2, img.width, img.height);
    ctx.restore();

    canvas.toBlob(
      (blob) => {
        if (!blob) return;
        const file = new File([blob], 'cropped.jpg', { type: 'image/jpeg' });
        onCropComplete(file);
        onOpenChange(false);
        setPosition({ x: 0, y: 0 });
        setZoom(1);
        setRotation(0);
      },
      'image/jpeg',
      0.95
    );
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl p-0 gap-0 overflow-hidden">
        <DialogHeader className="px-6 pt-6 pb-4 border-b border-border/50">
          <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-green-500 to-teal-500 bg-clip-text text-transparent">
            Recadre ton image
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
              onClick={() => setZoom((z) => Math.min(z + 0.05, 3))}
            >
              <ZoomIn className="h-4 w-4" /> Zoom +
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="gap-2 hover:bg-accent"
              onClick={() => setZoom((z) => Math.max(z - 0.05, 0.5))}
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
            <div
              className="relative mx-auto bg-white rounded-lg overflow-hidden border-2 border-dashed border-primary/30 shadow-xl cursor-move"
              style={{
                width: '200px',
                height: '200px',
                touchAction: 'none',
              }}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
              onTouchStart={(e) => {
                const touch = e.touches[0];
                setIsDragging(true);
                setDragStart({
                  x: touch.clientX - position.x,
                  y: touch.clientY - position.y,
                });
              }}
              onTouchMove={(e) => {
                if (!isDragging) return;
                const touch = e.touches[0];
                setPosition({
                  x: touch.clientX - dragStart.x,
                  y: touch.clientY - dragStart.y,
                });
              }}
              onTouchEnd={() => setIsDragging(false)}
            >
              <div className="absolute inset-0 flex items-center justify-center">
                <img
                  src={imageUrl}
                  alt="Preview"
                  draggable={false}
                  style={{
                    transform: `translate(${position.x}px, ${position.y}px) rotate(${rotation}deg) scale(${zoom})`,
                    transition: isDragging ? 'none' : 'transform 0.1s ease-out',
                    userSelect: 'none',
                  }}
                />
              </div>

              <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-0 left-1/2 w-px h-full bg-primary/20" />
                <div className="absolute left-0 top-1/2 w-full h-px bg-primary/20" />
              </div>

              <div className="absolute bottom-2 right-2 bg-black/50 text-white text-xs px-2 py-1 rounded">
                800 x 800 px
              </div>
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
