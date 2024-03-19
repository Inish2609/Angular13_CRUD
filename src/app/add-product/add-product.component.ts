import { Component, Inject, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { MatDialogRef } from '@angular/material/dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent implements OnInit {

  constructor(private formBuilder:FormBuilder,private api:ApiService,private dialogref:MatDialogRef<AddProductComponent>,@Inject(MAT_DIALOG_DATA) public editData:any) { }
  Freshness = ["New","Old"]
  productForm !: FormGroup

  actionButton = "Save"

  ngOnInit(): void {
    this.productForm = this.formBuilder.group({
      productName:['',Validators.required],
      category:['',Validators.required],
      freshness:['',Validators.required],
      price:['',Validators.required],
      comment:['',Validators.required],
      date:['',Validators.required]
    })

    if(this.editData){
      this.actionButton = "Save"
      this.productForm.controls['productName'].setValue(this.editData.productName),
      this.productForm.controls['category'].setValue(this.editData.category)
      this.productForm.controls['freshness'].setValue(this.editData.freshness)
      this.productForm.controls['price'].setValue(this.editData.price)
      this.productForm.controls['comment'].setValue(this.editData.comment)
      this.productForm.controls['date'].setValue(this.editData.date)
    }
  }

  

  addProduct(){
    if(!this.editData){
      if(this.productForm.valid){
        this.api.postProduct(this.productForm.value).subscribe({
          next:(res)=>{
            alert("Product Added Successfully")
            this.productForm.reset()
            this.dialogref.close('save')
  
          },
          error:()=>{
            alert("Error In Product Details")
          }
        })
      }
    }
    else{
      this.updateProduct()
    }
  }

  updateProduct(){
    console.log("Hello")
    this.api.putProduct(this.productForm.value,this.editData.id).subscribe({
      next:(res)=>{
        alert("updated Successfully")
        this.productForm.reset()
        this.dialogref.close('update')
      },
      error:()=>{
        alert("Somethink Went Wrong")
      }
    })
  }

}
