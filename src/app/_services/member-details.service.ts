import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MemberDetails } from '../_models/members';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MemberDetailsService {

  constructor(private _http: HttpClient) { }

  // http interceptor
  httpOptions() {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    };
    return httpOptions;
  }
   //get all member details
   public getMemberDetails(): Observable<MemberDetails[]> {

    return this._http.get<MemberDetails[]>(`${environment.apiUrl}Member/MemberDetails`);
  }



   //search member
   searchName(search: string): Observable<MemberDetails[]> {
    return this._http.get<MemberDetails[]>(`${environment.apiUrl}Member/searchMember/` + search);
  }


  changeAccType(value: number, id: string): Observable<MemberDetails[]> {
    const data: any = {
      Id: id,
      AccountType: value
    }
    return this._http.put<MemberDetails[]>(`${environment.apiUrl}Member/updateAccountType`, data);
  }


  //send mail
  sendMail(email: any){
    const data: any = {
      Address: email
    }
    return this._http.post(`${environment.apiUrl}Member/sendMail`, data);
  }


  //filter data
  filterData(val: number){
    return this._http.get<MemberDetails[]>(`${environment.apiUrl}Member/filterData/`+ val);
  }
}
