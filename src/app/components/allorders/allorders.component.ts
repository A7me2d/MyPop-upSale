import { count } from 'rxjs';

import { Component } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
@Component({
  selector: 'app-allorders',
  templateUrl: './allorders.component.html',
  styleUrls: ['./allorders.component.scss']
})
export class AllordersComponent implements OnInit {

  ngOnInit(): void {
    this.getAllOrders(this._auth.userId.value.id);
     

  }

  theRealOrder:any
  cartItems:any[] = []
  lioop:any[] = []

  constructor(private _cart:CartService,private _auth:AuthService) {
  }

  getAllOrders(id:any){
    this._cart.getAlloreders(id).subscribe({
      next:(res)=>{
       let idnumber:any = this._auth.saveUserData();
        let idtest:any = this._auth.userId.value.id
         console.log(this._auth.userId.value.id);
        
        this.theRealOrder = res
      // console.log(this.theRealOrder);
       for(let i = 0; i < res.length; i++){
        for(let j = 0; j < res[i].cartItems.length; j++){
          this.cartItems.push(res[i].cartItems[j]) 
        }
           
       }
        // console.log(this.cartItems); 
        // this.allList = res
        // this.cartItems = res[0].cartItems
        this.looop();
      },

      error:(err)=>{console.log(err)}
    })
  }

  looop(){
  // console.log(this.cartItems); 

    for(let i = 0; i < this.cartItems.length; i++){
      for(let g =  0; g < this.cartItems[i].count; g++){
        this.lioop.push(this.cartItems[i].count) 
        // console.log(this.lioop);
      }
    }

    
  }



}
