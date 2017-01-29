import {Component} from '@angular/core';
import {HomePage} from "../home/home";
import {MySchedulesPage} from "../mySchedules/mySchedules";
import {EventlyService} from "../../services/evently-service";

@Component({
  selector: 'tabs',
  templateUrl: 'tabs.html',
  providers: [EventlyService],
})

export class TabsPage {
  tab1: any;
  tab2: any;

  constructor() {
    this.tab1 = HomePage;
    this.tab2 = MySchedulesPage;
  }
}
