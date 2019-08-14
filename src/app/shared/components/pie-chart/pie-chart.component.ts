import { Component, OnInit, Input } from '@angular/core';
import Chart from 'chart.js';
import { ChartData } from '../../models/ChartData';


@Component({
    selector: 'app-pie-chart',
    templateUrl: './pie-chart.component.html',
    styleUrls: ['./pie-chart.component.scss']
})
export class PieChartComponent implements OnInit {

    @Input()
    componentTitle = 'Barchart';

    @Input()
    set chartData(val: ChartData) {
        if (val !== undefined) {
            console.log(val);

            this.data = {
                datasets: [{
                    label: val.label,
                    data: val.series,
                    backgroundColor: 'rgb(105, 187, 254)',
                    borderColor: 'rgb(105, 187, 254)',
                }],
                labels: val.labels
            };

            const canvas = <HTMLCanvasElement>document.getElementById('myChart');
            const ctx = canvas.getContext('2d');
            const _ = new Chart(ctx, {
                type: 'pie',
                data: this.data,
                options: this.options
            });
        }
    }

    data: any;
    options = { responsive: true };

    constructor() { }

    ngOnInit() {
    }

}
