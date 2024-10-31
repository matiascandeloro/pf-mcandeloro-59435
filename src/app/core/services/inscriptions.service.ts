import { Injectable } from '@angular/core';
import { IInscription, IStudent } from '../../model/interfaces';
import { Observable } from 'rxjs/internal/Observable';
import { of } from 'rxjs/internal/observable/of';
import { map } from 'rxjs/internal/operators/map';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { concatMap } from 'rxjs/internal/operators/concatMap';


@Injectable({
  providedIn: 'root'
})
export class InscriptionsService {

  private baseURL= environment.apiBaseURL +'inscriptions';
  db_inscription_filter: IInscription[] =[];
  constructor(
    private httpClient:HttpClient
  ) { }

  getInscriptions():Observable<IInscription[]>{
    return this.httpClient.get<IInscription[]>(this.baseURL+'?_embed=student&_embed=course&_embed=user');
  }

  updateInscriptionById(id:string,update:Partial<IInscription>){
    return this.httpClient.patch<IInscription>(this.baseURL+'/'+id,update).pipe(concatMap(()=>this.getInscriptions()));
  }

  removeInscriptionById(id: string ):Observable<IInscription[]>{
    return this.httpClient.delete<IInscription>(this.baseURL+'/'+id).pipe(concatMap(()=>this.getInscriptions()));
  }

  insertInscription(inscription:IInscription){
    console.log(inscription);
    return this.httpClient.post<IInscription>(this.baseURL,{
      studentId:inscription.studentId,
      courseId:inscription.courseId,
      userId:inscription.userId,
      createdAt: new Date()
    });
  }

  removeInscriptionByStudentCourse(idStudent?: string, idCourse?: string ):Observable<IInscription[]>{
    // console.log(MY_INSCRIPTION_DB, idStudent, idCourse);
    // MY_INSCRIPTION_DB=MY_INSCRIPTION_DB.filter((inscription)=> inscription.courseId!=idCourse || inscription.studentId!=idStudent);
    // console.log(MY_INSCRIPTION_DB);
    // return of(MY_INSCRIPTION_DB);
    return of();
  }

  getInscriptionById(id:string): Observable<IInscription| undefined>{
    return this.httpClient.get<IInscription>(this.baseURL+'/'+id);

  }
  getInscriptionByStudent(idStudent?:string ): Observable<IInscription[]>{
    // this.db_inscription_filter=MY_INSCRIPTION_DB.filter((inscription)=> inscription.studentId===idStudent);
    // return of(this.db_inscription_filter);
    // //return this.httpClient.get<IInscription>(this.baseURL+'/'+id);
    return of();
  }
  getInscriptionByCourse(idCourse?:string): Observable<IInscription[]>{
    // this.db_inscription_filter=MY_INSCRIPTION_DB.filter((inscription)=> inscription.courseId===idCourse);
    // return of(this.db_inscription_filter);
    return of();
  }


}