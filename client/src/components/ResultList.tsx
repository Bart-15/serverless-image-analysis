import { ClipboardDocumentIcon } from '@heroicons/react/24/outline';
import { getRoundedValue, mergedText } from '../helpers/const';
import useCopyToClipboard from '../hooks/useCopyToClipboard';
import { AnalyzedData } from '../types/data.types';
import ResultCard from './ResultCard';

type ResultListProps = {
  data: AnalyzedData;
};

const ResultList = ({ data }: ResultListProps) => {
  const text = mergedText(data.text);
  const { copied, copyToClipboard } = useCopyToClipboard();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      <ResultCard title="Label detection result">
        <ul className="overflow-y-auto h-[250px]">
          {data?.labels.length > 0 ? (
            data?.labels.map((label) => (
              <li key={label.Name} className="py-2 px-3">
                <div className="flex flex-row justify-between border-b-2 border-gray-500">
                  <p className="font-medium">{label.Name}</p>
                  <p className="font-medium">
                    {getRoundedValue(label.Confidence)}%
                  </p>
                </div>
              </li>
            ))
          ) : (
            <li className="text-center mt-3 font-medium">No result</li>
          )}
        </ul>
      </ResultCard>
      <ResultCard title="Facial analysis result">
        {
          <ul className="overflow-y-auto h-[250px]">
            {data?.faces.length > 0 ? (
              data?.faces.map((face, idx) => (
                <li key={idx} className="py-2 px-3">
                  <div className="flex flex-row justify-between border-b-2 border-gray-500 mb-4">
                    <p className="font-medium">Age Range</p>
                    <p className="font-medium">
                      {face.AgeRange.Low + ' - ' + face.AgeRange.High}
                    </p>
                  </div>
                  <div className="flex flex-row justify-between border-b-2 border-gray-500 mb-4">
                    <p className="font-medium">{face.Gender.Value}</p>
                    <p className="font-medium">
                      {getRoundedValue(face.Gender.Confidence)}%
                    </p>
                  </div>
                  <div className="flex flex-row justify-between border-b-2 border-gray-500 mb-4">
                    <p className="font-medium">Smile</p>
                    <p className="font-medium">
                      {getRoundedValue(face.Smile.Confidence)}%
                    </p>
                  </div>
                  <div className="flex flex-row justify-between border-b-2 border-gray-500 mb-4">
                    <p className="font-medium">Eyes Open</p>
                    <p className="font-medium">
                      {getRoundedValue(face.EyesOpen.Confidence)}%
                    </p>
                  </div>
                  <div className="flex flex-row justify-between border-b-2 border-gray-500 mb-4">
                    <p className="font-medium">Eyeglasses</p>
                    <p className="font-medium">
                      {face.Eyeglasses.Confidence === 100
                        ? 100
                        : getRoundedValue(face.Eyeglasses.Confidence)}
                      %
                    </p>
                  </div>
                </li>
              ))
            ) : (
              <li className="text-center mt-3 font-medium">No result</li>
            )}
          </ul>
        }
      </ResultCard>
      <ResultCard title="Text in image result">
        <div className="overflow-y-auto h-[250px] relative">
          {data.text.length > 0 ? (
            <div className="flex flex-col items-end">
              <p className="mb-3">{text}</p>
              <button
                onClick={() => copyToClipboard(text)}
                className={`flex items-center p-2 rounded ${copied ? 'bg-green-600' : 'bg-orange-600'} text-white text-xs`}
              >
                <ClipboardDocumentIcon className="h-5 w-5 text-white mr-2" />
                {copied ? 'Copied' : 'Copy to clipboard'}
              </button>
            </div>
          ) : (
            <p className="text-center mt-3 font-medium">No result</p>
          )}
        </div>
      </ResultCard>
    </div>
  );
};

export default ResultList;
