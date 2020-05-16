import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-scheme',
  templateUrl: './scheme.component.html',
  styleUrls: ['./scheme.component.scss']
})
export class SchemeComponent implements OnInit {
  AWS_API = "https://55qb01p5fg.execute-api.ap-southeast-1.amazonaws.com/razerhack"
  panelOpenState = true;
  schemeData: any = [];
  bucket: any[] = [];
  status: number

  constructor(private http:HttpClient) { }

  public getSchemes() {
    return this.http.get(this.AWS_API + '/schemes').subscribe(
      data => {
        Object.entries(data['data']['Items']).map( data => {
          this.bucket.push(data)
        });
        // console.log(data['data']['Items'][0])
        console.log('Bucket',this.bucket[0][1])
      },
      error => {
          return console.log('Error: ', error);
      });
  }

  ngOnInit(): void {
    this.getSchemes()
  }

}
