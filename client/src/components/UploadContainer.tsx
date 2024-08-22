import { useState } from 'react';
import DragFileInput from './DragFileInput';
// import ImageContainer from './ImageContainer';
// import ImageContainer from './ImageContainer';
import { base64encode, getRoundedValue } from '../helpers/base64Encoder';
import { useAnalyzeImage } from '../hooks/useAnalyzeImage';
import { useUploadImage } from '../hooks/useUploadImage';
import { AnalyzedData } from '../types/data.types';
import ImageContainer from './ImageContainer';
import ResultCard from './ResultCard';
import LoadingSpinner from './common/LoadingSpinner';

const UploadContainer = () => {
  const [imgFile, setImgFile] = useState<File | null>(null);
  const [preSignedImg, setPreSignedImg] = useState('');
  const [data, setData] = useState<AnalyzedData>({
    labels: [],
    text: [],
    faces: [],
  });

  const uploadImage = useUploadImage();
  const analyzeImage = useAnalyzeImage();

  async function handleUpload(file: File | null) {
    if (!file) return;

    const base64Img = (await base64encode(file)) as string;

    const payload = {
      file: base64Img,
    };

    const uploadResponse = await uploadImage.mutateAsync(payload);
    const {
      data: { presignedURL, key },
    } = uploadResponse;

    setPreSignedImg(presignedURL);

    const analyzeResponse = await analyzeImage.mutateAsync(key);
    setData(analyzeResponse.data);
  }

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
        <div className="max-w-xl flex flex-col items-start">
          <DragFileInput setImgFile={setImgFile} handleUpload={handleUpload} />
        </div>
        <div className="relative">
          {preSignedImg && <ImageContainer imgSrc={preSignedImg} />}

          {analyzeImage.isPending && <LoadingSpinner message="Analyzing..." />}
        </div>
      </div>

      {/* Analysis Result */}
      {analyzeImage.isSuccess && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          <ResultCard title="Label detection result">
            <ul className="overflow-y-scroll h-[250px]">
              {data?.labels.length > 0
                ? data?.labels.map((label) => (
                    <li key={label.Name} className="py-2 px-3">
                      <div className="flex flex-row justify-between border-b-2 border-gray-500">
                        <p className="font-medium">{label.Name}</p>
                        <p className="font-medium">
                          {getRoundedValue(label.Confidence)}%
                        </p>
                      </div>
                    </li>
                  ))
                : 'No result'}
            </ul>
          </ResultCard>
          <ResultCard title="Facial analysis result">
            <p>Hello</p>
          </ResultCard>
          <ResultCard title="Text in image result">
            <p>Hello</p>
          </ResultCard>
        </div>
      )}
    </>
  );
};

export default UploadContainer;
