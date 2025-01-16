export type mapedMovieType = {
  awards: string;
  created_at: string;
  description_en: string;
  description_ka: string;
  id: number;
  image: string;
  name_en: string;
  name_ka: string;
  nomination: number;
  oscars: number;
  rating_count: number;
  rating_sum: number;
  release_date: string;
  trailer: string;
  rating: number;
};

export type moviesWithPagType = {
  awards: string;
  created_at: string;
  description_en: string;
  description_ka: string;
  id: number;
  image: string;
  name_en: string;
  name_ka: string;
  nomination: number;
  oscars: number;
  rating_count: number;
  rating_sum: number;
  release_date: string;
  trailer: string;
  rating: number;
  count: number;
};

export type moviesRateType = {
  user_id: string;
  m_id: number;
  rate: number;
  rating_sum: number;
  rating_count: number;
};

export type userRatedMoviesType = {
  created_at: string;
  id: number;
  m_id: number;
  rating: number;
  user_id: string;
};

export type lastRatedType = {
  rated: boolean;
  id: number;
  value: number;
};
