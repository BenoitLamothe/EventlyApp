import {Component, OnInit} from '@angular/core';

import {NavController} from 'ionic-angular';
import {ScheduleSettingsPage} from "../scheduleSettings/schedule-settings";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit {

  minDate = '2017-01-29';
  maxDate = '2017-12-31';
  filterDate;
  selectedEventId = 1;

  constructor(public navCtrl: NavController) {

  }

  ngOnInit(): void {

  }

  selectEventId(eventId) {
    this.selectedEventId = this.selectedEventId === eventId ? 0 : eventId;
  }

  navigateToScheduleSettingsPage(event) {
    this.navCtrl.push(ScheduleSettingsPage, {
      event
    });
  }
}
