/**
 * Created by Simon on 1/28/2017.
 */
import {Component, OnInit} from '@angular/core';
import {NavParams, NavController} from "ionic-angular";
import {SchedulePage} from "../schedule/schedule";
import {EventlyService} from "../../services/evently-service";
import { ActionSheetController } from 'ionic-angular';
import moment from "moment";

@Component({
  selector: 'page-my-schedules',
  templateUrl: 'mySchedules.html',
  providers: [EventlyService],
})

export class MySchedulesPage implements OnInit {
  event = {"id":1,"name":"THE PLANET SMASHERS + BOIDS","lat":0.0,"long":0.0,"location":"Salon Wabasso de la shop du Trou du diable","startTime":"2017-01-27T19:00:00.000-05:00","endTime":"2017-01-27T19:00:00.000-05:00","description":"The Planet Smasherformé en 1994 à Montréal, les Planet Smashers se sont imposés rapidement comme étant les rois du ska en ville. Avec leurs mélodies pop accrocheuses, leurs lignes de cuivres irrésistibles et leurs spectacles à couper le souffle, la formation a conquis le cur de milliers de personnes à travers la planète. Boidstoujours en train d\u0027errer dans les endroits les plus improbables, ces beaux et timides garçons canalisent leur amour, leurs coeurs brisés, leur frustration cosmique et inspiration dans un mélange bordélique de punk, thrash, et de old school hardcore.Salon Wabasso de la shop du Trou du diable21h30 (ouverture des portes à 20h30)20$","link":"http://www.troududiable.com/evenements/","price":0.0,"priceDisplay":"20$","images":["https://storage.googleapis.com/evvnt_assets/16e13c8d77ba1cbb4bd3ba4410c57eeb.jpg"]};
  moment; 
  schedules;
  

  constructor(private navCtrl: NavController, navParams: NavParams, private eventlyService: EventlyService, public actionSheetCtrl: ActionSheetController) {
    this.moment = moment;
    this.schedules = eventlyService.getMySchedules();
  }

  ngOnInit() {
  }

  navigateToSchedule(schedule) {
    this.navCtrl.push(SchedulePage, schedule)
  }

  presentActionSheet() {
   let actionSheet = this.actionSheetCtrl.create({
     title: 'Supprimer l\'horaire?',
     buttons: [
       {
         text: 'supprimer',
         role: 'destructive',
         handler: () => {
           console.log('Destructive clicked');
         }
       },
       {
         text: 'Annuler',
         role: 'cancel',
         handler: () => {
           console.log('Cancel clicked');
         }
       }
     ]
   });

   actionSheet.present();
 }
}
