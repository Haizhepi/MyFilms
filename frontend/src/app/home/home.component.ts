import {
  BreakpointObserver,
  Breakpoints,
  BreakpointState,
} from '@angular/cdk/layout';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ContinueWatchingService } from '../Services/WatchlistServices/continue-watching.service';
import { InfoService } from '../Services/DetailServices/info.service';
import { Display, Movie, TV } from '../structure.type';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  showNavigationArrows = true;
  showNavigationIndicators = true;
  pauseOnHover = true;
  mainMovies: Movie[] = [];
  trendingMovies: Display[] = [];
  topRatedMovies: Display[] = [];
  popularMovies: Display[] = [];
  trendingTVs: Display[] = [];
  topRatedTVs: Display[] = [];
  popularTVs: Display[] = [];
  trendingMoviesF: Display[][] = [];
  topRatedMoviesF: Display[][] = [];
  popularMoviesF: Display[][] = [];
  trendingTVsF: Display[][] = [];
  topRatedTVsF: Display[][] = [];
  popularTVsF: Display[][] = [];
  mobile = false;

  isContiune = false;
  continueDisplayF: Display[][] = [];
  continueDisplay: Display[] = [];
  constructor(
    private info: InfoService,
    private continueWatching: ContinueWatchingService,
    private breakpointObserver: BreakpointObserver
  ) {}

  splitCarousel<T>(array: T[]): T[][] {
    const res: T[][] = [];
    while (array.length) res.push(array.splice(0, 6));
    return res;
  }

  onClick(trending: Movie) {
    this.continueWatching.addToList({
      id: trending.id,
      title: trending.title,
      poster_path: trending.poster_path,
      media_type: 'movie',
    });
  }

  ngOnInit(): void {
    if (this.continueWatching.hasData()) {
      this.isContiune = true;
      this.continueDisplayF = this.continueWatching.getData();
      this.continueDisplay = this.continueWatching.getAllData();
    }

    this.breakpointObserver
      .observe([Breakpoints.XSmall])
      .subscribe((state: BreakpointState) => {
        if (state.breakpoints[Breakpoints.XSmall]) {
          console.log('Matches XSmall viewport');
          this.mobile = true;
        }
      });

    this.info.mainMovies().subscribe((result) => {
      this.mainMovies = result.data.slice(0, 5);
    });
    this.info.trendingMovies().subscribe((result) => {
      this.trendingMovies = result.data.map((t) => {
        return {
          id: t.id,
          title: t.title,
          poster_path: t.poster_path,
          media_type: 'movie',
        };
      });
      if (!this.mobile) {
        this.trendingMoviesF = this.splitCarousel(this.trendingMovies);
      }
    });
    this.info.topRatedMovies().subscribe((result) => {
      this.topRatedMovies = result.data.map((t) => {
        return {
          id: t.id,
          title: t.title,
          poster_path: t.poster_path,
          media_type: 'movie',
        };
      });
      if (!this.mobile) {
        this.topRatedMoviesF = this.splitCarousel(this.topRatedMovies);
      }
    });
    this.info.popularMovies().subscribe((result) => {
      this.popularMovies = result.data.map((t) => {
        return {
          id: t.id,
          title: t.title,
          poster_path: t.poster_path,
          media_type: 'movie',
        };
      });
      if (!this.mobile) {
        this.popularMoviesF = this.splitCarousel(this.popularMovies);
      }
    });
    this.info.trendingTVs().subscribe((result) => {
      this.trendingTVs = result.data.map((d) => {
        return {
          id: d.id,
          title: d.name,
          poster_path: d.poster_path,
          media_type: 'tv',
        };
      });
      if (!this.mobile) {
        this.trendingTVsF = this.splitCarousel(this.trendingTVs);
      }
    });
    this.info.topRatedTVs().subscribe((result) => {
      this.topRatedTVs = result.data.map((d) => {
        return {
          id: d.id,
          title: d.name,
          poster_path: d.poster_path,
          media_type: 'tv',
        };
      });
      if (!this.mobile) {
        this.topRatedTVsF = this.splitCarousel(this.topRatedTVs);
      }
    });
    this.info.popularTVs().subscribe((result) => {
      this.popularTVs = result.data.map((d) => {
        return {
          id: d.id,
          title: d.name,
          poster_path: d.poster_path,
          media_type: 'tv',
        };
      });
      if (!this.mobile) {
        this.popularTVsF = this.splitCarousel(this.popularTVs);
      }
    });
  }
}
