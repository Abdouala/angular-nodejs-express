import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ApiserviceService } from '../apiservice.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  userForm = new FormGroup({
    fullname: new FormControl(''),
    email: new FormControl(''),
    mobile: new FormControl('')
  })

  constructor(private apiService: ApiserviceService) { }

  ngOnInit(): void {
  }

  onSubmit(){
    console.log(this.userForm.value)
    this.apiService.createData(this.userForm.value)
      .subscribe(res => {
        //console.log(res, 'res ==> ');
        this.userForm.reset();
      })
  }

}
