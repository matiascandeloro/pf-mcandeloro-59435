import { Pipe, PipeTransform } from '@angular/core';
import { User } from '../../model/interfaces';

@Pipe({
  name: 'userFullName'
})
export class UserFullNamePipe implements PipeTransform {

  transform(value: User, ...args: unknown[]): string {
    return value.firstName + ' '+ value.lastName;
  }

}
