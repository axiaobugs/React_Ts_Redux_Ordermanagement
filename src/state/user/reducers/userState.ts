import { Action } from './../actions';
import { IResponseUser } from "../../../data/user/userModel";
import { UserActionType } from '../action-type';


interface IUserState{
    loading?:boolean;
    error?:string|null;
    data?:IResponseUser;
}

const initialState = {
    loading:false,
    error:null,
    data:null,
}

const userReducer = (state:IUserState=initialState,action:Action):IUserState => {
    switch (action.type){
        case UserActionType.USER_LOGIN_REQUEST:
            return {loading:true,}
        case UserActionType.USER_LOGIN_SUCCESS:
            return {loading:false,data:action.payload}
        case UserActionType.USER_LOGIN_ERROR:
            return {loading:false,error:action.payload}
        default:
            return state;
    }
}

export default userReducer;