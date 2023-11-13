interface IntroductionPost {
  id: string;
  introductionPostId: string;
  authorId: string;
  authorName: string;
  authorImage: string;
  title: string;
  thumbnail: string;
  content: string;
  summary: string;
  category: string;
  tags: string[];
  views: Number;
  timestamps: string;
}

export type TypeIntroductionPostList = Pick<
  IntroductionPost,
  | 'id'
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

export type TypeIntroductionPostDetail = Pick<
  IntroductionPost,
  | 'id'
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
