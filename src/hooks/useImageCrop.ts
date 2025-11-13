import { useState, useCallback } from 'react';

export const useImageCrop = (imageUrl: string | null) => {
  const [zoom, setZoom] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [rotation, setRotation] = useState(0);

  const generateCroppedFile = useCallback(async (): Promise<File | null> => {
    if (!imageUrl) return null;

    // Charger l'image
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

    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(0, 0, finalSize, finalSize);

    const imgRatio = img.width / img.height;
    let displayWidth: number;
    let displayHeight: number;

    if (imgRatio > 1) {
      displayWidth = Math.min(img.width, previewSize);
      displayHeight = displayWidth / imgRatio;
    } else {
      displayHeight = Math.min(img.height, previewSize);
      displayWidth = displayHeight * imgRatio;
    }
    const scale = finalSize / previewSize;
    const finalImgWidth = displayWidth * scale;
    const finalImgHeight = displayHeight * scale;

    ctx.save();
    ctx.translate(finalSize / 2, finalSize / 2);
    ctx.rotate((rotation * Math.PI) / 180);
    ctx.scale(zoom, zoom);
    ctx.translate(position.x * scale, position.y * scale);
    ctx.drawImage(
      img,
      -finalImgWidth / 2,
      -finalImgHeight / 2,
      finalImgWidth,
      finalImgHeight
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
