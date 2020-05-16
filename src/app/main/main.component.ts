import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { MatTableDataSource } from '@angular/material/table';
import { HttpClient, HttpHeaders } from '@angular/common/http';

export interface clientData {
  firstName: String
  id: Number
}

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  private MAMBU_API = "https://razerhackathon.sandbox.mambu.com/api";
  dataSource = new MatTableDataSource;
  clientData: any = [];
  private username = "Team120"
  private password = "pass21EA880D26"
  encodedId: string
  balance: number
  firstName: string

  constructor(private dataService: DataService, private http: HttpClient) { }

  authorizationData = 'Basic ' + btoa(this.username + ':' + this.password);

  headerOptions = {
    headers: new HttpHeaders({
        'Authorization': this.authorizationData
    })
  };

  //get Encoded Id
  public getEncodedId() {
    this.dataService.getEncodedID().subscribe(data => { // json data
      this.encodedId = data[0].encodedKey
      this.firstName = data[0].firstName
      this.getAccount()
    },
    error => {
        return console.log('Error: ', error);
    });
  }

      // Get Account ID & Balance
  public getAccount() {
    return this.http.get(this.MAMBU_API + '/clients/' + this.encodedId + '/savings',this.headerOptions).subscribe(
      data => {
        this.balance = data[0].balance
      },
      error => {
          return console.log('Error: ', error);
      });
  }
  

  ngOnInit() {
    this.getEncodedId()
  }

}
