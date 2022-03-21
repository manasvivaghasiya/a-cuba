import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { CountToModule } from 'angular-count-to';
import { ChartistModule } from 'ng-chartist';
import { ChartsModule } from 'ng2-charts';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { NgApexchartsModule } from 'ng-apexcharts';
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';
import { AgmCoreModule } from '@agm/core';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

import { DefaultComponent } from './default/default.component';
import { EcommerceComponent } from './ecommerce/ecommerce.component';
import { EventListComponent } from './event-list/event-list.component';
import { CreateEventsComponent } from './create-events/create-events.component';
import { EditEventComponent } from './edit-event/edit-event.component';
import { ViewEventComponent } from './view-event/view-event.component';
// import {CustomDatePipe} from './event-list/custome.pipes';


@NgModule({
  declarations: [DefaultComponent, EcommerceComponent, EventListComponent, CreateEventsComponent, EditEventComponent, ViewEventComponent],
  imports: [
    CommonModule,
    ChartistModule,
    ChartsModule,
    NgApexchartsModule,
    SharedModule,
    CarouselModule,
    CKEditorModule,
    CountToModule,
    NgbModule,
    FormsModule,
    NgxDatatableModule,
    AgmCoreModule.forRoot({
      apiKey: ''
    }),
    DashboardRoutingModule,
    // AngularFirestoreModule
  ]
})
export class DashboardModule { }
