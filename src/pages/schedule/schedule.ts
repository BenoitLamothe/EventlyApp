/**
 * Created by Yann on 1/28/2017.
 */
/**
 * Created by Yann on 1/28/2017.
 */
import {Component, OnInit, ApplicationRef} from '@angular/core';
import {NavParams, NavController} from "ionic-angular";
import {EventlyService} from "../../services/evently-service";
import moment from "moment";
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
  schedules;
  selectedAttractions;
  map;
  googleMapsDistanceService;
  googleMapsDirectionService;
  moment;
  directionsDisplay;

  constructor(private navCtrl: NavController, navParams: NavParams, private eventlyService: EventlyService, private appRef: ApplicationRef) {
    this.scheduleSettings = navParams.get('scheduleSettings');
    this.googleTransit = this.scheduleSettings.criterias.find(x => x.name === 'transport').value;
    this.googleMapsDistanceService = new google.maps.DistanceMatrixService();
    this.googleMapsDirectionService = new google.maps.DirectionsService;
    this.moment = moment;
  }

  ngOnInit() {
    this.selectNewSchedule();
  }

  selectNewSchedule() {
    this.isLoading = true;
    this.eventlyService.sendScheduleSetting(this.scheduleSettings).subscribe(response => {
      const schedule = response.json();
      this.selectedAttractions = [...schedule.beforeAttractions, schedule.event, ...schedule.afterAttractions];
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
}
