import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ContinueWatchingService } from '../Services/WatchlistServices/continue-watching.service';
import { Movie, Display } from '../structure.type';
import {
  BreakpointObserver,
  Breakpoints,
  BreakpointState,
} from '@angular/cdk/layout';

@Component({
  selector: 'app-card-carousel',
  templateUrl: './card-carousel.component.html',
  styleUrls: ['./card-carousel.component.css'],
})
export class CardCarouselComponent implements OnInit {
  showNavigationArrows = true;
  showNavigationIndicators = true;
  mobile = false;

  @Input() cardInfo: Display[][];
  @Input() cardInfoM: Display[];
  @Input() brand: string = '';

  ngOnChanges(info: any) {
    if (info.cardInfo) {
      this.cardInfoM = [].concat(...info.cardInfo.currentValue);
    }
    // man, I don't know why
  }

  constructor(
    private continueWatching: ContinueWatchingService,
    private breakpointObserver: BreakpointObserver
  ) {}

  ngOnInit(): void {
    this.breakpointObserver
      .observe([Breakpoints.XSmall])
      .subscribe((state: BreakpointState) => {
        if (state.breakpoints[Breakpoints.XSmall]) {
          this.mobile = true;
        }
      });
  }

  @ViewChild('card') carousel: any;
  @ViewChild('cardM') carouselM: any;

  ngAfterViewInit() {
    console.log(this.brand, this.cardInfoM);
    this.carousel.pause();
    this.carouselM.pause();
  }

  onClickCard(display: Display) {
    this.continueWatching.addToList(display);
  }
}
