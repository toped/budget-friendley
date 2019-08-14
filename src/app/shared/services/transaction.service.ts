import { Injectable } from '@angular/core';
import { LocalStorage, JSONSchema } from '@ngx-pwa/local-storage';
import { Transaction } from '../models/transaction';

@Injectable({
    providedIn: 'root'
})
export class TransactionService {

    storageKey = 'transactions';
    constructor(private localStorage: LocalStorage) { }

    async getTransactions() {
        const response = await new Promise((resolve, reject) => {
            this.localStorage.getItem(this.storageKey).subscribe(
                (transactions) => {
                    resolve(transactions as Transaction[]);
                });
        });

        return response as Transaction[];
    }

    async getTransaction(id: number) {
        const response = await new Promise((resolve, reject) => {
            this.getTransactions().then(
                (transactions) => {
                    resolve(transactions[id]);
                });
        });

        return response as Transaction;
    }

    async addTransaction(transaction: Transaction) {
        const response = await new Promise((resolve, reject) => {
            this.getTransactions()
                .then(
                    (transactions) => {
                        transactions = transactions.concat({
                            ...transaction,
                            id: Math.max(...transactions.map((c) => c.id), 0) + 1,
                        });

                        return transactions;
                    })
                .then((transactions) => {
                    this.localStorage.setItem(this.storageKey, transactions).subscribe(
                        () => {
                            resolve(transactions);
                        });
                });
        });

        return response;
    }

    async updateTransaction(transaction: Transaction) {
        const response = await new Promise((resolve, reject) => {
            this.getTransactions()
                .then(
                    (transactions) => {
                        const newtransactions = transactions.concat();
                        const index = newtransactions.findIndex(c => c.id === transaction.id);
                        newtransactions[index] = transaction;
                        transactions = newtransactions;

                        return transactions;
                    })
                .then((transactions) => {
                    this.localStorage.setItem(this.storageKey, transactions).subscribe(
                        () => {
                            resolve(transactions);
                        });
                });
        });

        return response;
    }

    async deleteTransaction(id: number) {
        const response = await new Promise((resolve, reject) => {
            this.getTransactions()
                .then(
                    (transactions) => {
                        transactions = transactions.filter(c => c.id !== id);
                        return transactions;
                    })
                .then((transactions) => {
                    this.localStorage.removeItem(this.storageKey).subscribe(
                        () => {
                            resolve(transactions);
                        });
                });
        });

        return response;
    }

    async resettransactions(transactions: Transaction[]) {
        const response = await new Promise((resolve, reject) => {
            this.localStorage.setItem(this.storageKey, transactions).subscribe(() => {
                resolve(transactions);
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
