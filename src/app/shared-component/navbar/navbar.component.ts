import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  isLogin: boolean = false;
  cartNumber!:number ;
  constructor(private _auth: AuthService,private _cart:CartService) {

_cart.cartNumber.subscribe({
  next:(response)=>{
    // console.log(response);
  
  }
})



    _auth.userData.subscribe({
      next:()=>{
        if (_auth.userData.getValue() !== null) {
          this.isLogin = true
        } else {
          this.isLogin = false
        }
      }
    })
  
  }

  logOut():void{
    this._auth.logout()
  }

  ngOnInit(): void {
    this._cart.cartNumber.subscribe({
      next:(response)=>{
        // console.log(response,'navbar');
       this.cartNumber = response
      }
    })
  }

  

}
