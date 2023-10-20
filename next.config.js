/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'i.pravatar.cc',
      `${process.env.AWS_S3_BUCKET}.s3.${process.env.AWS_S3_REGION}.amazonaws.com`,
    ], // 이미지를 호스팅하는 도메인 목록을 지정합니다.
  },
};

module.exports = nextConfig;
