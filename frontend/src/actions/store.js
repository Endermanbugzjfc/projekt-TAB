import {configureStore} from "@reduxjs/toolkit"
import UserReducer from "../reducers/dUser"
import {persistStore, persistReducer} from "redux-persist"
import storage from "redux-persist/lib/storage"

const persistConfig = {
    key: 'root',
    storage
}

const persistedReducer = persistReducer(persistConfig, UserReducer)

const store = configureStore(
    {
        reducer: { persistedReducer }
    })
const persistor = persistStore(store)
export {persistor, store}
