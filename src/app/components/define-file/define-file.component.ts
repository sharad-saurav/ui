import { Component, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/Rx' ;
import 'rxjs/add/operator/catch';
import { retry, catchError } from 'rxjs/operators';
import {  OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-define-file',
  templateUrl: './define-file.component.html',
  styleUrls: ['./define-file.component.css']
})
export class DefineFileComponent implements OnInit {
  
  columns = [{
    "name": ""
  }];
  fileName:string = '';
  imageKey:boolean = false;

  constructor(private httpClient: HttpClient, private router: Router) { }

  ngOnInit() {
  }

  addColumn = function () {
    this.column = {
      "name": ""
    };
    this.columns.push(this.column);
  }

  delColumnName = function (index) {
    if (this.column.length == 1) {
        return;
    } else {
        this.columns.splice(index, 1);
    }
  }

  saveFileAndColumn(){
    let columnNames = []; 
    if(this.fileName == '' && !this.fileName){
      alert("please enter file name");
      return;
    }
    this.columns.forEach(element => {
      if(element.name == '' && !element.name){
        alert("column box left empty");
        return;
      }else{
        columnNames.push(element.name);
      }
    });

    let data = {
      "fileName" : this.fileName,
      "columnNames": columnNames 
    };

    this.imageKey = true;

    this.httpClient.post('api/uploadFileAndColumn', data).subscribe(data =>{
      this.imageKey = false;
      window.location.reload();
      alert("file and column names added");
    },
    error =>{ console.log('oops', error)
      this.imageKey = false;
      alert(error.error.text);
      window.location.reload();
    })
  }
  checkFileName(){
    this.imageKey = true;
    this.httpClient.get('api/checkFile', {params:{"fileName": this.fileName}}).subscribe((data:any) =>{
      console.log(data);
      if(data.length != 0){
        this.columns = data;
        this.imageKey = false;
      }else{
        this.columns =  [{
                           "name": ""
                        }];
        this.imageKey = false;
        alert("File does not exists");
      }
      
    },
    error =>{ console.log('oops', error)
      this.imageKey = false;
      alert(error.error.text);
    })
  }
  nav(){
    this.router.navigate(['/editConfig']);
  }
}
