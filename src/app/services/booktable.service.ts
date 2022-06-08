import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class BooktableService {

  constructor(private http : HttpClient){}

  //Fake API URL
  getUsers(){
    return this.http.get('https://jsonplaceholder.typicode.com/users');
  }
}
