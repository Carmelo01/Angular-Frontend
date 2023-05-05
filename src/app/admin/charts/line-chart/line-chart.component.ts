import { Component, OnInit } from '@angular/core';
import { CapsuleService } from 'src/app/services/capsule.service';
import * as Highcharts from "highcharts";

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.scss']
})
export class LineChartComponent implements OnInit{

  linechart: any;

  areaChartOptions: any = {
    chart: {
      styledMode: true,
    },
    plotOptions: {
      series: {
          marker: {
              enabled: false,
          }
      }
    },
    legend: {
      enabled: false
    },
    credits: {
      enabled: false,
    },
    title: {
      text: 'Capsule Monthly Uploads'
    },
    yAxis: {
      visible: true,
    },
    xAxis: {
      visible: true,
      categories: [
          'January',
          'February',
          'March',
          'April',
          'May',
          'June',
          'July',
          'August',
          'September',
          'October',
          'November',
          'December',
      ]
    },
    defs: {
      gradient0: {
          tagName: 'linearGradient',
          id: 'gradient-0',
          x1: 0,
          y1: 0,
          x2: 0,
          y2: 1,
          children: [
              {
                  tagName: 'stop',
                  offset: 0
              },
              {
                  tagName: 'stop',
                  offset: 0
              }
          ]
      }
    } as any,
    series:[]
  }

  constructor(private capsuleService: CapsuleService) {}

  ngOnInit(): void {
    this.getLineChartData();
  }

  getLineChartData(){
    this.linechart = this.capsuleService.getLineChartData().subscribe(data => {
      const dataLine = [];
      const dataInLine = [
        [data.janCapsule, false],
        [data.febCapsule, false],
        [data.marCapsule, false],
        [data.aprCapsule, false],
        [data.mayCapsule, false],
        [data.juneCapsule, false],
        [data.julyCapsule, false],
        [data.augCapsule, false],
        [data.septCapsule, false],
        [data.octCapsule, false],
        [data.novCapsule, false],
        [data.decCapsule, false],
      ];
      dataLine.push({
        color: 'red',
        type: 'areaspline',
        keys: ['y', 'selected'],
        data: dataInLine
      })
      this.areaChartOptions.series = dataLine;
      Highcharts.chart('lineChart', this.areaChartOptions);
    })
  }
}
