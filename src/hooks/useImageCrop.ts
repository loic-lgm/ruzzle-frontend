import { useState, useCallback } from 'react';

export function useImageCrop(imageUrl: string | null) {
  const [zoom, setZoom] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [rotation, setRotation] = useState(0);

  const generateCroppedFile = useCallback(async (): Promise<File | null> => {
    if (!imageUrl) return null;

    const canvas = document.createElement('canvas');
    canvas.width = 800;
    canvas.height = 800;
    const ctx = canvas.getContext('2d');
    if (!ctx) return null;

    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(0, 0, 800, 800);

    const img = new Image();
    img.crossOrigin = 'anonymous';

    await new Promise((resolve) => {
      img.onload = resolve;
      img.src = imageUrl;
    });

    const previewSize = 200;
    const ratio = 800 / previewSize;

    ctx.save();
    ctx.translate(400, 400);
    ctx.rotate((rotation * Math.PI) / 180);
    ctx.scale(zoom, zoom);
    ctx.translate((position.x * ratio) / zoom, (position.y * ratio) / zoom);
    ctx.drawImage(img, -img.width / 2, -img.height / 2);
    ctx.restore();

    return await new Promise((resolve) => {
      canvas.toBlob(
        (blob) => {
          if (!blob) return resolve(null);
          resolve(new File([blob], 'cropped.jpg', { type: 'image/jpeg' }));
        },
        'image/jpeg',
        0.95
      );
    });
  }, [imageUrl, zoom, position, rotation]);


  return {
    zoom,
    setZoom,
    position,
    setPosition,
    rotation,
    setRotation,
    generateCroppedFile,
  };
}
