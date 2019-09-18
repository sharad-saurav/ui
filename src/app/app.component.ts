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
  imageKey:boolean = false;

  constructor(private httpClient: HttpClient) {
  
  }
  
  filesPicked(files) {
    this.files = files; 
  }

  @ViewChild('fileInput') fileInput;
  uploadFile() {
    this.imageKey = true;
    var date = new Date();
    this.milliseconds = date.getTime().toString();
    if (this.files.length === 0) {
      this.imageKey = true;
      return;
    };
    
    const formData: FormData = new FormData();
    for(var i= 0; i<this.files.length; i++){
      formData.append('file', this.files[i], this.files[i].name);
    }
    console.log(this.milliseconds);
      this.httpClient.post('api/parse_table?milliseconds=' + this.milliseconds, formData).subscribe(data =>{
        this.imageKey = false;
        this.tableData = data
        console.log(this.tableData);
        this.url = 'https://s3.us-east.cloud-object-storage.appdomain.cloud/sharad-saurav-bucket/DataFiles_Rules_Report' + this.milliseconds + '.xlsx'
        console.log(this.url);
        this.key = true;
      },
      error =>{ console.log('oops', error)
      this.imageKey = false;
      alert("There is some error please check and try again later")
      }
    )
  }
  // checkRules(fileName){
  //   let flag = true;
  //   let ruleMap = {};
  //   ruleMap[]
  //   let data = {fileName: String, rules: [{"rule": String, "result": String}] };
  //   for(var i= 0; i<this.files.length; i++){
  //     console.log(this.files[i]);
  //     if(this.files[i].name == fileName){
  //       flag = false;
  //     }
  //   }
  //   if(flag){
  //     alert("This File Has Not been sent so no report been prepared for it");
  //   }else{
  //     for(var i= 0; i< this.tableData.length; i++){
  //       if(this.tableData[i].File_Name == fileName){
  //         data.fileName = fileName;
  //         data.rules.push({})
  //       }
  //     }
  //   }
  // }

  cancel(){
    (<HTMLInputElement>document.getElementById("files")).value = '';
  };

  ngOnInit() {
  }
}
