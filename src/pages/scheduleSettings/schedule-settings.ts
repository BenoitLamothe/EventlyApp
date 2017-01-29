/**
 * Created by Yann on 1/28/2017.
 */
import {Component, OnInit} from '@angular/core';
import {NavParams, NavController} from "ionic-angular";
import {SchedulePage} from "../schedule/schedule";
import {EventlyService} from "../../services/evently-service";
import moment from "moment";

@Component({
  selector: 'page-schedule-settings',
  templateUrl: 'schedule-settings.html',
  providers: [EventlyService],
})
export class ScheduleSettingsPage implements OnInit {
  categoryError = {message: 'Vous devez choisir au moins 1 catégorie', hasError: false};
  event;
  categories = [{label: 'Sport', values: ['sport'], isChecked: false, icon: 'football'}, {label: 'Spectacle', values: ['shows', 'music'], isChecked: false, icon: 'mic'}, {
    label: 'Comédie',
    values: ['comedy', 'theater'],
    isChecked: false,
    icon: 'happy'
  }, {label: 'Famille', values: ['activities', 'family'], isChecked: false, icon: 'flower'}, {label: 'Culture', values: ['culture', 'business'], isChecked: false, icon: 'brush'}, {
    label: 'Autre',
    values: ['other'],
    isChecked: false,
    icon: 'cafe'
  }];
  periods = [{icon: 'alarm', value: 'morning', isChecked: false, isLocked: false}, {icon: 'sunny', value: 'afternoon', isChecked: false, isLocked: false}, {icon: 'moon', value: 'evening', isChecked: false, isLocked: false}];
  transports = [{icon: 'walk', value: 'WALKING', isChecked: true}, {icon: 'bicycle', value: 'BICYCLING', isChecked: false}, {icon: 'car', value: 'DRIVING', isChecked: false}];

  constructor(private navCtrl: NavController, navParams: NavParams, private eventlyService: EventlyService) {
    this.event = navParams.get('event');

    // Set the default timezone that needs to be checked (when the event occurs) xD
    const startHour = moment(this.event.startTime).hour();

    let lockedPeriod;
    if (startHour >= 0 && startHour < 12) {
      lockedPeriod = this.periods[0];
    } else if (startHour >= 12 && startHour < 18) {
      lockedPeriod = this.periods[1];
    } else {
      lockedPeriod = this.periods[2];
    }
    lockedPeriod.isChecked = true;
    lockedPeriod.isLocked = true;
  }

  ngOnInit() {

  }

  toggleCategory(category) {
    category.isChecked = !category.isChecked;
  }

  togglePeriod(period) {
    if (period.isLocked)
      return;
    period.isChecked = !period.isChecked;

    const startPeriod = this.periods[0];
    const middlePeriod = this.periods[1];
    const endPeriod = this.periods[2];

    if (startPeriod.isChecked && endPeriod.isChecked) {
      middlePeriod.isChecked = true;
    }
  }

  toggleTransport(transport) {
    const currentTransportChecked = this.transports.find(x => x.isChecked);
    currentTransportChecked.isChecked = false;
    transport.isChecked = true;
  }

  navigateToSchedulePage() {
    // Check if atleast one category is checked
    this.categoryError.hasError = this.categories.findIndex(x => x.isChecked) === -1;
    if (this.categoryError.hasError) {
      return;
    }

    const scheduleSetting = {
      eventId: this.event.id,
      availability: this.periods.filter(x => x.isChecked).map(x => x.value),
      criterias: [
        {name: 'categories', value: this.categories.filter(x => x.isChecked).reduce((a, b) => [...a, ...b.values], [])},
        {name: 'transport', value: this.transports.find(x => x.isChecked).value}
      ]
    };

    this.navCtrl.push(SchedulePage, {scheduleSettings: scheduleSetting});
  }
}
