import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {

  // loggedInUser!:User

  constructor(private http : HttpClient) { }

  public loginUserFromRemote(user:User):Observable<any>{
    return this.http.post("http://localhost:8080/login",user,{responseType: 'text'});
  }

  public registerUserFromRemote(user:User):Observable<any>{
    return this.http.post<any>("http://localhost:8080/registeruser",user);
  }

  public updateUserFromRemote(user:User):Observable<any>{
    return this.http.post<any>("http://localhost:8080/updateuser",user);
  }
}
