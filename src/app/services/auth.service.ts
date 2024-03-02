import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { BehaviorSubject, Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private _http:HttpClient,private _router:Router) {
    if (localStorage.getItem('userToken') !== null) {
      this.saveUserData()
    }
   }


  userData = new BehaviorSubject(null)
  userId = new BehaviorSubject<any>(null)

  saveUserData(){
 let encodeToken:any =  localStorage.getItem('userToken')
 let decodeToken:any = jwtDecode(encodeToken)
 this.userData .next(decodeToken)
 this.userId .next(decodeToken)
  // console.log(this.userId);
  }

  logout(){
    localStorage.removeItem('userToken')
  this._router.navigate(['/signin'])
  this.userData.next(null)
  }

  register(formData:any):Observable<any> {
    return this._http.post(`https://ecommerce.routemisr.com/api/v1/auth/signup`,formData)
  }

  login(formData:any):Observable<any> {
    return this._http.post(`https://ecommerce.routemisr.com/api/v1/auth/signin`,formData)
  }

  forgetPassword(formData:any){
   return this._http.post(`https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords`,formData)
  }
  verfiyCode(formData:any){
   return this._http.post(`https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode`,formData)
  }
  restPassword(formData:any){
   return this._http.put(`https://ecommerce.routemisr.com/api/v1/auth/resetPassword`,formData)
  }

}
