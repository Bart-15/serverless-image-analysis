import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { toast } from 'sonner';
import { uploadImageToBucket } from '../services/analyzeImg.service';

export function useUploadImage() {
  return useMutation({
    mutationFn: async (payload: { file: string }) =>
      await uploadImageToBucket(payload),
    onMutate: () => {
      toast('Uploading, please wait...');
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        toast(error?.response?.data?.message);
      }
    },
  });
}
