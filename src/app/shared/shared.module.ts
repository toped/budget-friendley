import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { XlsxReaderComponent } from './components/xlsx-reader/xlsx-reader.component';
import { TransactionService } from './services/transaction.service';
import { DialogComponent } from './components/dialog/dialog.component';
import { BarChartComponent } from './components/bar-chart/bar-chart.component';

import {
    MatFormFieldModule,
    MatInputModule,
    MatOptionModule,
    MatSelectModule,
    MatButtonModule,
    MatDialogModule,
    MatToolbarModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule
} from '@angular/material';
import { ReactiveFormsModule } from '@angular/forms';
import { CategoryService } from './services/category.service';
import { NavigationComponent } from './components/navigation/navigation.component';
import { LayoutModule } from '@angular/cdk/layout';
import { SharedRouterModule } from './shared.routing';
import { PieChartComponent } from './components/pie-chart/pie-chart.component';

@NgModule({
    declarations: [
        XlsxReaderComponent,
        DialogComponent,
        NavigationComponent,
        BarChartComponent,
        PieChartComponent,
    ],
    imports: [
        CommonModule,
        MatFormFieldModule,
        MatInputModule,
        MatOptionModule,
        MatSelectModule,
        MatButtonModule,
        MatDialogModule,
        ReactiveFormsModule,
        LayoutModule,
        MatToolbarModule,
        MatSidenavModule,
        MatIconModule,
        MatListModule,
        SharedRouterModule,
    ],
    exports: [
        XlsxReaderComponent,
        DialogComponent,
        NavigationComponent,
        BarChartComponent,
    ],
    entryComponents: [
        DialogComponent
    ]

})
export class SharedModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: SharedModule,
            providers: [
                CategoryService,
                TransactionService,
            ]
        };
    }
}
