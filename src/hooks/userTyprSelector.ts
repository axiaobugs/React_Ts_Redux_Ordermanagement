import { TypedUseSelectorHook, useSelector } from "react-redux";
import { RootState } from "../state/user";


export const useTypeSelector:TypedUseSelectorHook<RootState>=useSelector;