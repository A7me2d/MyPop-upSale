import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent {

  constructor( private _cart:CartService) { }



checkout = new FormGroup({
  details: new FormControl(),
  phone: new FormControl(),
  city: new FormControl()
})
ngOnInit(){
  this.getMyCart()
}

cartId:any;
getMyCart(){
  this._cart.getItemOfCart().subscribe({
    next:(res)=>{console.log(res)
      this.cartId = res.data._id
    },
    error:(err)=>{console.log(err)}
  })
}


payment(form:FormGroup){
  console.log(form.value);
  this._cart.checkOut(this.cartId , form.value).subscribe({
    next:(res)=>{
      console.log(res)
      window.location = res.session.url
    },
    error:(err)=>{console.log(err)}
  })
  
}


}
