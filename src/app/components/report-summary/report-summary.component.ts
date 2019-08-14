import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
    selector: 'app-report-summary',
    templateUrl: './report-summary.component.html',
    styleUrls: ['./report-summary.component.scss']
})
export class ReportSummaryComponent implements OnInit {

    @Input()
    set categories(val) {
        if (val !== undefined && val.length > 0) {
            this.projectedTotal = val.reduce((accumulator, category) => {
                return accumulator + category.projection;
            }, 0);

            this.actualTotal = val.reduce((accumulator, category) => {
                return accumulator + category.actual;
            }, 0);

            this.leftToSpend = this.projectedTotal - this.actualTotal;
        }
    }

    projectedTotal: number;
    actualTotal: number;
    leftToSpend: number;
    leftToMake = 0;

    incomeForm: FormGroup;

    constructor(private fb: FormBuilder) { }

    ngOnInit() {
        this.incomeForm = this.fb.group({
            projectedIncome: [4800],
            actualIncome: [0],
        });

    }

    getLeftToMake() {
        const left = this.incomeForm.get('projectedIncome').value - this.incomeForm.get('actualIncome').value;

        if (left <= 0) {
            return 0;
        } else {
            return left.toLocaleString('en-US', {minimumFractionDigits: 2});
        }
    }

}
