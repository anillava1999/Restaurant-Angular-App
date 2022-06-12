import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder ,FormGroup} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserProfileData } from '../signup/user.model';
import { ApiService } from '../shared/api.service';
import { RestaurantDashComponent } from '../restaurant-dash/restaurant-dash.component';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  profileupdate!:FormGroup
  profileModelObj: UserProfileData = new UserProfileData;
  RestaurantDashComponentone!: RestaurantDashComponent;
  public comp!: RestaurantDashComponent;

  userData: any;
  id: any;
  usId: any;


  constructor(private formBuilder:FormBuilder, private _http:HttpClient,private router:Router,private api: ApiService,private route:ActivatedRoute) { 

  

  }

  ngOnInit(): void {
    this.profileupdate = this.formBuilder.group({
      name:[''],
      mobile:[''],
      email:[''],
      password:[''],
    })
     this.id = this.route.snapshot.params['id'];
     this.getOne()
  

  }


  public callMe(): void {
    this.comp.clickAddRestore()
  }
  
  getOne() {
    this.api.getUnProfile(this.id).subscribe(res => {
      console.log(res);
      this.userData = res;
      this.usId = res.id;

  })
}

done(){
  
   this.RestaurantDashComponentone.clickAddRestore();
}

 

  oneUpdateProfile(userData: { id: number; name: any; mobile: any; email: any; password: any; }) {
   

    this.profileModelObj.id = userData.id
    this.profileupdate.controls['name'].setValue(userData.name);
    this.profileupdate.controls['mobile'].setValue(userData.mobile);
    this.profileupdate.controls['email'].setValue(userData.email);
    this.profileupdate.controls['password'].setValue(userData.password);




    
  }
  updateUserProfile() {
  
    this.profileModelObj.name = this.profileupdate.value.name;
    this.profileModelObj.mobile = this.profileupdate.value.mobile;
    this.profileModelObj.email = this.profileupdate.value.email;
    this.profileModelObj.password = this.profileupdate.value.password;
   

    this.api.updateUserData(this.profileModelObj, this.id).subscribe(res => {
      alert("Restaurant records updated");
      let ref = document.getElementById('clear');
      ref?.click()

      this.getOne()

    })
  
  }
  
 



 
}
