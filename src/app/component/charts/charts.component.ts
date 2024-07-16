import { Component, OnInit } from '@angular/core';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { HttpService } from '../../http.service';
import { Color, ScaleType } from '@swimlane/ngx-charts';
import { Transaction } from '../../transaction';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {provideNativeDateAdapter} from '@angular/material/core';
import { FormsModule } from '@angular/forms';


@Component({
  
  selector: 'app-charts',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [NgxChartsModule,MatFormFieldModule, MatInputModule, MatDatepickerModule,FormsModule],
  templateUrl: './charts.component.html',
  styleUrl: './charts.component.css',





})
export class ChartsComponent implements OnInit {
  view: [number, number] = [700, 400];
  showLegend = true;
  showXAxis = true;
  showYAxis = true;
  showXAxisLabel = true;
  showYAxisLabel = true;
  xAxisLabel = 'Customer ID';
  yAxisLabel = 'Amount';
  gradient = false;

  filterDate: string = ''; // Variable to store the selected date

  colorScheme: Color = {
    name: 'cool',
    selectable: true,
    group: ScaleType.Time,
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA' , '#5AA4d4']
  };

  data: { name: string; value: number }[] = [];
  transactions: Transaction[] = []; // Store all transactions

  constructor(private http: HttpService) { }

  ngOnInit() {
    this.http.getTransactions().subscribe((transactions: Transaction[]) => {
      this.transactions = transactions; // Store the fetched transactions
    });
  }

  filterTransactions() {
    if (!this.filterDate) {
      return;
    }

    const targetDate = new Date(this.filterDate);

    // Filter transactions by the selected date
    const filteredTransactions = this.transactions.filter(transaction => {
      const transactionDate = new Date(transaction.date);
      return transactionDate.toDateString() === targetDate.toDateString();
    });

    // Create a map to store the sum of amounts for each customer
    const customerAmounts = new Map<string, number>();

    filteredTransactions.forEach(transaction => {
      if (customerAmounts.has(transaction.customerId.toString())) {
        customerAmounts.set(transaction.customerId.toString(), customerAmounts.get(transaction.customerId.toString())! + transaction.amount);
      } else {
        customerAmounts.set(transaction.customerId.toString(), transaction.amount);
      }
    });

    // Convert the map to the data array required by ngx-charts
    this.data = Array.from(customerAmounts, ([name, value]) => ({ name, value }));
  }

  onSelect(event: Event) {
    console.log(event);
    console.log(this.data);
  }
}