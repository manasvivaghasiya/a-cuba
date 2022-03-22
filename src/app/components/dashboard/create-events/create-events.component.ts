import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-create-events',
  templateUrl: './create-events.component.html',
  styleUrls: ['./create-events.component.scss']
})
export class CreateEventsComponent implements OnInit {

  banner = new banner()
  dataArray=[];
  EventDataForm: FormGroup;
  Events: any;
  Event: any;
  getEvents: any;
  requestId: any;

  constructor(private http: HttpClient,
    private router: Router,
    private routes: ActivatedRoute,
    private fb: FormBuilder) {
    debugger
    this.requestId = this.routes.snapshot.paramMap.get('id');
    if (this.requestId) {
      this.getData(this.requestId)
    }
  }

  get f() {
    return this.EventDataForm.controls;
  }

  ngOnInit(): void {
     this.dataArray.push(this.banner);

    this.EventDataForm = this.fb.group({
      baseUrl: [''],
      email: [''],
      password: [''],
      topImage: [''],
      landingImage: [''],
      title: ['', [Validators.required]],
      description: [''],
      bookingStartDateTime: ['', [Validators.required]],
      bookingEndDateTime: ['', [Validators.required]],
      organizedBy: [''],
      organizerWebsiteUrl: [''],
      supportContactNumber: [''],
      supportEmail: [''],
      isActive: [''],
      shortAddress: [''],
      fullAddress: [''],
      eventFrom: ['', [Validators.required]],
      eventTo: ['', [Validators.required]],
      paypalClientId: [''],
      primaryColor: [''],
      secondaryColor: [''],
      fontColor: [''],
      paypalClientSecret: [''],
      paypalMode: [''],
      remark: [''],
      id: ['']
    })

  }

addFile(){
  this.banner=new banner()
  this.dataArray.push(this.banner);
}

removeFile(index){
   this.dataArray.splice(index);
}

  onSubmit() {
    let _obj = JSON.parse(JSON.stringify(this.EventDataForm.value)) as any;
    _obj.bookingStartDateTime = new Date(_obj.bookingStartDateTime);
    _obj.bookingEndDateTime = new Date(_obj.bookingEndDateTime);
    _obj.eventTo = new Date(_obj.eventTo);
    _obj.eventFrom = new Date(_obj.eventFrom);
    _obj.isActive = true;
    if (this.requestId) {
      this.http.patch(`${environment.api}/events/${this.requestId}`, _obj)
        .subscribe((res: any) => {
          alert('data SuccessFully Updated');
          this.router.navigate(['/dashboard/eventList']);
        });
    }
    else {
      this.http.post(`${environment.api}/events`, _obj)
        .subscribe((res: any) => {
          alert('data SuccessFully added');
          this.router.navigate(['/dashboard/eventList']);
        });
    }
  }

  getData(requestId) {
    this.http.get(`${environment.api}/events/${requestId}`)
      .subscribe((res: any) => {
        this.Event = res;
        debugger
        console.log(this.Event)
        let startDate = new Date(this.Event.bookingStartDateTime);
        let endDate = new Date(this.Event.bookingEndDateTime);
        let fromDate = new Date(this.Event.eventFrom);
        let toDate = new Date(this.Event.eventTo);
        this.EventDataForm.get('id').setValue(this.Event.id);
        this.EventDataForm.get('title').setValue(this.Event.title);
        this.EventDataForm.get('baseUrl').setValue(this.Event.baseUrl);
        this.EventDataForm.get('email').setValue(this.Event.email);
        this.EventDataForm.get('password').setValue(this.Event.password);
        this.EventDataForm.value.topImage = this.Event.topImage;
        this.EventDataForm.get('landingImage').setValue(this.Event.landingImage);
        this.EventDataForm.get('description').setValue(this.Event.description);
        this.EventDataForm.get('bookingStartDateTime').setValue(
          `${startDate.getFullYear()}-${("0" + (startDate.getMonth() + 1)).slice(-2)}-${startDate.getDate()}`
        );
        this.EventDataForm.get('bookingEndDateTime').setValue(
          `${endDate.getFullYear()}-${("0" + (endDate.getMonth() + 1)).slice(-2)}-${endDate.getDate()}`);
        this.EventDataForm.get('organizedBy').setValue(this.Event.organizedBy);
        this.EventDataForm.get('organizerWebsiteUrl').setValue(this.Event.organizerWebsiteUrl);
        this.EventDataForm.get('supportContactNumber').setValue(this.Event.supportContactNumber);
        this.EventDataForm.get('supportEmail').setValue(this.Event.supportEmail);
        this.EventDataForm.get('isActive').setValue(this.Event.isActive);
        this.EventDataForm.get('shortAddress').setValue(this.Event.shortAddress);
        this.EventDataForm.get('shortAddress').setValue(this.Event.shortAddress);
        this.EventDataForm.get('fullAddress').setValue(this.Event.fullAddress);
        this.EventDataForm.get('eventFrom').setValue(
          `${fromDate.getFullYear()}-${("0" + (fromDate.getMonth() + 1)).slice(-2)}-${fromDate.getDate()}`
        );
        this.EventDataForm.get('eventTo').setValue(
          `${toDate.getFullYear()}-${("0" + (toDate.getMonth() + 1)).slice(-2)}-${toDate.getDate()}`
        );
        this.EventDataForm.get('paypalClientId').setValue(this.Event.paypalClientId);
        this.EventDataForm.get('primaryColor').setValue(this.Event.primaryColor);
        this.EventDataForm.get('secondaryColor').setValue(this.Event.secondaryColor);
        this.EventDataForm.get('fontColor').setValue(this.Event.fontColor);
        this.EventDataForm.get('paypalClientSecret').setValue(this.Event.paypalClientSecret);
        this.EventDataForm.get('paypalMode').setValue(this.Event.paypalMode);
        console.log(this.EventDataForm)
        // this.EventDataForm.setValue({
        //   baseUrl : this.Event.baseUrl,
        //   email : this.Event.email,
        //   password : this.Event.password,
        //   topImage : this.Event.topImage,
        //   landingImage : this.Event.landingImage,
        //   title : this.Event.title,
        //   description : this.Event.description,
        //   bookingStartDateTime : this.Event.bookingStartDateTime,
        //   bookingEndDateTime : this.Event.bookingEndDateTime,
        //   organizedBy : this.Event.organizedBy,
        //   organizerWebsiteUrl : this.Event.organizerWebsiteUrl,
        //   supportContactNumber : this.Event.supportContactNumber,
        //   supportEmail : this.Event.supportEmail,
        //   isActive : this.Event.isActive,
        //   shortAddress : this.Event.shortAddress,
        //   fullAddress : this.Event.fullAddress,
        //   eventFrom : this.Event.eventFrom,
        //   eventTo : this.Event.eventTo,
        //   paypalClientId : this.Event.paypalClientId,
        //   primaryColor : this.Event.primaryColor,
        //   secondaryColor : this.Event.secondaryColor,
        //   fontColor : this.Event.fontColor,
        //   paypalClientSecret : this.Event.paypalClientSecret,
        //   paypalMode : this.Event.paypalMode,
        //   remark : this.Event.remark
        // });
      });
  }

}


export class banner{
       bannerImage:any;
}