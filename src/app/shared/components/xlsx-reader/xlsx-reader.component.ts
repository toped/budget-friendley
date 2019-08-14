import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Transaction } from '../../models/transaction';
import * as XLSX from 'xlsx';

@Component({
    selector: 'app-xlsx-reader',
    templateUrl: './xlsx-reader.component.html',
    styleUrls: ['./xlsx-reader.component.scss']
})
export class XlsxReaderComponent implements OnInit {

    file: any;

    @Output()
    handleFile = new EventEmitter<any>();


    constructor() { }

    ngOnInit() {
    }

    fileChanged(e) {
        /* wire up file reader */
        const target: DataTransfer = <DataTransfer>(e.target);
        if (target.files.length !== 1) { throw new Error('Cannot use multiple files'); }
        const reader: FileReader = new FileReader();

        reader.onload = (e: any) => {
            /* read workbook */
            const bstr: string = e.target.result;
            const wb: XLSX.WorkBook = XLSX.read(bstr, { type: 'binary', cellDates: true });

            /* grab first sheet */
            const wsname: string = wb.SheetNames[0];
            const ws: XLSX.WorkSheet = wb.Sheets[wsname];

            /* save data */
            this.file = XLSX.utils.sheet_to_json(ws, { header: 1 });

            // console.log(XLSX.utils.sheet_to_json(ws, { header: 1 }));

            // console.log(this.file);

            this.doHandleFile(this.file);

        };

        reader.readAsBinaryString(target.files[0]);
    }

    doHandleFile(file: any) {
        this.handleFile.emit(file);
    }
}
