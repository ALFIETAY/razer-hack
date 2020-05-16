import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { DataService } from '../data.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.scss']
})
export class TransactionComponent implements OnInit {
  private MAMBU_API = "https://razerhackathon.sandbox.mambu.com/api";
  private username = "Team120"
  private password = "pass21EA880D26"
  encodedId: string
  balance: number
  dataSource = new MatTableDataSource;
  transactionData: any = [];
  userId: number
  accountId: String
  bucket: any[] = [];

 constructor(private dataService: DataService, private http: HttpClient) { }
  authorizationData = 'Basic ' + btoa(this.username + ':' + this.password);

  headerOptions = {
    headers: new HttpHeaders({
        'Authorization': this.authorizationData
    })
  };

  // Get Account ID & Balance
  public getAccount() {
    return this.http.get(this.MAMBU_API + '/clients/' + this.encodedId + '/savings',this.headerOptions).subscribe(
      data => {
        this.accountId = data[0].id
        this.balance = data[0].balance
        this.getTransactions()
      },
      error => {
          return console.log('Error: ', error);
      });
  }

  // Get Account Transactions
  public getTransactions() {
    return this.http.get(this.MAMBU_API + '/savings/' + this.accountId + '/transactions',this.headerOptions).subscribe(
      data => {
        this.transactionData = data;
        Object.entries(data).map( data => {
          this.bucket.push(data[1])
        });
      },
      error => {
          return console.log('Error: ', error);
      });
  }

  //get Encoded Id
  public getEncodedId() {
    this.dataService.getEncodedID().subscribe(data => { // json data
      this.encodedId = data[0].encodedKey
      this.getAccount()
    },
    error => {
        return console.log('Error: ', error);
    });
  }

  ngOnInit() {
    this.getEncodedId()
  }
}
