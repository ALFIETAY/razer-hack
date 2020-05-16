import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private MAMBU_API = "https://razerhackathon.sandbox.mambu.com/api";
  private username = "Team120"
  private password = "pass21EA880D26"
  encodedId: string
  
  constructor(private http: HttpClient) { }

  authorizationData = 'Basic ' + btoa(this.username + ':' + this.password);

  headerOptions = {
      headers: new HttpHeaders({
          'Authorization': this.authorizationData
      })
  };

  public getClientID() {
    return this.http.get(this.MAMBU_API + '/clients?branchId=Team120', this.headerOptions)
  }

  public getEncodedID() {
    return this.http.get(this.MAMBU_API + '/clients?branchId=Team120', this.headerOptions)
  }

}
