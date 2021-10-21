import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment } from "../../environments/environment";
import { map } from "rxjs/operators";
import { User } from "../models/user";
import {BehaviorSubject, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  public user: Observable<User>;
  private userSubject: BehaviorSubject<User>

  constructor(private http: HttpClient) {
    this.userSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('user') || '{}'));
    this.user = this.userSubject.asObservable();
  }

  login(brand_email_address:any, brand_password:any) {
    return this.http.post<User>(`${environment.apiURL}user/login`,{brand_email_address, brand_password})
      .pipe(
        map(user => {
          localStorage.setItem('user', JSON.stringify(user))
          this.userSubject.next(user);
          return user;
        })
      )
  }
  register(brandArray:any) {
    return this.http.post<User>(`${environment.apiURL}user/signup`,brandArray)
      .pipe(
        map(user => {
          localStorage.setItem('user', JSON.stringify(user))
          this.userSubject.next(user);
          return user;
        })
      )
  }

  getBrandDetail(login_id:any) {
    return this.http.post<User>(`${environment.apiURL}user/detail`,{login_id})
      .pipe(
        map(user => {
          this.userSubject.next(user);
          return user;
        })
      )
  }
  saveAddress(addressArray:any) {
    return this.http.post<User>(`${environment.apiURL}user/address`,addressArray)
      .pipe(
        map(user => {
          //localStorage.setItem('user', JSON.stringify(user))
          this.userSubject.next(user);
          return user;
        })
      )
  }

  saveBilling(billingArray:any) {
    return this.http.post<User>(`${environment.apiURL}user/billing`,billingArray)
      .pipe(
        map(user => {
          //localStorage.setItem('user', JSON.stringify(user))
          this.userSubject.next(user);
          return user;
        })
      )
  }

}
