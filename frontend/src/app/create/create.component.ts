import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ApiserviceService } from '../apiservice.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  userForm = new FormGroup({
    fullname: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
    mobile: new FormControl('', Validators.required)
  })

  errormsg: any
  successmsg: any
  getParamId!: any
  user: {id:number, fullname:string, email:string, mobile:string}[] = []
  constructor(
    private apiService: ApiserviceService,
    private router: ActivatedRoute
    ) { }

  ngOnInit(): void {
    //console.log(this.router.snapshot.paramMap.get('id'))
    this.getParamId = this.router.snapshot.paramMap.get('id');
    if(this.getParamId) {
      this.getSingleUser(this.getParamId).subscribe(
      (response) => {
        console.log(response.data[0].id);
        this.userForm.patchValue({
          fullname: response.data[0].fullname,
          email: response.data[0].email,
          mobile: response.data[0].mobile
        })
      }
    )
    }
  }

  // create user
  userSubmit(){
    if(this.userForm.valid) {
      console.log(this.userForm.value)
      this.apiService.createData(this.userForm.value)
      .subscribe(res => {
        //console.log(res, 'res ==> ');
        this.userForm.reset();
      })
    } else {
      this.errormsg = "All fields required"
      this.userForm.reset();
    }
  }

  // Get single user

  getSingleUser(id: any) {
    return this.apiService.getSingleData(id)/* .subscribe(
      (response) => {console.log(response)}
    ) */
  }

  // update user
  updateSubmit() {
    if(this.userForm.valid) {
      console.log(this.userForm.value)
      this.apiService.updateData(this.getParamId, this.userForm.value)
      .subscribe(res => {
        console.log(res, "Data updated")
        this.successmsg = 'Update complete'
      })
    } else{
      this.errormsg = 'All fields required'
    }
  }

}
