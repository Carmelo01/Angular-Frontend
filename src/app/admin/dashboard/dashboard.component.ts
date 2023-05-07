import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CapsuleService } from 'src/app/services/capsule.service';
import { UrlService } from 'src/app/services/url.service';
import { formatDate } from '@angular/common'
import { FacultyService } from 'src/app/services/faculty.service';
import * as Highcharts from "highcharts";
import { ExportService } from 'src/app/services/export.service';
import { ActivatedRoute } from '@angular/router';
import { ThemeService } from 'src/app/services/theme.service';


@Component({
  selector: 'app-dashboard-admin',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit{
  chartData: any[] = [];
  capsules: any;
  verifiedFaculty:any;
  unverifiedFaculty:any;
  faculty:any;
  dashboard: any;
  linechart: any;
 // loading: boolean = false;

  donutChartOptions: any = {
    chart: {
        type: 'pie',
        plotShadow: false,
    },
    credits: {
        enabled: false
    },
    plotOptions: {
        pie: {
          

            innerSize: '85%',
            borderWidth: 2,
            borderColor: 'none',
            borderRadius: '5px',
            slicedOffset: 20,
            dataLabels: {
                connectorWidth: 0
            }
        }
    },
    title: {
        verticalAlign: 'middle',
        floating: true,
        text: 'Capsules'
    },
    legend: {
        enabled: false,
    },
    series: []
  }
  theme: any;

  constructor(private capsuleService: CapsuleService,
    private facultyService: FacultyService,
    public url: UrlService,
    public exportService: ExportService,
    private themeService: ThemeService,
    private route: ActivatedRoute) {
      this.capsules = this.route.snapshot.data['capsules']
      this.getDashboardData(this.route.snapshot.data['chart'])
    }

  ngOnInit(): void {
    this.getHighCharts()
    this.theme = this.themeService.getTheme()
  }

  getHighCharts(){
    Highcharts.chart('pieChart', this.donutChartOptions);
  }
  formatReqDate(dateReq: Date){
    return formatDate(dateReq, 'yyyy-MM-dd', 'en_PH')
  }

  getDashboardData(data: any){
    const dataPie = [];
    const datas = [
      {name: 'Unassigned', y:data.unassignedCapsule, color:'#eeeeee' },
      {name: 'Assigned', y:data.assignedCapsule, color:'#149dac' },
      {name: 'Graded', y:data.gradedCapsule, color:'#F5781C' },
      {name: 'Under Revision', y:data.underRevision, color:'#a66e8b' }, //data.underRevision
      {name: 'Rejected', y:data.rejectedCapsule, color:'#401721' }, //data.rejectedCapsule
      {name: 'Accepted', y:data.approvedCapsule, color:'#2a3439' }, //data.acceptedCapsule
    ]
    dataPie.push({
      type: 'pie',
      data: datas,
    });
    this.donutChartOptions.series = dataPie;
  }


}
