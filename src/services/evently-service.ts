/**
 * Created by Yann on 1/28/2017.
 */
//This service will contain every call to the api
import {Injectable} from '@angular/core';
import {Http} from "@angular/http";

@Injectable()
export class EventlyService {
  url = 'http://192.168.199.67:4567';

  constructor(private http: Http) {
  }

  public sendScheduleSetting(scheduleSetting) {
    return this.http.post(`${this.url}/schedule`, scheduleSetting);
  }

  public getAllEvents(){
    return this.http.get(`${this.url}/events`);
  }
}
