import React, { useState } from 'react';
import Cropper from 'react-easy-crop';
import { Area } from 'react-easy-crop';
import { Button } from '@/components/ui/button';
import { RotateCw, ZoomIn, ZoomOut } from 'lucide-react';

interface EditImageCropperProps {
  initialImageUrl: string;
  onChange: (file: File) => void;
  setCroppedArea: React.Dispatch<React.SetStateAction<Area | null>>;
  setRotation: React.Dispatch<React.SetStateAction<number>>;
  rotation: number;
}

const EditImageCropper = ({
  initialImageUrl,
  setCroppedArea,
  setRotation,
  rotation,
}: EditImageCropperProps) => {
  const [zoom, setZoom] = useState<number>(1);
  const [crop, setCrop] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  return (
    <>
      <div className="relative w-full h-64 bg-gray-100 rounded-lg overflow-hidden">
        <Cropper
          image={initialImageUrl}
          crop={crop}
          zoom={zoom}
          rotation={rotation}
          aspect={1}
          onCropChange={setCrop}
          onZoomChange={setZoom}
          onCropComplete={(_, croppedAreaPixels) => {
            setCroppedArea(croppedAreaPixels);
          }}
          onRotationChange={setRotation}
        />
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
          onClick={() => setZoom((z) => Math.max(z - 0.1, 1))}
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
    </>
  );
};

export default EditImageCropper;
