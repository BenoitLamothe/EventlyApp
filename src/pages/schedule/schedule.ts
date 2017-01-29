/**
 * Created by Yann on 1/28/2017.
 */
/**
 * Created by Yann on 1/28/2017.
 */
import {Component, OnInit} from '@angular/core';
import {NavParams, NavController} from "ionic-angular";

@Component({
  selector: 'page-schedule',
  templateUrl: 'schedule.html'
})
export class SchedulePage implements OnInit {
  event;

  formatDate(date) {
    console.log("asdf");
  }

  constructor(private navCtrl: NavController, navParams: NavParams) {
    this.event = navParams.get('event');
  }

  ngOnInit() {
  }
}
