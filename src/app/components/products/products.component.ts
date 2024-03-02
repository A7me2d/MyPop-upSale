import { Component, OnInit } from '@angular/core';
import { PruductsService } from '../../services/pruducts.service';
import { Products } from '../../interfaces/products';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { CartService } from 'src/app/services/cart.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  productsList: Products[] = []
  searchValue:string = '';
  productTitle: any;

  constructor(private _products: PruductsService,private _cart:CartService,private toastr: ToastrService) {
  }

  ngOnInit(): void {

    this._products.getProducts().subscribe({
      next: (respone) => {
        this.productsList = respone.data
        // let Titre:any = respone.data.category.name
        // console.log(Titre);
        

      },
      error: (err) => { console.log(err) }
    })
    this.getCategry()
  }




  categryList: any[] = []
  getCategry() {
    this._products.getCategry().subscribe({
      next:(res)=>{
      this.categryList = res.data
      console.log(res.data[0].name);
      // console.log(this.categryList);
      
    }

  })
}
customOptions: OwlOptions = {
  loop: true,
  mouseDrag: false,
  touchDrag: false,
  pullDrag: false,
  dots: false,
  navSpeed: 700,
  navText: ['', ''],
  responsive: {
    0: {
      items: 1
    },
    400: {
      items: 2
    },
    740: {
      items: 3
    },
    940: {
      items: 4
    },
    950: {
      items: 5
    },
    970: {
      items: 6
    }
  },
  nav: true
}

addToMycart(productId:string){
  this._cart.addTocart(productId).subscribe({
    next:(res)=>{console.log(res)
      this._cart.cartNumber2.next(res.numOfCartItems);
      this.toastr.success('🛺',res.message,{
        closeButton:true,
      });
    },
    error:(err)=>{console.log(err)}
  })
}


addToMyWishlist(productId:string){
  this._cart.addToWishlist(productId).subscribe({
    next:(res)=>{console.log(res)
      this.toastr.success('❤',res.message,{
        closeButton:true,
      });
    },
    error:(err)=>{console.log(err)}
  })

}

}
