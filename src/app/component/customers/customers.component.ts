import { Component } from '@angular/core';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { HttpService } from '../../http.service';
import { Data } from '../../data';

@Component({
  selector: 'app-customers',
  standalone: true,
  imports: [ MatTableModule, MatFormFieldModule, MatInputModule],
  templateUrl: './customers.component.html',
  styleUrl: './customers.component.css'
})
export class CustomersComponent {
  constructor (private http:HttpService){
    this.http.getCustomers().subscribe((data)=>{
      this.customersList = data;
      this._dataSource = new MatTableDataSource<Data>(this.customersList);
    })
  }
  displayedColumns: string[] = [ 'id', 'name'];
  customersList:Data[]=[]
  _dataSource:any
  public get dataSource() {
    return this._dataSource;
    
  }
  public set dataSource(value) {
    this._dataSource = value;
  }
      

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
