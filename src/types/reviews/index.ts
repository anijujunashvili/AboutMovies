export type addReviewType = {
  comment: string;
};

export type userReview = {
  m_id: number;
  user_id: string;
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

export type Profiles = {
  id: string;
  image: string;
  name_en: string;
  name_ka: string;
};
export type userReiewsType = {
  comment: string;
  user_id: string;
  id: number;
  created_at: string;
  profiles: Profiles;
};
