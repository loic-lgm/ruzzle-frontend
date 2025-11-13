import { useState, useCallback } from 'react';

export const useImageCrop = (imageUrl: string | null) => {
  const [zoom, setZoom] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [rotation, setRotation] = useState(0);

  const generateCroppedFile = useCallback(async (): Promise<File | null> => {
    if (!imageUrl) return null;

    // Charger l'image d'abord pour connaître ses dimensions
    const img = new Image();
    img.crossOrigin = 'anonymous';

    await new Promise((resolve, reject) => {
      img.onload = resolve;
      img.onerror = reject;
      img.src = imageUrl;
    });

    const canvas = document.createElement('canvas');
    const finalSize = 800;
    const previewSize = 200;

    canvas.width = finalSize;
    canvas.height = finalSize;
    const ctx = canvas.getContext('2d');
    if (!ctx) return null;

    // Fond blanc
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(0, 0, finalSize, finalSize);

    // Ratio entre le canvas final et le preview
    const scale = finalSize / previewSize;

    ctx.save();

    // Centrer sur le canvas
    ctx.translate(finalSize / 2, finalSize / 2);

    // Appliquer la rotation
    ctx.rotate((rotation * Math.PI) / 180);

    // Appliquer le zoom
    ctx.scale(zoom, zoom);

    // Appliquer la position (scaling pour correspondre au canvas final)
    ctx.translate(position.x * scale, position.y * scale);

    // L'image doit avoir la même taille relative que dans le preview
    // Dans le preview, l'image fait 200x200 (100% du conteneur avec object-fit: contain)
    // Donc dans le canvas final, elle doit faire 800x800
    const finalImgSize = finalSize;

    ctx.drawImage(
      img,
      -finalImgSize / 2,
      -finalImgSize / 2,
      finalImgSize,
      finalImgSize
    );

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
