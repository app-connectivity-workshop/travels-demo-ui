import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { APP_INITIALIZER } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReservationComponent } from './reservation/reservation.component';
import { MessageService } from './message.service';
import { HttpErrorHandler } from './http-error-handler.service';
import { AppConfigService } from './providers/app-config.service'
import { TravelsService } from './travels.service';
import { FormsModule } from '@angular/forms';

import { HttpClientModule } from '@angular/common/http';

export function initConfig(appConfig: AppConfigService) {
  return () => appConfig.loadConfig();
}

@NgModule({
  declarations: [
    AppComponent, ReservationComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    HttpClientModule,
    FormsModule
  ],
  providers: [
    {
      provide: APP_INITIALIZER, useFactory: initConfig,  deps: [AppConfigService],  multi: true
    }, 
    HttpErrorHandler, MessageService, TravelsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
