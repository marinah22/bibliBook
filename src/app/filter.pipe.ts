import { Pipe, PipeTransform } from '@angular/core';
import {Book} from '../app/interfaces/book';

@Pipe({
  name: 'filter'
})

export class FilterPipe implements PipeTransform {
  sName = String ;
  

  transform(value: Book[], filter): any {

   /* if(value.filter(item=>!item.loc)){
     return value.filter(item=>!item.loc)
   }
     */

  //console.log(value.filter(item=>!item.loc));
  
  return value.filter(item => item.title.indexOf(filter.valueOf()) !== -1) 
  





    
  };

  
  

}
