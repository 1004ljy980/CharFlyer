import { ObjectId } from 'mongoose';

interface User {
  name: String;
  profileImage: String;
  introduction: String;
  introductionPostsList: Array<ObjectId>;
  preferredTags: Array<String>;
}

export type TypeUser = Pick<
  User,
  | 'name'
  | 'profileImage'
  | 'introduction'
  | 'introductionPostsList'
  | 'preferredTags'
>;

export type TypeAuthor = Pick<User, 'name' | 'profileImage'>;
