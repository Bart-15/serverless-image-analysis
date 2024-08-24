export type Text = {
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
  Eyeglasses: {
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

export interface AuthEventData {
  payload: {
    event:
      | 'signIn'
      | 'signOut'
      | 'signUp'
      | 'signIn_failure'
      | 'configured'
      | 'forgotPassword';
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    data?: any; // Depending on the event, this can be more specific.
    message?: string;
  };
}
