import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { MovieDetailComponent } from './movie-detail/movie-detail.component';
import { MylistComponent } from './mylist/mylist.component';
import { TvDetailComponent } from './tv-detail/tv-detail.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'mylist',
    component: MylistComponent,
  },
  {
    path: 'watch/movie/:movieId',
    component: MovieDetailComponent,
  },
  {
    path: 'watch/tv/:tvId',
    component: TvDetailComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
