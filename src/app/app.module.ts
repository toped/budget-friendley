import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { SharedModule } from './shared/shared.module';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReportHomeComponent } from './components/report-home/report-home.component';
import { ExpensesTableComponent } from './components/expenses-table/expenses-table.component';
import {
    MatFormFieldModule,
    MatInputModule,
    MatOptionModule,
    MatSelectModule,
    MatTableModule,
    MatDialogModule,
    MatPaginatorModule,
} from '@angular/material';
import { ReactiveFormsModule } from '@angular/forms';
import { CategoryTableComponent } from './components/category-table/category-table.component';
import { IncomeSummaryTableComponent } from './components/income-summary-table/income-summary-table.component';
import { ExpensesSummaryTableComponent } from './components/expenses-summary-table/expenses-summary-table.component';
import { ReportSummaryComponent } from './components/report-summary/report-summary.component';

@NgModule({
    declarations: [
        AppComponent,
        ReportHomeComponent,
        ExpensesTableComponent,
        CategoryTableComponent,
        IncomeSummaryTableComponent,
        ExpensesSummaryTableComponent,
        ReportSummaryComponent,
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        MatTableModule,
        MatPaginatorModule,
        MatFormFieldModule,
        MatInputModule,
        MatOptionModule,
        MatSelectModule,
        ReactiveFormsModule,
        MatDialogModule,
        SharedModule.forRoot(),
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
