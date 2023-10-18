import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';

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
const uploadImageToS3 = async (file: Blob, folder: string) => {
  try {
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const command = new PutObjectCommand({
      Bucket: AWS_S3_BUCKET,
      Key: file.name, // uuid로 변환시켜줄 필요있음.
      Body: buffer,
    });

    const response = await client.send(command);
    console.log(response); // response 내용을 확인해서 URL을 얻을 수 있는 정보 있는지 확인 필요.
    return response;
  } catch (error) {
    return error;
  }
};

export default uploadImageToS3;
