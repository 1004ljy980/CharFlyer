import { Schema, models, model } from 'mongoose';

const UsersSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      maxlength: 12,
    },
    profileImage: {
      type: String,
    },
    introducition: {
      type: String,
      maxlength: 100,
    },
    introductionPostsList: {
      type: Array,
    },
    preferredTags: {
      type: Array,
    },
  },
  {
    timestamps: true,
  }
);

// models에서 User가 이미 있는지 확인합니다.
// 확인 후 생성되지 않았다면, model을 통해 User 모델을 생성합니다.
const User = models?.User || model('User', UsersSchema);

export default User;
