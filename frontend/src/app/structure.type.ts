export interface TrendingResponse {
  data: Movie[];
}

export interface Movie {
  id: number;
  title: string;
  poster_path: string;
  backdrop_path: string;
}

export interface Display {
  media_type: string;
  id: number;
  title: string;
  poster_path: string;
}

export interface SearchResult {
  media_type: string;
  id: number;
  title: string;
  backdrop_path: string;
}

export interface TV {
  id: number;
  name: string;
  poster_path: string;
}

export interface MoviesResponse {
  data: Movie[];
}

export interface TvsResponse {
  data: TV[];
}

export interface MovieDetail {
  data: {
    genres: string[];
    spoken_languages: {
      english_name: string;
      iso_639_1: string;
      name: string;
    }[];
    overview: string;
    vote_average: number;
    tagline: number;
    title: string;
    release_date: string;
    runtime: number;
    poster_path: string;
  };
}

export interface TVDetail {
  data: {
    genres: string[];
    spoken_languages: {
      english_name: string;
      iso_639_1: string;
      name: string;
    }[];
    overview: string;
    vote_average: number;
    tagline: number;
    name: string;
    first_air_date: string;
    episode_run_time: number[];
    poster_path: string;
  };
}

export interface VideoResponse {
  data: Video[];
}

export interface Video {
  site: string;
  type: string;
  key: string;
  name: string;
}

export interface CastResponse {
  data: Cast[];
}

export interface Cast {
  id: number;
  name: string;
  character: string;
  profile_path: string;
}

export interface Person {
  bio: {
    birthday: string;
    gender: number;
    name: string;
    homepage: string;
    also_known_as: string[];
    known_for_department: string[];
    biography: string;
    place_of_birth: string;
    profile_path: string;
  };
  external: {
    imdb: string;
    facebook: string;
    instagram: string;
    twitter: string;
  };
}

export interface Review {
  author: string;
  content: string;
  created_at: string;
  url: string;
  rating: number;
  avatar_path: string;
}

export interface ReviewResponse {
  data: Review[];
}

export interface MyList {
  data: Display[];
}

export interface MultiResponse {
  data: SearchResult[];
}

const devURL = 'http://localhost:8080';
const prodURL = 'https://cs571-310200.uc.r.appspot.com';
const url = prodURL;

export { url };
