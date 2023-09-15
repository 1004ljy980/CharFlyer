interface IntroductionPost {
  introductionPostId: String;
  authorId: String;
  authorName: String;
  authorImage: String;
  title: String;
  thumbnail: String;
  content: String;
  summary: String;
  category: String;
  tags: String[];
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

export type TypeIntroductionPostDetail = Pick<
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
