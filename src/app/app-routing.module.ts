import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutUsComponent } from './about-us/about-us.component';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { RestaurantDashComponent } from './restaurant-dash/restaurant-dash.component';
import { SignupComponent } from './signup/signup.component';

const routes: Routes = [
  {
    path:'',redirectTo:'login',pathMatch:'full'
  },
  {
    path:'login',component:LoginComponent
  },
  {
    path: 'signup',component:SignupComponent
  },
  {
    path:'restuarant',component:RestaurantDashComponent
  },
  {
    path:'profile/:id',component:ProfileComponent
  },
  {
    path:'aboutus',component:AboutUsComponent
  },
  
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
