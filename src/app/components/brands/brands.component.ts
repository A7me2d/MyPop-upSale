import { Component, OnInit } from '@angular/core';
import { BrandsService } from 'src/app/services/brands.service';

@Component({
  selector: 'app-brands',
  templateUrl: './brands.component.html',
  styleUrls: ['./brands.component.scss']
})
export class BrandsComponent implements OnInit {
  // إضافة خاصية لتحديد ما إذا كانت العناصر مرئية أو مخفية
  isContentVisible: boolean = true;

  constructor(private _barnds: BrandsService) { }

  ngOnInit(): void {
    this.getBrandes();
  }
  details:any = null;
  image:any = null;

  brandesList: any[] = [];

  getBrandes() {
    this._barnds.getBarnds().subscribe(res => {
      this.brandesList = res.data;
      //console.log(this.brandesList);
    });
  }

  // دالة لتغيير قيمة الخاصية عند الضغط على زر toggle
  // toggleContent(item: any) {
  //   this.details.push(item); // تضيف التفاصيل إلى المصفوفة
  //   this.isContentVisible = !this.isContentVisible;
  //   this.show()
  // }
  // show(){
  //   // console.log(this.details);
  //   let name = this.details
  //   console.log(name[0].name);
  // }

  toggleContent(item:any) {
    if (item) {
      this.details = item; // تعيين العنصر المحدد
      this.image = item.image
      this.isContentVisible = !this.isContentVisible;
       console.log(item);
    } else {
      this.details = null;
      this.image = null
      this.isContentVisible = !this.isContentVisible;
    }
   
  }
  
  // show(item:any) {
  //   console.log(item.name); 
  //   let Newname = item.name
  //   console.log(Newname);
  // }
}
