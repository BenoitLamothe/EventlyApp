/**
 * Created by Yann on 1/28/2017.
 */
import {Injectable, Pipe} from '@angular/core';
import {PipeTransform} from "@angular/core";
import moment from "moment";

@Pipe({
  name: 'evDateFilter'
})
@Injectable()
export class EvDateFilterPipe implements PipeTransform {
  transform(array, key, date) {
    if (!date) {
      return array;
    } else if (array) {
      return array.filter(item => {
        if (moment(item[key]).isSame(date, 'd')) {
          debugger;
          console.log(new Date(item[key]).getDay());
          return true;
        }
      });
    }
  }
}
