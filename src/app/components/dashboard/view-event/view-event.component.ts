import { Component, HostListener, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LayoutService } from 'src/app/shared/services/layout.service';



@Component({
  selector: 'app-view-event',
  templateUrl: './view-event.component.html',
  styleUrls: ['./view-event.component.scss']
})
export class ViewEventComponent implements OnInit {
  public Events = [];
  couponData = new couponData()
  dataArray=[];

EventDataForm:FormGroup;
couponForm:FormGroup;

row: any;
  prop = [];

  columns = [
    { name: 'Title', prop: 'title' },
    { name: 'Description', prop: 'description' },
    { name: 'Remark', prop: 'remark' },
    { name: 'Amount', prop: 'amount' },
    { name: 'Seating Capacity', prop: 'amount' },
    { name: 'Event To', prop: 'seatingCapacity' },
    { name: 'is Active', prop: 'isActive' },
    { name: 'Action', prop: 'action' }
  ]

  coupon = [
    { name: 'Coupon Code', prop: 'couponCode' },
    { name: 'Discount', prop: 'discountPercentage' },
    { name: 'Valid Form', prop: 'validFrom' },
    { name: 'Valid To', prop: 'validTo' },
    { name: 'Amount', prop: 'minDiscountAmount' },
    { name: 'Min Booking Amount', prop: 'maxDiscountAmount' },
    { name: 'Max Discoount Amount', prop: 'maxDiscountAmount' },
    { name: 'Is valid', prop: 'isValid' },
    { name: 'Action', prop: 'action' }

  ]


 
  constructor(
    private fb:FormBuilder,
  
    // public layout:LayoutService
    ) { }
  get f() {
    return this.EventDataForm.controls;
  }



  ngOnInit(): void {
    this.dataArray.push(this.couponData);
    this.EventDataForm = this.fb.group({
      title: [''],
      description: [''],
      remark: [''],
      amount: [''],
      seatingCapacity: [''],
      isActive: [''],
      
    }
    )
  }

  addCoupon(){
    this.couponData = new couponData()
    this.dataArray.push(this.couponData);
  }

  onSubmit(){

  }
  submit(){

  }




}

export class couponData{
  couponCode:string;
  discountPercentage:string;
  validFrom:string;
  validTo:string;
  minDiscountAmount:string;
  maxDiscountAmount:string;
  isValid:string;
  action:any;
}


