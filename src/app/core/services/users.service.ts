import { Injectable, Pipe } from '@angular/core';
import { IUser } from '../../model/interfaces';
import { delay, map, Observable, of } from 'rxjs';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';

let MY_USER_DB: IUser[] = [
  {id: 'VaCp', firstName: 'Matias',    lastName: 'Candeloro', email:'mcandeloro@gmail.com', password:'123456',createdAt: new Date(),role:'ADMIN', token:'sa5835y6y6sqe6VxARsq'},
  {id: 'Xm7s', firstName: 'Agustin',   lastName: 'Lopez',     email:'alopez@gmail.com',     password:'123456',createdAt: new Date(),role:'USER' , token:'saRsy6sqsqe6e6VxA23f'},
  {id: 'ksRj', firstName: 'Nahuel',    lastName: 'Ortiz',     email:'nortiz@gmail.com',     password:'123456',createdAt: new Date(),role:'USER' , token:'sa58VxA35Rsy6sVxA24f'},
  {id: 'EToz', firstName: 'Gustavo',   lastName: 'Fernandez', email:'gfernandez@gmail.com', password:'123456',createdAt: new Date(),role:'ADMIN', token:'sa5835Rsy6sqe6qe623f'},
  {id: 'vSKX', firstName: 'Francisco', lastName: 'Gutierrez', email:'fgutierrez@gmail.com', password:'123456',createdAt: new Date(),role:'USER' , token:'sa523f835e6VxARss2gf'},
  {id: 'Fd8b', firstName: 'Tomas',     lastName: 'Arevalo',   email:'tarevalo@gmail.com',   password:'123456',createdAt: new Date(),role:'USER' , token:'sa5835Rs5835y6VxAbf5'},
];

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private baseURL= environment.apiBaseURL

  constructor(
    private httpClient:HttpClient
  ) { }
  getUsers():Observable<IUser[]>{
    //return of(MY_USER_DB).pipe(delay(1000));

    return this.httpClient.get<IUser[]>(this.baseURL+'users');
  }


  updateUserById(id:string,update:Partial<IUser>){
    MY_USER_DB=MY_USER_DB.map((user)=>user.id===id? {...user,...update}:user);
    return of(MY_USER_DB).pipe(delay(500));
  }

  removeUserById(id: string ):Observable<IUser[]>{
    MY_USER_DB=MY_USER_DB.filter((user)=> user.id!=id);

    return of(MY_USER_DB).pipe(delay(500));
  }

  insertUser(user:IUser){
    MY_USER_DB= [...MY_USER_DB,{...user,}];
    return of(MY_USER_DB).pipe(delay(500));
  }

  getUserById(id:string): Observable<IUser| undefined>{
    return this.getUsers().pipe(map((users)=> users.find((u)=> u.id===id)));

  }
}
