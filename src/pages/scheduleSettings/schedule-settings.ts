/**
 * Created by Yann on 1/28/2017.
 */
import {Component, OnInit} from '@angular/core';
import {NavParams, NavController} from "ionic-angular";
import {SchedulePage} from "../schedule/schedule";
import {EventlyService} from "../../services/evently-service";

@Component({
  selector: 'page-schedule-settings',
  templateUrl: 'schedule-settings.html'
})
export class ScheduleSettingsPage implements OnInit {
  event;
  categories = [{label: 'Sport', isChecked: false}, {label: 'Spectacle', isChecked: false}, {label: 'Autre', isChecked: false}, {label: 'Last one', isChecked: false}];
  periods = [{icon: 'alarm', value:'morning', isChecked: false}, {icon: 'sunny',value:'afternoon', isChecked: false}, {icon: 'moon', value:'evening', isChecked: false}];
  transports = [{icon: 'walk', isChecked: true}, {icon: 'bicycle', isChecked: false}, {icon: 'car', isChecked: false}];

  constructor(private navCtrl: NavController, navParams: NavParams, private eventlyService: EventlyService) {
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
    const currentTransportChecked = this.transports.find(x => x.isChecked);
    currentTransportChecked.isChecked = false;
    transport.isChecked = true;
  }

  navigateToSchedulePage() {
    debugger
    const scheduleSetting = {
      eventId: this.event.id,
      availability:this.periods.filter(x=>x.isChecked).map(x=>x.value),
      criterias: [{name:'categories', value:this.categories.filter(x=>x.isChecked).map(x=>x.label)}
      ]
    };
    this.eventlyService.sendScheduleSetting(scheduleSetting).subscribe(response => {
      this.navCtrl.push(SchedulePage, response.json());
    })

  }
}
