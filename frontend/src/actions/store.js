import {configureStore} from "@reduxjs/toolkit"
import UserReducer from "../reducers/dUser"



export const store = configureStore(
    {
        reducer: {
            user: UserReducer
        }
    }
)