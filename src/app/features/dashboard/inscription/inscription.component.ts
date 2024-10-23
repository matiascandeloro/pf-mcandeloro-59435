import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { IInscription } from '../../../model/interfaces';
import { InscriptionsService } from '../../../core/services/inscriptions.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertService } from '../../../core/services/alert.service';
import { InscriptionDialogComponent } from './inscription-dialog/inscription-dialog.component';
import { CourseComponent } from '../course/course.component';

@Component({
  selector: 'app-inscription',
  templateUrl: './inscription.component.html',
  styleUrl: './inscription.component.scss'
})
export class InscriptionComponent {
  displayedColumns: string[] = ['id', 'course', 'student','user','createdAt','actions'];
  dataSource: IInscription[]=[];
  isLoading=false;
  constructor(
    private matDialog:MatDialog,
    private inscriptionService:InscriptionsService,
    public alertService:AlertService,
    private router:Router,
    private activatedRoute:ActivatedRoute,)
  { }

  ngOnInit(): void {
    this.loadInscriptions();
  }

  loadInscriptions():void{
    this.isLoading=true;
     this.inscriptionService.getInscription().subscribe({
      next:(inscription)=>{
        this.dataSource=inscription;
        this.isLoading=false;
      },
      error:()=>{
        this.isLoading=false;
      },
      complete:()=>{
        this.isLoading=false;
      },
     });
  }

  onDelete(id: string){
    if (confirm('Esta seguro de eliminar el registro?')){
      this.isLoading=true;
       this.inscriptionService.removeInscriptionById(id).subscribe({
        next: (inscription)=>{
          this.dataSource=inscription;
          this.isLoading=false;
        },
        error:()=>{
          this.isLoading=false;
        },
        complete:()=>{
          this.isLoading=false;
        }
      });
    }
  }

  openModal(editingInscription?:IInscription):void{
    console.log(this.dataSource)
    this.matDialog.open(InscriptionDialogComponent,{
      data:{
        editingInscription
      }
    })
      .afterClosed()
      .subscribe({        
        next:(result)=>{
          console.log( result);
          if (!!result){
            if (editingInscription){
              this.handleUpdate(editingInscription.id,result);
            }else{
              this.handleInsert(result);
            }

          }
        }
      });
  }

  handleUpdate(id: string, update:IInscription):void{
    this.isLoading=true;
    this.inscriptionService.updateInscriptionById(id,update).subscribe({
      next:(inscription)=>{
        this.dataSource=inscription;
        this.isLoading=false;
      },
      error:()=>{
        this.isLoading=false;
      },
      complete:()=>{
        this.isLoading=false;
      }
    });
  }

  handleInsert(insert:IInscription):void{
    this.isLoading=true;
    this.inscriptionService.insertInscription(insert).subscribe({
      next:(inscription)=>{
        this.dataSource=inscription;
        this.isLoading=false;
      },
      error:()=>{
        this.isLoading=false;
      },
      complete:()=>{
        this.isLoading=false;
      }
    })
  }
 

  goToDetail(id:string):void{
    this.router.navigate([id,'detail'],{relativeTo: this.activatedRoute})
  }
}
function deserialize(json: any, student: any): any {
  throw new Error('Function not implemented.');
}

