import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sankey',
  templateUrl: './sankey.page.html',
  styleUrls: ['./sankey.page.scss'],
})
export class SankeyPage implements OnInit {
  chart: any
  data
  constructor() { }

  ngOnInit() {
    this.chart = {
      title: 'test',
      type: 'Sankey',
      data: [
        ['A', 'X', 5],
        ['A', 'Y', 7],
        ['A', 'Z', 6],
        ['B', 'X', 2],
        ['B', 'Y', 9],
        ['B', 'Z', 4],
        ['B', 'C', 6],
        ['C', 'X', 7]
      ],
      columnNames: ['From', 'To', 'Weigth'],
      options: {
        width: 600,
        height: 500
      }
    };
  }

}
