import { Injectable } from '@angular/core';
import { LocalStorage, JSONSchema } from '@ngx-pwa/local-storage';
import { Category } from '../models/category';

const CATEGORY_DATA: Category[] = [
    { id: 1, name: 'Rent', projection: 1400, actual: 0 },
    { id: 2, name: 'Electricity', projection: 55, actual: 0 },
    { id: 3, name: 'Water', projection: 0, actual: 0 },
    { id: 4, name: 'Cell Phone', projection: 100, actual: 0 },
    { id: 5, name: 'Internet', projection: 25, actual: 0 },
    { id: 6, name: 'Auto/Renters Insurance', projection: 317, actual: 0 },
    { id: 7, name: 'Credit Installment', projection: 200, actual: 0 },
    { id: 8, name: 'Hulu', projection: 7.99, actual: 0 },
    { id: 9, name: 'Spotify', projection: 0, actual: 0 },
    { id: 10, name: 'Web Hosting', projection: 9.62, actual: 0 },
    { id: 11, name: 'Car payment', projection: 413.00, actual: 0 },
    { id: 12, name: 'Gas', projection: 150, actual: 0 },
    { id: 13, name: 'Groceries', projection: 250, actual: 0 },
    { id: 14, name: 'Fastfood', projection: 200, actual: 0 },
    { id: 15, name: 'Clothing', projection: 0, actual: 0 },
    { id: 16, name: 'Auto Expenses Repairs', projection: 100, actual: 0 },
    { id: 17, name: 'Uber', projection: 20, actual: 0 },
    { id: 18, name: 'Entertainment', projection: 200, actual: 0 },
    { id: 19, name: 'Cash Withdrawals', projection: 0, actual: 0 },
    { id: 20, name: 'Parking', projection: 0, actual: 0 },
    { id: 21, name: 'Paypal', projection: 0, actual: 0 },
    { id: 22, name: 'Misc', projection: 200, actual: 0 },
    { id: 23, name: 'Savings', projection: 0, actual: 0 },
    { id: 24, name: 'Investments', projection: 0, actual: 0 },
    { id: 25, name: 'Gym Membership', projection: 70, actual: 0 },
    { id: 26, name: 'Uber Eats', projection: 0, actual: 0 },
    { id: 27, name: 'Haircut', projection: 70, actual: 0},
    { id: 28, name: 'Amazon Prime', projection: 14, actual: 0},
];


@Injectable({
    providedIn: 'root'
})
export class CategoryService {

    storageKey = 'categories';
    constructor(private localStorage: LocalStorage) { }

    async getCategories() {
        const response = await new Promise((resolve, reject) => {
            this.localStorage.getItem(this.storageKey).subscribe(
                (categories) => {
                    resolve(categories as Category[]);
                });
        });

        return response as Category[];
    }

    async getCategory(id: number) {
        const response = await new Promise((resolve, reject) => {
            this.getCategories().then(
                (categories) => {
                    resolve(categories[id]);
                });
        });

        return response as Category;
    }

    async addCategory(category: Category) {
        const response = await new Promise((resolve, reject) => {
            this.getCategories()
                .then(
                    (categories) => {
                        categories = categories.concat({
                            ...category,
                            id: Math.max(...categories.map((c) => c.id), 0) + 1,
                        });

                        return categories;
                    })
                .then((categories) => {
                    this.localStorage.setItem(this.storageKey, categories).subscribe(
                        () => {
                            resolve(categories);
                        });
                });
        });

        return response;
    }

    async updateCategory(category: Category) {
        const response = await new Promise((resolve, reject) => {
            this.getCategories()
                .then(
                    (categories) => {
                        const newCategories = categories.concat();
                        const index = newCategories.findIndex(c => c.id === category.id);
                        newCategories[index] = category;
                        categories = newCategories;

                        return categories;
                    })
                .then((categories) => {
                    this.localStorage.setItem(this.storageKey, categories).subscribe(
                        () => {
                            resolve(categories);
                        });
                });
        });

        return response;
    }

    async deleteCategory(id: number) {
        const response = await new Promise((resolve, reject) => {
            this.getCategories()
                .then(
                    (categories) => {
                        categories = categories.filter(c => c.id !== id);
                        return categories;
                    })
                .then((categories) => {
                    this.localStorage.removeItem(this.storageKey).subscribe(
                        () => {
                            resolve(categories);
                        });
                });
        });

        return response;
    }

    async resetCategories() {
        const response = await new Promise((resolve, reject) => {
            const newCategories = CATEGORY_DATA;

            this.localStorage.setItem(this.storageKey, newCategories).subscribe(() => {
                resolve(newCategories);
            });
        });

        return response;
    }

    async resetStorage() {
        const response = await new Promise((resolve, reject) => {
            this.localStorage.clear().subscribe(() => {
                resolve();
            });
        });

        return response;
    }
}
