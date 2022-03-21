import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-view-event',
  templateUrl: './view-event.component.html',
  styleUrls: ['./view-event.component.scss']
})
export class ViewEventComponent implements OnInit {
 
EventDataForm:FormGroup;

  constructor(
    private fb:FormBuilder
  ) { }
  get f() {
    return this.EventDataForm.controls;
  }

  ngOnInit(): void {
    this.EventDataForm = this.fb.group({
      title:['',[Validators.required]],
      description:['',[Validators.required]],
      remark:['',[Validators.required]],
      amount:['',[Validators.required]],
      isActive:['',[Validators.required]],
// ----------------------
    },
  {
       couponCode:['',[Validators.required]],
       discountPercentage:['',[Validators.required]],
       validFrom:['',[Validators.required]],
       validTo:['',[Validators.required]],
       minDiscountAmount:['',[Validators.required]],
       maxDiscountAmount:['',[Validators.required]],
       isValid:['',[Validators.required]],
      

    })
  }

  onSubmit(){

  }

  Customizer(){

  }

}
