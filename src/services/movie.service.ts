import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {HttpClient} from '@angular/common/http';
import { KEY, URI } from 'src/app/config/configuration';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  constructor(private http: HttpClient) { }

  searchMovie(search: string, numberPage: number): Observable<any> {
    return this.http.get(`${URI}${KEY}&s=${search}&page=${numberPage}`, {
    });
  }
}





