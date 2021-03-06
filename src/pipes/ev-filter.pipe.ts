/**
 * Created by Yann on 1/28/2017.
 */
import {Injectable, Pipe} from '@angular/core';
import {PipeTransform} from "@angular/core";

@Pipe({
  name: 'evFilter'
})
@Injectable()
export class EvFilterPipe implements PipeTransform {
  transform(array, key, value) {
    if (!value) {
      return array;
    } else if (array) {
      return array.filter(item => {
        for (let k in item) {
          if (k === key && (item[key].indexOf(value) !== -1)) {
            return true;
          }
        }
      });
    }
  }
}
