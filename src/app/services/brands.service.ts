import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class BrandsService {

  constructor(private _http:HttpClient) { }


  getBarnds():Observable<any> {
    return this._http.get(`https://ecommerce.routemisr.com/api/v1/brands`)
  }

  getBarndDeteils():Observable<any> {
    return this._http.get(`https://ecommerce.routemisr.com/api/v1/brands/64089ceb24b25627a2531596`)
  }
}
