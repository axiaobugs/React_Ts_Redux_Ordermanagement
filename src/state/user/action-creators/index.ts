import {UserActionType} from "../action-type"
import ILogin from '../../../data/user/userModel'
import axios from "axios"
import { ThunkAction, ThunkDispatch } from "redux-thunk"
import { RootState } from "../reducers"
import {AnyAction} from 'redux'
import Api from "../../../utils/api"

export const login=(loginUser:ILogin):ThunkAction<Promise<void>,RootState,unknown,AnyAction>=>{
    return async (dispatch:ThunkDispatch<RootState,unknown,AnyAction>):Promise<void> => {
        dispatch({
            type:UserActionType.USER_LOGIN_REQUEST,
        });
        try {
            const {data} = await axios.post("http://localhost:5000/api/account/login",loginUser)
            dispatch({
                type:UserActionType.USER_LOGIN_SUCCESS,
                payload:data,
            })
        } catch (error:any) {
            dispatch({
                type:UserActionType.USER_LOGIN_ERROR,
                payload:error.message
            })
        }
    }
}

export const logout=():ThunkAction<Promise<void>,RootState,unknown,AnyAction>=>
    async (dispatch:ThunkDispatch<RootState,unknown,AnyAction>):Promise<void> =>{
        localStorage.removeItem('token')
        dispatch({
            type:UserActionType.USER_LOGOUT
        })       
}

export const getCurrentUserWithJWT=():ThunkAction<Promise<void>,RootState,unknown,AnyAction>=>
async (dispatch:ThunkDispatch<RootState,unknown,AnyAction>):Promise<void> =>{
    try {
        const {data} =await axios.get(Api.baseUrl+"account/user")
        dispatch({
            type:UserActionType.USER_CURRENT_INFO,
            payload:data
        })
    } catch (error) {
        dispatch({
            type:UserActionType.USER_CURRENT_ERROR,
            payload:error.message
        })
    }
    

}