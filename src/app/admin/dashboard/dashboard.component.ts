import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CapsuleService } from 'src/app/services/capsule.service';
import { UrlService } from 'src/app/services/url.service';
import { formatDate } from '@angular/common'
import { FacultyService } from 'src/app/services/faculty.service';
import * as Highcharts from "highcharts";
import { ExportService } from 'src/app/services/export.service';
import { ActivatedRoute } from '@angular/router';
import { ThemeService } from 'src/app/services/theme.service';
import { PaginateService } from 'src/app/services/paginate.service';
import { ExportpdfService } from 'src/app/services/exportpdf.service';


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
  searchQuery: any = '';
  searchCapsule = '';
  // loading: boolean = false;
  currentPage = 1; // current page number
  pageSize = 5; // number of items to be shown per page

  selectedFilter: string = '-1';

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
  atoz: boolean = true
  constructor(private capsuleService: CapsuleService,
    private facultyService: FacultyService,
    public url: UrlService,
    public exportService: ExportService,
    private themeService: ThemeService,
    private route: ActivatedRoute,
    public paginate: PaginateService,
    public exportpdf: ExportpdfService) {
      this.capsules = this.route.snapshot.data['capsules']
      this.getDashboardData(this.route.snapshot.data['chart'])
    }

  get filteredItems(): string[] {
    let capsule = this.capsules.data
    if (!this.selectedFilter || this.selectedFilter == '-1') {
      return this.capsules.data;
    }

    return capsule.filter( (item: any) => item.status.toLowerCase().startsWith(this.selectedFilter.toLowerCase()));
  }

  ngOnInit(): void {
    this.getHighCharts()
    this.theme = this.themeService.getTheme()
  }

  toggleAtoZ(headerName:String, capsules:any){
    this.atoz = !this.atoz
    this.paginate.sort(headerName, capsules)
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
      {name: 'Reconsider', y:data.rejectedCapsule, color:'#401721' }, //data.rejectedCapsule
      {name: 'Accepted', y:data.approvedCapsule, color:'#2a3439' }, //data.acceptedCapsule
    ]
    dataPie.push({
      type: 'pie',
      data: datas,
    });
    this.donutChartOptions.series = dataPie;
  }


}
