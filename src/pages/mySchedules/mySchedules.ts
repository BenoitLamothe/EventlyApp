/**
 * Created by Simon on 1/28/2017.
 */
import {Component, OnInit} from '@angular/core';
import {NavParams, NavController} from "ionic-angular";

@Component({
  selector: 'page-mySchedules',
  templateUrl: 'mySchedules.html'
})

export class MySchedulesPage implements OnInit {
  event;

  constructor(private navCtrl: NavController, navParams: NavParams) {
    this.event = navParams.get('event');
  }

  ngOnInit() {
  }
}
