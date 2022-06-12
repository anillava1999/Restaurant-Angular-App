import { HttpClient } from '@angular/common/http';
import { identifierName } from '@angular/compiler';
import { Injectable } from '@angular/core';
import {map} from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class ApiService {
  message!: number ;
  
  getUserData() {
    throw new Error('Method not implemented.');
  }

  constructor(private _http:HttpClient) { }


    setMessage(data: number){
      this.message=data
    }

    getMessage(){
      return this.message 
    }
  // now here i will define the POST,GET,PUT,DELETE 

  // Create Restaurant uisng Post Method

  postRestaurant(data:any){

    return this._http.post<any>("http://localhost:3000/posts",data).pipe(map((res:any)=>{
      return res;
    }))
  }

  // Create Restaurant uisng Get Method

  getRestuarant(){
    return this._http.get<any>("http://localhost:3000/posts").pipe(map((res:any)=>{
      return res;
    }))
  }

  //Update
  updateRestuarant(data:any,id: number){
    return this._http.put<any>("http://localhost:3000/posts/"+id,data).pipe(map((res:any)=>{
      return res;
    }))
  }

  //Delete
  DeleteRestuarant(id:number){
    return this._http.delete<any>("http://localhost:3000/posts/"+id).pipe(map((res:any)=>{
      return res;
    }))
  }

  getUserdata(){
    return this._http.get<any>("http://localhost:3000/signup").pipe(map((res:any)=>{
      return res;
    }))
  }

   //Update
   updateUserData(data:any,id: number){
    return this._http.put<any>("http://localhost:3000/signup/"+id,data).pipe(map((res:any)=>{
      //console.log(res);
      return res;
    }))
  }

  postUserProfile(data:any){

    return this._http.post<any>("http://localhost:3000/signup",data).pipe(map((res:any)=>{
      return res;
    }))
  }

  getUnProfile(id: any){
    return this._http.get<any>("http://localhost:3000/signup/"+id).pipe(map((res:any)=>{
      return res;
    }))
  }

  getProfileID(id: any){
    return this._http.get<any>("http://localhost:3000/signup/"+id).pipe(map((res:any)=>{
      return res;
    }))
  }
}
