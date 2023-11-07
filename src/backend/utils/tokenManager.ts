import jwt from 'jsonwebtoken';

const secret = process.env.JWT_SECRET_KEY || '';
const accessExpiresIn = process.env.JWT_ACCESS_EXPIRES_IN || '';
const refreshExpiresIn = process.env.JWT_REFRESH_EXPIRES_IN || '';

// access Token 발급
const generateAccessToken = (userId: string) => {
  return jwt.sign({ userId: userId }, secret, {
    algorithm: 'HS256', // 암호화 알고리즘
    expiresIn: accessExpiresIn, // 유효기간
  });
};

// access Token 검증
const verifyAccessToken = (token: string) => {
  let decoded: any = null;
  try {
    decoded = jwt.verify(token, secret);
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
  return jwt.sign({ userId: userId }, secret, {
    algorithm: 'HS256',
    expiresIn: refreshExpiresIn, // 유효기간
  });
};

// refresh Token 검증
const verifyRefreshToken = (token: string) => {
  try {
    jwt.verify(token, secret);
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
