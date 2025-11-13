import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { RotateCw, ZoomIn, ZoomOut } from 'lucide-react';
import { useImageCrop } from '@/hooks/useImageCrop';

interface EditImageCropperProps {
  initialImageUrl: string;
  crop: ReturnType<typeof useImageCrop>;
}

const EditImageCropper = ({ initialImageUrl, crop }: EditImageCropperProps) => {
  const { zoom, setZoom, position, setPosition, rotation, setRotation } = crop;

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

  return (
    <div className="flex flex-col gap-4">
      <div
        className="relative mx-auto bg-white rounded-lg overflow-hidden border-2 border-dashed border-primary/30 shadow-xl"
        style={{ width: '200px', height: '200px' }}
      >
        <div
          className="absolute inset-0 cursor-move flex items-center justify-center"
          style={{ touchAction: 'none' }}
          onMouseDown={(e) => {
            e.preventDefault();
            handleMouseDown(e);
          }}
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
            src={initialImageUrl}
            alt="Preview"
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
      </div>
      <div className="flex items-center justify-center gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setZoom((z) => Math.min(z + 0.1, 3))}
        >
          <ZoomIn className="h-4 w-4" /> Zoom +
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setZoom((z) => Math.max(z - 0.1, 0.1))}
        >
          <ZoomOut className="h-4 w-4" /> Zoom -
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setRotation((r) => (r + 90) % 360)}
        >
          <RotateCw className="h-4 w-4" /> Rotation
        </Button>
      </div>
    </div>
  );
};

export default EditImageCropper;
