import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FetchDataProcessService } from '../Service/fetchDataProcess.service';
import { JsontoexcelService } from '../Service/jsontoexcel.service';

@Component({
  selector: 'fetch-all-data',
  templateUrl: './fetch-all-data.component.html',
  styleUrls: ['./fetch-all-data.component.scss']
})
export class FetchAllDataComponent implements OnInit {

  routerState;
  module ='';
  actualModule ='';
  moduleId ;
  subModuleId;
  constructor(private router: Router,
    private fetchDataService: FetchDataProcessService,
    public es: JsontoexcelService) { 
    this.routerState = this.router.getCurrentNavigation().extras.state;
    console.log('routerState :: dashboard component :: ', this.routerState);
    this.module = this.routerState['module'];
    this.actualModule = this.routerState['actualModule'];
    this.moduleId = this.routerState['moduleId'];
    this.subModuleId = this.routerState['subModuleId'];
  }
  
  
  ngOnInit(): void {
    console.log('*****************');
  }
  
  processData () {
    this.showOverlay = true;
 
    this.fetchData();

  }
  
  responseData;
  showOverlay: boolean = false;
  noData: boolean = false;
  
  messageType; //06-05-21
  message; //06-05-21
  isError = false;
  messageDetails;
  export: boolean = false;
  count;
  displayCount: boolean = false;
  displayMessage: boolean = false;

  fetchData(){
    let obj={
      module: this.module,
      actualModule:this.actualModule,
      module_id: this.moduleId,
      submodule_id: this.subModuleId,
      requested_by: 'Admin',
      request_action: 1      
    }
    console.log('obj >>', obj);
    this.fetchDataService.fetchData(obj).subscribe(
      (response) =>{
        this.showOverlay = false;
        this.messageType = 'Information Message :  ';
        this.message = 'response_code : ' + response.response_code;
        this.messageDetails = response.response_message;
        this.displayMessage = true;

        var res = response;
        console.log(res);
        // this.startDate="";
        // this.endDate ="";
        this.isError = false;
        if(res.response_text.length > 0){
          this.responseData = res.response_text;
          this.noData = false;
          this.export = true;
          // this.emptyArr = false;
        }else{
          // this.emptyArr = true;
          // this.displayMessage = true;
          this.noData = true;
        }

        if(res.count) {
          this.displayCount = true;
          this.count = res.count[0];

        }
        else{
          this.noData = true;
        }

      },
      (error) => {
        this.showOverlay = false;
        this.messageType = 'Error Message :  ';
        this.message= 'Error occured while submitting policy :'
        this.messageDetails = error.status + '  '+ error.statusText; 
        this.isError = true;
        this.displayMessage = true;

      }
    );

  }


  showMessage() {
    this.displayMessage = false;
  }
  // exportAsXLSX() {
  //   this.es.exportAsExcelFile(this.responseData, 'DataQuality');
    
  // }

  exportAsCSVFile(){
    this.es.exportAsCSVFile(this.responseData, 'DataQuality')
  }

  exportAsXLSX() {
    this.es.exportAsCSVFile(this.responseData,  'DataQuality');

  }

}
