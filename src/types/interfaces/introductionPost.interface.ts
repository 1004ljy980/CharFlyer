import { ObjectId } from 'mongoose';

interface IntroductionPost {
  introductionPostId: String;
  authorId: ObjectId;
  authorName: String;
  authorImage: String;
  title: String;
  thumbnail: String;
  content: String;
  summary: String;
  category: String;
  tags: Array<String>;
  views: Number;
  timestamps: String;
}

export type TypeIntroductionPostList = Pick<
  IntroductionPost,
  | 'introductionPostId'
  | 'authorId'
  | 'authorName'
  | 'authorImage'
  | 'title'
  | 'thumbnail'
  | 'summary'
  | 'category'
  | 'tags'
  | 'views'
  | 'timestamps'
>;

export type TypeIntroductionPost = Pick<
  IntroductionPost,
  | 'introductionPostId'
  | 'authorId'
  | 'authorName'
  | 'authorImage'
  | 'title'
  | 'thumbnail'
  | 'content'
  | 'summary'
  | 'category'
  | 'tags'
  | 'views'
  | 'timestamps'
>;
