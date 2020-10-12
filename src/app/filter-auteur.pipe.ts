import { Pipe, PipeTransform } from '@angular/core';
import {Book} from '../app/interfaces/book';


@Pipe({
  name: 'filterAuteur'
})
export class FilterAuteurPipe implements PipeTransform {

  countLoc:number;

  transform(value: Book[], filterAuteur): any {

  this.countLoc=value.filter(item=>!item.loc).length;
  //console.log(this.countLoc);
  return value.filter(item => !item.loc.valueOf());
  



    
  }


}
