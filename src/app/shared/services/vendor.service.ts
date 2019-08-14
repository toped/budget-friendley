import { Injectable } from '@angular/core';
import { LocalStorage, JSONSchema } from '@ngx-pwa/local-storage';
import { Vendor } from '../models/vendor';

@Injectable({
    providedIn: 'root'
})
export class VendorService {

    storageKey = 'vendors';
    constructor(private localStorage: LocalStorage) { }

    async getVendors() {
        const response = await new Promise((resolve, reject) => {
            this.localStorage.getItem(this.storageKey).subscribe(
                (vendors) => {
                    resolve(vendors as Vendor[]);
                });
        });

        return response as Vendor[];
    }

    async getVendor(id: number) {
        const response = await new Promise((resolve, reject) => {
            this.getVendors().then(
                (vendors) => {
                    resolve(vendors[id]);
                });
        });

        return response as Vendor;
    }

    async addVendor(vendor: Vendor) {
        const response = await new Promise((resolve, reject) => {
            this.getVendors()
                .then(
                    (vendors) => {
                        vendors = vendors.concat({
                            ...vendor,
                            id: Math.max(...vendors.map((c) => c.id), 0) + 1,
                        });

                        return vendors;
                    })
                .then((vendors) => {
                    this.localStorage.setItem(this.storageKey, vendors).subscribe(
                        () => {
                            resolve(vendors);
                        });
                });
        });

        return response;
    }

    async updateVendor(vendor: Vendor) {
        const response = await new Promise((resolve, reject) => {
            this.getVendors()
                .then(
                    (vendors) => {
                        const newVendors = vendors.concat();
                        const index = newVendors.findIndex(c => c.id === vendor.id);
                        newVendors[index] = vendor;
                        vendors = newVendors;

                        return vendors;
                    })
                .then((vendors) => {
                    this.localStorage.setItem(this.storageKey, vendors).subscribe(
                        () => {
                            resolve(vendors);
                        });
                });
        });

        return response;
    }

    async deleteVendors(id: number) {
        const response = await new Promise((resolve, reject) => {
            this.getVendors()
                .then(
                    (vendors) => {
                        vendors = vendors.filter(c => c.id !== id);
                        return vendors;
                    })
                .then((vendors) => {
                    this.localStorage.removeItem(this.storageKey).subscribe(
                        () => {
                            resolve(vendors);
                        });
                });
        });

        return response;
    }

    async resetVendors() {
        const response = await new Promise((resolve, reject) => {
            const newVendors: Vendor[] = [];

            this.localStorage.setItem(this.storageKey, newVendors).subscribe(() => {
                resolve(newVendors);
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
