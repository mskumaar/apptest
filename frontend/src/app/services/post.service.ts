import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import {Post} from '../models/post.model';


@Injectable({
  providedIn: 'root'
})
export class PostService {

//fetch url
 private url = 'http://127.0.0.1:8080/application-test/backend/read.php';
 
 //action url for insert/update/delete
 private durl = 'http://127.0.0.1:8080/application-test/backend/index.php';

  constructor(private httpClient: HttpClient ) { }
  
  //get all products
  getPostData() {
    return this.httpClient.get<Post[]>(this.url);
}
//get all products
  getProducts(){
    return this.httpClient.get(this.url);
  }

  //pass new products details to save in the csv file
   insertProduct(productId:any,productName:any,stateNm:any,zip:any,amtVal:any,qtyVal:any,itemVal:any): Observable < any >
  {
		 const httpOptions = {  
            headers: new HttpHeaders({  
                //'Content-Type': 'application/json'  
				       'Content-Type': 'application/x-www-form-urlencoded'  
            })  
        };  
		const body=[{"mode":"new","id": productId,"name":productName,"state":stateNm,"zip":zip,"amount":amtVal,"qty":qtyVal,"item":itemVal}];
		return this.httpClient.post < any > (this.durl,body, httpOptions);  
  }//end of insert

 //pass updated product details to update the respective product record in the csv file
  updateProduct(currecid:any,currecitem:any,productId:any,productName:any,stateNm:any,zip:any,amtVal:any,qtyVal:any,itemVal:any): Observable < any > {  
    const httpOptions = {  
        headers: new HttpHeaders({  
            'Content-Type': 'application/x-www-form-urlencoded'  
        })  
        

    };  
    const body=[{"mode":"edit","currecid":currecid,"currecitem":currecitem,"id": productId,"name":productName,"state":stateNm,"zip":zip,"amount":amtVal,"qty":qtyVal,"item":itemVal}];
    return this.httpClient.post < string > (this.durl, body, httpOptions);  
}  
//pass the record id and sku value to delete respective product record from the csv file
deleteProduct(curProdId:any,curProdItem:any) : Observable < any > {  
    const httpOptions = {  
        headers: new HttpHeaders({  
            'Content-Type': 'application/json'  
        })  
    };  
    const body=[{"mode":"del","id": curProdId,"item":curProdItem}];
    return this.httpClient.post < any > (this.durl, body, httpOptions);
}  
  
}
