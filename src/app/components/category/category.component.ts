import { Component, OnInit } from '@angular/core';
import { PruductsService } from '../../services/pruducts.service';


@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})


export class CategoryComponent implements OnInit{

  constructor(private _products:PruductsService) { }

  ngOnInit(): void {
    this.getCategry()
  }

  categryList:any[] = [];
  getCategry() {
    this._products.getCategry().subscribe({
      next:(res:any)=>{
      this.categryList = res.data
      console.log(this.categryList);      
    }

  })
}
  

  
}
