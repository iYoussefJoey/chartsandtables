import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../http.service';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { Transaction } from '../../transaction';

@Component({
  selector: 'app-transaction',
  standalone: true,
  imports: [MatTableModule,MatInputModule],
  templateUrl: './transaction.component.html',
  styleUrl: './transaction.component.css'
})
export class TransactionComponent implements OnInit {
    displayedColumns: string[] = [ 'id', 'amount', 'date', 'customerId'];
  customersList:Transaction[]=[]
  _dataSource!: MatTableDataSource<Transaction>;
  public get dataSource() {
    return this._dataSource;
    
  }
  public set dataSource(value) {
    this._dataSource = value;
  }
  
  constructor (private http:HttpService){
    this.http.getTransactions().subscribe((data)=>{
      this.customersList = data;
      this._dataSource = new MatTableDataSource<Transaction>(this.customersList);
      this._dataSource.filterPredicate = (data: Transaction, filter: string) => {
        const filterValue = Number(filter); // Convert filter to number
        return data.id == filterValue;
      };
    });
  }

  ngOnInit() {
  
    }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this._dataSource.filter = filterValue.trim(); // Apply filter to the existing data source
  }
}
