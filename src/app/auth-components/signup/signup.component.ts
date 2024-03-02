import { Component } from '@angular/core';
import { FormControl, FormControlOptions, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {
error!:string;
isLoading:boolean = false;
  constructor(private _auth:AuthService,private _Route:Router) {
     console.log(_auth);
  }

  registerForm: FormGroup = new FormGroup({
    name: new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(10)]),
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [Validators.required, Validators.pattern(/^[A-Z][a-z0-9]{4,8}$/)]),
    rePassword: new FormControl(null),
    phone: new FormControl(null, [Validators.required, Validators.pattern(/^(002)?(01)[0125][0-9]{8}$/)])
  },{validators:[this.configPassword]} as FormControlOptions)

  configPassword(group:FormGroup):void{
    const password = group.get('password')
    const rePassword = group.get('rePassword')
    if(rePassword?.value === ''){
      rePassword.setErrors({required:true})
    }else if(password?.value !== rePassword?.value){
      rePassword?.setErrors({mismatch:true})
    }
  }


  async refisterSubmit(form:FormGroup) {
    this.isLoading = true
    console.log(form.value)
    if(this.registerForm.valid){
      this._auth.register(form.value).subscribe({
       next:(response)=>{
        if(response.message == 'success'){
        this._Route.navigate(['/signin'])
        }
        this.isLoading = false;
        console.log(response)},
        error:(err)=>{console.log(err)
        this.error = err.error.message
        this.isLoading = false
      }
      })
    }
    
  }


}
