import { OnInit } from '@angular/core';
import { Component, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/Rx' ;
import 'rxjs/add/operator/catch';
import { retry, catchError } from 'rxjs/operators';
import { element } from 'protractor';


@Component({
  selector: 'app-data-rule-report',
  templateUrl: './data-rule-report.component.html',
  styleUrls: ['./data-rule-report.component.css']
})
export class DataRuleReportComponent implements OnInit {

  files: any = [];
  key:boolean = false;
  tableData:any = [];
  production:boolean = false;
  milliseconds = '';
  url = '';
  imageKey:boolean = false;
  ruleApplied:any = [];
  configData:any = [];
  allowedIntentsInUnstructured:boolean = false;
  checkForCapitalization:boolean = false;
  checkForDuplicates:boolean = false;
  checkForMissingKeyword:boolean = false;
  checkIfDateTimeAreBlank:boolean = false;
  correctnessOfMapUrl:boolean = false;
  correctnessOfShortRefUrl:boolean = false;
  dateInYYYYMMDDFormat:boolean = false;
  descriptionTextNotSame:boolean = false;
  duplicateInEntityInteractn:boolean = false;
  emailIdValidity:boolean = false;
  exactDatesAvailable:boolean = false;
  exceeding500Characters:boolean = false;
  latitudeLongitude:boolean = false;
  multipleSpacesInTxt:boolean = false;
  noAcadEventsInTiming:boolean =false;
  noContentInBrackets:boolean = false;
  noDateSpecialCharacters:boolean = false;
  noPhoneUrlInVoice:boolean = false;
  noPreceeding0InRoomNo:any = false;
  noRefUrlInText:boolean = false;
  noSentenceInVoiceColumn:boolean = false;
  noTimingForAcadEvents:boolean = false;
  noTimingsValuesInTxt:boolean = false;
  numberingBulletPoints:boolean = false;
  processId:boolean = false;
  specialCharInEntityName:boolean = false;
  startDateLessThanEndDate:boolean = false;
  startTimeLessThanEndTime:boolean = false;
  timeInHHMMSSFormat:boolean = false;


  ruleData = [
    {
      "rule": "Allowed_intents_in_Unstructured",
      "ruleDefinition": "Checks if Unstructured date file contain the data of the following intents – Description",
      "checked":true
    },
    {
      "rule": "Check_for_capitalization",
      "ruleDefinition": "Check if the values in ENTITY_NAME",
      "checked":true
    },
    {
      "rule": "Check_for_duplicates",
      "ruleDefinition": "Check if there are duplicate rows",
      "checked":true
    },
    {
      "rule": "Check_for_missing_Keyword",
      "ruleDefinition": "Checks if there is an interaction of (Primary + Secondary) without keyword in all",
      "checked":true
    },
    {
      "rule": "Check_if_date_time_are_blank",
      "ruleDefinition": "Checks if date and time fields of Campus events file are empty",
      "checked":true
    },
    {
      "rule": "Correctness_of_MAP_URL",
      "ruleDefinition": "Checks for correctness of MAP_URL and short URL",
      "checked":true
    },
    {
      "rule": "Correctness_of_Short_Ref_URL",
      "ruleDefinition": "Checks for correctness of REF_URL",
      "checked":true
    },
    {
      "rule": "Date_in_YYYY_MM_DD_format",
      "ruleDefinition": "Checks if START_DATE and END_DATE are of YYYY-MM-DD date format",
      "checked":true
    },
    {
      "rule": "Description_text_not_same",
      "ruleDefinition": "Checks if DESCRIPTION and TEXT columns are the same",
      "checked":true
    },
    {
      "rule": "Duplicate_in_Entity_Interactn",
      "ruleDefinition": "Check if duplicates - Primary Entity or Virtual Entity values cannot have duplicate",
      "checked":true
    },
    {
      "rule": "Email_id_validity",
      "ruleDefinition": "Checks for validity of the Email ID.",
      "checked":true
    },
    {
      "rule": "Exact_dates_available",
      "ruleDefinition": "checks if dates (YYYYMMDD) are present in TEXT",
      "checked":true
    },
    {
      "rule": "Exceeding_500_characters",
      "ruleDefinition": "Checks if the information in TEXT",
      "checked":true
    },
    {
      "rule": "Latitude_Longitude",
      "ruleDefinition": "Checks if LATITUDE and LONGITUDE values have less or more than 6 digits after the decimal point and checks if the it contain any special characters",
      "checked":true
    },
    {
      "rule": "Multiple_Spaces_in_txt",
      "ruleDefinition": "Check if there are multiple spaces in the content of the TEXT",
      "checked":true
    },
    {
      "rule": "No_AcadEvents_in_Timing",
      "ruleDefinition": "Checks if there are interactions in AcadEvents are present in Timing file",
      "checked":true
    },
    {
      "rule": "No_content_in_brackets",
      "ruleDefinition": "Check if there is content in brackets in the VOICE_ONLY column",
      "checked":true
    },
    {
      "rule": "No_date_special_characters",
      "ruleDefinition": "Check if there are dates",
      "checked":true
    },
    {
      "rule": "No_phone_url_in_voice",
      "ruleDefinition": "Checks if there is any phone number or email ID is present in VOICE column of the contact data file",
      "checked":true
    },
    {
      "rule": "No_preceeding_0_in_room_no",
      "ruleDefinition": "Checks if there are presiding zeros in room numbers in TEXT",
      "checked":true
    },
    {
      "rule": "No_Ref_URL_in_text",
      "ruleDefinition": "Checks if reference links of each entity or Ref URLs are present in the TEXT column",
      "checked":true
    },
    {
      "rule": "No_sentence_in_voice_column",
      "ruleDefinition": "Checks if sentences such as ",
      "checked":true
    },
    {
      "rule": "No_timing_for_acad_events",
      "ruleDefinition": "Check if any timing entries are present in academic events data file",
      "checked":true
    },
    {
      "rule": "No_timings_values_in_txt",
      "ruleDefinition": "Checks if any timing related information in TEXT",
      "checked":true
    },
    {
      "rule": "Numbering_bullet_points",
      "ruleDefinition": "Check if numbering or bullet points are present in VOICE and VOICE_ONLY columns",
      "checked":true
    },
    {
      "rule": "Process_ID",
      "ruleDefinition": "PROCESS_AGENT_ID and PROCESS_ID if not blank PROCESS_ID will have all alphanumeric characters no space and underscore PROCESS_AGENT will only have numeric char no space",
      "checked":true
    },
    {
      "rule": "Special_Char_in_Entity_Name",
      "ruleDefinition": "Checks if Entity names contain any special characters (Single quote",
      "checked":true
    },
    {
      "rule": "Start_date_less_than_end_date",
      "ruleDefinition": "Checks if START_DATE is less than END_DATE",
      "checked":true
    },
    {
      "rule": "Start_time_less_than_end_time",
      "ruleDefinition": "Checks if START_TIME is less than END_TIME",
      "checked":true
    },
    {
      "rule": "Time_in_HH_MM_SS_format",
      "ruleDefinition": "Checks if START_TIME and END_DATE are of HH:MM:SS time format",
      "checked":true
    }
  ];

  constructor(private httpClient: HttpClient) { }

  ngOnInit() {
    this.ruleData.forEach(element => {
      this.ruleApplied.push(element.rule);
    });
    console.log(this.ruleApplied);
  }

  filesPicked(files) {
    this.files = files; 
  }

  uploadFile() {
    if(this.ruleApplied.length == 0){
     
      alert("please select a rule first")
      return;
    }
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
    console.log(formData);
    console.log(this.milliseconds);
    console.log(this.ruleApplied);
      this.httpClient.post('api/parse_table?milliseconds=' + this.milliseconds +'&rules=' + this.ruleApplied, formData).subscribe(data =>{
      this.imageKey = false;
      console.log(data);
        this.tableData = data;
        if(this.tableData[0].File_name && this.tableData[0].File_name != ''){
          this.url = 'https://s3.us-east.cloud-object-storage.appdomain.cloud/sharad-saurav-bucket/DataFiles_Rules_Report' + this.milliseconds + '.xlsx'
          console.log(this.url);
          this.tableData.forEach(element => {
            if("Allowed_intents_in_Unstructured" in element){
              console.log("Allowed_intents_in_Unstructured");
              this.allowedIntentsInUnstructured = true;
            }
            if("Check_for_duplicates" in element){
              console.log("Check_for_duplicates");
              this.checkForDuplicates = true;
            }
            if("Check_for_missing_Keyword" in element){
              console.log("Check_for_missing_Keyword");
              this.checkForMissingKeyword = true;
            }
            if("Check_for_capitalization" in element){
              console.log("Check_for_capitalization");
              this.checkForCapitalization = true;
            }
            if("Check_if_date_time_are_blank" in element){
              console.log("Check_if_date_time_are_blank");
              this.checkIfDateTimeAreBlank = true;
            }
            if("Correctness_of_MAP_URL" in element){
              console.log("Correctness_of_MAP_URL");
              this.correctnessOfMapUrl = true;
            }
            if("Correctness_of_Short_Ref_URL" in element){
              console.log("Correctness_of_Short_Ref_URL");
              this.correctnessOfShortRefUrl = true;
            }
            if("Date_in_YYYY-MM-DD_format" in element){
              console.log("Date_in_YYYY-MM-DD_format");
              this.dateInYYYYMMDDFormat = true;
            }
            if("Description_text_not_same" in element){
              console.log("Description_text_not_same");
              this.descriptionTextNotSame = true;
            }
            if("Duplicate_in_Entity_Interactn" in element){
              console.log("Duplicate_in_Entity_Interactn");
              this.duplicateInEntityInteractn = true;
            }
            if("Email_id_validity" in element){
              console.log("Email_id_validity");
              this.emailIdValidity = true;
            }
            if("Exact_dates_available" in element){
              console.log("Exact_dates_available");
              this.exactDatesAvailable = true;
            }
            if("Exceeding_500_characters" in element){
              console.log("Exceeding_500_characters");
              this.exceeding500Characters = true;
            }
            if("Latitude_Longitude" in element){
              console.log("Latitude_Longitude");
              this.latitudeLongitude = true;
            }
            if("Multiple_Spaces_in_txt" in element){
              console.log("Multiple_Spaces_in_txt");
              this.multipleSpacesInTxt = true;
            }
            if("No_AcadEvents_in_Timing" in element){
              console.log("No_AcadEvents_in_Timing");
              this.noAcadEventsInTiming = true;
            }
            if("No_content_in_brackets" in element){
              console.log("No_content_in_brackets");
              this.noContentInBrackets = true;
            }
            if("No_date_special_characters" in element){
              this.noDateSpecialCharacters = true;
            }
            if("No_phone_url_in_voice" in element){
              this.noPhoneUrlInVoice = true;
            }
            if("No_preceeding_0_in_room_no" in element){
              this.noPreceeding0InRoomNo = true;
            }
            if("No_Ref_URL_in_text" in element){
              this.noRefUrlInText = true;
            }
            if("No_sentence_in_voice_column" in element){
              this.noSentenceInVoiceColumn = true;
            }
            if("No_timing_for_acad_events" in element){
              this.noTimingForAcadEvents = true;
            }
            if("No_timings_values_in_txt" in element){
              this.noTimingsValuesInTxt = true;
            }
            if("Numbering_bullet_points" in element){
              this.numberingBulletPoints = true;
            }
            if("Process_ID" in element){
              this.processId = true;
            }
            if("Special_Char_in_Entity_Name" in element){
              this.specialCharInEntityName = true;
            }
            if("Start_date_less_than_end_date" in element){
              this.startDateLessThanEndDate = true;
            }
            if("Start_time_less_than_end_time" in element){
              this.startTimeLessThanEndTime = true;
            }
            if("Time_in_HH_MM_SS_format" in element){
              this.timeInHHMMSSFormat = true;
            }
            console.log(this.allowedIntentsInUnstructured);
          });
          this.key = true;
        }else{
          alert('there was' + this.tableData.toString() + 'column missing in the excel you uploaded');
        }
      },
      error =>{ console.log('oops', error)
        this.imageKey = false;
        alert(error.error.text);
      }
    )
  }

  getCheckBoxItem = function (rule) {
      var rule = rule;
      console.log(this.ruleData);
      for (var i = 0; i < this.ruleData.length; i++) {
          if (this.ruleData[i].rule === rule) {
              this.singleRule = this.ruleData[i];
              if (this.singleRule.select) {
                  this.singleRule.selected = false;
                  this.ruleApplied = this.ruleApplied.filter(function (e) {
                      return e !== rule;
                  });
                  break;
              }
              else {
                  this.singleRule.select = true;
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
              this.ruleData[i].select = true;
              this.ruleApplied.push(this.ruleData[i].rule);
          }
      }
      else {
          this.ruleData.all = false;
          this.isSelectAll = false;
          for (var i = 0; i < this.ruleData.length; i++) {
              this.ruleData[i].select = false;
          }
          this.ruleApplied.splice(0, this.ruleApplied.length);

      }
      console.log(this.ruleApplied);
  }

  cancel(){
    (<HTMLInputElement>document.getElementById("files")).value = '';
  };
}
