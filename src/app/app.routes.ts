import { Routes } from '@angular/router';
import { CustomersComponent } from './component/customers/customers.component';
import { TransactionComponent } from './component/transaction/transaction.component';
import { ChartsComponent } from './component/charts/charts.component';

export const routes: Routes = [
    {path: '', redirectTo: 'customers', pathMatch: 'full'},
    {path: 'customers', component: CustomersComponent},
    {path: 'customers', component: CustomersComponent},
    {path: 'transaction', component: TransactionComponent},
    {path: 'chart', component: ChartsComponent},
];
