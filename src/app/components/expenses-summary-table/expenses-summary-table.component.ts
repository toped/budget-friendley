import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'app-expenses-summary-table',
    templateUrl: './expenses-summary-table.component.html',
    styleUrls: ['./expenses-summary-table.component.scss']
})
export class ExpensesSummaryTableComponent implements OnInit {

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
    constructor() { }

    ngOnInit() {
    }

}
