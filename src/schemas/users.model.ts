import { Schema, models, model } from 'mongoose';

// password는 해쉬값이 들어감.
const UsersSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      match:
        /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i,
    },
    password: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
      unique: true,
      match: /^[가-힣a-zA-Z0-9]{2,8}$/,
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
      validate: [
        (tags: Array<String>) => {
          if (tags.length < 1) return true;

          const maxLength = 10;
          let isWrong = false;

          tags.forEach((tag) => {
            if (tag.length > maxLength) {
              isWrong = true;
              return;
            }
          });

          return isWrong;
        },
      ],
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
