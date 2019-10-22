import { Component, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/Rx' ;
import 'rxjs/add/operator/catch';
import { retry, catchError } from 'rxjs/operators';
import {  OnInit } from '@angular/core';


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
  columnDropdownSettings:any = {};
  selectedColumns:any = [];
  configData:any = [];
  rules:any = [];
  configArray:any = [];
  imageKey:boolean = false;
  showConfig:boolean = false;
  buttonName:string = "Show Config";

  constructor(private httpClient: HttpClient) { }

  ngOnInit() {
    this.httpClient.get('http://127.0.0.1:5002/downloadConfig').subscribe(data =>{
      console.log(data);
      this.configData = data;
      this.configData.forEach(element => {
        console.log(element.TO_CHECK)
        element.TO_CHECK = JSON.parse(element.TO_CHECK);
        console.log(element.TO_CHECK)
      });
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

    this.fileArray = ["Academic_Events", "Campus_Events", "Contact", "Location", "Timing", "Unstructured"];
    this.selectedFiles = [
    ];

    this.fileDropdownSettings = {
      singleSelection: false,
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 6,
      allowSearchFilter: true
    };

    this.columnNames= [
      "SUBJECT_AREA",
      "SAMPLE_QUESTION",
      "ENTITY_TYPE",
      "INTENT",
      "COPIED_FROM",
      "ENTITY_NAME",
      "SECONDARY_ENTITY_NAME",
      "KEYWORD",
      "DESCRIPTION",
      "PRESENTER",
      "START_DATE",
      "END_DATE",
      "OCCURANCE",
      "WEEKDAY_START_TIME",
      "WEEKDAY_END_TIME",
      "WEEKEND_START_TIME",
      "WEEKEND_END_TIME",
      "MON_START_TIME",
      "MON_END_TIME",
      "TUE_START_TIME",
      "TUE_END_TIME",
      "WED_START_TIME",
      "WED_END_TIME",
      "THU_START_TIME",
      "THU_END_TIME",
      "FRI_START_TIME",
      "FRI_END_TIME",
      "SAT_START_TIME",
      "SAT_END_TIME",
      "SUN_START_TIME",
      "SUN_END_TIME",
      "EXCEPTION_TEXT",
      "TEXT",
      "VOICE",
      "VOICE_ONLY",
      "PHONE",
      "EMAIL",
      "LOCATION",
      "LATITUDE",
      "LONGITUDE",
      "REF_URL",
      "MEDIA",
      "LANGUAGES",
      "PROCESS_AGENT_ID",
      "PROCESS_ID"
      ];

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
    console.log(this.selectedColumns, this.selectedFiles);
  }

  addRule(){
    if(this.selectedColumns.length == 0 || this.selectedFiles.length == 0){
    
      alert("please first select columns and files for the rule");
      return;
    }

    console.log(this.selectedItems[0]);
    console.log(this.selectedColumns);
    console.log(this.selectedFiles);
    // let selectColumn = [];
   
    // this.selectedColumns.forEach(function(element){
    //   selectColumn.push(element.text);
    // })

    // let selectFile = [];

    // this.selectedFiles.forEach(function(element){
    //   selectFile.push(element.text);
    // })

    if(this.selectedFiles.length == 6){
      this.configArray.push({"rule": this.selectedItems[0], "columnsToApply":this.selectedColumns, "filesToApply": "ALL"})
    }else{
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
        this.httpClient.post('http://127.0.0.1:5002/changeConfig', data).subscribe(data =>{
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
    console.log(this.showConfig);
    console.log(this.buttonName);
    if(this.showConfig){
      this.showConfig = false;
      this.buttonName = "Show Config";
    } else {
      this.showConfig = true;
      this.buttonName = "Hide Config"
    }
  }

}
