import {NgModule, ErrorHandler} from '@angular/core';
import {IonicApp, IonicModule, IonicErrorHandler} from 'ionic-angular';
import {MyApp} from './app.component';
import {HomePage} from '../pages/home/home';
import {ScheduleSettingsPage} from "../pages/scheduleSettings/schedule-settings";
import {SchedulePage} from "../pages/schedule/schedule";
import {MySchedulesPage} from "../pages/mySchedules/mySchedules";
import {TabsPage} from "../pages/tabs/tabs";
import {MomentModule} from "angular2-moment";
import {EvLoaderComponent} from "../components/evLoader/ev-loader.component";
import {EvFilterPipe} from "../pipes/ev-filter.pipe";
import {EvDateFilterPipe} from "../pipes/ev-date-filter.pipe";

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ScheduleSettingsPage,
    SchedulePage,
    MySchedulesPage,
    TabsPage,
    EvLoaderComponent,
    EvFilterPipe,
    EvDateFilterPipe,
  ],
  imports: [
    MomentModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ScheduleSettingsPage,
    SchedulePage,
    MySchedulesPage,
    TabsPage
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}]
})
export class AppModule {
}
