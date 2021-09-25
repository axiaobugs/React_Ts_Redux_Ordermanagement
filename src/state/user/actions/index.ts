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


interface UserCurrentRequestAction{
    type:UserActionType.USER_CURRENT_REQUEST;
}

interface UserCurrentInfoAction{
    type:UserActionType.USER_CURRENT_INFO;
    payload:IResponseUser;
}

interface UserCurrentErrorAction{
    type:UserActionType.USER_CURRENT_ERROR;
    payload:string;
}

export type Action = UserFetchAction
                    |UserFetchSuccessAction
                    |UserFetchErrorAction
                    |UserCurrentRequestAction
                    |UserCurrentInfoAction
                    |UserCurrentErrorAction;