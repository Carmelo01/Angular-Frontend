import { Options } from "highcharts";

export const areaChartOptions: Options = {
    chart: {
        styledMode: true,
    },
    plotOptions: {
        line: {
            color: 'red',
            // width: 2,
          },
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
            // 'May',
            // 'June',
            // 'July',
            // 'August',
            // 'September',
            // 'October',
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
    series:[
        {
            color: 'red',
            type: 'areaspline',
            keys: ['y', 'selected'],
            data: [
                [9.9, false],
                [19.9, false],
                [20.9, false],
                [15.9, false],
                [10.9, false],
                [21.9, false],
                [29.9, false],
                [15.9, false],
                [8.9, false],
                [16.9, false],
                [8.9, false],
                [16.9, false],
            ]
        }
    ]

}
