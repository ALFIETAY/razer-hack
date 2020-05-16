import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { MatTableDataSource } from '@angular/material/table';

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
  dataSource = new MatTableDataSource;
  clientData: any = [];

  constructor(private dataService: DataService) { }

  ngOnInit() {
    return this.dataService.getClientID() .subscribe(
      data => { // json data
        this.clientData.unshift({
          firstName: data[0].firstName,
          id: data[0].id,
        })
        this.dataSource = new MatTableDataSource(this.clientData);
          console.log(this.clientData)
          // return console.log('Success: ', data);
      },
      error => {
          return console.log('Error: ', error);
      });
  }

}
