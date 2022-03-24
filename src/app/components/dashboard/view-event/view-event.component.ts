import { HttpClient } from '@angular/common/http';
import { Component, HostListener, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { id } from '@swimlane/ngx-datatable';
import { LayoutService } from 'src/app/shared/services/layout.service';
import { environment } from 'src/environments/environment';



@Component({
  selector: 'app-view-event',
  templateUrl: './view-event.component.html',
  styleUrls: ['./view-event.component.scss']
})
export class ViewEventComponent implements OnInit {
  public Events: any = [];
  public id: string;
  // couponData = new couponData()
  // dataArray=[];
  view = new view()
  Event :any
  Ticket:any;
  requestID:any;
  ticketForm: FormGroup;
  couponForm: FormGroup;
  coupon: any;
  requestId: any;
  row: any;
  prop = [];
  public customizer: string = '';
  

  ticket=[
    new Title(this.view)
    

  
  ];

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

  coupons = [
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
  Eticket: any;



  constructor(
    private fb: FormBuilder,
    private routes: ActivatedRoute,
    private http:HttpClient
  ) 
  {
    this.requestId = this.routes.snapshot.paramMap.get('id');
    if (this.requestId) {
      this.getData(this.requestId);
    
    }
  }

  get f() {
    return this.ticketForm.controls;
  }

  getData(requestId){
    debugger
    this.http.get(`${environment.api}/events/${requestId}`)
    .subscribe((res: any) => {
      this.view = res;
    })
         
  }


  ngOnInit(): void {
    this.getTicket;
    
    // this.getCoupon()
    // this.dataArray.push(this.couponData);
    this.ticketForm = this.fb.group({
      title: [''],
      description: [''],
      remark: [''],
      amount: [''],
      seatingCapacity: [''],
      isActive: [''],

    });

    this.couponForm = this.fb.group({
      couponCode:[''],
      discountPercentage:[''],
      validFrom:[''],
      validTo:[''],
      minDiscountAmount:[''],
      maxDiscountAmount:[''],
      isValid:['']
    })
  }

  

  ticketSubmit() {

  }
  couponSubmit() {

  }

  
  addCoupon(){

  }
  // ------------------ticket-----------

 getTicket(id:string){
  // this.getData;

  this.http.get(`${environment.api}/events/${id}/EventTicket`).subscribe((res:any)=>{
    this.Ticket =res;
    this.getData;
  });
     
 }

 submitTicket(id:string){
   debugger
   this.http.patch(`${environment.api}/events/${id}/EventTicket`,this.Ticket).subscribe((res:any)=>{
     alert('data successfully add');
    this.getTicket(id);
   })
 }

 Customizer(val) {
  this.customizer = val;

}
}
// export class couponData{
//   couponCode:string;
//   discountPercentage:string;
//   validFrom:string;
//   validTo:string;
//   validTolist:[];
//   minDiscountAmount:string;
//   maxDiscountAmount:string;
//   isValid:string;
//   action:any;
// }

  export class view{
    title:string;
    description:string;
    bookingStartDateTime:string;
    bookingEndDateTime:string;
    eventFrom:string;
    eventTo:string;
    shortAddress:string;
    baseUrl:string;
  }

