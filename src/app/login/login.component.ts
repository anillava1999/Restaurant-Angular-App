import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../shared/api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup
  message!: number;
  obj: any;
  constructor(private formBuilder: FormBuilder, private _http: HttpClient, private router: Router, private api: ApiService) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: [''],
      password: ['']
    })



  }

  loginfun() {
    this._http.get<any>("http://localhost:3000/signup").subscribe(res => {
      const user = res.find((a: any) => {
        return a.email === this.loginForm.value.email && a.password === this.loginForm.value.password && a.id
      })

      if (user) {
        alert("User Login Succesffully");
        this.api.setMessage(user.id)
        this.router.navigate(["restuarant"])
      }
      else {
        alert("User Not Found");
        this.router.navigate(["login"])
      }
    }, err =>
      alert("Something is wrong")
    )
  }




}
