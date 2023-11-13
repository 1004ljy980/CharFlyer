import jwt from 'jsonwebtoken';

const SECRET = process.env.JWT_SECRET_KEY || '';
const ACCESS_EXPIRES_IN = process.env.JWT_ACCESS_EXPIRES_IN || '0s';
const REFRESH_EXPIRES_IN = process.env.JWT_REFRESH_EXPIRES_IN || '0s';

// access Token 발급
const generateAccessToken = (userId: string) => {
  return jwt.sign({ userId: userId }, SECRET, {
    algorithm: 'HS256', // 암호화 알고리즘
    expiresIn: ACCESS_EXPIRES_IN, // 유효기간
  });
};

// access Token 검증
const verifyAccessToken = (token: string) => {
  let decoded: any = null;
  try {
    decoded = jwt.verify(token, SECRET);
    return {
      ok: true,
      userId: decoded.userId,
    };
  } catch (error: any) {
    return {
      ok: false,
      message: error.message,
    };
  }
};

// refresh Token 발급
const generateRefreshToken = (userId: string) => {
  return jwt.sign({ userId: userId }, SECRET, {
    algorithm: 'HS256',
    expiresIn: REFRESH_EXPIRES_IN, // 유효기간
  });
};

// refresh Token 검증
const verifyRefreshToken = (token: string) => {
  try {
    jwt.verify(token, SECRET);
    return true;
  } catch (error) {
    return false;
  }
};

export {
  generateAccessToken,
  verifyAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
};
