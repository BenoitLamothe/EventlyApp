/**
 * Created by Yann on 1/28/2017.
 */
//This service will contain every call to the api
import {Injectable} from '@angular/core';
import {Http} from "@angular/http";
import {Observable, BehaviorSubject} from "rxjs";

@Injectable()
export class EventlyService {
  url = 'http://api.evvnt.me';
  storageKey = "mySchedules";
  mySchedules = JSON.parse(localStorage.getItem(this.storageKey)) || [];

  constructor(private http: Http) {

  }

  public sendScheduleSetting(scheduleSetting) {
    return this.http.post(`${this.url}/schedule`, scheduleSetting);
  }

  public getAllEvents() {
    return this.http.get(`${this.url}/events`);
  }

  public getMySchedules() {
    return this.mySchedules;
  }

  public addMySchedule(mySchedule) {
    this.mySchedules.push(mySchedule);
    localStorage.setItem(this.storageKey, JSON.stringify(this.mySchedules));
  }

  public deleteMySchedule(mySchedule) {
    const scheduleIndex = this.mySchedules.findIndex(x=>x.name === mySchedule.name);
    if (scheduleIndex > -1) {
      this.mySchedules.splice(scheduleIndex, 1);
    }
    localStorage.setItem(this.storageKey, JSON.stringify(this.mySchedules));
  }
}
