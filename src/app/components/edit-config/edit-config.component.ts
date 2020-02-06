import { Component, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/Rx' ;
import 'rxjs/add/operator/catch';
import { retry, catchError } from 'rxjs/operators';
import {  OnInit } from '@angular/core';
import { TestBed } from '@angular/core/testing';


@Component({
  selector: 'app-edit-config',
  templateUrl: './edit-config.component.html',
  styleUrls: ['./edit-config.component.css']
})
export class EditConfigComponent implements OnInit {

  selectedItems:any = [];
  dropdownSettings:any = {};
  fileArray:any = [];
  fileDropdownSettings:any = {};
  selectedFiles:any = [];
  columnNames:any = [];
  fileName:string = '';
  columnDropdownSettings:any = {};
  selectedColumns:any = [];
  configData:any = [];
  rules:any = [];
  configArray:any = [];
  imageKey:boolean = false;
  showConfig:boolean = false;
  buttonName:string = "Show Config";
  columns = [{
    "name": ""
  }];
  configurationData:any = [];

  constructor(private httpClient: HttpClient) { }

  ngOnInit() {
    this.httpClient.get('api/downloadConfig').subscribe(data =>{
      this.configData = data;
      this.configData.forEach(element => {
        element.TO_CHECK = JSON.parse(element.TO_CHECK);
      });
      this.configurationData = this.configData;
    },error =>{ console.log('oops', error)
      alert(error.error.text);
    })


    this.httpClient.get('api/downloadFileAndColumnNames').subscribe((data:any) =>{
      this.fileArray = data.fileArray;
      this.columnNames = data.columnNames;
      this.columnNames = JSON.parse(this.columnNames)
      this.fileArray = JSON.parse(this.fileArray)
      this.fileArray = [].concat.apply([], this.fileArray);
      this.columnNames = [].concat.apply([], this.columnNames);
    },
    error =>{ console.log('oops', error)
      alert(error.error.text);
    })

    this.rules = [
      // "Allowed_intents_in_Unstructured",
      "Check_for_capitalization",
      // "Check_for_duplicates",
      "Check_for_missing_Keyword",
      "Check_if_date_time_are_blank",
      "Correctness_of_MAP_URL",
      "Correctness_of_Short_Ref_URL",
      "Date_in_YYYY_MM_DD_format",
      "Description_text_not_same",
      "Duplicate_in_Entity_Interactn",
      "Email_id_validity",
      "Exact_dates_available",
      "Exceeding_500_characters",
      "Latitude_Longitude",
      "Multiple_Spaces_in_txt",
      "No_AcadEvents_in_Timing",
      "No_content_in_brackets",
      "No_date_special_characters",
      "No_phone_url_in_voice",
      "No_preceeding_0_in_room_no",
      "No_Ref_URL_in_text",
      // "No_sentence_in_voice_column",
      "No_timing_for_acad_events",
      "No_timings_values_in_txt",
      "Numbering_bullet_points",
      "Process_ID",
      "Special_Char_in_Entity_Name",
      "Start_date_less_than_end_date",
      "Start_time_less_than_end_time",
      "Time_in_HH_MM_SS_format"];
    this.selectedItems = [
    ];
    this.dropdownSettings = {
      singleSelection: true,
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true
    };

    this.selectedFiles = [
    ];

    this.fileDropdownSettings = {
      singleSelection: false,
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 6,
      allowSearchFilter: true
    };

      this.columnDropdownSettings = {
        singleSelection: false,
        selectAllText: 'Select All',
        unSelectAllText: 'UnSelect All',
        itemsShowLimit: 6,
        allowSearchFilter: true
      };

      this.selectedColumns = [
        
      ];
  }

  onItemSelect(item){
    this.configArray.forEach(element => {
      if(element.rule == item){
        this.selectedItems = [];
        alert("This Rule is Already Added Please delete first to make changes on it");
        return;
      }
    });
    this.selectedColumns = [];
    this.selectedFiles = [];
    
    this.configurationData = this.configData.filter((x) =>{ return x.RULE == item;});
    
  }

  onDeSelect(item){
    this.configurationData = this.configData;
  }

  onFileSelect(item){
    this.configurationData = this.configData.filter((x) =>{ return x.TO_CHECK["files_to_apply"] == item || x.TO_CHECK["files_to_apply"] == "ALL" || this.test(x.TO_CHECK["files_to_apply"], item)});
  }

  onFileDeSelect(item){
    this.configurationData = this.configData;
  }

  addRule(){
    if(this.selectedColumns.length == 0 || this.selectedFiles.length == 0){
    
      alert("please first select columns and files for the rule");
      return;
    }

    if(this.selectedFiles.length == this.fileArray.length){
      this.configArray.push({"rule": this.selectedItems[0], "columnsToApply":this.selectedColumns, "filesToApply": "ALL"})
    } else {
      this.configArray.push({"rule": this.selectedItems[0], "columnsToApply":this.selectedColumns, "filesToApply":this.selectedFiles})
    }

    this.selectedItems = [];
    this.selectedColumns = [];
    this.selectedFiles = [];
    console.log(this.configArray);
  }

  deleteRule(index){
    this.configArray.splice(index,1);
    console.log(this.configArray);
  }

  saveConfig(){
    if(this.configArray.length != 0){
      this.imageKey = true;
        let data = {
          "configArray": this.configArray
        };
        this.httpClient.post('api/changeConfig', data).subscribe(data =>{
          this.imageKey = false;
          window.location.reload();
          alert("config file changed please download and check the changes");
        },
        error =>{ console.log('oops', error)
          this.imageKey = false;
          alert(error.error.text);
          window.location.reload();
        })
    }else{
      alert("please add changes first");
    }
  } 

  toggleConfig(){
    if(this.showConfig){
      this.showConfig = false;
      this.buttonName = "Show Config";
    } else {
      this.showConfig = true;
      this.buttonName = "Hide Config"
    }
  }
  test(x, fileName){
    let flag = false;
    console.log(x, fileName)
    if(x){
      for(var i = 0;  i< x.length; i++){
        console.log(x[i] == fileName)
        if(x[i] == fileName){
          flag = true;
          break;
        }
      }
    }
   
     return flag;
  }
}
