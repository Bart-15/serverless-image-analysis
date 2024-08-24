import { Authenticator } from '@aws-amplify/ui-react';
import { useState } from 'react';
import { toast } from 'sonner';
import './App.css';
import LoadingSpinner from './components/common/LoadingSpinner';
import DragFileInput from './components/DragFileInput';
import ImageContainer from './components/ImageContainer';
import ResultList from './components/ResultList';
import UserNavbar from './components/UserNavbar';
import { acceptedFilType, base64encode } from './helpers/const';
import { useAnalyzeImage } from './hooks/useAnalyzeImage';
import { useUploadImage } from './hooks/useUploadImage';
import { AnalyzedData } from './types/data.types';

function App() {
  const [imgFile, setImgFile] = useState<File | null>(null);
  const [preSignedImg, setPreSignedImg] = useState('');
  const [data, setData] = useState<AnalyzedData>({
    labels: [],
    text: [],
    faces: [],
  });

  const uploadImage = useUploadImage();
  const analyzeImage = useAnalyzeImage();

  function resetState() {
    setImgFile(null);
    setPreSignedImg('');
    setData({
      labels: [],
      text: [],
      faces: [],
    });
  }

  async function handleUpload(file: File | null) {
    if (!file) return;

    const fileSizeInMB = file.size / 1024 / 1024;

    // check file type
    if (!acceptedFilType.includes(file.type)) {
      return toast('Only PNG and JPEG images are allowed');
    }

    if (fileSizeInMB > 3) {
      return toast('File size must be less than or equal to 3MB');
    }

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
    <Authenticator>
      {({ user }) => (
        <>
          <UserNavbar user={user} resetState={resetState} />
          <h1 className="text-1xl sm:text-2xl md:text-3xl font-medium mb-10 text-center">
            Smart Image Recognition and Analysis
          </h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
            <DragFileInput
              setImgFile={setImgFile}
              handleUpload={handleUpload}
            />
            <div className="relative">
              {preSignedImg && <ImageContainer imgSrc={preSignedImg} />}
              {analyzeImage.isPending && (
                <LoadingSpinner message="Analyzing..." />
              )}
            </div>
          </div>
          {analyzeImage.isSuccess && <ResultList data={data} />}
        </>
      )}
    </Authenticator>
  );
}

export default App;
