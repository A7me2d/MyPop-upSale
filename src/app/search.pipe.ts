import { Products } from './interfaces/products';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(Products: Products[], searchword:string): Products[] {
    return Products.filter((product)=>{
      return product.title.includes(searchword) 
    });
  }

  
}
