import { ObjectId } from 'mongoose';

interface IntroductionPost {
  author: ObjectId;
  title: string;
  thumbnail: string;
  content: string;
  summary: string;
  category: string;
  tags: Array<String>;
  views: number;
  timestamps: string;
}

export type TypeIntroductionPostList = Pick<
  IntroductionPost,
  | 'author'
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
  | 'author'
  | 'title'
  | 'thumbnail'
  | 'content'
  | 'summary'
  | 'category'
  | 'tags'
  | 'views'
  | 'timestamps'
>;
