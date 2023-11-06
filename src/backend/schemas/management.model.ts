import { Schema, models, model } from 'mongoose';

const ManagementSchema = new Schema({
  termsOfService: {
    type: String,
  },
  personalInformationAgreement: {
    type: String,
  },
});

export type TypeManagement = {
  _id: string;
  termsOfService: string;
  personalInformationAgreement: string;
};

// models에서 IntroductionPost가 이미 있는지 확인합니다.
// 확인 후 생성되지 않았다면, model을 통해 IntroductionPost 모델을 생성합니다.
const Management =
  models?.Management || model<TypeManagement>('Management', ManagementSchema);

export default Management;
