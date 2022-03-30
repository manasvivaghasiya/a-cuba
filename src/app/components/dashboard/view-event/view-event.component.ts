import { HttpClient } from '@angular/common/http';
import { ThisReceiver, ThrowStmt } from '@angular/compiler';
import { ChangeDetectorRef, Component, HostListener, OnInit } from '@angular/core';
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
  public customizer: string = '';
  public screenwidth: any = window.innerWidth;
  public id: string;

  view = new view()
  Event :any;


  Eticket: any;
  editCouponInfo: any;
  eventCoupon: any;
  editInfo: any;
  data: any;
  currentUserId: any;
  ticketID: any;
  couponId: any;

  requestID:any;
  ticketForm: FormGroup;
  couponForm: FormGroup;
  coupon: any;
  colTicket:any;
  requestId: any;
  row: any;
  prop = [];

  

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
 
  

  constructor(
    private fb: FormBuilder,
    private routes: ActivatedRoute,
    private http:HttpClient,
    private changeDetector : ChangeDetectorRef
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

  get ff(){
    return this.couponForm.controls;

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
      couponCode:['',[Validators.required]],
      discountPercentage:['',[Validators.required]],
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



  ticketSubmit() {

  }
 getTicket(){
  // this.getData(this.requestId);
   return this.http.get(`${environment.api}/events/${this.requestId}/EventTicket`).subscribe((res:any)=>{
     this.Ticket = res;
     this.changeDetector.detectChanges();
    // this.getData;
  });
}

edit(val,data) {
 
  this.customizer = val;
  // this.ticketForm = data;
  // this.data= this.editInfo;
  // this.editInfo= data;
  this.ticketID= data.id;

  this.ticketForm.get('title').setValue(data.title);
  this.ticketForm.get('description').setValue(data.description);
  this.ticketForm.get('remark').setValue(data.remark);
  this.ticketForm.get('amount').setValue(data.amount);
  this.ticketForm.get('seatingCapacity').setValue(data.seatingCapacity);
  this.ticketForm.get('isActive').setValue(data.isActive);
}

updateTicket(id){
  debugger

  const data = 
    {
      title:this.ticketForm.value.title,
      description:this.ticketForm.value.description,
      remark:this.ticketForm.value.remark,
      amount:this.ticketForm.value.amount,
      seatingCapacity:this.ticketForm.value.seatingCapacity.toString(),
      isActive:this.ticketForm.value.isActive
    
  }
  this.ticketForm.value.seatingCapacity = this.ticketForm.value.seatingCapacity.toString();
  this.http.patch(`${environment.api}/events/${this.requestId}/EventTicket/${id}`,
  data)
  .subscribe((res:any)=>{
    alert('data successfully update');
    this.ticketForm.reset();

    this.getTicket();
  })
}

// if(this.currentUserId){
//   this.updateTicket(this.currentUserId);
//   return
// }
 submitTicket(){
   debugger
  if(this.ticketID){
   this.updateTicket(this.ticketID);
  //  this.ticketForm = this.ticketID;

  return
}

   this.ticketForm.value.seatingCapacity = this.ticketForm.value.seatingCapacity.toString();
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

  const data ={
    couponCode: this.couponForm.value.couponCode,
    discountPercentage: this.couponForm.value.discountPercentage,
    validFrom: this.couponForm.value.validFrom,
    validTo: this.couponForm.value.validTo,
    minDiscountAmount: this.couponForm.value.minDiscountAmount,
    maxDiscountAmount:this.couponForm.value.maxDiscountAmount,
    isValid:this.couponForm.value.isValid
  }

  this.http.patch(`${environment.api}/events/${this.requestId}/Coupon/${id}`,
  data)
  .subscribe((res:any)=>{
    alert('data successfully update');
    this.getCoupon();
    this.couponForm.reset();
  })

}

submitCoupon(){
  debugger
  if(  this.couponId){
    this.updateCoupon(this.couponId)
    return
  }
  this.http.patch(`${environment.api}/events/${this.requestId}/Coupon`,this.couponForm.value).subscribe((res:any)=>{
    alert('data successfully add');
   this.getCoupon();
   this.couponForm.reset();
  });
}

deleteCoupon(id){
  debugger
  this.http.delete(`${environment.api}/events/${this.requestId}/Coupon/${id}`)
  .subscribe((res:any)=>{
    alert('data successFully delete');
    this.getCoupon();
  });
}



editCoupon(data){
  debugger
  // this.customizer = val;
  this.couponId= data.id;

  this.couponForm.get ('couponCode').setValue(data.couponCode);
  this.couponForm.get ('discountPercentage').setValue(data.discountPercentage);
  this.couponForm.get ('validFrom').setValue(data.validFrom);
  this.couponForm.get ('validTo').setValue(data.validTo);
  this.couponForm.get ('minDiscountAmount').setValue(data.minDiscountAmount);
  this.couponForm.get ('maxDiscountAmount').setValue(data.maxDiscountAmount);
  this.couponForm.get ('isValid').setValue(data.isValid);
  // this.couponForm.get ('action').setValue(data.action);



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

