import { Component, OnInit } from '@angular/core';
import { PruductsService } from '../../services/pruducts.service';
import { Products } from '../../interfaces/products';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { CartService } from 'src/app/services/cart.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  isloading:boolean = true
  productsList: Products[] = [];
  searchValue:string = '';
  productTitle: any;
  imagePaths = [
    { _id: 1, path: "assets/img/slider-image-1.jpeg" },
    { _id: 2, path: "assets/img/slider-image-2.jpeg" },
    { _id: 3, path: "assets/img/slider-image-3.jpeg" }
  ];

  constructor(private _products: PruductsService,private _cart:CartService,private toastr: ToastrService) {
  }

  ngOnInit(): void {
    const storedWishlist = localStorage.getItem('wishlist');
    if (storedWishlist) {
      this.wishlistStatus = JSON.parse(storedWishlist);
    }
    
    this._products.getProducts().subscribe({
      next: (response) => {
        this.productsList = response.data;
        this.isloading = false
      },
      error: (err) => { console.log(err); }
    });
    
    this.getCategry();
  }



  trimText(text: string): string {
    const words = text.trim().split(' ');
    if (words.length > 2) {
        return words.slice(0, 2).join(' ');
    }
    return text;
}




  categryList: any[] = [];

  getCategry() {
    this._products.getCategry().subscribe({
      next:(res)=>{
        this.categryList = res.data;
        this.isloading = false
      }
    });
  }

  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    dots: false,
    autoplay: true,
    autoplayTimeout: 2000,
    autoplaySpeed: 1000, 
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: { items: 1 },
      400: { items: 2 },
      740: { items: 3 },
      940: { items: 4 },
      950: { items: 5 },
      970: { items: 6 }
    },
    nav: true
  }

  customOptions2: OwlOptions = {
    loop: true,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    autoplay: true,
    autoplayTimeout: 4000,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      1: { items: 1 }
    },
    nav: true
  }

  addToMycart(productId:string){
    this._cart.addTocart(productId).subscribe({
      next:(res)=>{console.log(res)
        this._cart.cartNumber.next(res.numOfCartItems);
        this.toastr.success('🛺',res.message,{
          closeButton:true,
        });
      },
      error:(err)=>{console.log(err)}
    });
  }

  wishlistStatus: { [productId: string]: boolean } = {};

  toggleWishlist(productId: string) {
    this.wishlistStatus[productId] = !this.wishlistStatus[productId];
    localStorage.setItem('wishlist', JSON.stringify(this.wishlistStatus));
    if (!this.wishlistStatus[productId]) {
      this.deleteWishList(productId);
    }
  }

  addToMyWishlist(productId:string){
    this._cart.addToWishlist(productId).subscribe({
      next:(res)=>{
        console.log(res)
        this._cart.cartNumber2.next(res.numOfCartItems);
        this.toastr.success('❤',res.message,{
          closeButton:true,
        });
        this.toggleWishlist(productId);
      },
      error:(err)=>{console.log(err)}
    });
  }

  WishlistItems:any [] = [];

  deleteWishList(id:string){
    this._cart.deleteWishList(id).subscribe({
      next:(res)=>{console.log(res)
        // this._cart.cartNumber2.next(res.numOfCartItems);
        this.WishlistItems = res.data;
      },
      error:(err)=>{console.log(err)}
    })
  }

  
}
