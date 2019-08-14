import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Transaction } from 'src/app/shared/models/transaction';
import { Category } from 'src/app/shared/models/category';
import { CategoryService } from 'src/app/shared/services/category.service';
import { TransactionService } from 'src/app/shared/services/transaction.service';
import { VendorService } from 'src/app/shared/services/vendor.service';
import { Vendor } from 'src/app/shared/models/vendor';
import { MixedChartData } from 'src/app/shared/models/mixedChartData';

@Component({
    selector: 'app-report-home',
    templateUrl: './report-home.component.html',
    styleUrls: ['./report-home.component.scss']
})
export class ReportHomeComponent implements OnInit {

    transactionsValue: Transaction[];
    categories: Category[];
    vendors: Vendor[];
    chartData: MixedChartData = {
        labels: [],
        dataset_labels: {
            series1_label: '',
            series2_label: '',
        },
        datasets: {
            series1: [],
            series2: [],
        }
    };

    constructor(
        private categorySrvc: CategoryService,
        private transactionSrvc: TransactionService,
        private vendorSrvc: VendorService,
    ) { }

    ngOnInit() {
        this.fetchData();
    }

    didUploadFile(file: any[]) {
        this.transactionsValue = new Array<Transaction>();
        console.log('File uploaded...');

        file.map((t) => {
            this.transactionsValue = this.transactionsValue.concat({
                id: Math.max(...this.transactionsValue.map(t1 => t1.id), 0) + 1,
                transactionDate: new Date(t[0]),
                postDate: new Date(t[1]),
                desc: t[2],
                category: t[3],
                assignedCategory: 9999,
                type: t[4],
                amount: t[5]
            }).filter(t2 => t2.desc !== 'Description');
        });

        this.transactionSrvc.resettransactions(this.transactionsValue).then(() => {
            console.log('Transactions reset from file');
        });

        this.fetchData();
    }

    fetchData() {

        console.log('fetching categories...');

        this.fetchCatigories()
            .then(() => {
                console.log('fetching vendors...');
                this.fetchVendors();
            })
            .then(() => {
                console.log('fetching transactions...');
                this.fetchTransactions();
            });
    }

    fetchCatigories(): Promise<any> {

        const categories_promise = new Promise((resolve_category_promise, _) => {

            this.categorySrvc.getCategories().then((categories) => {
                if (categories === null) {
                    this.categorySrvc.resetCategories().then(() => {
                        this.categories = categories;
                    });
                } else {
                    this.categories = categories;
                }

                resolve_category_promise();
            });
        });

        return categories_promise;
    }

    fetchVendors(): Promise<any> {

        const vendors_promise = new Promise((resolve_vendor_promise, _) => {

            this.vendorSrvc.getVendors().then((vendors) => {
                if (vendors !== null) {
                    this.vendors = vendors;
                } else {
                    this.vendorSrvc.resetVendors().then((v) => {
                        this.vendors = v as Vendor[];
                    });
                }
                resolve_vendor_promise();
            });
        });

        return vendors_promise;
    }

    fetchTransactions(): Promise<any> {

        const transaction_promise = new Promise((resolve_transaction_promise, _) => {

            this.transactionSrvc.getTransactions().then((transactions) => {

                if (transactions !== null) {

                    this.transactionsValue = transactions
                        .filter(t => t.type !== 'Payment')
                        .map((t) => {
                           const vendor = this.vendors.filter(v => v.name === t.desc)[0];

                           if (vendor) {
                                return {
                                    ...t,
                                    assignedCategory: vendor.category,
                                };
                            } else {
                                return {
                                    ...t,
                                    assignedCategory: 9999, // default
                                };
                            }

                        });
                }

                this.transactionSrvc.resettransactions(this.transactionsValue).then(() => {
                    console.log('Transactions reset');
                    this.updateCategoryActuals();
                    resolve_transaction_promise(this.transactionsValue);
                });
            });
        });

        return transaction_promise as Promise<Transaction[]>;
    }

    updateCategoryActuals() {
        // reset actuals
        this.categories = this.categories.map((c) => {
            const category = c as Category;
            category.actual = 0;

            return category;
        });

        // Update Category totals
        this.categories = this.categories.map((c) => {
            const category = c as Category;
            const categoryTransactions = this.transactionsValue.filter(t => category.id === t.assignedCategory);

            categoryTransactions.forEach(t => {
                category.actual = -(t.amount) + category.actual;
            });

            return category;
        });

        // Update chartData
        const labels = this.categories.map((c) => {
            return c.name;
        });

        const series1 = this.categories.map((c) => {
            return c.projection;
        });

        const series2 = this.categories.map((c) => {
            return c.actual;
        });

        this.chartData  = {
            labels: labels,
            dataset_labels: {
                series1_label: 'Projected',
                series2_label: 'Actual',
            },
            datasets: {
                series1: series1,
                series2: series2,
            }
        };
    }

    doUpdateData() {
        this.fetchData();
    }

    doUpdateCategories(e) {
        this.categories = e;
    }

}
