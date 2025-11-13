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
import { useImageCrop } from '@/hooks/useImageCrop';

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
  const {
    zoom,
    setZoom,
    position,
    setPosition,
    rotation,
    setRotation,
    generateCroppedFile,
  } = useImageCrop(imageUrl);

  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

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

  const handleMouseUp = () => setIsDragging(false);

  const handleApplyCrop = async () => {
    const finalImage = await generateCroppedFile();
    if (finalImage) onCropComplete(finalImage);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl p-0 gap-0 overflow-hidden">
        <DialogHeader className="px-6 pt-6 pb-4 border-b border-border/50">
          <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-green-500 to-teal-500 bg-clip-text text-transparent">
            Recadre ton image
          </DialogTitle>
          <DialogDescription className="text-muted-foreground">
            Ajuste le cadrage de ton image
          </DialogDescription>
        </DialogHeader>

        <div className="px-6 py-3 bg-muted/30 border-b border-border/50">
          <div className="flex items-center justify-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setZoom((z) => Math.min(z + 0.1, 3))}
            >
              <ZoomIn className="h-4 w-4" />
              Zoom +
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setZoom((z) => Math.max(z - 0.1, 0.1))}
            >
              <ZoomOut className="h-4 w-4" />
              Zoom -
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setRotation((r) => (r + 90) % 360)}
            >
              <RotateCw className="h-4 w-4" />
              Rotation
            </Button>
          </div>
        </div>

        <div className="relative bg-muted/20 p-8 flex items-center justify-center">
          <div
            className="relative bg-white rounded-lg overflow-hidden border-2 border-dashed border-primary/30 shadow-xl"
            style={{ width: 200, height: 200 }}
          >
            {imageUrl ? (
              <div
                className="absolute inset-0 cursor-move flex items-center justify-center"
                style={{ touchAction: 'none' }}
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
                <img
                  src={imageUrl}
                  draggable={false}
                  style={{
                    maxWidth: '100%',
                    maxHeight: '100%',
                    objectFit: 'contain',
                    transform: `translate(${position.x}px, ${position.y}px) rotate(${rotation}deg) scale(${zoom})`,
                    transition: isDragging ? 'none' : 'transform 0.1s ease-out',
                    userSelect: 'none',
                  }}
                />
              </div>
            ) : (
              <div className="flex items-center justify-center h-full text-muted-foreground">
                <Crop className="h-12 w-12 opacity-50" />
              </div>
            )}
          </div>
        </div>

        <DialogFooter className="px-6 py-4 bg-muted/20 border-t border-border/50">
          <Button variant="outline" onClick={onCancel}>
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
