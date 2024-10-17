export interface Student {
    name: string;
    lastname: string;
    email: string;
}


export interface Course {
    id:string;
    name: string;
    description: string;
    active:boolean;
    createdAt: Date;
}

export interface User{
    id:string;
    firstName: string;
    lastName: string;
    email:string;
    createdAt: Date;
}