import { Rekognition, S3 } from 'aws-sdk';

import config from './envConfig';

export const s3 = new S3({
  apiVersion: '2006-03-01',
  signatureVersion: 'v4',
});

export const rekognition = new Rekognition();

export const IMAGE_ANALYSIS_BUCKET = config.IMAGE_ANALYSIS_BUCKET;
