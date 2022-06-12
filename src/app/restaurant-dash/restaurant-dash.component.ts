import { HttpClient } from '@angular/common/http';
import { conditionallyCreateMapObjectLiteral } from '@angular/compiler/src/render3/view/util';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ProfileComponent } from '../profile/profile.component';
import { ApiService } from '../shared/api.service';
import { UserProfileData } from '../signup/user.model';
import { RestaurantData } from './restuarant.model';

@Component({
  selector: 'app-restaurant-dash',
  templateUrl: './restaurant-dash.component.html',
  styleUrls: ['./restaurant-dash.component.css']
})
export class RestaurantDashComponent implements OnInit {

  formValue!: FormGroup
  loginForm !: FormGroup
  restaurantModelObj: RestaurantData = new RestaurantData;
  profileModelObj: UserProfileData = new UserProfileData;

  allRestarantData: any;
  showAdd!: boolean
  showbtn!: boolean
  userData: any;
  profileupdate!: FormGroup;
  message!: number;
  pid: any;


  constructor(private formBuilder: FormBuilder, private api: ApiService, private router: Router, private _http: HttpClient) { }

  ngOnInit(): void {

    this.formValue = this.formBuilder.group({
      name: [''],
      email: [''],
      mobile: [''],
      address: [''],
      services: ['']

    })
    this.getAllData()
    this.getUserData()
    this.message = this.api.getMessage()

  }

   clickAddRestore() {
    this.formValue.reset();
    this.showAdd = true;
    this.showbtn = false;
  }

  // Now Subscribing our data which is mapped via services..0
  addResto() {
    this.restaurantModelObj.name = this.formValue.value.name;
    this.restaurantModelObj.email = this.formValue.value.email;
    this.restaurantModelObj.mobile = this.formValue.value.mobile;
    this.restaurantModelObj.address = this.formValue.value.address;
    this.restaurantModelObj.services = this.formValue.value.services;

    this.api.postRestaurant(this.restaurantModelObj).subscribe(res => {
      console.log(res);
      alert("Restaurant Records Added Succesfully");
      let ref = document.getElementById('clear');
      ref?.click()

      this.formValue.reset()
      this.getAllData()
    }, err => {
      alert("Something went wrong")
    }

    )

  }


  // Get all Data
  getAllData() {
    this.api.getRestuarant().subscribe(res => {
      this.allRestarantData = res;
    })
  }

  getUserData() {
    this.api.getUserdata().subscribe(res => {
      this.userData = res;
    })
  }


  // Delete Records
  deleteResto(data: any) {
    this.api.DeleteRestuarant(data.id).subscribe(res => {
      alert("Record deleted ")
      this.getAllData();  // Quick refresh without refreshing
    })
  }

  // Update Records
  onEditResto(data: any) {
    this.showAdd = false;
    this.showbtn = true;
    this.restaurantModelObj.id = data.id
    this.formValue.controls['name'].setValue(data.name);
    this.formValue.controls['email'].setValue(data.email);
    this.formValue.controls['mobile'].setValue(data.mobile);
    this.formValue.controls['address'].setValue(data.address);
    this.formValue.controls['services'].setValue(data.services);
    console.log(data)

  }

  updateResto() {

    this.restaurantModelObj.name = this.formValue.value.name;
    this.restaurantModelObj.email = this.formValue.value.email;
    this.restaurantModelObj.mobile = this.formValue.value.mobile;
    this.restaurantModelObj.address = this.formValue.value.address;
    this.restaurantModelObj.services = this.formValue.value.services;

    this.api.updateRestuarant(this.restaurantModelObj, this.restaurantModelObj.id).subscribe(res => {
      alert("Restaurant records updated");
      let ref = document.getElementById('clear');
      ref?.click()

      this.formValue.reset()
      this.getAllData()
    })
  }

  logOut() {
    alert("User Logout Successfully...")
    this.router.navigate(["login"])

  }

  profile() {
    alert("Welcome to profile...")
    this.router.navigate(["profile"])

  }

  home() {

    this.router.navigate(["restuarant"])

  }


  about() {

    this.router.navigate(["aboutus"])

  }

}
