export interface Student {
    name: string;
    lastname: string;
    email: string;
}


export interface Course {
    name: string;
    description: string;
    active:boolean;
}

export interface User{
    id:string;
    firstName: string;
    lastName: string;
    email:string;
    createdAt: Date;
}