import { GraphData } from './../../../models/graph-data';
import { Product } from './../../../models/product';
import { ProductService } from './../../../services/product.service';
import { Orders } from './../../../models/orders';
import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import * as Exporting from 'highcharts/modules/exporting';
import { OrderHistoryService } from 'src/app/services/order-history.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-saleschart',
  templateUrl: './saleschart.component.html',
  styleUrls: ['./saleschart.component.css'],
})
export class SaleschartComponent implements OnInit {
  monthlydata: number[] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  graphData!:GraphData[]
  priceRangeData!: number[];
  year: number = new Date().getFullYear();
  orders!: Orders[];
  products!: Product[];
  user = new User();

  constructor(
    private orderService: OrderHistoryService,
    private productService: ProductService,
    public jwtHelper: JwtHelperService
  ) {}

  ngOnInit(): void {
    this.user = this.jwtHelper.decodeToken(JSON.parse(sessionStorage.getItem('token')!))!
    this.loadYearlyChart(this.year);
    this.loadPriceRange();
  }

  loadYearlyChart(y: number) {
    this.monthlydata = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

    this.orderService.getOrdersCountOfMonthPerTear(this.year).subscribe(data=>{
      this.graphData=data;
      this.graphData.forEach(val=>{
        this.monthlydata[val.order_month-1]=val.count;
      })
      console.log(this.monthlydata);
      chart.series[0].setData(this.monthlydata);
    })

    // this.orderService.getAllorders().subscribe((data) => {
    //   this.orders = data;
    //   this.orders.forEach((val) => {
    //     let day = new Date(val.orderDate);
    //     if (day.getFullYear() == y) {
    //       let i = day.getMonth();
    //       this.monthlydata[i]++;
    //     }
    //   });
    //   console.log(this.monthlydata);
    //   chart.series[0].setData(this.monthlydata);
    // });

    // console.log(this.monthlydata);

    // @ts-ignore
    var chart = Highcharts.chart('container', {
      chart: {
        type: 'column',
      },
      title: {
        text: 'Sales of the Year ' + this.year,
      },
      subtitle: {
        text: '',
      },
      xAxis: {
        type: 'category',
        labels: {
          rotation: -45,
          style: {
            fontSize: '13px',
            fontFamily: 'Verdana, sans-serif',
          },
        },
      },
      yAxis: {
        min: 0,
        title: {
          text: 'Sales',
        },
      },
      legend: {
        enabled: false,
      },
      tooltip: {
        pointFormat: 'Sales: <b>{point.y:.0f}</b>',
      },
      series: [
        {
          name: 'Sales',
          data: [
            ['January', 0],
            ['February', 0],
            ['March', 27.79],
            ['April', 22.23],
            ['May', 0],
            ['June', 21.74],
            ['July', 21.32],
            ['August', 20.89],
            ['September', 20.67],
            ['October', 19.11],
            ['November', 16.45],
            ['December', 16.38],
          ],
          dataLabels: {
            enabled: true,
            rotation: -90,
            color: '#FFFFFF',
            align: 'right',
            format: '{point.y:.0f}', // one decimal
            y: 10, // 10 pixels down from the top
            style: {
              fontSize: '13px',
              fontFamily: 'Verdana, sans-serif',
            },
          },
        },
      ],
    });
    // chart.series[0].data.forEach(data=>{
    //   console.log(data['y'])
    // })
  }

  loadPriceRange() {
    this.priceRangeData = [0, 0, 0, 0, 0, 0];
    this.productService.getProducts().subscribe((data) => {
      this.products = data;
      this.products.forEach((val) => {
        let i = Math.floor(val.price / 20000);
        if (i < 5) {
          this.priceRangeData[i]++;
        } else {
          this.priceRangeData[5]++;
        }
      });
      console.log(this.priceRangeData);
      chart1.series[0].setData(this.priceRangeData);
    });

    // Data retrieved from https://netmarketshare.com
    // @ts-ignore
    var chart1=Highcharts.chart('container1', {
      chart: {
          plotBackgroundColor: null,
          plotBorderWidth: null,
          plotShadow: false,
          type: 'pie'
      },
      title: {
          text: 'Mobiles Stock in April, 2023',
          align: 'center'
      },
      tooltip: {
          pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
      },
      accessibility: {
          point: {
              valueSuffix: '%'
          }
      },
      plotOptions: {
          pie: {
              allowPointSelect: true,
              cursor: 'pointer',
              dataLabels: {
                  enabled: false
              },
              showInLegend: true
          }
      },
      series: [{
          name: 'Mobiles',
          colorByPoint: true,
          data: [{
              name: '19999 or below',
              y: 74.77,
              sliced: true,
              selected: true
          },  {
              name: '20,000-39,999',
              y: 12.82
          },  {
              name: '40,000-59,999',
              y: 4.63
          }, {
              name: '60,000-79,999',
              y: 2.44
          }, {
              name: '80,000-99,999',
              y: 2.02
          }, {
              name: '100,000 or above',
              y: 3.28
          }]
      }]
  });
  
  }
}
