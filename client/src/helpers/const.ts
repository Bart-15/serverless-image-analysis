import { Text } from '../types/data.types';

export const acceptedFilType = ['image/png', 'image/jpeg'];
export const base64encode = (file: File) =>
  new Promise((resolve) => {
    let baseUrl;

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = () => {
      baseUrl = reader.result;
      resolve(baseUrl);
    };
  });

export function getRoundedValue(num: number) {
  // Round the number to 1 decimal place
  const rounded = Math.round(num * 10) / 10;

  return rounded;
}

export const mergedText = (detectedText: Text[]) =>
  detectedText.map((item) => item.detectedText).join(' ');
