import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Data } from './data';
import { Transaction } from './transaction';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor( private http:HttpClient) { }

  getCustomers():Observable<Data[]>{
    return this.http.get<Data[]>("http://localhost:3000/customers");
  }
  getTransactions():Observable<Transaction[]>{
    return this.http.get<Transaction[]>("http://localhost:3000/transactions");
  }
}
