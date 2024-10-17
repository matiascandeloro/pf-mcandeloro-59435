import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import Swal, { SweetAlertIcon, SweetAlertOptions } from 'sweetalert2';

@Injectable({providedIn: 'root'})
export class AlertService{
    private alert$= new Subject<SweetAlertOptions>();

    subscribeToAlerts(): void{
        this.alert$.subscribe({
            next: (opts)=>{
                Swal.fire(opts);
            }
        })
    }


    showAlert( options:SweetAlertOptions){
        this.alert$.next(options);
    }
}