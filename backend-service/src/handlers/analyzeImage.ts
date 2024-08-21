import { IMAGE_ANALYSIS_BUCKET, rekognition } from '../config/config';
import { headers } from '../helpers/const';
import { handleError, HttpError } from '../middleware/errorHandler';
import { ProxyHandler } from '../types/handler.types';

const analyzeImage: ProxyHandler = async event => {
  try {
    const key = event.pathParameters?.key as string;

    if (!key) throw new HttpError(400, { error: 'Key is required' });

    const rekognitionParams = {
      Image: {
        S3Object: {
          Bucket: IMAGE_ANALYSIS_BUCKET,
          Name: key,
        },
      },
    };

    const [labelsResponse, facesResponse, textResponse] = await Promise.all([
      rekognition.detectLabels(rekognitionParams).promise(),
      rekognition.detectFaces(rekognitionParams).promise(),
      rekognition.detectText(rekognitionParams).promise(),
    ]);

    // Extract text detections
    const detectedText = textResponse.TextDetections?.map(textDetection => ({
      detectedText: textDetection.DetectedText,
    }));

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        labels: labelsResponse.Labels,
        faces: facesResponse.FaceDetails,
        text: detectedText,
      }),
    };
  } catch (error) {
    return handleError(error);
  }
};

export const handler = analyzeImage;
