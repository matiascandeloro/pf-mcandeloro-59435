import { Injectable } from '@angular/core';
import { ICourse } from '../../model/interfaces';
import {  concatMap, map, Observable, of } from 'rxjs';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {
  private baseURL= environment.apiBaseURL +'courses';
  constructor(
    private httpClient:HttpClient
  ) { }

  getCourses(): Observable<ICourse[]>{
    return this.httpClient.get<ICourse[]>(this.baseURL);
  }


  updateCourseById(id:string,update:Partial<ICourse>){
    return this.httpClient.patch<ICourse>(this.baseURL+'/'+id,update).pipe(concatMap(()=>this.getCourses()));
  }

  removeCourseById(id: string ):Observable<ICourse[]>{
    return this.httpClient.delete<ICourse>(this.baseURL+'/'+id).pipe(concatMap(()=>this.getCourses()));
  }

  insertCourse(course:ICourse){
    return this.httpClient.post<ICourse>(this.baseURL,{
      ...course,
      active:true,
      createdAt: new Date()
    });
  }

  getCourseById(id:string): Observable<ICourse| undefined>{
    return this.httpClient.get<ICourse>(this.baseURL+'/'+id);
  }
}
