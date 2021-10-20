import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from './models/user';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  private usersUrl = 'http://localhost:3000/users'

  constructor(private http:HttpClient) { }

  getRequest(url: string) {
    this.http.get(url).subscribe((response) => {
      console.log(response)
    })
  }

  getUsers(): Observable<User[]>{
    return this.http.get<User[]>(this.usersUrl)
  }

}
