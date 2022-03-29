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
  public Ticket: any = [];

  public id: string;
  // couponData = new couponData()
  // dataArray=[];
  view = new view()
  Event :any;


 
  requestID:any;
  ticketForm: FormGroup;
  couponForm: FormGroup;
  coupon: any;
  colTicket:any;
  requestId: any;
  row: any;
  prop = [];
  public customizer: string = '';
  public screenwidth: any = window.innerWidth;
  

  ticket=[
    new Title(this.view)
    

  
  ];

  columns = [
    { name: 'Title', prop: 'title' },
    { name: 'Description', prop: 'description' },
    { name: 'Remark', prop: 'remark' },
    { name: 'Amount', prop: 'amount' },
    { name: 'Seating Capacity', prop: 'seatingCapacity' },
    { name: 'is Active', prop: 'isActive' },
    { name: 'Action', prop: 'action' }
  ]

  coupons = [
    { name: 'Coupon Code', prop: 'couponCode' },
    { name: 'Discount', prop: 'discountPercentage' },
    { name: 'Valid Form', prop: 'validFrom' },
    { name: 'Valid To', prop: 'validTo' },
    { name: 'Min Booking Amount', prop: 'minDiscountAmount' },
    { name: 'Max Discoount Amount', prop: 'maxDiscountAmount' },
    { name: 'Is valid', prop: 'isValid' },
    { name: 'Action', prop: 'action' }

  ]
  Eticket: any;
  editCouponInfo: any;
  eventCoupon: any;



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
 @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.screenwidth = event.target.innerWidth;
  }

 

  getData(requestId){
    debugger
    // this.getTicket();

    this.http.get(`${environment.api}/events/${requestId}`)
    .subscribe((res: any) => {
      this.view = res;
    })
         
  }
  get f() {
    return this.ticketForm.controls;
  }


  ngOnInit(): void {
    this.getTicket();
    this.getCoupon();
    
    // this.getCoupon()
    // this.dataArray.push(this.couponData);
    this.ticketForm = this.fb.group({
      title: ['',[Validators.required]],
      description: [''],
      remark: [''],
      amount: ['',[Validators.required]],
      seatingCapacity: ['',[Validators.required]],
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
  Customizer(val) {
    this.customizer = val;
  
  }
  getToken(): string {
    return localStorage.getItem('token')
  }


 
  
  // ------------------ticket-----------

  edit(val) {
    this.customizer = val;
  
  }

  ticketSubmit() {

  }
 getTicket(){
  // this.getData(this.requestId);
   return this.http.get(`${environment.api}/events/${this.requestId}/EventTicket`).subscribe((res:any)=>{
     this.Ticket = res;
    // this.getData;
  });
}

 submitTicket(){
   debugger
   this.http.patch(`${environment.api}/events/${this.requestId}/EventTicket`,this.ticketForm.value).subscribe((res:any)=>{
     alert('data successfully add');
    this.getTicket();
    this.ticketForm.reset();
   });
   
 }

 deleteTicket(id:string){
   debugger
   this.http.delete(`${environment.api}/events/${this.requestId}/EventTicket/${id}`)
   .subscribe((res:any)=>{
     alert('data successfully delete');
     this.getTicket();
    
   });
 }

// ------------Coupon--------------

couponSubmit(){
    
}

getCoupon(){
  return this.http.get(`${environment.api}/events/${this.requestId}/Coupon`).subscribe((res:any)=>{
    this.Events = res;
  });
}

updateCoupon(id){

  this.http.patch(`${environment.api}/events/${this.requestId}/Coupon/${id}`,
  this.editCouponInfo,
  
  this.couponForm.value)
  .subscribe((res:any)=>{
    alert('data successfully update');
    this.getCoupon();
    this.couponForm.reset();
  })

}

submitCoupon(id){
  debugger
  // if(this.editCouponInfo){
  //   this.updateCoupon(id)
  //   return
  // }
  this.http.patch(`${environment.api}/events/${this.requestId}/Coupon`,this.couponForm.value).subscribe((res:any)=>{
    alert('data successfully add');
   this.getCoupon();
   this.couponForm.reset();
  });
}

deleteCoupon(id){
  this.http.delete(`${environment.api}/events/${this.requestId}/Coupon/${id}`)
  .subscribe((res:any)=>{
    alert('data successFully delete');
    this.getCoupon();
  });
}

// editCoupon(eventCoupon:any){
//   debugger
//   this.editCouponInfo = this.couponForm.value
//   this.couponForm = eventCoupon;
//   this.eventCoupon.patchValue({
//     couponCode:eventCoupon. couponCode,
//     discountPercentage:eventCoupon. discountPercentage,
//     validFrom:eventCoupon. validFrom,
//     validTo:eventCoupon. validTo,
//     minDiscountAmount:eventCoupon. minDiscountAmount,
//     isValid:eventCoupon. isValid,

//   });
// }
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

