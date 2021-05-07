import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DetailService } from '../Services/DetailServices/detail.service';
import { ContinueWatchingService } from '../Services/WatchlistServices/continue-watching.service';
import { DisplayServiceService } from '../Services/DisplayService/display-service.service';
import {
  Cast,
  Display,
  MovieDetail,
  MyList,
  Review,
  Video,
} from '../structure.type';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import {
  BreakpointObserver,
  Breakpoints,
  BreakpointState,
} from '@angular/cdk/layout';
import { ViewChild } from '@angular/core';
import { NgbAlert } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.css'],
})
export class MovieDetailComponent implements OnInit, OnDestroy {
  id: number;
  sub: any;
  detail!: MovieDetail;
  shareTwitter: string;
  shareFacebook: string;
  video: Video;
  watchString: string;
  languages: string;
  isloading: boolean = true;
  isCastLoading: boolean = true;
  isReviewLoading: boolean = true;
  isRecommendLoading: boolean = true;
  isSimilarLoading: boolean = true;
  casts: Cast[] = [];
  reviews: Review[] = [];
  recommend: Display[] = [];
  similiar: Display[] = [];
  recommendF: Display[][] = [];
  similiarF: Display[][] = [];
  inWatchList = false;
  addtoListMessage = false;
  removeFromListMessage = false;
  safeURL: SafeResourceUrl;
  isDetialLoading = true;
  mobile = false;

  constructor(
    private route: ActivatedRoute,
    private detailService: DetailService,
    private _sanitizer: DomSanitizer,
    private breakpointObserver: BreakpointObserver,
    private watchlistSerivce: ContinueWatchingService,
    public displayServiceService: DisplayServiceService
  ) {
    this.id = 0;
  }

  resetAlerts() {
    this.addtoListMessage = false;
    this.removeFromListMessage = false;
  }

  addToList() {
    this.resetAlerts();
    this.watchlistSerivce.addToList({
      id: this.id,
      title: this.detail.data.title,
      poster_path: this.detail.data.poster_path,
      media_type: 'movie',
    });
    this.inWatchList = true;
    this.addtoListMessage = true;
    setTimeout(() => this.staticAlert.close(), 5000);
  }

  removeFromList() {
    this.resetAlerts();
    this.watchlistSerivce.removeFromList({
      id: this.id,
      title: this.detail.data.title,
      poster_path: this.detail.data.poster_path,
      media_type: 'movie',
    });

    this.inWatchList = false;
    this.removeFromListMessage = true;
    setTimeout(() => this.staticAlert.close(), 5000);
  }

  @ViewChild('alert', { static: false }) staticAlert: NgbAlert;

  videoId = '';

  ngOnInit() {
    this.sub = this.route.params.subscribe((params) => {
      this.id = params['movieId']; // (+) converts string 'id' to a number

      this.detailService.movieDetail(this.id).subscribe((res) => {
        this.breakpointObserver
          .observe([Breakpoints.XSmall])
          .subscribe((state: BreakpointState) => {
            if (state.breakpoints[Breakpoints.XSmall]) {
              this.mobile = true;
            }
          });
        this.detail = res;
        this.inWatchList = this.watchlistSerivce.existInList({
          id: this.id,
          title: this.detail.data.title,
          poster_path: this.detail.data.poster_path,
          media_type: 'movie',
        });
        this.languages = this.detail.data.spoken_languages
          .map((s) => s.name)
          .join(', ');
        this.isDetialLoading = false;
        this.detailService.movieVid(this.id).subscribe((res) => {
          for (let i = 0; i < res.data.length; i++) {
            if (res.data[i].type === 'Trailer') {
              this.video = res.data[i];
              this.shareTwitter = encodeURIComponent(
                `Watch ${this.detail.data.title}\n${this.video.key}\n#USC #CSCI571 #FightOn`
              );
              this.shareFacebook =
                'https://www.facebook.com/sharer/sharer.php?u=' +
                encodeURIComponent(this.video.key) +
                '%2F&amp;src=sdkpreparse';
              const embedURL = this.video.key.replace('/watch?v=', '/embed/');
              this.safeURL = this._sanitizer.bypassSecurityTrustResourceUrl(
                embedURL
              );
              this.shareTwitter = encodeURIComponent(
                `Watch ${this.detail.data.title}\n${res.data[i].key}\n#USC #CSCI571 #FightOn`
              );
              this.videoId = embedURL.substring(
                embedURL.lastIndexOf('/') + 1,
                embedURL.length
              );
              this.isloading = false;
              return;
            }
          }
          for (let i = 0; i < res.data.length; i++) {
            if (res.data[i].type === 'Teaser') {
              this.video = res.data[i];
              this.shareTwitter = encodeURIComponent(
                `Watch ${this.detail.data.title}\n${this.video.key}\n#USC #CSCI571 #FightOn`
              );
              this.shareFacebook =
                'https://www.facebook.com/sharer/sharer.php?u=' +
                encodeURIComponent(this.video.key) +
                '%2F&amp;src=sdkpreparse';
              const embedURL = this.video.key.replace('/watch?v=', '/embed/');
              this.safeURL = this._sanitizer.bypassSecurityTrustResourceUrl(
                embedURL
              );
              this.shareTwitter = encodeURIComponent(
                `Watch ${this.detail.data.title}\n${res.data[i].key}\n#USC #CSCI571 #FightOn`
              );
              this.videoId = embedURL.substring(
                embedURL.lastIndexOf('/') + 1,
                embedURL.length
              );
              this.isloading = false;
              return;
            }
          }
          // https://www.youtube.com/embed/tzkWB85ULJY
          // "key": "https://www.youtube.com/watch?v=odM92ap8_c0",
          this.video = {
            site: 'YouTube',
            type: 'Trailer',
            key: 'https://www.youtube.com/watch?v=tzkWB85ULJY',
            name: 'CSCI571: Web Technologies - HW8 Fall 2020 - Desktop Version',
          };
          this.shareTwitter = encodeURIComponent(
            `Watch ${this.detail.data.title}\n${this.video.key}\n#USC #CSCI571 #FightOn`
          );
          this.shareFacebook =
            'https://www.facebook.com/sharer/sharer.php?u=' +
            encodeURIComponent(this.video.key) +
            '%2F&amp;src=sdkpreparse';
          const embedURL = this.video.key.replace('/watch?v=', '/embed/');
          this.safeURL = this._sanitizer.bypassSecurityTrustResourceUrl(
            embedURL
          );
          this.shareTwitter = encodeURIComponent(
            `Watch ${this.detail.data.title}\n${this.video.key}\n#USC #CSCI571 #FightOn`
          );
          this.videoId = 'tzkWB85ULJY';
          this.isloading = false;
        });
        this.detailService.movieCast(this.id).subscribe((res) => {
          this.casts = res.data.filter((c) => c.profile_path !== null);
          this.isCastLoading = false;
        });
        this.detailService.movieReview(this.id).subscribe((res) => {
          this.reviews = res.data;
          this.isReviewLoading = false;
        });
        this.detailService.movieRecommend(this.id).subscribe((res) => {
          this.recommend = res.data.map((t) => {
            return {
              id: t.id,
              title: t.title,
              poster_path: t.poster_path,
              media_type: 'movie',
            };
          });
          this.recommendF = this.displayServiceService.splitCarousel(
            this.recommend
          );
          this.isRecommendLoading = false;
        });
        this.detailService.movieSimiliar(this.id).subscribe((res) => {
          this.similiar = res.data.map((t) => {
            return {
              id: t.id,
              title: t.title,
              poster_path: t.poster_path,
              media_type: 'movie',
            };
          });
          this.similiarF = this.displayServiceService.splitCarousel(
            this.similiar
          );
          this.isSimilarLoading = false;
        });
      });
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
