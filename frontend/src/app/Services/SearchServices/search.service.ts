import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Display, MultiResponse, url } from '../../structure.type';
import { filter, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  constructor(private http: HttpClient) {}

  multiSearch(term: string) {
    return this.http.get<MultiResponse>(url + '/search/multi/' + term).pipe(
      map((r) => {
        const d = r.data;
        r.data = d.filter((dis) => dis.backdrop_path !== null);
        return r;
      }),
      map((r) => r.data.slice(0, 7))
    );
  }
}
