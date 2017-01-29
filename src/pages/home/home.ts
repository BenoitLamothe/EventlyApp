import {Component, OnInit} from '@angular/core';

import {NavController} from 'ionic-angular';
import {ScheduleSettingsPage} from "../scheduleSettings/schedule-settings";
import {EventlyService} from "../../services/evently-service";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [EventlyService],
})
export class HomePage implements OnInit {
  events = [];
  isLoading = true;
  minDate = '2017-01-29';
  maxDate = '2017-12-31';
  filterDate;
  selectedEventId = 0;

  constructor(public navCtrl: NavController, private eventlyService: EventlyService) {

  }

  ngOnInit(): void {
    this.eventlyService.getAllEvents().subscribe(events => {
      this.isLoading = false;
      this.events = events.json();
      console.log(events.json());
    });
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
