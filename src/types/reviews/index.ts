export type addReviewType = {
  comment: string;
};

export type userReview = {
  m_id: number;
  name_ka: string;
  name_en: string;
  image: string | undefined;
  user_id: string;
  likes: number;
  comment: string;
};

export type getUserReviewsType = {
  id: number;
  m_id: number;
  name_ka: string;
  name_en: string;
  image: string | undefined;
  user_id: string;
  likes: number;
  comment: string;
  created_at: string;
};
