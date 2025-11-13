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

    // Calculer l'échelle de l'image pour qu'elle rentre dans le preview
    // Dans le CSS, l'image est affichée en "contain" implicite
    const imgRatio = img.width / img.height;
    let displayWidth = previewSize;
    let displayHeight = previewSize;

    if (imgRatio > 1) {
      displayHeight = previewSize / imgRatio;
    } else {
      displayWidth = previewSize * imgRatio;
    }

    // Ratio entre le canvas final et l'affichage preview
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

    // Dessiner l'image avec les bonnes dimensions
    const finalImgWidth = displayWidth * scale;
    const finalImgHeight = displayHeight * scale;

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
