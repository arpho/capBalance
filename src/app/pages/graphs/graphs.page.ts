import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-graphs',
  templateUrl: './graphs.page.html',
  styleUrls: ['./graphs.page.scss'],
})
export class GraphsPage implements OnInit {
  chart

  constructor() {
    this.chart = {
      title: 'test',
      type: 'BarChart',
      data: [
        ["2012", 900],
        ["2013", 1000],
        ["2014", 1170],
        ["2015", 1250],
        ["2016", 1530]
      ],
      columnNames: ['year', 'Asia']
    }
  }

  ngOnInit() {
  }

}
