import { axs } from '../utils/axios';

export async function uploadImageToBucket(payload: { file: string }) {
  return await axs.post('/upload', payload);
}

export async function analyzeImage(key: string) {
  return await axs.get(`/analyze/${key}`);
}
