import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as Chart from 'chart.js';
import { DataQualityMisService } from '../Service/data-quality-mis.service';
import { HttpClient } from '@angular/common/http';
import { MatDatepickerInputEvent } from '@angular/material';
import { formatDate } from '@angular/common';
import { log } from 'console';
import { FormControl } from '@angular/forms';


@Component({
  selector: 'app-mis-graph',
  templateUrl: './mis-graph.component.html',
  styleUrls: ['./mis-graph.component.scss']
})
export class MisGraphComponent implements OnInit {


  Weekly: boolean;
  Daily: boolean;
  Monthly: boolean;
  daygraph: any;
  report_name: any;
  ctx: string | CanvasRenderingContext2D | HTMLCanvasElement | ArrayLike<CanvasRenderingContext2D | HTMLCanvasElement>;
  Day: string = 'Daily1';
  week: string = 'Weekly1';

  toppings = new FormControl();
  displayMessage: boolean;
  QCloder: boolean;


  constructor(private router: Router, private mis: DataQualityMisService, private http: HttpClient) {


    localStorage.getItem('Day')
    console.log(localStorage.getItem('Day'));
    localStorage.getItem('week')
    console.log(localStorage.getItem('week'));
    // data.REPORT_NAME
    localStorage.getItem('data')
    console.log(localStorage.getItem('data'))
    this.Module = localStorage.getItem('data');
    console.log(" this.Module", this.Module);


  }

  chart1: any = null;
  myChart: any = null;
  myChart1: any = null;
  myChart2: any = null;
  chartData: any = null;
  DropdownData: any;
  Module: any;
  Total_Cases: any;
  Pass_Cases: any;
  Fail_Cases: any
  Pass_Fail_Value: any;
  Json_Data: any;
  Pass_Value: any;
  Fail_Value: any;
  DATA: any;
  moduleName: any;
  pass: any;
  fail: any;
  date_wise: any;
  Date_pass: any;
  Date_fail: any;
  DateList: any;
  openConfirmationBox: boolean = false;
  messagePopup: any;
  ngOnInit(): void {
    // let url='/core/misgraph';
    this.QCloder = true
    let obj = {
      Module: this.Module,
      moduleId: 502,
      request_action: 'misgraph'
    }
    // Fetch JSON data
    this.mis.DQgraph(obj).subscribe((json_data: any) => {
      console.log('data..', json_data.response_text[0]);
      this.Json_Data = json_data.response_text[0]
      this.DateList = this.Json_Data.DateList
      console.log(this.DateList);

      this.DropdownData = this.Json_Data.Data;
      this.Module = this.Json_Data.Module;
      this.Total_Cases = this.Json_Data.Total;
      this.Pass_Cases = this.Json_Data.Pass_Cases;
      this.Fail_Cases = this.Json_Data.Fail_Cases;

      this.DATA = this.Json_Data.Data
      this.moduleName = this.Json_Data.moduleName;
      this.pass = this.Json_Data.pass;
      this.fail = this.Json_Data.fail;
      this.date_wise = this.Json_Data.Date_wise;
      this.Date_pass = this.Json_Data.Date_pass;
      this.Date_fail = this.Json_Data.Date_pass;
      this.messagePopup = json_data.response_message;
      this.openConfirmationBox = true;

      // this.drawPerticularSubModule();
      // this.getmethod();
      this.Pass_Value = this.Json_Data.Pass_Cases;
      this.Fail_Value = this.Json_Data.Fail_Cases;
      this.moduleName = this.Json_Data.moduleName;
      this.pass = this.Json_Data.pass;
      this.fail = this.Json_Data.fail;
      this.date_wise = this.Json_Data.Date_wise;
      this.Date_pass = this.Json_Data.Date_pass;
      this.Date_fail = this.Json_Data.Date_fail;
      console.log(this.date_wise, this.Date_pass, this.Date_fail);
      console.log('getmethod')
      this.QCloder = false
      //-------------------------------------Bar chart------------------------------------------------
      if (this.chart1) {
        this.chart1.destroy();
      }
      var ctx1 = document.getElementById('barChartData') as HTMLCanvasElement;
      this.chart1 = new Chart(ctx1, {

        type: 'bar',

        data: {
          labels: ['PASS', 'FAIL'],
          datasets: [{
            data: [this.Pass_Value, this.Fail_Value],
            backgroundColor: ['lightblue', 'lightpink']
          }],

        },

        options: {
          title: {
            display: true,
            text: this.Module,
            position: 'bottom',
            fontSize: 15
          },
          legend: {
            display: false,
          },
          scales: {
            xAxes: [{
              stacked: true,

            }],
            yAxes: [{
              stacked: true,
            }],
          },

          responsive: true,
          maintainAspectRatio: false,

        },

      });

      //-------------------------------------PIE------------------------------------------------

      if (this.myChart) {
        this.myChart.destroy();
      }
      var ctx2 = document.getElementById("pie-chart") as HTMLCanvasElement;
      this.myChart = new Chart(ctx2, {
        type: 'pie',
        data: {
          labels: ['PASS', 'FAIL'],
          datasets: [{
            data: [this.Pass_Value, this.Fail_Value],
            backgroundColor: ["lightblue", "lightpink"],
          }],


        },
        options: {
          title: {
            display: true,
            text: this.Module,
            position: 'bottom',
            fontSize: 15
          },
          responsive: true,
          maintainAspectRatio: false,
        }
      });


      //------------------------------------Module wise -------------------------------------------

      // if (this.myChart1) {
      //   this.myChart1.destroy();
      // }
      // var ctx4 = document.getElementById('myChart') as HTMLCanvasElement;
      // this.myChart1 = new Chart(ctx4, {
      //   type: 'bar',

      //   data: {
      //     labels: this.moduleName,
      //     datasets: [{
      //       label: this.DATA[0],
      //       data: this.pass,
      //       backgroundColor: 'lightblue'
      //     },
      //     {
      //       label: this.DATA[1],
      //       data: this.fail,
      //       backgroundColor: 'lightpink',
      //     }
      //     ]
      //   },

      //   options: {
      //     // title:{
      //     //   display: true,
      //     //   text:this.Module,
      //     //   position: 'bottom'
      //     // },
      //     legend: {
      //       display: true
      //     },
      //     scales: {
      //       xAxes: [{
      //         stacked: true,
      //       }],
      //       yAxes: [{
      //         stacked: true,
      //       }],
      //     },
      //     responsive: true,
      //     maintainAspectRatio: false,
      //   },

      // });

      //------------------------------------------Date wise -------------------------------------------


      if (this.myChart2) {
        this.myChart2.destroy();
      }
      var ctx4 = document.getElementById('Chart') as HTMLCanvasElement;
      this.myChart2 = new Chart(ctx4, {
        type: 'bar',

        data: {
          labels: this.date_wise,
          datasets: [{
            label: this.DATA[0],
            data: this.Date_pass,
            backgroundColor: 'lightblue'
          },
          {
            label: this.DATA[1],
            data: this.Date_fail,
            backgroundColor: 'lightpink',
          }
          ]
        },

        options: {
          title: {
            display: true,
            text: this.Module,
            position: 'bottom',
            fontSize: 15
          },
          legend: {
            display: true
          },
          scales: {
            xAxes: [{
              stacked: true,
            }],
            yAxes: [{
              stacked: true,
            }],

          },
          responsive: true,
          maintainAspectRatio: false,
        },

      });


    });


  }



  passmethod() {
    console.log('pass method');
    if (this.datestat === undefined) {
      if (this.datestat === undefined && this.searchText === "PASS") {
        console.log('yes')
        this.Pass_Value = this.Json_Data.Pass_Cases;
        this.Fail_Value = 0;
        this.moduleName = this.Json_Data.moduleName;
        this.pass = this.Json_Data.pass;
        this.fail = 0;
        this.date_wise = this.Json_Data.Date_wise;
        this.Date_pass = this.Json_Data.Date_pass;
        this.Date_fail = 0;
        console.log(this.date_wise, this.Date_pass, this.Date_fail);
      }

    } else {
      if (this.datestat === this.datestat && this.searchText === "PASS") {
        console.log('No')
        this.Pass_Value = this.Json_Data.Pass_Cases;
        this.Fail_Value = 0;
        this.moduleName = this.Json_Data.moduleName;
        this.pass = this.Json_Data.pass;
        this.fail = 0;
        this.date_wise = this.Json_Data.Date_wises;
        this.Date_pass = this.Json_Data.Date_passs;
        this.Date_fail = 0;
        console.log(this.date_wise, this.Json_Data.Date_passs, this.Date_fail);
      }
    }


    // else if (this.searchText === "FAIL") {
    //   console.log("FAIL");
    //   if (this.datestat === undefined) {
    //     if (this.datestat === undefined && this.searchText === "FAIL") {
    //       console.log('yes')
    //       this.Pass_Value = this.Json_Data.Pass_Cases;
    //       this.Fail_Value = this.Json_Data.Fail_Cases;
    //       this.moduleName = this.Json_Data.moduleName;
    //       this.pass = 0;
    //       this.fail = this.Json_Data.fail;
    //       this.date_wise = this.Json_Data.Date_wise;
    //       this.Date_pass = 0;
    //       this.Date_fail = this.Json_Data.Date_fail;
    //       console.log(this.date_wise, this.Date_pass, this.Date_fail);
    //     }

    //   } else {
    //     if (this.datestat === this.datestat && this.searchText === "FAIL") {
    //       console.log('No')
    //       this.Pass_Value = this.Json_Data.Pass_Cases;
    //       this.Fail_Value = this.Json_Data.Fail_Cases;
    //       this.moduleName = this.Json_Data.moduleName;
    //       this.pass = 0;
    //       this.fail = this.Json_Data.fail;
    //       this.date_wise = this.Json_Data.Date_wises;
    //       this.Date_pass = 0;
    //       this.Date_fail = this.Json_Data.Date_fails;
    //       console.log(this.date_wise, this.Date_pass, this.Date_fail);
    //     }
    //   }

    // }
  }

  failmethod() {
    console.log("FAIL method");
    if (this.datestat === undefined) {
      if (this.datestat === undefined && this.searchText === "FAIL") {
        console.log('yes')
        this.Pass_Value = 0;
        this.Fail_Value = this.Json_Data.Fail_Cases;
        this.moduleName = this.Json_Data.moduleName;
        this.pass = 0;
        this.fail = this.Json_Data.fail;
        this.date_wise = this.Json_Data.Date_wise;
        this.Date_pass = 0;
        this.Date_fail = this.Json_Data.Date_fail;
        console.log(this.date_wise, this.Date_pass, this.Date_fail);
      }

    } else {
      if (this.datestat === this.datestat && this.searchText === "FAIL") {
        console.log('No')
        this.Pass_Value = 0;
        this.Fail_Value = this.Json_Data.Fail_Cases;
        this.moduleName = this.Json_Data.moduleName;
        this.pass = 0;
        this.fail = this.Json_Data.fail;
        this.date_wise = this.Json_Data.Date_wises;
        this.Date_pass = 0;
        this.Date_fail = this.Json_Data.Date_fails;
        console.log(this.date_wise, this.Date_pass, this.Date_fail);
      }


    }
  }

  datewisemethod() {

    console.log("All");
    console.log('this.datestat', this.datestat);

    console.log('yes')
    this.Pass_Value = this.Json_Data.Pass_Cases;
    this.Fail_Value = this.Json_Data.Fail_Cases;
    this.moduleName = this.Json_Data.moduleName;
    this.pass = this.Json_Data.pass;
    this.fail = this.Json_Data.fail;
    this.date_wise = this.Json_Data.Date_wises;
    this.Date_pass = this.Json_Data.Date_passs;
    this.Date_fail = this.Json_Data.Date_fails;
    console.log(this.date_wise, this.Date_pass, this.Date_fail);


  }


  searchText: any;
  datestat: any;

  onDepartment() {
    console.log("onDepartment");


    console.log("this.searchText", this.searchText);

    let obj = {
      Module: this.Module,
      Date_wise: this.searchText,
      PFdata: this.datestat
    };
    console.log(obj);


    let url = '../../assets/PFgraph.json'
    this.mis.passfail(obj).subscribe(
      (json_data) => {
        console.log(json_data);
        console.log('data..', json_data.response_text[0]);
        this.Json_Data = json_data.response_text[0]

        if (this.searchText === "PASS") {
          console.log('pass');
          this.passmethod();

        }
        else if (this.searchText === "FAIL") {
          console.log('pass');
          this.failmethod();
        }
        else {
          console.log('all');
          this.datewisemethod();

        }





        //-------------------------------------Bar chart------------------------------------------------
        if (this.chart1) {
          this.chart1.destroy();
        }
        var ctx1 = document.getElementById('barChartData') as HTMLCanvasElement;
        this.chart1 = new Chart(ctx1, {

          type: 'bar',

          data: {
            labels: ['PASS', 'FAIL'],
            datasets: [{
              data: [this.Pass_Value, this.Fail_Value],
              backgroundColor: ['lightblue', 'lightpink']
            }],

          },

          options: {
            legend: {
              display: false,
            },
            scales: {
              xAxes: [{
                stacked: true,

              }],
              yAxes: [{
                stacked: true,
              }],
            },

            responsive: true,
            maintainAspectRatio: false,

          },

        });

        //-------------------------------------PIE------------------------------------------------

        if (this.myChart) {
          this.myChart.destroy();
        }
        var ctx2 = document.getElementById("pie-chart") as HTMLCanvasElement;
        this.myChart = new Chart(ctx2, {
          type: 'pie',
          data: {
            labels: ['PASS', 'FAIL'],
            datasets: [{
              data: [this.Pass_Value, this.Fail_Value],
              backgroundColor: ["lightblue", "lightpink"],
            }],


          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
          }
        });


        //------------------------------------Module wise -------------------------------------------

        if (this.myChart1) {
          this.myChart1.destroy();
        }
        var ctx4 = document.getElementById('myChart') as HTMLCanvasElement;
        this.myChart1 = new Chart(ctx4, {
          type: 'bar',

          data: {
            labels: this.moduleName,
            datasets: [{
              label: this.DATA[0],
              data: this.pass,
              backgroundColor: 'lightblue'
            },
            {
              label: this.DATA[1],
              data: this.fail,
              backgroundColor: 'lightpink',
            }
            ]
          },

          options: {
            // title:{
            //   display: true,
            //   text:this.Module,
            //   position: 'bottom'
            // },
            legend: {
              display: true
            },
            scales: {
              xAxes: [{
                stacked: true,
              }],
              yAxes: [{
                stacked: true,
              }],
            },
            responsive: true,
            maintainAspectRatio: false,
          },

        });

        //------------------------------------------Date wise -------------------------------------------


        if (this.myChart2) {
          this.myChart2.destroy();
        }
        var ctx4 = document.getElementById('Chart') as HTMLCanvasElement;
        this.myChart2 = new Chart(ctx4, {
          type: 'bar',

          data: {
            labels: this.date_wise,
            datasets: [{
              label: this.DATA[0],
              data: this.Date_pass,
              backgroundColor: 'lightblue'
            },
            {
              label: this.DATA[1],
              data: this.Date_fail,
              backgroundColor: 'lightpink',
            }
            ]
          },

          options: {
            // title:{
            //   display: true,
            //   text:this.Module,
            //   position: 'bottom'
            // },
            legend: {
              display: true
            },
            scales: {
              xAxes: [{
                stacked: true,
              }],
              yAxes: [{
                stacked: true,
              }],

            },
            responsive: true,
            maintainAspectRatio: false,
          },

        });
      }
    )
  }
  // onDepartment() {
  //   console.log("onDepartment");


  //   console.log("this.searchText", this.searchText);

  //   let obj = {
  //     Module: this.Module,
  //     Date_wise: this.searchText,
  //     PFdata: this.datestat
  //   };
  //   console.log(obj);


  //   let url = '../../assets/PFgraph.json'
  //   this.mis.passfail(obj).subscribe(
  //     (json_data) => {
  //       console.log(json_data);

  //       console.log('data..', json_data.response_text[0]);
  //       this.Json_Data = json_data.response_text[0]
  //       // this.DateList = this.Json_Data.DateList
  //       // console.log(this.DateList);
  //       if (this.searchText === "PASS") {

  //         if (this.datestat === undefined) {
  //           if (this.datestat === undefined && this.searchText === "PASS") {
  //             console.log('yes')
  //             this.Pass_Value = this.Json_Data.Pass_Cases;
  //             this.Fail_Value = this.Json_Data.Fail_Cases;
  //             this.moduleName = this.Json_Data.moduleName;
  //             this.pass = this.Json_Data.pass;
  //             this.fail = 0;
  //             this.date_wise = this.Json_Data.Date_wise;
  //             this.Date_pass = this.Json_Data.Date_pass;
  //             this.Date_fail = 0;
  //             console.log(this.date_wise, this.Date_pass, this.Date_fail);
  //           }

  //         } else {
  //           if (this.datestat === this.datestat && this.searchText === "PASS") {
  //             console.log('No')
  //             this.Pass_Value = this.Json_Data.Pass_Cases;
  //             this.Fail_Value = this.Json_Data.Fail_Cases;
  //             this.moduleName = this.Json_Data.moduleName;
  //             this.pass = this.Json_Data.pass;
  //             this.fail = 0;
  //             this.date_wise = this.Json_Data.Date_wises;
  //             this.Date_pass = this.Json_Data.Date_passs;
  //             this.Date_fail = 0;
  //             console.log(this.date_wise, this.Date_pass, this.Date_fail);
  //           }
  //         }

  //       }
  //       else if (this.searchText === "FAIL") {
  //         console.log("FAIL");
  //         if (this.datestat === undefined) {
  //           if (this.datestat === undefined && this.searchText === "FAIL") {
  //             console.log('yes')
  //             this.Pass_Value = this.Json_Data.Pass_Cases;
  //             this.Fail_Value = this.Json_Data.Fail_Cases;
  //             this.moduleName = this.Json_Data.moduleName;
  //             this.pass = 0;
  //             this.fail = this.Json_Data.fail;
  //             this.date_wise = this.Json_Data.Date_wise;
  //             this.Date_pass = 0;
  //             this.Date_fail = this.Json_Data.Date_fail;
  //             console.log(this.date_wise, this.Date_pass, this.Date_fail);
  //           }

  //         } else {
  //           if (this.datestat === this.datestat && this.searchText === "FAIL") {
  //             console.log('No')
  //             this.Pass_Value = this.Json_Data.Pass_Cases;
  //             this.Fail_Value = this.Json_Data.Fail_Cases;
  //             this.moduleName = this.Json_Data.moduleName;
  //             this.pass = 0;
  //             this.fail = this.Json_Data.fail;
  //             this.date_wise = this.Json_Data.Date_wises;
  //             this.Date_pass = 0;
  //             this.Date_fail = this.Json_Data.Date_fails;
  //             console.log(this.date_wise, this.Date_pass, this.Date_fail);
  //           }
  //         }

  //       }
  //       else {
  //         console.log("All");
  //         if (this.datestat === this.datestat) {
  //           if (this.datestat === this.datestat && this.searchText === "FAIL") {
  //             console.log('yes')
  //             this.Pass_Value = this.Json_Data.Pass_Cases;
  //             this.Fail_Value = this.Json_Data.Fail_Cases;
  //             this.moduleName = this.Json_Data.moduleName;
  //             this.pass = 0;
  //             this.fail = this.Json_Data.fail;
  //             this.date_wise = this.Json_Data.Date_wise;
  //             this.Date_pass = 0;
  //             this.Date_fail = this.Json_Data.Date_fail;
  //             console.log(this.date_wise, this.Date_pass, this.Date_fail);
  //           }

  //         } else {
  //           if (this.datestat === this.datestat && this.searchText === "FAIL") {
  //             console.log('No')
  //             this.Pass_Value = this.Json_Data.Pass_Cases;
  //             this.Fail_Value = this.Json_Data.Fail_Cases;
  //             this.moduleName = this.Json_Data.moduleName;
  //             this.pass = 0;
  //             this.fail = this.Json_Data.fail;
  //             this.date_wise = this.Json_Data.Date_wises;
  //             this.Date_pass = 0;
  //             this.Date_fail = this.Json_Data.Date_fails;
  //             console.log(this.date_wise, this.Date_pass, this.Date_fail);
  //           }
  //         }
  //       }




  //       //-------------------------------------Bar chart------------------------------------------------
  //       if (this.chart1) {
  //         this.chart1.destroy();
  //       }
  //       var ctx1 = document.getElementById('barChartData') as HTMLCanvasElement;
  //       this.chart1 = new Chart(ctx1, {

  //         type: 'bar',

  //         data: {
  //           labels: ['PASS', 'FAIL'],
  //           datasets: [{
  //             data: [this.Pass_Value, this.Fail_Value],
  //             backgroundColor: ['lightblue', 'lightpink']
  //           }],

  //         },

  //         options: {
  //           legend: {
  //             display: false,
  //           },
  //           scales: {
  //             xAxes: [{
  //               stacked: true,

  //             }],
  //             yAxes: [{
  //               stacked: true,
  //             }],
  //           },

  //           responsive: true,
  //           maintainAspectRatio: false,

  //         },

  //       });

  //       //-------------------------------------PIE------------------------------------------------

  //       if (this.myChart) {
  //         this.myChart.destroy();
  //       }
  //       var ctx2 = document.getElementById("pie-chart") as HTMLCanvasElement;
  //       this.myChart = new Chart(ctx2, {
  //         type: 'pie',
  //         data: {
  //           labels: ['PASS', 'FAIL'],
  //           datasets: [{
  //             data: [this.Pass_Value, this.Fail_Value],
  //             backgroundColor: ["lightblue", "lightpink"],
  //           }],


  //         },
  //         options: {
  //           responsive: true,
  //           maintainAspectRatio: false,
  //         }
  //       });


  //       //------------------------------------Module wise -------------------------------------------

  //       if (this.myChart1) {
  //         this.myChart1.destroy();
  //       }
  //       var ctx4 = document.getElementById('myChart') as HTMLCanvasElement;
  //       this.myChart1 = new Chart(ctx4, {
  //         type: 'bar',

  //         data: {
  //           labels: this.moduleName,
  //           datasets: [{
  //             label: this.DATA[0],
  //             data: this.pass,
  //             backgroundColor: 'lightblue'
  //           },
  //           {
  //             label: this.DATA[1],
  //             data: this.fail,
  //             backgroundColor: 'lightpink',
  //           }
  //           ]
  //         },

  //         options: {
  //           // title:{
  //           //   display: true,
  //           //   text:this.Module,
  //           //   position: 'bottom'
  //           // },
  //           legend: {
  //             display: true
  //           },
  //           scales: {
  //             xAxes: [{
  //               stacked: true,
  //             }],
  //             yAxes: [{
  //               stacked: true,
  //             }],
  //           },
  //           responsive: true,
  //           maintainAspectRatio: false,
  //         },

  //       });

  //       //------------------------------------------Date wise -------------------------------------------


  //       if (this.myChart2) {
  //         this.myChart2.destroy();
  //       }
  //       var ctx4 = document.getElementById('Chart') as HTMLCanvasElement;
  //       this.myChart2 = new Chart(ctx4, {
  //         type: 'bar',

  //         data: {
  //           labels: this.date_wise,
  //           datasets: [{
  //             label: this.DATA[0],
  //             data: this.Date_pass,
  //             backgroundColor: 'lightblue'
  //           },
  //           {
  //             label: this.DATA[1],
  //             data: this.Date_fail,
  //             backgroundColor: 'lightpink',
  //           }
  //           ]
  //         },

  //         options: {
  //           // title:{
  //           //   display: true,
  //           //   text:this.Module,
  //           //   position: 'bottom'
  //           // },
  //           legend: {
  //             display: true
  //           },
  //           scales: {
  //             xAxes: [{
  //               stacked: true,
  //             }],
  //             yAxes: [{
  //               stacked: true,
  //             }],

  //           },
  //           responsive: true,
  //           maintainAspectRatio: false,
  //         },

  //       });


  //     });
  // }


  priorities: any;
  inboxModule: any;
  date_wises: any;
  Date_passs: any;
  Date_fails: any;


  // for date selection
  startDate: any;
  addStartDate(event: MatDatepickerInputEvent<Date>) {
    this.startDate = `${event.value}`;
    this.startDate = formatDate(this.startDate, "dd/MM/yyyy", "en");
    console.log('addStartDate >>', this.startDate);
  }
  // drop down for select module


  redirectPage() {

    localStorage.setItem('Day', this.Day);
    console.log(localStorage.getItem('Day'));
    localStorage.setItem('week', this.week);
    console.log(localStorage.getItem('week'));
    this.router.navigate(['/Mis-Module'])

  }


  showAlert(response: any) {
    this.openConfirmationBox = false;
  }

  showMessage() {
    this.displayMessage = false;
  }
}

// var myChart = new Chart(ctx,{type: 'bar', data:this.barData , options:this.barOptions });
// myChart.destroy();
// myChart = new Chart(ctx,{type: 'radar', data: this.barData, options: this.barOptions});