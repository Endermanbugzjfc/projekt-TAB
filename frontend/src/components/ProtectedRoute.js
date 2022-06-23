import { Navigate } from "react-router-dom";
import { store } from "../actions/store";
import AdminView from "../AdminView";
import EmployeeView from "../EmployeeView";

export const ProtectedRouteLogin = ({children}) => {
    if (!store.getState().persistedReducer.loggedIn) {
      return <Navigate to="/login" replace />;
    }
    return children;
};

export const ProtectedRouteRole = ({children}) => {

    if(process.env.NODE_ENV && process.env.NODE_ENV !== 'development') //check if development build
    if (!store.getState().persistedReducer.loggedIn) {
        return <Navigate to="/login" replace />;
    }
    else if(children.type === AdminView && store.getState().persistedReducer.role !== 'ADMIN')
        return <Navigate to="/" replace />;
    else if(children.type === EmployeeView && store.getState().persistedReducer.role !== 'EMPLOYEE')
        return <Navigate to="/" replace />;
    return children;
};

export const ProtLogin = ({children}) => {
    if(store.getState().persistedReducer.loggedIn)
        return <Navigate to="/" replace />;
    return children
};