import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  CastResponse,
  MovieDetail,
  MoviesResponse,
  ReviewResponse,
  TVDetail,
  TvsResponse,
  VideoResponse,
  url,
} from '../../structure.type';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class DetailService {
  constructor(private http: HttpClient) {}

  movieDetail(movieId: number) {
    return this.http.get<MovieDetail>(url + '/detail/detail_movie/' + movieId);
  }

  tvDetail(tvId: number) {
    return this.http.get<TVDetail>(url + '/detail/detail_tv/' + tvId);
  }

  movieVid(movieId: number) {
    return this.http.get<VideoResponse>(
      url + '/detail/movie/videos/' + movieId
    );
  }

  tvVid(tvId: number) {
    return this.http.get<VideoResponse>(url + '/detail/tv/videos/' + tvId);
  }

  movieCast(movieId: number) {
    return this.http.get<CastResponse>(url + '/detail/cast_movie/' + movieId);
  }

  tvCast(tvId: number) {
    return this.http.get<CastResponse>(url + '/detail/cast_tv/' + tvId);
  }

  movieReview(movieId: number) {
    return this.http.get<ReviewResponse>(
      url + '/detail/reviews_movie/' + movieId
    );
  }

  tvReview(tvId: number) {
    return this.http.get<ReviewResponse>(url + '/detail/reviews_tv/' + tvId);
  }

  movieRecommend(movieId: number) {
    return this.http
      .get<MoviesResponse>(url + '/detail/recommend_movie/' + movieId)
      .pipe(
        map((r) => {
          const d = r.data;
          r.data = d.filter((dis) => dis.poster_path !== null);
          return r;
        })
      );
  }

  tvRecommend(tvId: number) {
    return this.http
      .get<TvsResponse>(url + '/detail/recommend_tv/' + tvId)
      .pipe(
        map((r) => {
          const d = r.data;
          r.data = d.filter((dis) => dis.poster_path !== null);
          return r;
        })
      );
  }

  movieSimiliar(movieId: number) {
    return this.http
      .get<MoviesResponse>(url + '/detail/similiar_movie/' + movieId)
      .pipe(
        map((r) => {
          const d = r.data;
          r.data = d.filter((dis) => dis.poster_path !== null);
          return r;
        })
      );
  }

  tvSimiliar(tvId: number) {
    return this.http.get<TvsResponse>(url + '/detail/similiar_tv/' + tvId).pipe(
      map((r) => {
        const d = r.data;
        r.data = d.filter((dis) => dis.poster_path !== null);
        return r;
      })
    );
  }
}
