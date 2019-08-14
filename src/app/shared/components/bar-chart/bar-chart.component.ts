import { Component, OnInit, Input } from '@angular/core';
import Chart from 'chart.js';
import { MixedChartData } from '../../models/mixedChartData';

@Component({
    selector: 'app-bar-chart',
    templateUrl: './bar-chart.component.html',
    styleUrls: ['./bar-chart.component.scss']
})
export class BarChartComponent implements OnInit {

    @Input()
    componentTitle = 'Barchart';

    @Input()
    set chartData(val: MixedChartData) {
        if (val !== undefined) {
            console.log(val);

            this.data = {
                datasets: [{
                    label: val.dataset_labels.series1_label,
                    data: val.datasets.series1,
                    backgroundColor: 'rgb(217, 217, 217)',
                    borderColor: 'rgb(217, 217, 217)',
                }, {
                    label: val.dataset_labels.series2_label,
                    data: val.datasets.series2,
                    backgroundColor: 'rgb(105, 187, 254)',
                    borderColor: 'rgb(105, 187, 254)',

                    // Changes this dataset to become a line
                    type: 'bar'
                }],
                labels: val.labels
            };

            const canvas = <HTMLCanvasElement>document.getElementById('myChart');
            const ctx = canvas.getContext('2d');
            const _ = new Chart(ctx, {
                type: 'bar',
                data: this.data,
                options: this.options
            });
        }
    }

    data: any;
    options = { responsive: true };

    constructor() { }

    ngOnInit() {
        const canvas = <HTMLCanvasElement>document.getElementById('myChart');
        const ctx = canvas.getContext('2d');

        const _ = new Chart(ctx, {
            type: 'bar',
            data: this.data,
            options: this.options
        });
    }

}
