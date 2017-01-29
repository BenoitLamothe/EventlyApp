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
  transform(value, args) {
    debugger;
    if (!args[0]) {
      return value;
    } else if (value) {
      return value.filter(item => {
        for (let key in item) {
          if ((typeof item[key] === 'string' || item[key] instanceof String) &&
            (item[key].indexOf(args[0]) !== -1)) {
            return true;
          }
        }
      });
    }
  }
}
