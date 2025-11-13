import { useState, useCallback } from 'react';

export const useImageCrop = (imageUrl: string | null) => {
  const [zoom, setZoom] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [rotation, setRotation] = useState(0);

  const generateCroppedFile = useCallback(async (): Promise<File | null> => {
    if (!imageUrl) return null;

    const canvas = document.createElement('canvas');
    const finalSize = 800;
    canvas.width = finalSize;
    canvas.height = finalSize;
    const ctx = canvas.getContext('2d');
    if (!ctx) return null;

    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(0, 0, finalSize, finalSize);

    const img = new Image();
    img.crossOrigin = 'anonymous';

    await new Promise((resolve) => {
      img.onload = resolve;
      img.src = imageUrl;
    });

    const previewSize = 200;
    const ratio = finalSize / previewSize;

    ctx.save();
    ctx.translate(finalSize / 2, finalSize / 2);
    ctx.rotate((rotation * Math.PI) / 180);
    ctx.scale(zoom, zoom);
    ctx.translate(position.x * ratio, position.y * ratio);
    ctx.drawImage(img, -img.width / 2, -img.height / 2, img.width, img.height);
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
};
