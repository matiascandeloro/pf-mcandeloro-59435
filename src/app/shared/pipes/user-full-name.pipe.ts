import { Pipe, PipeTransform } from '@angular/core';
import { IUser } from '../../model/interfaces';

@Pipe({
  name: 'userFullName'
})
export class UserFullNamePipe implements PipeTransform {

  transform(value: IUser, ...args: unknown[]): string {
    return value.firstName + ' '+ value.lastName;
  }

}
