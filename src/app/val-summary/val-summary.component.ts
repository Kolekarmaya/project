import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NegativeUnitService } from '../Service/negative-unit.service';
import { error } from 'console';
import { JsontoexcelService } from '../Service/jsontoexcel.service';

@Component({
  selector: 'app-val-summary',
  templateUrl: './val-summary.component.html',
  styleUrls: ['./val-summary.component.scss']
})
export class ValSummaryComponent implements OnInit {

  routerState;
  module = '';
  actualModule = '';
  moduleId;
  subModuleId;
  moduleName: any;
  val_summary_table: boolean= false;
  Data: any;

  constructor(private router: Router, private httpClient: HttpClient, private negative :NegativeUnitService,
    public Export: JsontoexcelService) {
    this.routerState = this.router.getCurrentNavigation().extras.state;
    console.log('routerState :: dashboard component :: ', this.routerState);
    this.module = this.routerState['module'];

    this.actualModule = this.routerState['actualModule'];
    console.log('actualmodule 32:', this.actualModule);

    this.moduleId = this.routerState['moduleId'];
    this.subModuleId = this.routerState['subModuleId'];
  }

  ngOnInit(): void {
    if(this.module === 'STATIC_FIELDS_SUMMARY1' ||this.module === 'CRITICAL_FIELDS_SUMMARY1'){
      this.val_summary_table = false;
      this.Summ_Form= true;
    }
    else{
      this.router.navigate(['/main-valuation']);
    }
  }


  messageType; //06-05-21
  message; //06-05-21
  isError = false;
  messageDetails;
  displayMessage: boolean = false;
  openConfirmationBox: boolean;
  messagePopup: string;
  Summ_Form:boolean= false;
  Month_Name: any;
  ExportToCsv: boolean = false;
  

  submitTableDate( ){
  
    if(this.module === 'STATIC_FIELDS_SUMMARY1' ||this.module === 'CRITICAL_FIELDS_SUMMARY1'){
      if (!this.Month_Name ) {
        this.messagePopup = 'Please Enter Table Name';
        this.openConfirmationBox = true;
      }
      else{
        this.Summ_Form=true
         this.tabledata();
      }
    }


  }

  SummaryData: any;
  tabledata(){
      this.Summ_Form= true;
      let obj = {
      module_id: this.moduleId,
      submodule_id: this.subModuleId,
      requested_by: 'Admin',
      request_action: 1,
      module: this.routerState['module'],
      actualModule: this.routerState['actualModule'],
      Month_Name :this.Month_Name
      }
      console.log(obj, "object")
      this.negative.Summary(obj).subscribe((result) =>{
      console.log(result, "result")
      this.SummaryData = result.response_text;
      this.openConfirmationBox = true;
      this.messagePopup = result.response_message;
      this.Data = result.response_text;
      this.val_summary_table = true;
      this.Summ_Form = false;
      this.ExportToCsv = true;

      },
      (error) =>{
        this.messageType = 'Error Message :  ';
        this.message = 'Error occured while submitting policy :'
        this.messageDetails = error.status + '  ' + error.statusText;
        this.isError = true;
        this.displayMessage = true;
      }
      );
  }

  

  showMessage() {
    this.displayMessage = false;
    this.router.navigate(['/main-valuation']);
  }
  showAlert() {
    this.openConfirmationBox = false;
    
  }
  exportAsCSV() {
  this.Export.exportAsCSVFile(this.SummaryData, 'Static Field')

  }


}
