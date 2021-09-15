import { ChartType } from "chart.js";
import { Label, SingleDataSet } from "ng2-charts";

export interface ChartModel {
  title: string
  pieChartLabels: Label[]
  pieChartData: SingleDataSet
  pieChartType: ChartType;
}
