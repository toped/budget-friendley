import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MatTableDataSource, MatPaginator } from '@angular/material';
import { CategoryService } from 'src/app/shared/services/category.service';
import { Transaction } from 'src/app/shared/models/transaction';
import { Category } from 'src/app/shared/models/category';

@Component({
    selector: 'app-category-table',
    templateUrl: './category-table.component.html',
    styleUrls: ['./category-table.component.scss']
})
export class CategoryTableComponent implements OnInit {

    @Input()
    set categories(val) {
        if (val !== undefined && val.length > 0) {
            this.dataSource.data = [].concat(val);
        }
    }
    dataSource = new MatTableDataSource();
    categoryColumns: string[] = ['category', 'projection', 'actual'];

    // @ViewChild(MatPaginator) paginator: MatPaginator;

    constructor(private categorySrvc: CategoryService) { }

    ngOnInit() {
        this.fetchCatigories();
    }

    fetchCatigories() {
        this.categorySrvc.getCategories().then((categories) => {
            if (categories === null) {
                this.categorySrvc.resetCategories().then(() => {
                    this.dataSource = new MatTableDataSource(categories);
                    // this.categories.paginator = this.paginator;
                });
            } else {
                this.dataSource = new MatTableDataSource(categories);
                // this.categories.paginator = this.paginator;
            }
        });
    }

    // applyFilter(filterValue: string) {
    //     this.categories.filter = filterValue.trim().toLowerCase();
    // }

}
