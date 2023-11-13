import { Schema, models, model } from 'mongoose';

const REFRESH_EXPIRES_IN_DAY: string =
  process.env.JWT_REFRESH_EXPIRES_IN?.split('d')[0] || '0';
const REFRESH_EXPIRES_IN_SECOND: number =
  Number(REFRESH_EXPIRES_IN_DAY) * 60 * 60 * 24; // 1일 기준으로 곱함

// timestamps로 생성되는 updatedAt에 인덱스를 작성하여 TTL (토큰만료)를 구현합니다.
const TokensSchema = new Schema(
  {
    userId: {
      type: String,
      required: true,
      unique: true,
    },
    refreshToken: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// TTL index
TokensSchema.index(
  { updatedAt: 1 },
  { expireAfterSeconds: REFRESH_EXPIRES_IN_SECOND }
);

export type TypeToken = {
  _id: string;
  userId: string;
  refreshToken: string;
};

const Token = models?.Token || model<TypeToken>('Token', TokensSchema);

export default Token;
