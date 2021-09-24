import { combineReducers } from "redux";
import { userStore } from "..";
import userReducer from "./userState";

const userReducers = combineReducers({
    userState:userReducer,
})

export default userReducers;
export type RootState = ReturnType<typeof userStore.getState>;