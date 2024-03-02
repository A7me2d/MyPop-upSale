import { Brand } from './../../interfaces/products';
import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.scss']
})
export class WishlistComponent implements  OnInit{


  WishlistItems:any;

constructor(private _cart:CartService,private toastr: ToastrService){}

ngOnInit(): void {
  this.getMyWishlist()
}

getMyWishlist(){
  this._cart.getItemOfWishList().subscribe({
    next:(res)=>{
      // console.log(res)
      this.WishlistItems = res.data;
    },
    error:(err)=>{console.log(err)}
  })
}


updateWishList(count:number, id:string){
  if(count == 0){
    this.deleteWishList(id)
  }
  this._cart.updateWishList(count, id).subscribe({
    next:(res)=>{console.log(res)
    this.WishlistItems = res.data;
    },
    error:(err)=>{console.log(err)}
  })
}

deleteWishList(id:string){
  this._cart.deleteWishList(id).subscribe({
    next:(res)=>{console.log(res)
      this.WishlistItems = res.data;
      this.getMyWishlist()
      this.removeFromLocalStorage(id);
    },
    error:(err)=>{console.log(err)}
  })
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
  })
}

removeFromLocalStorage(productId: string) {
  // استرجاع قائمة الرغبات من LocalStorage
  const wishlist = localStorage.getItem('wishlist');
  if (wishlist) {
    const wishlistStatus: { [productId: string]: boolean } = JSON.parse(wishlist);
    // حذف المنتج من قائمة الرغبات في LocalStorage
    delete wishlistStatus[productId];
    // تحديث LocalStorage بعد الحذف
    localStorage.setItem('wishlist', JSON.stringify(wishlistStatus));
  }
}

toggleWishlist(productId: string) {
  this.wishlistStatus[productId] = !this.wishlistStatus[productId];
  // حفظ حالة المنتجات في LocalStorage بعد التبديل
  localStorage.setItem('wishlist', JSON.stringify(this.wishlistStatus));
  if (!this.wishlistStatus[productId]) {
    this.deleteWishList(productId);
  }
}
wishlistStatus: { [productId: string]: boolean } = {};

}

