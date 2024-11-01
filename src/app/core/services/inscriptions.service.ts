import { Injectable, Pipe } from '@angular/core';
import { ICourse, IInscription, IStudent, IUser } from '../../model/interfaces';
import { Observable } from 'rxjs/internal/Observable';
import { of } from 'rxjs/internal/observable/of';
import { map } from 'rxjs/internal/operators/map';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { concatMap } from 'rxjs/internal/operators/concatMap';
import { waitForAsync } from '@angular/core/testing';


@Injectable({
  providedIn: 'root'
})
export class InscriptionsService {

  private baseURL= environment.apiBaseURL +'inscriptions';
  db_inscription_filter: IInscription[] =[];

  inscripIdToDel:string='';


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
  
    return this.httpClient.post<IInscription>(this.baseURL,{
      studentId:inscription.studentId,
      courseId:inscription.courseId,
      userId:inscription.userId,
      createdAt: new Date()
    });
  }

  insertInscriptionbyStudentCourse(studentid:string, courseid:string, userid:string){
    return this.httpClient.post<IInscription>(this.baseURL,{
      studentId:studentid,
      courseId:courseid,
      userId:userid,
      createdAt: new Date()
    });
    
  }

  getInscriptionById(id:string): Observable<IInscription| undefined>{
    return this.httpClient.get<IInscription>(this.baseURL+'/'+id);

  }

  // removeInscriptionByStudentCourse(idStudent?: string, idCourse?: string ):Observable<IInscription[]>{
  //   this.httpClient.get<IInscription[]>(this.baseURL+'?studentId='+idStudent+'&courseId='+idCourse).subscribe({
  //     next:(inscription)=>{
  //       this.inscripIdToDel=inscription[0].id;
  //       //return this.httpClient.delete<IInscription>(this.baseURL+'/'+inscription[0].id).pipe(concatMap(()=>this.getInscriptions()));
  //       //return this.removeInscriptionById(inscription[0].id);
  //     }
  //   });
  //   return of()
  // }

  getInscriptionByStudentCourse(idStudent?: string, idCourse?: string ):string{
    this.httpClient.get<IInscription[]>(this.baseURL+'?studentId='+idStudent+'&courseId='+idCourse).subscribe({
      next:(inscription)=>{
        this.inscripIdToDel=inscription[0].id;
        //return this.httpClient.delete<IInscription>(this.baseURL+'/'+inscription[0].id).pipe(concatMap(()=>this.getInscriptions()));
        //return this.removeInscriptionById(inscription[0].id);
      }
    });
    console.log(this.inscripIdToDel)
    return this.inscripIdToDel
  }

  getInscriptionByStudent(idStudent?:string ): Observable<IInscription[]>{
    return this.httpClient.get<IInscription[]>(this.baseURL+'/?_embed=student&_embed=course&_embed=user&studentId='+idStudent);
  }

  getInscriptionByCourse(idCourse?:string): Observable<IInscription[]>{
    return this.httpClient.get<IInscription[]>(this.baseURL+'/?_embed=student&_embed=course&_embed=user&courseId='+idCourse);
  }


}