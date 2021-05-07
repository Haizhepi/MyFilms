import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  MoviesResponse,
  TrendingResponse,
  TvsResponse,
  url,
} from '../../structure.type';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class InfoService {
  constructor(private http: HttpClient) {}

  mainMovies() {
    return this.http
      .get<TrendingResponse>(url + '/info/movie/now_playing')
      .pipe(
        map((r) => {
          const d = r.data;
          r.data = d.filter((dis) => dis.poster_path !== null);
          return r;
        })
      );
  }

  trendingMovies() {
    return this.http.get<MoviesResponse>(url + '/info/movie/trending').pipe(
      map((r) => {
        const d = r.data;
        r.data = d.filter((dis) => dis.poster_path !== null);
        return r;
      })
    );
  }

  topRatedMovies() {
    return this.http.get<MoviesResponse>(url + '/info/movie/top_rated').pipe(
      map((r) => {
        const d = r.data;
        r.data = d.filter((dis) => dis.poster_path !== null);
        return r;
      })
    );
  }

  popularMovies() {
    return this.http.get<MoviesResponse>(url + '/info/movie/popular').pipe(
      map((r) => {
        const d = r.data;
        r.data = d.filter((dis) => dis.poster_path !== null);
        return r;
      })
    );
  }

  trendingTVs() {
    return this.http.get<TvsResponse>(url + '/info/tv/trending').pipe(
      map((r) => {
        const d = r.data;
        r.data = d.filter((dis) => dis.poster_path !== null);
        return r;
      })
    );
  }

  topRatedTVs() {
    return this.http.get<TvsResponse>(url + '/info/tv/top_rated').pipe(
      map((r) => {
        const d = r.data;
        r.data = d.filter((dis) => dis.poster_path !== null);
        return r;
      })
    );
  }

  popularTVs() {
    return this.http.get<TvsResponse>(url + '/info/tv/popular').pipe(
      map((r) => {
        const d = r.data;
        r.data = d.filter((dis) => dis.poster_path !== null);
        return r;
      })
    );
  }
}
