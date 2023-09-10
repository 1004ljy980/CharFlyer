import { Schema, models, model } from 'mongoose';

// email, password 64자는 프론트엔드에서 관리. (password는 해쉬값이 들어 갈 것)
const UsersSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
      maxlength: 12,
    },
    profileImage: {
      type: String,
    },
    introduction: {
      type: String,
      maxlength: 100,
    },
    introductionPostsList: {
      type: [
        {
          type: Schema.Types.ObjectId,
          ref: 'IntroductionPost',
        },
      ],
    },
    preferredTags: {
      type: Array<String>,
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
