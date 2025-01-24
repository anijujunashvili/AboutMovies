export type actorType = {
  born: string;
  created_at: string;
  id: number;
  image: string;
  name_en: string;
  name_ka: string;
  nominations: number;
  oscar: number;
  wins: number;
  birth_place_ka: string;
  birth_place_en: string;
  biography_ka: string;
  biography_en: string;
};

export type MapedActorType = {
  born: string;
  created_at: string;
  id: number;
  image: string;
  name_en: string;
  name_ka: string;
  nominations: number;
  oscar: number;
  wins: number;
  count: number;
};

export type ActorTypeWithPag = {
  born: string;
  created_at: string;
  id: number;
  image: string;
  name_en: string;
  name_ka: string;
  nominations: number;
  rating_count: number;
  rating_sum: number;
  oscar: number;
  wins: number;
  count: number;
};

export type Actor = {
  id: number;
  name_ka: string;
  name_en: string;
  born: string;
  image: string;
};

export type movieActorsType = {
  id: number;
  actors: Actor | Actor[] | null;
};

type Actors = {
  name_ka: string;
  name_en: string;
  image: string;
  born: string;
  id: number;
};

export type movieAct = {
  id: number;
  actors: Actors | null;
};

export type ActorsPropsType = {
  actors: movieAct[] | undefined;
};
