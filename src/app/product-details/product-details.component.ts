import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PruductsService } from '../services/pruducts.service';
import { CartService } from '../services/cart.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent {
  productDetels:any;
constructor(private toastr:ToastrService,private _ActRoute:ActivatedRoute, private _products:PruductsService,private _cart:CartService){}



ngOnInit(): void {
  let productid  = this._ActRoute.snapshot.params['Id']
  this._products.productsDetails(productid).subscribe({
    
    next:(response)=>{this.productDetels = response.data;},
    error:(err)=>{console.log(err)}
  })
}



addToMycart(productId:string){
  this._cart.addTocart(productId).subscribe({
    next:(res)=>{console.log(res)
      this.toastr.success('🛺',res.message,{
        closeButton:true,
      });
    },
    error:(err)=>{console.log(err)}
  })
}

}
