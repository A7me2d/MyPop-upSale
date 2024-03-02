import { count } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-mycart',
  templateUrl: './mycart.component.html',
  styleUrls: ['./mycart.component.scss']
})
export class MycartComponent implements  OnInit{


  cartItems:any;
  num:any;

constructor(private _cart:CartService){}

ngOnInit(): void {
  this.getMyCart()
}

getMyCart(){
  this._cart.getItemOfCart().subscribe({
    next:(res)=>{
      // console.log(res)
      this.cartItems = res;
    },
    error:(err)=>{console.log(err)}
  })
}


updateMyCart(count:number, id:string){
  if(count == 0){
    this.deleteMyCart(id)
    this.getMyCart()
  }
  this._cart.updateCart(count, id).subscribe({
    next:(res)=>{console.log(res)
    // this.getMyCart()
    this.getMyCart()
    this.cartItems = res.data;
    },
    error:(err)=>{
      // console.log(err)
    }
  })
}

deleteMyCart(id:string){
  this._cart.deleteCart(id).subscribe({
    next:(res)=>{
      // console.log(res)
      this._cart.cartNumber.next(res.numOfCartItems);
      this.cartItems = res.data;
      this.getMyCart()
    },
    error:(err)=>{console.log(err)}
  })
}

}
