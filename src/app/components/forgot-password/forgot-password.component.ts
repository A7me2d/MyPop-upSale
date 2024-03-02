import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent {
msgSuccss:any;
msgSu:any;

  constructor(private _auth:AuthService, private Router:Router){}


  forgetPassword = new FormGroup({
    email: new FormControl(),
  });


sendCode(form:FormGroup):void{
console.log(form);
this._auth.forgetPassword(form.value).subscribe({
  next:(response:any)=>{
    console.log(response)
    this.msgSuccss  = response.message
    document.querySelector('.forgetPassword')?.classList.add('d-none')
    document.querySelector('.verfyCode')?.classList.remove('d-none')
  },
  error:(err)=>{console.log(err)
    this.msgSuccss  = err.error.message
  }
})
}

verifyCode = new FormGroup({
  resetCode: new FormControl(),
});
verfyRest(form:FormGroup){
this._auth.verfiyCode(form.value).subscribe({
  next:(Response:any)=>{
    console.log(Response)
    this.msgSuccss  = Response.message;
    if(Response.status == 'Success'){
      this.Router.navigate(['/restetpassword'])
  }},

  error:(err)=>{console.log(err)}
})
} 


}
