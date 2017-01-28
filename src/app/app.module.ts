import {NgModule, ErrorHandler} from '@angular/core';
import {IonicApp, IonicModule, IonicErrorHandler} from 'ionic-angular';
import {MyApp} from './app.component';
import {HomePage} from '../pages/home/home';
import {ScheduleSettingsPage} from "../pages/scheduleSettings/schedule-settings";
import {SchedulePage} from "../pages/schedule/schedule";

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ScheduleSettingsPage,
    SchedulePage
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ScheduleSettingsPage,
    SchedulePage
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}]
})
export class AppModule {
}
