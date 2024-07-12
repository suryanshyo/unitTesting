import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserData } from '../model/user-data';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  apiUrl = 'https://jsonplaceholder.typicode.com/posts';

  constructor(private http: HttpClient) { }

  // Function for returning values
  getPosts(): Observable<UserData[]> {
    return this.http.get<UserData[]>(this.apiUrl)
  }
}
