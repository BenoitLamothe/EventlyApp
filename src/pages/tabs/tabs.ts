import {Component, OnInit} from '@angular/core';
import {NavParams, NavController} from "ionic-angular";
import {HomePage} from "../home/home";
import {MySchedulesPage} from "../mySchedules/mySchedules";
import {EventlyService} from "../../services/evently-service";

@Component({
    selector: 'tabs',
  template: `
  <ion-tabs color="grey">
    <ion-tab tabIcon="calendar" tabTitle="Évènements" tabsHideOnSubPages=true [root]="tab1"></ion-tab>
    <ion-tab tabIcon="map" tabTitle="Mes horaires" tabsHideOnSubPages=true [tabBadge]="mySchedulesCount" [root]="tab2"></ion-tab>
  </ion-tabs>`,
  providers: [EventlyService],
})

export class TabsPage {
    tab1: any;
    tab2: any;
    mySchedulesCount: 0;

  constructor(private eventlyService: EventlyService) {
    this.tab1 = HomePage;
    this.tab2 = MySchedulesPage;
    this.mySchedulesCount = eventlyService.getMySchedules().length;
  }
}