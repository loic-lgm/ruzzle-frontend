import { Area } from 'react-easy-crop';

export const getCroppedImg = async (
  imageSrc: string,
  crop: { x: number; y: number; width: number; height: number },
  rotation = 0
): Promise<string> => {
  const image = new Image();
  image.src = imageSrc;

  await new Promise<void>((resolve, reject) => {
    image.onload = () => resolve();
    image.onerror = (err) => reject(err);
  });
  const canvas = document.createElement('canvas');
  canvas.width = crop.width;
  canvas.height = crop.height;
  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('Canvas context not available');
  ctx.translate(canvas.width / 2, canvas.height / 2);
  ctx.rotate((rotation * Math.PI) / 180);

  ctx.drawImage(
    image,
    crop.x,
    crop.y,
    crop.width,
    crop.height,
    -crop.width / 2,
    -crop.height / 2,
    crop.width,
    crop.height
  );

  return canvas.toDataURL('image/jpeg');
};

const _dataURLtoFile = (dataurl: string, filename: string): File => {
  const arr = dataurl.split(',');
  const mime = arr[0].match(/:(.*?);/)![1];
  const bstr = atob(arr[1]);
  const n = bstr.length;
  const u8arr = new Uint8Array(n);
  for (let i = 0; i < n; i++) u8arr[i] = bstr.charCodeAt(i);
  return new File([u8arr], filename, { type: mime });
};

export const fileCropped = async (
  file: File,
  croppedArea: Area,
  rotation: number
): Promise<File | null> => {
  if (!file || !croppedArea) return null;
  const imageDataUrl = await new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (err) => reject(err);
    reader.readAsDataURL(file);
  });
  const croppedBase64 = await getCroppedImg(
    imageDataUrl,
    croppedArea,
    rotation
  );
  const croppedFile = _dataURLtoFile(croppedBase64, file.name);
  return croppedFile;
};

export const urlToFile = async (
  url: string,
  filename: string,
  mimeType = 'image/jpeg'
) => {
  const res = await fetch(url);
  const blob = await res.blob();
  return new File([blob], filename, { type: mimeType });
};
