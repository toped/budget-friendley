export interface Transaction {
    id?: number;
    transactionDate: Date;
    postDate: Date;
    desc: string;
    category: string;
    assignedCategory: number;
    type: string;
    amount: number;
}
