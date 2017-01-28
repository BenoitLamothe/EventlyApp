import {Component, OnInit} from '@angular/core';

import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit{

  private minDate = '2017-01-29';
  private maxDate = '2017-12-31';
  private filterDate;
  private selectedEventId = 1;

  constructor(public navCtrl: NavController) {

  }

  ngOnInit(): void {

  }

  private selectEventId(eventId){
    this.selectedEventId = this.selectedEventId === eventId ? 0 : eventId;
  }
}
