import { headers } from '../helpers/const';
import { handleError, HttpError } from '../middleware/errorHandler';
import { uploadImageToS3 } from '../services/uploadImage.service';
import { ProxyHandler } from '../types/handler.types';

const uploadImage: ProxyHandler = async event => {
  try {
    const parsedBody = JSON.parse(event.body as string);

    if (!parsedBody?.file) throw new HttpError(400, { error: 'Base64 image is required.' });

    const { res, presignedUrl } = await uploadImageToS3(parsedBody);

    return {
      isBase64Encoded: false,
      statusCode: 200,
      headers,
      body: JSON.stringify({
        message: 'Successfully uploaded file to S3',
        presignedURL: presignedUrl,
        key: res.Key,
      }),
    };
  } catch (error) {
    return handleError(error);
  }
};

export const handler = uploadImage;
