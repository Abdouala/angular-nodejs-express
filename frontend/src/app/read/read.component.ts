import { Component, OnInit } from '@angular/core';
import { ApiserviceService } from '../apiservice.service';

@Component({
  selector: 'app-read',
  templateUrl: './read.component.html',
  styleUrls: ['./read.component.css']
})
export class ReadComponent implements OnInit {

  dataFromServer: any;

  constructor(private apiService: ApiserviceService) { }

  ngOnInit(): void {
    this.getAllData();
  }

  getAllData(): void {
    this.apiService.getAllData()
      .subscribe(res => {
        //console.log(res, "Data results ==> ");
        this.dataFromServer = res;
      })
  }

}
