export type movieType = {
  awards: number;
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
};

export type searchType = {
  search: string;
};

export type advancedSearch = {
  search?: string;
  lang?: string;
  from: number;
  to: number;
  where?: string;
};
