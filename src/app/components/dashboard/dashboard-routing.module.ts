import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateEventsComponent } from './create-events/create-events.component';
import { DefaultComponent } from './default/default.component';
import { EcommerceComponent } from './ecommerce/ecommerce.component';
import { EditEventComponent } from './edit-event/edit-event.component';
import { EventListComponent } from './event-list/event-list.component';
import { ViewEventComponent } from './view-event/view-event.component';


const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'default',
        component: DefaultComponent
      },
      {
        path:'ecommerce',
        component:EcommerceComponent
      },
      {
        path:'eventList',
        component:EventListComponent
      },
      {
        path:'CreateEvents',
        component:CreateEventsComponent
      },
      {
        path:'editEvent/:id',
        component:CreateEventsComponent
      },
      {
        path:'viewEvent/:id',
        component:ViewEventComponent
      }
    ],
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
