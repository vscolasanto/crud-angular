import { Component, Input, OnInit } from '@angular/core';
import { ChartOptions } from 'chart.js';
import { monkeyPatchChartJsLegend, monkeyPatchChartJsTooltip } from 'ng2-charts';
import { ChartModel } from '../../models/chart.model';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements OnInit {

  @Input('data') data: ChartModel

  pieChartOptions: ChartOptions = {}

  constructor() {
    monkeyPatchChartJsTooltip();
    monkeyPatchChartJsLegend();
  }

  ngOnInit(): void {
    this.pieChartOptions = {
      responsive: true,
      title: {
        display: true,
        text: this.data.title
      },
      legend: {
        position: 'bottom'
      }
    }
  }
}
