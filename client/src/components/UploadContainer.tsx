import LoadingSpinner from './common/LoadingSpinner';
import DragFileInput from './DragFileInput';
// import ImageContainer from './ImageContainer';
import ResultCard from './ResultCard';

const UploadContainer = () => {
  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
        <div className="max-w-xl flex flex-col items-start">
          <DragFileInput />
        </div>
        <div className="relative">
          {/* <ImageContainer imgSrc="https://global.discourse-cdn.com/forza/original/4X/4/c/7/4c7454877daad996492f46f2aa2dcd199abe887c.jpeg" /> */}
          <LoadingSpinner message="Analyzing photo ..." />
        </div>
      </div>

      {/* Analysis Result */}
      <ResultCard title="Label detection result">
        <p>hello</p>
      </ResultCard>
      <ResultCard title="Facial analysis result">
        <p>Hello</p>
      </ResultCard>
      <ResultCard title="Text in image result">
        <p>Hello</p>
      </ResultCard>
    </>
  );
};

export default UploadContainer;
