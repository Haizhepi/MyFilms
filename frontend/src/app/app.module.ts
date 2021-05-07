import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { LayoutModule } from '@angular/cdk/layout';
import { YouTubePlayerModule } from '@angular/youtube-player';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HomeComponent } from './home/home.component';
import { MylistComponent } from './mylist/mylist.component';
import { MovieDetailComponent } from './movie-detail/movie-detail.component';
import { TvDetailComponent } from './tv-detail/tv-detail.component';
import { CardCarouselComponent } from './card-carousel/card-carousel.component';
import { HscrollcastComponent } from './hscrollcast/hscrollcast.component';
import { BioModalComponent } from './bio-modal/bio-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    MylistComponent,
    MovieDetailComponent,
    TvDetailComponent,
    CardCarouselComponent,
    HscrollcastComponent,
    BioModalComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    HttpClientModule,
    LayoutModule,
    YouTubePlayerModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
