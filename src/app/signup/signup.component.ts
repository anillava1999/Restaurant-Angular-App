import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../shared/api.service';
import { UserProfileData } from './user.model';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {


  profileupdate!:FormGroup
  profileModelObj: UserProfileData = new UserProfileData;
  userData: any;
  userprofileData: any;


  constructor(private formBuilder:FormBuilder, private _http:HttpClient,private router:Router,private api: ApiService) { 

  

  }

  ngOnInit(): void {
    this.profileupdate = this.formBuilder.group({
    name:[''],
    mobile:[''],
    email:[''],
    password:[''],
  })
  }

  

   // Now Subscribing our data which is mapped via services..0
 addUserProfile() {
  this.profileModelObj.name = this.profileupdate.value.name;
  this.profileModelObj.mobile = this.profileupdate.value.mobile;
  this.profileModelObj.email = this.profileupdate.value.email;
  this.profileModelObj.password = this.profileupdate.value.password;




  this.api.postUserProfile(this.profileModelObj).subscribe(res => {
    console.log(res);
    alert("Registration Successfully");
    this.profileupdate.reset();
    this.router.navigate(['login'])
  }, err => {
    alert("Something went wrong")
    console.log(err)

  }

  )
}  

}
