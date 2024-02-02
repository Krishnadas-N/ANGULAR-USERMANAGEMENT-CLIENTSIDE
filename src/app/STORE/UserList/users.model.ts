

export interface User{
        _id:string,
        username:string,
        firstname:string,
        lastname:string,
        email:string,
        profileImage:string,
        isAdmin:boolean
}

export interface SignedUsers{
    users:User[],
    errorMessage:string
}