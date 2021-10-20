import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { User } from '../models/user';

@Component({
  selector: 'app-http',
  templateUrl: './http.component.html',
  styleUrls: ['./http.component.css']
})
export class HttpComponent implements OnInit {

  users: User[] = []

  constructor(private httpService: HttpService) { }

  ngOnInit(): void {
    //this.httpService.getRequest('https://api3.islamhouse.com/v3/paV29H2gm56kvLPy/categories/showall/ar/json')
    this.getAllUsers()
  };

  getAllUsers(): void {
    this.httpService.getUsers()
      .subscribe((users) => {
        this.users = users;
        //console.log(this.users)
      })
  }

}
