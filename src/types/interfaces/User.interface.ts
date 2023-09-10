import { ObjectId } from 'mongoose';

interface User {
  email: String;
  password: String;
  name: String;
  profileImage: String;
  introduction: String;
  introductionPostsList: Array<ObjectId>;
  preferredTags: Array<String>;
}

export type TypeUser = Pick<
  User,
  | 'email'
  | 'password'
  | 'name'
  | 'profileImage'
  | 'introduction'
  | 'introductionPostsList'
  | 'preferredTags'
>;

export type TypeAuthor = Pick<User, 'name' | 'profileImage'>;
