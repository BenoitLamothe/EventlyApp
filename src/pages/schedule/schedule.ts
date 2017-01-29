/**
 * Created by Yann on 1/28/2017.
 */
/**
 * Created by Yann on 1/28/2017.
 */
import {Component, OnInit, ApplicationRef} from '@angular/core';
import {NavParams, NavController, ToastController} from "ionic-angular";
import {EventlyService} from "../../services/evently-service";
import moment from "moment";
import { TabsPage } from '../tabs/tabs';
import set = Reflect.set;

declare let google;
@Component({
  selector: 'page-schedule',
  templateUrl: 'schedule.html',
  providers: [EventlyService]
})
export class SchedulePage implements OnInit {
  isLoading = true;
  scheduleSettings;
  googleTransit;
  selectedAttractions;
  map;
  schedule;
  googleMapsDistanceService;
  googleMapsDirectionService;
  moment;
  directionsDisplay;
  event;
  tabsPage;

  constructor(private navCtrl: NavController, navParams: NavParams, private eventlyService: EventlyService, private appRef: ApplicationRef, public toastCtrl: ToastController) {
    this.scheduleSettings = navParams.get('scheduleSettings');
    this.googleTransit = this.scheduleSettings.criterias.find(x => x.name === 'transport').value;
    this.googleMapsDistanceService = new google.maps.DistanceMatrixService();
    this.googleMapsDirectionService = new google.maps.DirectionsService;
    this.moment = moment;
    this.tabsPage = TabsPage;
  }

  ngOnInit() {
    this.selectNewSchedule();
  }

  selectNewSchedule(randomize = false) {
    this.isLoading = true;
    this.scheduleSettings.randomize = randomize;
    this.eventlyService.sendScheduleSetting(this.scheduleSettings).subscribe(response => {
      const schedule = response.json();
      this.selectedAttractions = [...schedule.beforeAttractions, schedule.event, ...schedule.afterAttractions].map(x=>Object.assign(x, {isEvent: x.startTime!=null}));
      this.selectedAttractions.forEach(attraction=>{
        if (attraction.rating && attraction.rating > 0) {
          attraction.stars = Array(parseInt(attraction.rating)).fill('star');

          // Needs a half star
          if (attraction.rating - parseInt(attraction.rating) >= 0.4) {
            attraction.stars.unshift('star-half')
          }
        } else {
          attraction.stars = [];
        }
      });
      this.event = schedule.event;
      console.log(this.selectedAttractions);

      const distanceMatrixQuery = {
        travelMode: this.googleTransit,
        origins: this.selectedAttractions.slice(0, this.selectedAttractions.length - 1).map(x => ({lat: x.lat, lng: x.long})),
        destinations: this.selectedAttractions.slice(1, this.selectedAttractions.length).map(x => ({lat: x.lat, lng: x.long})),
      };
      this.loadMap();

      this.googleMapsDistanceService.getDistanceMatrix(distanceMatrixQuery, this.processDistanceMatrix.bind(this));
      this.directionsDisplay = new google.maps.DirectionsRenderer;
      this.directionsDisplay.setMap(this.map);

      const firstAttraction = this.selectedAttractions[0];
      const lastAttraction = this.selectedAttractions[this.selectedAttractions.length - 1];
      this.googleMapsDirectionService.route({
        travelMode: this.googleTransit,
        origin: new google.maps.LatLng(firstAttraction.lat, firstAttraction.long),
        destination: new google.maps.LatLng(lastAttraction.lat, lastAttraction.long),
        waypoints: this.selectedAttractions.slice(1, this.selectedAttractions.length - 1).map(x => ({location: {lat: x.lat, lng: x.long}, stopover: false})),
      }, (response) => {
        console.log(response);
        this.directionsDisplay.setDirections(response);
      })
    });
  }

  categoryToClass(str){
    return str.toLowerCase();
  }

  processDistanceMatrix(distanceMatrix) {
    for (let i = 0; i < this.selectedAttractions.length - 1; i++) {
      const attraction = this.selectedAttractions[i];
      attraction.travelTime = distanceMatrix.rows[i].elements[i].duration.value;
    }
    this.isLoading = false;
    this.appRef.tick();
  }

  loadMap() {
    this.map = new google.maps.Map(document.getElementById('map'), {
      center: {lat: 46.545607, lng: -72.749870},
      scrollwheel: false,
      zoom: 15,
      styles: [{"featureType": "all", "elementType": "geometry.fill", "stylers": [{"weight": "2.00"}]}, {"featureType": "all", "elementType": "geometry.stroke", "stylers": [{"color": "#9c9c9c"}]}, {
        "featureType": "all",
        "elementType": "labels.text",
        "stylers": [{"visibility": "on"}]
      }, {"featureType": "landscape", "elementType": "all", "stylers": [{"color": "#f2f2f2"}]}, {"featureType": "landscape", "elementType": "geometry.fill", "stylers": [{"color": "#ffffff"}]}, {
        "featureType": "landscape.man_made",
        "elementType": "geometry.fill",
        "stylers": [{"color": "#ffffff"}]
      }, {"featureType": "poi", "elementType": "all", "stylers": [{"visibility": "off"}]}, {"featureType": "road", "elementType": "all", "stylers": [{"saturation": -100}, {"lightness": 45}]}, {
        "featureType": "road",
        "elementType": "geometry.fill",
        "stylers": [{"color": "#eeeeee"}]
      }, {"featureType": "road", "elementType": "labels.text.fill", "stylers": [{"color": "#7b7b7b"}]}, {"featureType": "road", "elementType": "labels.text.stroke", "stylers": [{"color": "#ffffff"}]}, {
        "featureType": "road.highway",
        "elementType": "all",
        "stylers": [{"visibility": "simplified"}]
      }, {"featureType": "road.arterial", "elementType": "labels.icon", "stylers": [{"visibility": "off"}]}, {"featureType": "transit", "elementType": "all", "stylers": [{"visibility": "off"}]}, {
        "featureType": "water",
        "elementType": "all",
        "stylers": [{"color": "#46bcec"}, {"visibility": "on"}]
      }, {"featureType": "water", "elementType": "geometry.fill", "stylers": [{"color": "#c8d7d4"}]}, {"featureType": "water", "elementType": "labels.text.fill", "stylers": [{"color": "#070707"}]}, {
        "featureType": "water",
        "elementType": "labels.text.stroke",
        "stylers": [{"color": "#ffffff"}]
      }]
    });
  }

  saveSchedule(){
    this.eventlyService.addMySchedule({ selectedAttractions: this.selectedAttractions, event: this.event, scheduleSettings: this.scheduleSettings });
    this.toastCtrl.create({
      message: 'Votre horaire a été sauvegardé',
      duration: 4000
    }).present();
  }
}
