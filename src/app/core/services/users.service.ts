import { Injectable, Pipe } from '@angular/core';
import { IUser } from '../../model/interfaces';
import { concat, concatMap, delay, map, Observable, of } from 'rxjs';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { generateRandomString } from '../../shared/utils';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private baseURL= environment.apiBaseURL

  constructor(
    private httpClient:HttpClient
  ) { }
  getUsers():Observable<IUser[]>{
    return this.httpClient.get<IUser[]>(this.baseURL+'users');
  }


  updateUserById(id:string,update:Partial<IUser>){
    return this.httpClient.patch<IUser>(this.baseURL+'users/'+id,update).pipe(concatMap(()=>this.getUsers()));
  }

  removeUserById(id: string ):Observable<IUser[]>{
    return this.httpClient.delete<IUser>(this.baseURL+'users/'+id).pipe(concatMap(()=>this.getUsers()));
  }

  insertUser(user:Omit<IUser, 'id'>): Observable<IUser>{
    return this.httpClient.post<IUser>(this.baseURL+'users',{
      ...user,
      token: generateRandomString(20),
      role: "USER",
      password: 123456,
      createdAt: new Date()
    });
  }

  getUserById(id:string): Observable<IUser| undefined>{
    return this.httpClient.get<IUser>(this.baseURL+'users/'+id);
  }
}
