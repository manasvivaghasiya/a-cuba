import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { id } from '@swimlane/ngx-datatable';
import { database } from 'firebase';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.scss']
})
export class EventListComponent implements OnInit {

  public Events = [];

  // today:Date = new Date();
  // pipe = new DatePipe('en-US');

  row: any;
  prop = [];

  columns = [
    { name: 'Title', prop: 'title' },
    { name: 'Base Url', prop: 'baseUrl' },
    { name: 'Booking Start Date Time', prop: 'bookingStartDateTime' },
    { name: 'Booking End Date Time', prop: 'bookingEndDateTime' },
    { name: 'Event From', prop: 'eventFrom' },
    { name: 'Event To', prop: 'eventTo' },
    { name: 'is Active', prop: 'isActive' },
    { name: 'Action', prop: 'action' }
  ]

  constructor(private http: HttpClient,
    private change: ChangeDetectorRef,
    private router: Router) {
  }

  ngOnInit(): void {
    this.getEvents();
  }

  getToken(): string {
    return localStorage.getItem('token')
  }


  getEvents() {
    this.http.get(`${environment.api}/events`).subscribe((res: any) => {
      this.Events = res;
      this.change.detectChanges();

    });
  }

  getEventsById(id) {
    this.http.get(`${environment.api}/events/${id}`)
      .subscribe((res: any) => {

      });
  }


  deleteEvent(id: string) {
    this.http.delete(`${environment.api}/events/${id}`)
      .subscribe((res: any) => {
        alert('data successfully delete')
        this.getEvents();
      });
  }

  editEvent(id) {
    this.router.navigate(['dashboard/editEvent/' + id]);
  }
  // saveEvent(){
  //   this.http.post(`${environment.api}/api/events`,this.Events)
  //   .subscribe((res:any)=>{
  //     if(res.isSuccess){
  //       alert('data successfully added')
  //       this.getEvents();

  //     }else{
  //       alert(res.message);
  //     }
  //   });
  // }



}
