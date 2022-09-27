import { NgModule, APP_INITIALIZER } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { ReservationComponent } from './reservation/reservation.component';

const routes: Routes = [
  {path: 'travel/:travelid', component: ReservationComponent}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      initialNavigation: 'enabledBlocking'
    }
  )],
  exports: [RouterModule]
})
export class AppRoutingModule { }

