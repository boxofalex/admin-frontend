import {
  Component,
  OnInit,
  Input,
} from '@angular/core';
import {
  ChartOptions,
  ChartType,
  ChartDataSets
} from 'chart.js';
import { Label } from 'ng2-charts';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements OnInit {
  @Input() set dataset(val) {
    this.chartData = val;
  }
  @Input() set labels(val) {
    this.chartLabels = val;
  }
  @Input() set type(val) {
    this.chartType = val;
  }
  @Input() set legend(val) {
    this.chartLegend = val;
  }
  @Input() set options(val) {
    this.chartOptions = val;
  }
  @Input() set plugins(val) {
    this.chartPlugins = val;
  }
  public chartData: ChartDataSets[];
  public chartLabels: Label[];
  public chartOptions: ChartOptions;
  public chartType: ChartType;
  public chartLegend: boolean;
  public chartPlugins: any[];

  constructor() { }

  ngOnInit(): void {
  }

}
