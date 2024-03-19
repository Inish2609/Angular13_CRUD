import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddProductComponent } from './add-product/add-product.component';
import { ApiService } from './services/api.service';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatSort, MatSortModule} from '@angular/material/sort';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Angular_CRUD_With_JSON_Server_And_Material_UI';

  displayedColumns: string[] = ['productName', 'category', 'comment', 'freshness','date','price','action'];
  dataSource: any; 

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private dialog:MatDialog,private api:ApiService){}
  ngOnInit(): void {
    this.getAllProduct()
  }
  openDialog(): void {
    this.dialog.open(AddProductComponent, {
      width: '600px',
    }).afterClosed().subscribe(val=>{
      if(val === 'save'){
        this.getAllProduct()
      }
    })
  }

  getAllProduct(){
    return this.api.getProduct().subscribe({
      next:(res)=>{
        this.dataSource = res
        this.dataSource.paginator = this.paginator
        this.dataSource.sort = this.sort
      },
      error:()=>{
        alert("Somethink Went Wrong")
      }
    })
  }

  editProduct(row:any){
    this.dialog.open(AddProductComponent , {
      width:'600px',
      data:row
    }).afterClosed().subscribe(val=>{
      if(val === 'update'){
        this.getAllProduct()
      }
    })
  }

  deleteProduct(id:number){
    this.api.deleteProduct(id).subscribe({
      next:(res)=>{
        alert("Product Deleted Successfully")
        this.getAllProduct()
      },
      error:()=>{
        alert("Somethink Went Wrong")
      }
    })
  }

}
