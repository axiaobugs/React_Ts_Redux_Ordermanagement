interface ILogin{
    username:string,
    password:string
}

export interface IResponseUser{
    email:string,
    employeeId:number,
    id:number,
    roles:string[],
    token:string,
    username:string
}
export default ILogin;