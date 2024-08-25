/* eslint-disable no-console */
import { IMAGE_ANALYSIS_BUCKET, s3 } from '../config/config';

const deleteS3Images = async () => {
  try {
    const listedObjects = await s3.listObjectsV2({ Bucket: IMAGE_ANALYSIS_BUCKET }).promise();

    if (!listedObjects.Contents || listedObjects.Contents.length === 0) return;

    const objectsToDelete = listedObjects.Contents.map(({ Key }) => ({ Key: Key! }));

    if (objectsToDelete.length === 0) return;

    // Create the delete parameters
    const deleteParams = {
      Bucket: IMAGE_ANALYSIS_BUCKET,
      Delete: {
        Objects: objectsToDelete,
      },
    };

    // Delete all listed objects
    await s3.deleteObjects(deleteParams).promise();
    console.log(`Deleted ${objectsToDelete.length} objects from ${IMAGE_ANALYSIS_BUCKET}`);
  } catch (error) {
    console.error(`Error deleting objects from ${IMAGE_ANALYSIS_BUCKET}:`, error);
    throw error;
  }
};

export const handler = deleteS3Images;
