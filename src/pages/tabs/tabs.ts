import {Component, OnInit} from '@angular/core';
import {NavParams, NavController} from "ionic-angular";
import {HomePage} from "../home/home";
import {MySchedulesPage} from "../mySchedules/mySchedules";

@Component({
    selector: 'tabs',
  template: `
  <ion-tabs color="grey">
    <ion-tab tabIcon="calendar" [root]="tab1"></ion-tab>
    <ion-tab tabIcon="map" [root]="tab2"></ion-tab>
  </ion-tabs>`
})

export class TabsPage {
    tab1: any;
    tab2: any;

  constructor() {
    this.tab1 = HomePage;
    this.tab2 = MySchedulesPage;
  }
}