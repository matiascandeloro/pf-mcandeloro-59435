export interface IStudent {
    id:string;
    firstName: string;
    lastName: string;
    email: string;
    createdAt: Date;
}


export interface ICourse {
    id:string;
    name: string;
    description: string;
    active:boolean;
    createdAt: Date;
}

export interface IInscription{
    id: string;
    course:ICourse;
    student:IStudent;
    user:IUser;
    createdAt: Date;
}

export interface IClass{
    id:string;
    name: string;
    descripcion: string;
    active:boolean;
    createdAt: Date;
}

export interface IUser{
    id:string;
    firstName: string;
    lastName: string;
    email:string;
    password:string;
    role: 'ADMIN'| 'USER';
    createdAt: Date;
    token: string;
}