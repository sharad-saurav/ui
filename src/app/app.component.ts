import { Component, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/Rx' ;


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
  

  constructor(private httpClient: HttpClient) {
  }
  
  filesPicked(files) {
    console.log(files); 
    this.files = files; 
  }

  @ViewChild('fileInput') fileInput;
  uploadFile() {
   
    if (this.files.length === 0) {
      return;
    };
    
    const formData: FormData = new FormData();
    for(var i= 0; i<this.files.length; i++){
      console.log(this.files[i]);
      formData.append('file', this.files[i], this.files[i].name);
    }
      this.httpClient.post('http://127.0.0.1:5002/parse_table',formData).subscribe(data => {
        this.tableData = data
        console.log(this.tableData);
        this.key = true;
      })
  }

  download(){
    this.httpClient.get('http://127.0.0.1:5002/downloadFIle').subscribe(data =>{
      // this.tableData = data
    })
  }
  // downloadFile(data: Response) {
  //   const blob = new Blob([data], { type: 'text/csv' });
  //   const url= window.URL.createObjectURL(blob);
  //   window.open(url);
  // }

  cancel(){
    (<HTMLInputElement>document.getElementById("files")).value = '';
  };

  ngOnInit() {
  }

  sayHi() {
    this.httpClient.get('http://127.0.0.1:5002/').subscribe(data => {
      this.serverData = data as JSON;
      console.log(this.serverData);
    })
  }
}
