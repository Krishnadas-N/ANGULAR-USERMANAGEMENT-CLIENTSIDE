

export interface User{
    id:string,
    username:string,
    firstname:string,
    lastname:string,
    email:string,
    profileImage:string,
    isAdmin:boolean
}

export interface LoginedUserInfo{
    user:User;
    errorMessage:string
}

export interface UserLogin{
    email:string,
    password:string
}