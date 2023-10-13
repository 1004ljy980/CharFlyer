import multer from 'multer';
import multerS3 from 'multer-s3';
import aws from 'aws-sdk';

// AWS IAM Setting
const AWS_S3_ACCESS_ID = process.env.AWS_S3_ACCESS_ID || '';
const AWS_S3_ACCESS_KEY = process.env.AWS_S3_ACCESS_KEY || '';
const AWS_S3_REGION = process.env.AWS_S3_REGION || '';
aws.config.update({
  accessKeyId: AWS_S3_ACCESS_ID,
  secretAccessKey: AWS_S3_ACCESS_KEY,
  region: AWS_S3_REGION,
});

// S3 접근
const s3 = new aws.S3() as any;

/**
 * 이 함수의 single, array 메소드를 통해 파일을 S3에 업로드합니다.
 */
export const upload = multer({
  // storage : 파일 저장 위치
  storage: multerS3({
    s3: s3,
    bucket: 'charflyerbucket', //생성한 버킷 이름
    acl: 'public-read', // 소유자는 모든 권한, 유저는 읽기 권한만
    contentType: multerS3.AUTO_CONTENT_TYPE,
    key: (request, file, callback) => {
      callback(null, `${Date.now()}_${file.originalname}`);
    }, //파일명 : 현재 시각_파일명
  }),
  // limits : 파일 크기 제한
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
});
