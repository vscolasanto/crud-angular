import { Component, Input, OnInit } from '@angular/core';
import { ChartOptions } from 'chart.js';
import { monkeyPatchChartJsLegend, monkeyPatchChartJsTooltip } from 'ng2-charts';
import { ChartModel } from '../../models/chart.model';
import ChartPluginDatalabels from 'chartjs-plugin-datalabels'

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements OnInit {

  @Input('data') data: ChartModel

  pieChartOptions: ChartOptions = {}
  pieChartPlugins = [ChartPluginDatalabels];

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
      },
      plugins: {
        datalabels: {
           color: '#3f3f3f80',
           font: {
             size: 18,
             weight: 'lighter'
           }
        }
      }
    }
  }
}
