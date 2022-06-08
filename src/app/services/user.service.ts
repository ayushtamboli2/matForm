import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, tap } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { 
   
  }
  
  save(functionName: any, data: any) {
    console.log(data)
    return this.http.post(environment.rootUrl + functionName, data).pipe(tap(res => { res }),
      catchError(e => {
        throw new Error(e);
      })
    );
  }

  // captcha
  getCaptcha(){
    return this.http.get('http://localhost:3000/captcha')
    
  }


  regDetails(functionName: any, data: any) {
    //console.log("kuch bhi",data);
    //console.log("kuch bhi",data.user_id[0]);
    return this.http.post(environment.rootUrl + functionName, data).pipe(tap(res => { res }),
      catchError(e => {
        throw new Error(e);
      })
    );
  }

  login(credentials:any){
    return this.http.post(environment.rootUrl+'login/login',credentials)
  }
}