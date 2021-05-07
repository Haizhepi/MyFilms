import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Person, url } from '../../structure.type';

@Injectable({
  providedIn: 'root',
})
export class PersonService {
  constructor(private http: HttpClient) {}

  personInfo(personId: number) {
    return this.http.get<Person>(url + '/detail/person/' + personId);
  }
}
