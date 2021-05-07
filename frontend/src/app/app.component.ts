import { Component } from '@angular/core';
import { Observable, of, OperatorFunction } from 'rxjs';
import { SearchService } from './Services/SearchServices/search.service';

import {
  catchError,
  debounceTime,
  distinctUntilChanged,
  map,
  tap,
  switchMap,
} from 'rxjs/operators';
import { Display, SearchResult } from './structure.type';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  constructor(private searchService: SearchService) {}
  public model: any;
  statesWithFlags: { name: string; backdrop_path: string }[];
  collapsed = true;

  toggleCollapsed() {
    this.collapsed = !this.collapsed;
  }
  search: OperatorFunction<string, readonly SearchResult[]> = (
    text$: Observable<string>
  ) =>
    text$.pipe(
      debounceTime(500),
      distinctUntilChanged(),
      switchMap((term) =>
        term === '' ? [] : this.searchService.multiSearch(term)
      ),
      catchError(() => {
        return of([]);
      })
    );

  formatter = (x: { name: string }) => x.name;
}
