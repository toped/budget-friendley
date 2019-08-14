import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Category } from '../../models/category';
import { FormBuilder, FormGroup } from '@angular/forms';

export interface DialogData {
    formTitle: string;
    category: string;
    options: [];
}


const CATEGORY_OPTIONS: Category[] = [
    { id: 1, name: 'Rent', projection: 0, actual: 0 },
    { id: 2, name: 'Electricity', projection: 0, actual: 0 },
    { id: 3, name: 'Water', projection: 0, actual: 0 },
    { id: 4, name: 'Cell Phone', projection: 0, actual: 0 },
    { id: 5, name: 'Internet', projection: 0, actual: 0 },
    { id: 6, name: 'Auto Insurance', projection: 0, actual: 0 },
    { id: 7, name: 'Credit Installment', projection: 0, actual: 0 },
    { id: 8, name: 'Hulu', projection: 0, actual: 0 },
    { id: 9, name: 'Spotify', projection: 0, actual: 0 },
    { id: 10, name: 'Web Hosting', projection: 0, actual: 0 },
    { id: 11, name: 'Car payment', projection: 0, actual: 0 },
    { id: 12, name: 'Gas', projection: 0, actual: 0 },
    { id: 13, name: 'Groceries', projection: 0, actual: 0 },
    { id: 14, name: 'Fastfood', projection: 0, actual: 0 },
    { id: 15, name: 'Clothing', projection: 0, actual: 0 },
    { id: 16, name: 'Auto Expenses Repairs', projection: 0, actual: 0 },
    { id: 17, name: 'Uber', projection: 0, actual: 0 },
    { id: 18, name: 'Entertainment', projection: 0, actual: 0 },
    { id: 19, name: 'Cash Withdrawals', projection: 0, actual: 0 },
    { id: 20, name: 'Parking', projection: 0, actual: 0 },
    { id: 21, name: 'Paypal', projection: 0, actual: 0 },
    { id: 22, name: 'Misc', projection: 0, actual: 0 },
    { id: 23, name: 'Savings', projection: 0, actual: 0 },
    { id: 24, name: 'Investments', projection: 0, actual: 0 },
    { id: 25, name: 'Crossfit', projection: 0, actual: 0 },
    { id: 26, name: 'Uber Eats', projection: 0, actual: 0 },
    { id: 27, name: 'Haircut', projection: 0, actual: 0},
    { id: 28, name: 'Amazon Prime', projection: 14, actual: 0},
];


@Component({
    selector: 'app-dialog',
    templateUrl: './dialog.component.html',
    styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {

    categoryForm: FormGroup;
    categories: Category[] = CATEGORY_OPTIONS;

    constructor(
        public dialogRef: MatDialogRef<DialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: DialogData,
        private fb: FormBuilder) { }

    ngOnInit() {
        this.categoryForm = this.fb.group({
            category: ['']
        });
    }

    onNoClick(): void {
        this.dialogRef.close();
    }

    didSelectCategory() {
        console.log('category selected');
        this.dialogRef.close(this.categoryForm.get('category').value);
    }

}
