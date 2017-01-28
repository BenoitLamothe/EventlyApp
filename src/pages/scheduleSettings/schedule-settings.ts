/**
 * Created by Yann on 1/28/2017.
 */
import {Component, OnInit} from '@angular/core';
import {NavParams, NavController} from "ionic-angular";
import {SchedulePage} from "../schedule/schedule";

@Component({
  selector: 'page-schedule-settings',
  templateUrl: 'schedule-settings.html'
})
export class ScheduleSettingsPage implements OnInit {
  event;
  categories = [{label: 'Sport', isChecked: false}, {label: 'Spectacle', isChecked: false}, {label: 'Autre', isChecked: false}, {label: 'Last one', isChecked: false}];
  periods = [{icon:'alarm', isChecked: false},{icon:'sunny', isChecked: false},{icon:'moon', isChecked: false}];
  transports = [{icon:'walk', isChecked:true}, {icon:'bicycle', isChecked:false}, {icon:'car', isChecked:false}];

  constructor(private navCtrl: NavController, navParams: NavParams) {
    this.event = navParams.get('event');
  }

  ngOnInit() {
  }

  toggleCategory(category) {
    category.isChecked = !category.isChecked;
  }

  togglePeriod(period) {
    period.isChecked = !period.isChecked;

    const startPeriod = this.periods[0];
    const middlePeriod = this.periods[1];
    const endPeriod = this.periods[2];

    if (startPeriod.isChecked && endPeriod.isChecked) {
      middlePeriod.isChecked = true;
    }
  }

  toggleTransport(transport) {
    const currentTransportChecked = this.transports.find(x=>x.isChecked);
    currentTransportChecked.isChecked = false;
    transport.isChecked = true;
  }

  navigateToSchedulePage(event) {
    this.navCtrl.push(SchedulePage, {
      event
    });
  }
}
