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
  ruleApplied:any = [];
  isSelectAll:boolean = true;




  ruleData = [
    {
      "rule": "Allowed_intents_in_Unstructured",
      "ruleDefinition": "Checks if Unstructured date file contain the data of the following intents – Description",
      "checked":false
    },
    {
      "rule": "Check_for_capitalization",
      "ruleDefinition": "Check if the values in ENTITY_NAME",
      "checked":false
    },
    {
      "rule": "Check_for_duplicates",
      "ruleDefinition": "Check if there are duplicate rows",
      "checked":false
    },
    {
      "rule": "Check_for_missing_Keyword",
      "ruleDefinition": "Checks if there is an interaction of (Primary + Secondary) without keyword in all",
      "checked":false
    },
    {
      "rule": "Check_if_date_time_are_blank",
      "ruleDefinition": "Checks if date and time fields of Campus events file are empty",
      "checked":false
    },
    {
      "rule": "Correctness_of_MAP_URL",
      "ruleDefinition": "Checks for correctness of MAP_URL and short URL",
      "checked":false
    },
    {
      "rule": "Correctness_of_Short_Ref_URL",
      "ruleDefinition": "Checks for correctness of REF_URL",
      "checked":false
    },
    {
      "rule": "Date_in_YYYY_MM_DD_format",
      "ruleDefinition": "Checks if START_DATE and END_DATE are of YYYY-MM-DD date format",
      "checked":false
    },
    {
      "rule": "Description_text_not_same",
      "ruleDefinition": "Checks if DESCRIPTION and TEXT columns are the same",
      "checked":false
    },
    {
      "rule": "Duplicate_in_Entity_Interactn",
      "ruleDefinition": "Check if duplicates - Primary Entity or Virtual Entity values cannot have duplicate",
      "checked":false
    },
    {
      "rule": "Email_id_validity",
      "ruleDefinition": "Checks for validity of the Email ID.",
      "checked":false
    },
    {
      "rule": "Exact_dates_available",
      "ruleDefinition": "checks if dates (YYYYMMDD) are present in TEXT",
      "checked":false
    },
    {
      "rule": "Exceeding_500_characters",
      "ruleDefinition": "Checks if the information in TEXT",
      "checked":false
    },
    {
      "rule": "Latitude_Longitude",
      "ruleDefinition": "Checks if LATITUDE and LONGITUDE values have less or more than 6 digits after the decimal point and checks if the it contain any special characters",
      "checked":false
    },
    {
      "rule": "Multiple_Spaces_in_txt",
      "ruleDefinition": "Check if there are multiple spaces in the content of the TEXT",
      "checked":false
    },
    {
      "rule": "No_AcadEvents_in_Timing",
      "ruleDefinition": "Checks if there are interactions in AcadEvents are present in Timing file",
      "checked":false
    },
    {
      "rule": "No_content_in_brackets",
      "ruleDefinition": "Check if there is content in brackets in the VOICE_ONLY column",
      "checked":false
    },
    {
      "rule": "No_date_special_characters",
      "ruleDefinition": "Check if there are dates",
      "checked":false
    },
    {
      "rule": "No_phone_url_in_voice",
      "ruleDefinition": "Checks if there is any phone number or email ID is present in VOICE column of the contact data file",
      "checked":false
    },
    {
      "rule": "No_preceeding_0_in_room_no",
      "ruleDefinition": "Checks if there are presiding zeros in room numbers in TEXT",
      "checked":false
    },
    {
      "rule": "No_Ref_URL_in_text",
      "ruleDefinition": "Checks if reference links of each entity or Ref URLs are present in the TEXT column",
      "checked":false
    },
    {
      "rule": "No_sentence_in_voice_column",
      "ruleDefinition": "Checks if sentences such as ",
      "checked":false
    },
    {
      "rule": "No_timing_for_acad_events",
      "ruleDefinition": "Check if any timing entries are present in academic events data file",
      "checked":false
    },
    {
      "rule": "No_timings_values_in_txt",
      "ruleDefinition": "Checks if any timing related information in TEXT",
      "checked":false
    },
    {
      "rule": "Numbering_bullet_points",
      "ruleDefinition": "Check if numbering or bullet points are present in VOICE and VOICE_ONLY columns",
      "checked":false
    },
    {
      "rule": "Process_ID",
      "ruleDefinition": "PROCESS_AGENT_ID and PROCESS_ID if not blank PROCESS_ID will have all alphanumeric characters no space and underscore PROCESS_AGENT will only have numeric char no space",
      "checked":false
    },
    {
      "rule": "Special_Char_in_Entity_Name",
      "ruleDefinition": "Checks if Entity names contain any special characters (Single quote",
      "checked":false
    },
    {
      "rule": "Start_date_less_than_end_date",
      "ruleDefinition": "Checks if START_DATE is less than END_DATE",
      "checked":false
    },
    {
      "rule": "Start_time_less_than_end_time",
      "ruleDefinition": "Checks if START_TIME is less than END_TIME",
      "checked":false
    },
    {
      "rule": "Summary",
      "ruleDefinition": "Generates a summary report of all the rules",
      "checked":false
    },
    {
      "rule": "Time_in_HH_MM_SS_format",
      "ruleDefinition": "Checks if START_TIME and END_DATE are of HH:MM:SS time format",
      "checked":false
    }
  ];















  constructor(private httpClient: HttpClient) {
  
  }
  
  filesPicked(files) {
    this.files = files; 
  }

  @ViewChild('fileInput') fileInput;
  uploadFile() {
    this.tableData = [];
    this.imageKey = true;
    var date = new Date();
    this.key = false;
    this.milliseconds = date.getTime().toString();
    if (this.files.length === 0) {
      this.imageKey = false;
      return;
    };
    
    const formData: FormData = new FormData();
    for(var i= 0; i<this.files.length; i++){
      formData.append('file', this.files[i], this.files[i].name);
    } 
    console.log(this.milliseconds);
      this.httpClient.post('http://127.0.0.1:5002/parse_table?milliseconds=' + this.milliseconds +'&rules=' + this.ruleApplied, formData).subscribe(data =>{
      this.imageKey = false;
      console.log(data);
        this.tableData = data;
        if(this.tableData[0].File_name && this.tableData[0].File_name != ''){
          this.url = 'https://s3.us-east.cloud-object-storage.appdomain.cloud/sharad-saurav-bucket/DataFiles_Rules_Report' + this.milliseconds + '.xlsx'
          console.log(this.url);
          this.key = true;
        }else{
          alert('there was' + this.tableData.toString() + 'column missing in the excel you uploaded');
        }
      },
      error =>{ console.log('oops', error)
        this.imageKey = false;
        //error = error.toString();
        alert(error.error.text);
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

  getCheckBoxItem = function (rule) {
      var rule = rule;
      for (var i = 0; i < this.ruleData.length; i++) {
          if (this.ruleData[i].rule === rule) {
              this.singleRule = this.ruleData[i];
              if (this.singleRule.checked) {
                  this.singleRule.selected = false;
                  this.ruleApplied = this.ruleApplied.filter(function (e) {
                      return e !== rule;
                  });
                  break;
              }
              else {
                  this.singleRule.checked = true;
                  this.ruleApplied.push(rule);
                  break;
              }
          }
      }
      console.log(this.ruleApplied);
  }

  checkAll = function () {
      if (!this.ruleData.all) {
          this.ruleData.all = true;
          this.isSelectAll = true;
          for (var i = 0; i < this.ruleData.length; i++) {
              this.ruleData[i].checked = true;
              this.ruleApplied.push(this.ruleData[i].rule);
          }
      }
      else {
          this.ruleData.all = false;
          this.isSelectAll = false;
          for (var i = 0; i < this.ruleData.length; i++) {
              this.ruleData[i].checked = false;
          }
          this.ruleApplied.splice(0, this.ruleApplied.length);

      }
      console.log(this.ruleApplied);
  }

 

  cancel(){
    (<HTMLInputElement>document.getElementById("files")).value = '';
  };

  ngOnInit() {
  }
}
