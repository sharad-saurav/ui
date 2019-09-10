import { Component, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';
import 'rxjs/Rx' ;
import 'rxjs/add/operator/catch';
import { retry, catchError } from 'rxjs/operators';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';

  serverData: JSON;
  employeeData: JSON;
  employee:JSON;
  files: any = [];
  key:boolean = false;
  tableData:any = [];
  production:boolean = false;
  milliseconds = '';
  url = '';

  constructor(private httpClient: HttpClient) {
  
  }
  
  
  filesPicked(files) {
    this.files = files; 
  }

  @ViewChild('fileInput') fileInput;
  uploadFile() {
   
    if (this.files.length === 0) {
      return;
    };
    this.milliseconds = date.getTime().toString();
    const formData: FormData = new FormData();
    for(var i= 0; i<this.files.length; i++){
      formData.append('file', this.files[i], this.files[i].name);
    }

    this.httpClient.post('api/parse_table?milliseconds=' + this.milliseconds, formData).subscribe(
      data => {
        console.log('success', data)
        this.tableData = data
        this.url = 'https://s3.us-east.cloud-object-storage.appdomain.cloud/sharad-saurav-bucket/DataFiles_Rules_Report' + this.milliseconds + '.xlsx'
        this.key = true;
      },
      error =>{ console.log('oops', error)
      alert("there is some issue please try again")
      }
    )
  }

  cancel(){
    (<HTMLInputElement>document.getElementById("files")).value = '';
  };

  ngOnInit() {
  }
}
