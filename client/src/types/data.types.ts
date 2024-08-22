type Text = {
  detectedText: string;
};

type Label = {
  Name: string;
  Confidence: number;
};

type Face = {
  AgeRange: {
    Low: number;
    High: number;
  };
  Eyeglassess: {
    Value: boolean;
    Confidence: number;
  };
  EyesOpen: {
    Value: boolean;
    Confidence: number;
  };
  Gender: {
    Value: string;
    Confidence: number;
  };
  Smile: {
    Value: boolean;
    Confidence: number;
  };
};

export type AnalyzedData = {
  labels: Label[];
  text: Text[];
  faces: Face[];
};
