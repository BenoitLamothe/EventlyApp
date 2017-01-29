import {Component, OnInit} from '@angular/core';

import {NavController} from 'ionic-angular';
import {ScheduleSettingsPage} from "../scheduleSettings/schedule-settings";
import {EventlyService} from "../../services/evently-service";
import moment from 'moment';
import {SchedulePage} from "../schedule/schedule";


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
  filteredEvents;
  selectedEventId = 0;
  moment: any;

  constructor(public navCtrl: NavController, private eventlyService: EventlyService) {
  }

  ngOnInit(): void {
    moment.locale('fr-CA');
    this.moment = moment;


    this.eventlyService.getAllEvents().subscribe(events => {
      this.isLoading = false;
      this.events = events.json().sort(function(a, b) { return Date.parse(a.startTime) - Date.parse(b.startTime); });
    });
  }

  selectEventId(eventId) {
    this.selectedEventId = this.selectedEventId === eventId ? 0 : eventId;
  }

  categoryToClass(str){
    return str.toLowerCase();
  }

  navigateToScheduleSettingsPage(event) {
    this.navCtrl.push(ScheduleSettingsPage, {
      event
    });
  }

  navigateToSchedulePage(){
    this.navCtrl.push(SchedulePage);
  }
}
