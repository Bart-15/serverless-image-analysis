import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { toast } from 'sonner';
import { analyzeImage } from '../services/analyzeImg.service';

export function useAnalyzeImage() {
  return useMutation({
    mutationFn: async (key: string) => await analyzeImage(key),
    onSuccess: () => {
      toast('Image successfully analyzed');
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        toast(error?.response?.data?.message);
      }
    },
  });
}
