import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
    selector: 'app-income-summary-table',
    templateUrl: './income-summary-table.component.html',
    styleUrls: ['./income-summary-table.component.scss']
})
export class IncomeSummaryTableComponent implements OnInit {

    leftToMake = 0;

    incomeForm: FormGroup;

    constructor(private fb: FormBuilder) { }

    ngOnInit() {
        this.incomeForm = this.fb.group({
            projectedIncome: [4800],
            actualIncome: [0],
        });

    }

}
