import { NumberValueAccessor } from "@angular/forms";

export interface Transaction {
    id:number;
    customerId:number;
    date:string;
    amount:number
}
