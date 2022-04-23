import {combineReducers} from "redux"
import {dUser} from "./dUser"
import { dProduct } from "./dProduct"

export const reducers = combineReducers({
    dProduct, dUser
})