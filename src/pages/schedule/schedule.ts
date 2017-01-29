/**
 * Created by Yann on 1/28/2017.
 */
/**
 * Created by Yann on 1/28/2017.
 */
import {Component, OnInit} from '@angular/core';
import {NavParams, NavController} from "ionic-angular";
import {EventlyService} from "../../services/evently-service";

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
  selectedIndex = -1;
  map;

  constructor(private navCtrl: NavController, navParams: NavParams, private eventlyService: EventlyService) {
    this.scheduleSettings = navParams.get('scheduleSettings');
  }

  ngOnInit() {
    this.schedules = {
      "event": {
        "id": 1,
        "name": "Match d'impro du MITES",
        "lat": 46.5451,
        "long": -72.7506,
        "location": "Salon Wabasso de la shop du Trou du diable",
        "startTime": "2017-01-29T19:00:00.000-05:00",
        "endTime": "2017-01-28T19:00:00.000-05:00",
        "description": "Dans le cadre du weekend du 11e anniversaire du Trou du diable, les membres du M.I.T.E.S. vous offrent une soirée d'improvisation avec la thématique de leurs 6 années au Trou du diable.Salon Wabasso de la shop du Trou du diable19h00 à 22h00 (ouverture des portes à 18h30)gratuit",
        "link": "http://www.troududiable.com/evenement/match-dimpro-du-mites/",
        "price": 0,
        "priceDisplay": "gratuit",
        "images": [
          "https://storage.googleapis.com/evvnt_assets/16e13c8d77ba1cbb4bd3ba4410c57eeb.jpg",
          "https://storage.googleapis.com/evvnt_assets/16e13c8d77ba1cbb4bd3ba4410c57eeb.jpg",
          "https://storage.googleapis.com/evvnt_assets/6f7aada4a739c0f6b4512be91e26a43d.jpg"
        ]
      },
      "attractions": [
        [
          {
            "id": 1,
            "name": "Microbrasserie Le Trou du Diable",
            "lat": 46.5402,
            "long": -72.7533,
            "location": "412 Willow Avenue, Shawinigan, QC, G9N 1X2, CA",
            "hours": "[{\"is_overnight\":false,\"start\":\"1500\",\"end\":\"2300\",\"day\":0},{\"is_overnight\":false,\"start\":\"1500\",\"end\":\"2300\",\"day\":1},{\"is_overnight\":true,\"start\":\"1500\",\"end\":\"0100\",\"day\":2},{\"is_overnight\":true,\"start\":\"1500\",\"end\":\"0100\",\"day\":3},{\"is_overnight\":true,\"start\":\"1500\",\"end\":\"0300\",\"day\":4},{\"is_overnight\":true,\"start\":\"1500\",\"end\":\"0300\",\"day\":5}]",
            "hoursShift": 63,
            "description": "",
            "link": "https://www.yelp.com/biz/microbrasserie-le-trou-du-diable-shawinigan?adjust_creative=GC3WLLw32YS0Zb07CvVg1Q&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_lookup&utm_source=GC3WLLw32YS0Zb07CvVg1Q",
            "phone": "+18195379151",
            "website": "",
            "reviewStars": 0,
            "priceRange": "$$",
            "categories": "Pubs, French, Brasseries",
            "duration": 60
          },
          {
            "id": 37,
            "name": "Recycle-Vert",
            "lat": 46.3542,
            "long": -72.5827,
            "location": "nullTrois-Rivières, QC, G8Y 4R2, CA",
            "hours": "[{\"is_overnight\":false,\"start\":\"0900\",\"end\":\"1700\",\"day\":0},{\"is_overnight\":false,\"start\":\"0900\",\"end\":\"1700\",\"day\":1},{\"is_overnight\":false,\"start\":\"0900\",\"end\":\"1700\",\"day\":2},{\"is_overnight\":false,\"start\":\"0900\",\"end\":\"1700\",\"day\":3},{\"is_overnight\":false,\"start\":\"0900\",\"end\":\"1700\",\"day\":4},{\"is_overnight\":false,\"start\":\"0900\",\"end\":\"1700\",\"day\":5},{\"is_overnight\":false,\"start\":\"0900\",\"end\":\"1700\",\"day\":6}]",
            "hoursShift": 127,
            "description": "",
            "link": "https://www.yelp.com/biz/recycle-vert-trois-rivi%C3%A8res?adjust_creative=GC3WLLw32YS0Zb07CvVg1Q&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_lookup&utm_source=GC3WLLw32YS0Zb07CvVg1Q",
            "phone": "+18447773292",
            "website": "",
            "reviewStars": 0,
            "categories": "Junk Removal & Hauling, Recycling Center",
            "duration": 60
          },
          {
            "id": 36,
            "name": "Camping Domaine Lac Et Foret",
            "lat": 46.8432,
            "long": -72.4876,
            "location": "131 12E Av Lac Croche S, Sainte-Thecle, QC, G0X 3G0, CA",
            "hours": "",
            "hoursShift": 0,
            "description": "",
            "link": "https://www.yelp.com/biz/camping-domaine-lac-et-foret-sainte-thecle?adjust_creative=GC3WLLw32YS0Zb07CvVg1Q&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_lookup&utm_source=GC3WLLw32YS0Zb07CvVg1Q",
            "phone": "+14182893871",
            "website": "",
            "reviewStars": 0,
            "categories": "",
            "duration": 60
          },
          {
            "id": 3,
            "name": "Le Radoteux",
            "lat": 46.5404,
            "long": -72.7505,
            "location": "610 5e Rue de-la-Pointe, Shawinigan, QC, G9N 1E9, CA",
            "hours": "",
            "hoursShift": 0,
            "description": "",
            "link": "https://www.yelp.com/biz/le-radoteux-shawinigan?adjust_creative=GC3WLLw32YS0Zb07CvVg1Q&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_lookup&utm_source=GC3WLLw32YS0Zb07CvVg1Q",
            "phone": "+18195374545",
            "website": "",
            "reviewStars": 0,
            "categories": "Lounges, Canadian (New)",
            "duration": 60
          }
        ],
        [
          {
            "id": 37,
            "name": "Recycle-Vert",
            "lat": 46.3542,
            "long": -72.5827,
            "location": "nullTrois-Rivières, QC, G8Y 4R2, CA",
            "hours": "[{\"is_overnight\":false,\"start\":\"0900\",\"end\":\"1700\",\"day\":0},{\"is_overnight\":false,\"start\":\"0900\",\"end\":\"1700\",\"day\":1},{\"is_overnight\":false,\"start\":\"0900\",\"end\":\"1700\",\"day\":2},{\"is_overnight\":false,\"start\":\"0900\",\"end\":\"1700\",\"day\":3},{\"is_overnight\":false,\"start\":\"0900\",\"end\":\"1700\",\"day\":4},{\"is_overnight\":false,\"start\":\"0900\",\"end\":\"1700\",\"day\":5},{\"is_overnight\":false,\"start\":\"0900\",\"end\":\"1700\",\"day\":6}]",
            "hoursShift": 127,
            "description": "",
            "link": "https://www.yelp.com/biz/recycle-vert-trois-rivi%C3%A8res?adjust_creative=GC3WLLw32YS0Zb07CvVg1Q&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_lookup&utm_source=GC3WLLw32YS0Zb07CvVg1Q",
            "phone": "+18447773292",
            "website": "",
            "reviewStars": 0,
            "categories": "Junk Removal & Hauling, Recycling Center",
            "duration": 60
          },
          {
            "id": 3,
            "name": "Le Radoteux",
            "lat": 46.5404,
            "long": -72.7505,
            "location": "610 5e Rue de-la-Pointe, Shawinigan, QC, G9N 1E9, CA",
            "hours": "",
            "hoursShift": 0,
            "description": "",
            "link": "https://www.yelp.com/biz/le-radoteux-shawinigan?adjust_creative=GC3WLLw32YS0Zb07CvVg1Q&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_lookup&utm_source=GC3WLLw32YS0Zb07CvVg1Q",
            "phone": "+18195374545",
            "website": "",
            "reviewStars": 0,
            "categories": "Lounges, Canadian (New)",
            "duration": 60
          },
          {
            "id": 36,
            "name": "Camping Domaine Lac Et Foret",
            "lat": 46.8432,
            "long": -72.4876,
            "location": "131 12E Av Lac Croche S, Sainte-Thecle, QC, G0X 3G0, CA",
            "hours": "",
            "hoursShift": 0,
            "description": "",
            "link": "https://www.yelp.com/biz/camping-domaine-lac-et-foret-sainte-thecle?adjust_creative=GC3WLLw32YS0Zb07CvVg1Q&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_lookup&utm_source=GC3WLLw32YS0Zb07CvVg1Q",
            "phone": "+14182893871",
            "website": "",
            "reviewStars": 0,
            "categories": "",
            "duration": 60
          },
          {
            "id": 1,
            "name": "Microbrasserie Le Trou du Diable",
            "lat": 46.5402,
            "long": -72.7533,
            "location": "412 Willow Avenue, Shawinigan, QC, G9N 1X2, CA",
            "hours": "[{\"is_overnight\":false,\"start\":\"1500\",\"end\":\"2300\",\"day\":0},{\"is_overnight\":false,\"start\":\"1500\",\"end\":\"2300\",\"day\":1},{\"is_overnight\":true,\"start\":\"1500\",\"end\":\"0100\",\"day\":2},{\"is_overnight\":true,\"start\":\"1500\",\"end\":\"0100\",\"day\":3},{\"is_overnight\":true,\"start\":\"1500\",\"end\":\"0300\",\"day\":4},{\"is_overnight\":true,\"start\":\"1500\",\"end\":\"0300\",\"day\":5}]",
            "hoursShift": 63,
            "description": "",
            "link": "https://www.yelp.com/biz/microbrasserie-le-trou-du-diable-shawinigan?adjust_creative=GC3WLLw32YS0Zb07CvVg1Q&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_lookup&utm_source=GC3WLLw32YS0Zb07CvVg1Q",
            "phone": "+18195379151",
            "website": "",
            "reviewStars": 0,
            "priceRange": "$$",
            "categories": "Pubs, French, Brasseries",
            "duration": 60
          }
        ]
      ]
    };
    this.selectNewSchedule();
    this.isLoading = false;
    setTimeout(() => {
      this.loadMap();
    });

    // this.eventlyService.sendScheduleSetting(this.scheduleSettings).subscribe(response => {
    //   this.schedules = response.json();
    //   this.selectedIndex = this.schedules.attractions[0];
    //   this.isLoading = false;
    //   this.loadMap();
    //   console.log(this.schedules);
    // })
  }

  selectNewSchedule() {
    this.selectedIndex = this.selectedIndex + 1;
    if (this.selectedIndex > this.schedules.attractions.length) {
      this.selectedIndex = 0;
    }
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
