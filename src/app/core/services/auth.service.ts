import { Injectable } from "@angular/core";
import { AuthData } from "../../features/auth/model/interfaces";
import { BehaviorSubject, Observable, of, throwError } from "rxjs";
import { IUser } from "../../model/interfaces";
import { generateRandomString } from "../../shared/utils";
import { Router } from "@angular/router";

const FAKE_USER: IUser={
    email: 'admin@mail.com',
    firstName: 'admin',
    lastName: 'admin',
    id: generateRandomString(4),
    createdAt: new Date(),
    rol: 'ADMIN',
    password: '123456',
    token: 'sa5835Rs5835y6VxAbf5',
}

@Injectable({providedIn:'root'})
export class AuthService{

    private _authUser$=new BehaviorSubject<null|IUser>(null);
    public authUser$=this._authUser$.asObservable();

    constructor(private router:Router){
        
    }

    login(data:AuthData):Observable<IUser>{
        if (data.email!=FAKE_USER.email || data.password!=FAKE_USER.password){
            return throwError(()=>new Error('los datos son invalidos'))
        }
        this._authUser$.next(FAKE_USER);
        localStorage.setItem('token',FAKE_USER.token);

        return of(FAKE_USER);
    }
    logout(){
        this._authUser$.next(null);
        localStorage.removeItem('token');
        this.router.navigate(['auth'])
    }

    verifyToken():Observable<boolean>{
        const isValid=localStorage.getItem('token')===FAKE_USER.token;
        if (isValid){
            this._authUser$.next(FAKE_USER);
        }else{
            this._authUser$.next(null);
        }
        return of(isValid);
    }
}


