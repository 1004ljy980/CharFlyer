import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { v4 as uuidv4 } from 'uuid';

// AWS IAM Setting
const AWS_S3_ACCESS_ID = process.env.AWS_S3_ACCESS_ID || '';
const AWS_S3_ACCESS_KEY = process.env.AWS_S3_ACCESS_KEY || '';
const AWS_S3_REGION = process.env.AWS_S3_REGION || '';
const AWS_S3_BUCKET = process.env.AWS_S3_BUCKET || '';

// S3를 이용하기위한 IAM 사용자 세팅
const client = new S3Client({
  region: AWS_S3_REGION,
  credentials: {
    accessKeyId: AWS_S3_ACCESS_ID,
    secretAccessKey: AWS_S3_ACCESS_KEY,
  },
});

/**
 * 이미지를 S3에 업로드하는 함수입니다.
 * @param file 파일
 * @returns
 */
const uploadImageToS3 = async (file: Blob, folder: string): Promise<string> => {
  try {
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const key = `${folder}/${uuidv4()}_${file.name}`;

    const command = new PutObjectCommand({
      Bucket: AWS_S3_BUCKET,
      Key: key,
      Body: buffer,
      ACL: 'public-read',
    });

    const response = await client.send(command);

    return response.$metadata.httpStatusCode === 200
      ? `https://${AWS_S3_BUCKET}.s3.${AWS_S3_REGION}.amazonaws.com/${key}`
      : '';
  } catch (error) {
    return error;
  }
};

export default uploadImageToS3;
