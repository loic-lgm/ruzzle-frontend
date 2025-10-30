interface Area {
  x: number;
  y: number;
  width: number;
  height: number;
}

const createImage = (url: string): Promise<HTMLImageElement> => {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.addEventListener('load', () => resolve(image));
    image.addEventListener('error', (error) => reject(error));
    image.src = url;
  });
};

const getRotatedDimensions = (
  width: number,
  height: number,
  rotation: number
): { width: number; height: number } => {
  const rotRad = (rotation * Math.PI) / 180;
  if (rotation === 90 || rotation === 270) {
    return { width: height, height: width };
  }
  const sin = Math.abs(Math.sin(rotRad));
  const cos = Math.abs(Math.cos(rotRad));
  return {
    width: width * cos + height * sin,
    height: width * sin + height * cos,
  };
};

export const getCroppedImg = async (
  imageSrc: string,
  crop: Area,
  rotation = 0
): Promise<string> => {
  const image = await createImage(imageSrc);
  const rotatedDimensions = getRotatedDimensions(
    image.width,
    image.height,
    rotation
  );
  const rotateCanvas = document.createElement('canvas');
  rotateCanvas.width = rotatedDimensions.width;
  rotateCanvas.height = rotatedDimensions.height;
  const rotateCtx = rotateCanvas.getContext('2d');
  if (!rotateCtx) {
    throw new Error('Canvas context not available');
  }
  rotateCtx.translate(rotateCanvas.width / 2, rotateCanvas.height / 2);
  rotateCtx.rotate((rotation * Math.PI) / 180);
  rotateCtx.drawImage(
    image,
    -image.width / 2,
    -image.height / 2,
    image.width,
    image.height
  );
  const cropCanvas = document.createElement('canvas');
  cropCanvas.width = crop.width;
  cropCanvas.height = crop.height;
  const cropCtx = cropCanvas.getContext('2d');
  if (!cropCtx) {
    throw new Error('Canvas context not available');
  }
  cropCtx.drawImage(
    rotateCanvas,
    crop.x,
    crop.y,
    crop.width,
    crop.height,
    0,
    0,
    crop.width,
    crop.height
  );
  return cropCanvas.toDataURL('image/jpeg', 0.95);
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
): Promise<File> => {
  const res = await fetch(url);
  const blob = await res.blob();
  return new File([blob], filename, { type: mimeType });
};
