import { Pipe, PipeTransform } from '@angular/core';
import { IUser } from '../../model/interfaces';

@Pipe({
  name: 'userFullName'
})
export class UserFullNamePipe implements PipeTransform {

  transform(value: IUser, ...args: unknown[]): string {
    if (!!value){
      return value.firstName + ' '+ value.lastName;
    }else{
      return '';
    }
  }

}
