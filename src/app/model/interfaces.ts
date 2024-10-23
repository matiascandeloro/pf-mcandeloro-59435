export interface IStudent {
    name: string;
    lastname: string;
    email: string;
}


export interface ICourse {
    id:string;
    name: string;
    description: string;
    active:boolean;
    createdAt: Date;
}

export interface IClass{
    id:string;
    name: string;
    descripcion: string;
    active:boolean;
    createdAt: Date;
}

export interface User{
    id:string;
    firstName: string;
    lastName: string;
    email:string;
    rol: 'ADMIN'| 'USER';
    createdAt: Date;
}