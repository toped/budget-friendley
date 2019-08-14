import { Component, OnInit, Input, ViewChild, Output, EventEmitter } from '@angular/core';
import { MatTableDataSource, MatPaginator } from '@angular/material';
import { Transaction } from 'src/app/shared/models/transaction';
import { TransactionService } from 'src/app/shared/services/transaction.service';
import { CategoryService } from 'src/app/shared/services/category.service';
import { VendorService } from 'src/app/shared/services/vendor.service';
import { MatDialog } from '@angular/material';
import { DialogComponent } from 'src/app/shared/components/dialog/dialog.component';
import { Vendor } from 'src/app/shared/models/vendor';
import { Category } from 'src/app/shared/models/category';

@Component({
    selector: 'app-expenses-table',
    templateUrl: './expenses-table.component.html',
    styleUrls: ['./expenses-table.component.scss']
})
export class ExpensesTableComponent implements OnInit {

    private _transactionsValue: Transaction[];
    filterValue = null;

    @Input()
    categories: Category[];

    @Input()
    vendors: Vendor[];

    @Output()
    vendorsChanged = new EventEmitter();

    @Input()
    set transactions(val) {
        if (val !== undefined && val.length > 0) {
            this._transactionsValue = val;
            this.dataSource.data = [].concat(this._transactionsValue);
        }
    }

    get transactions(): Transaction[] {
        return this._transactionsValue;
    }

    @ViewChild(MatPaginator)
    paginator: MatPaginator;

    displayedColumns: string[] = ['transaction date', 'post date', 'description', 'category', 'type', 'amount', 'edit'];
    dataSource = new MatTableDataSource();

    constructor(
        private transactionSrvc: TransactionService,
        private vendorSrvc: VendorService,
        private categorySrvc: CategoryService,
        private dialog: MatDialog,
    ) { }

    ngOnInit() {
        this.dataSource = new MatTableDataSource(this.transactions);
        this.dataSource.paginator = this.paginator;
    }



    applyFilter(filterValue: string) {
        this.dataSource.filter = filterValue.trim().toLowerCase();
        this.filterValue = filterValue.length > 0 ? filterValue : null;
    }

    openCategoryDialog(transaction: Transaction) {
        const dialogRef = this.dialog.open(DialogComponent, {
            width: '250px',
            data: { formTitle: 'Update Category', category: '', options: [] }
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result !== undefined) {
                let newVendor: Vendor = {
                    name: transaction.desc,
                    category: parseInt(result, 10),
                };

                if (transaction.assignedCategory === 9999) {
                    console.log('transaction.assignedCategory->', transaction.assignedCategory);
                    this.vendorSrvc.addVendor(newVendor);

                    this.vendorsChanged.emit(); // signal to report-home that data needs to be refreshed

                } else {
                    newVendor = this.vendors.filter(v => v.name === transaction.desc)[0];
                    newVendor.category = parseInt(result, 10);
                    this.vendorSrvc.updateVendor(newVendor);

                    this.vendorsChanged.emit(); // signal to report-home that data needs to be refreshed
                }
            }
        });
    }

    getCategoryName(element: Transaction) {

        const category = this.categories.filter(c => c.id === element.assignedCategory)[0];

        return category ? category.name : element.assignedCategory;
    }

    getLocaleDateString(date: Date) {
        return date.toLocaleDateString('en-US');
    }
}


