import { IMAGE_ANALYSIS_BUCKET, s3 } from '../config/config';
import { generatePresignedURL } from '../helpers/const';

export type TImage = {
  file: string;
};

export async function uploadImageToS3(parsedBody: TImage) {
  const base64File = parsedBody.file;

  const decodedFile: Buffer = Buffer.from(
    base64File.replace(/^data:image\/\w+;base64,/, ''),
    'base64'
  );

  const imageName = `${new Date().toISOString()}.jpeg`;
  const params: AWS.S3.PutObjectRequest = {
    Bucket: IMAGE_ANALYSIS_BUCKET as string,
    Key: imageName,
    Body: decodedFile,
    ContentType: 'image/jpeg',
  };

  const res = await s3.upload(params).promise();
  const presignedUrl = await generatePresignedURL(imageName);

  return { res, presignedUrl };
}
