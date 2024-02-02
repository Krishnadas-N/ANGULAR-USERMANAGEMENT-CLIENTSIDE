export interface Login{
    email:string,
    password:string
}

export interface LoginResponse {
    success: boolean;
    status: number;
    message: string;
    data: {
      isAdmin: boolean;
      token: string;
      user: {};
    };
  }
  

export interface SignupType{
    firstname:string,
    lastname:string,
    email:string,
    password:string,
    username:string
}

export interface ProfileResponse {
    success: boolean;
    status: number;
    message: string;
    data: {
      email: string;
      firstName: string;
      id: string;
      lastname: string;
      profileImage: string;
    };
  }

  export interface userData {
    username:string,
    email: string;
    firstName: string;
    id: string;
    lastname: string;
    profileImage: string;
    isAdmin:boolean
  }
  