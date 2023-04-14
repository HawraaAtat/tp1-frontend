import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://173.249.40.235:5005/api/User/Login()';

  constructor(private http: HttpClient) {
  }

  login(username: string, password: string):Observable<any> {
    return this.http.post<any>(this.apiUrl, {username, password});
  }
}
