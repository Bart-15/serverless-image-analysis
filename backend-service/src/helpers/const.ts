import { IMAGE_ANALYSIS_BUCKET, s3 } from '../config/config';

export const generatePresignedURL = async (key: string) => {
  const expirationTime = 24 * 3600; // 1 day

  const params = {
    Bucket: IMAGE_ANALYSIS_BUCKET,
    Key: key, //filename
    Expires: expirationTime,
  };

  return await s3.getSignedUrlPromise('getObject', params);
};

export const validImageMimeTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];

export const headers = {
  'content-type': 'application/json',
  'Access-Control-Allow-Origin': 'http://localhost:5173', // Ensure this matches the origin in the CORS settings
  'Access-Control-Allow-Credentials': 'true',
};
