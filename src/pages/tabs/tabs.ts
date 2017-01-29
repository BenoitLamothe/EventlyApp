import {Component} from '@angular/core';
import {HomePage} from "../home/home";
import {MySchedulesPage} from "../mySchedules/mySchedules";
import {EventlyService} from "../../services/evently-service";
import {Subject} from "rxjs";

@Component({
  selector: 'tabs',
  templateUrl: 'tabs.html',
  providers: [EventlyService],
})

export class TabsPage {
  tab1: any;
  tab2: any;
  mySchedulesCount: 0;

  constructor(public eventlyService: EventlyService) {
    this.tab1 = HomePage;
    this.tab2 = MySchedulesPage;

    this.eventlyService.observableSchedules.subscribe(schedules => this.mySchedulesCount = schedules.length)
  }
}
