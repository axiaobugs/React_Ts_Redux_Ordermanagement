import { IResponseUser } from "../../../data/user/userModel";
import { UserActionType } from "../action-type";


interface UserFetchAction{
    type:UserActionType.USER_LOGIN_REQUEST;
}

interface UserFetchSuccessAction{
    type:UserActionType.USER_LOGIN_SUCCESS;
    payload:IResponseUser
}

interface UserFetchErrorAction{
    type:UserActionType.USER_LOGIN_ERROR;
    payload:string;
}

export type Action = UserFetchAction|UserFetchSuccessAction|UserFetchErrorAction;