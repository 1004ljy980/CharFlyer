import multer from 'multer';
import multerS3 from 'multer-s3';
import aws from 'aws-sdk';
import { S3Client } from '@aws-sdk/client-s3';

// AWS IAM Setting
const AWS_S3_ACCESS_ID = process.env.AWS_S3_ACCESS_ID || '';
const AWS_S3_ACCESS_KEY = process.env.AWS_S3_ACCESS_KEY || '';
const AWS_S3_REGION = process.env.AWS_S3_REGION || '';
aws.config.update({
  accessKeyId: AWS_S3_ACCESS_ID,
  secretAccessKey: AWS_S3_ACCESS_KEY,
  region: AWS_S3_REGION,
});

// 1) s3 버킷에 대한 정보를 설정해줌
const s3 = new S3Client({
  credentials: {
    accessKeyId: AWS_S3_ACCESS_ID,
    secretAccessKey: AWS_S3_ACCESS_KEY,
  },
  region: AWS_S3_REGION,
});

// 2) multerS3를 사용하여 S3에 접근하는 미들웨어를 multer를 이용하여 만들어줌
const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: "charflyerbucket",
    key: (req, file, callback) => {
      callback(null, `${file.originalname}-${Date.now().toString()}`);
    },
  }),
});