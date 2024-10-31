import { Injectable } from '@angular/core';
import { IStudent } from '../../model/interfaces';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { concatMap } from 'rxjs/internal/operators/concatMap';


@Injectable({
  providedIn: 'root'
})
export class StudentsService {

  private baseURL= environment.apiBaseURL +'students';

  constructor(
    private httpClient:HttpClient
  ) { }
  getStudents():Observable<IStudent[]>{
    return this.httpClient.get<IStudent[]>(this.baseURL);
  }


  updateStudentById(id:string,update:Partial<IStudent>){
    return this.httpClient.patch<IStudent>(this.baseURL+'/'+id,update).pipe(concatMap(()=>this.getStudents()));
  }

  removeStudentById(id: string ):Observable<IStudent[]>{
    return this.httpClient.delete<IStudent>(this.baseURL+'/'+id).pipe(concatMap(()=>this.getStudents()));
  }

  insertStudent(student:IStudent){
    return this.httpClient.post<IStudent>(this.baseURL,{
      ...student,
      createdAt: new Date()
    });
  }

  getStudentById(id:string): Observable<IStudent| undefined>{
    return this.httpClient.get<IStudent>(this.baseURL+'/'+id);
  }
}

