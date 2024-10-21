import { Injectable, Pipe } from '@angular/core';
import { User } from '../../model/interfaces';
import { delay, map, Observable, of } from 'rxjs';

let MY_USER_DB: User[] = [
  {id: 'VaCp', firstName: 'Matias',    lastName: 'Candeloro', email:'mcandeloro@gmail.com', createdAt: new Date()},
  {id: 'Xm7s', firstName: 'Agustin',   lastName: 'Lopez',     email:'alopez@gmail.com',     createdAt: new Date()},
  {id: 'ksRj', firstName: 'Nahuel',    lastName: 'Ortiz',     email:'nortiz@gmail.com',     createdAt: new Date()},
  {id: 'w7cB', firstName: 'Sergio',    lastName: 'Juarez',    email:'sjuarez@gmail.com',    createdAt: new Date()},
  {id: 'vjPT', firstName: 'Leonardo',  lastName: 'Hernandez', email:'lhernandez@gmail.com', createdAt: new Date()},
  {id: 'EToz', firstName: 'Gustavo',   lastName: 'Fernandez', email:'gfernandez@gmail.com', createdAt: new Date()},
  {id: 'vSKX', firstName: 'Francisco', lastName: 'Gutierrez', email:'fgutierrez@gmail.com', createdAt: new Date()},
  {id: 'Fd8b', firstName: 'Tomas',     lastName: 'Arevalo',   email:'tarevalo@gmail.com',   createdAt: new Date()},
  {id: '7BQT', firstName: 'Ignacio',   lastName: 'Conti',     email:'iconti@gmail.com',     createdAt: new Date()},
  {id: 'CGLm', firstName: 'David',     lastName: 'Gomez',     email:'dgomez@gmail.com',     createdAt: new Date()},
];

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor() { }
  getUsers():Observable<User[]>{
    return of(MY_USER_DB).pipe(delay(1000));
  }


  updateUserById(id:string,update:Partial<User>){
    MY_USER_DB=MY_USER_DB.map((user)=>user.id===id? {...user,...update}:user);
    return of(MY_USER_DB).pipe(delay(500));
  }

  removeUserById(id: string ):Observable<User[]>{
    MY_USER_DB=MY_USER_DB.filter((user)=> user.id!=id);

    return of(MY_USER_DB).pipe(delay(500));
  }

  insertUser(user:User){
    MY_USER_DB= [...MY_USER_DB,{...user,}];
    return of(MY_USER_DB).pipe(delay(500));
  }

  getUserById(id:string): Observable<User| undefined>{
    return this.getUsers().pipe(map((users)=> users.find((u)=> u.id===id)));

  }
}
