import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Login from './Login';
import Navbar from './components/Navbar.js';
import {BrowserRouter, Routes, Route} from "react-router-dom"
import UserView from './UserView';
import { Provider } from 'react-redux';
import Products from './Products';
import AdminView from './AdminView';
import EmployeeView from './EmployeeView';
import Register from './Register';
import Basket from './Basket';
import {store} from './actions/store';
import {persistor} from './actions/store'
import {PersistGate} from 'redux-persist/integration/react'
import { ProtectedRouteLogin, ProtectedRouteRole, ProtLogin } from './components/ProtectedRoute';

ReactDOM.render(
    <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={<App/>}/>
                    
                    <Route path="login" element={<ProtLogin><Login/></ProtLogin> }/>

                    <Route path="register" element={<ProtLogin><Register/></ProtLogin>}/>

                    <Route path="user/*" element={<ProtectedRouteLogin><UserView/></ProtectedRouteLogin>}/>

                    <Route path='basket/*' element={<ProtectedRouteLogin><Basket/></ProtectedRouteLogin>}/>

                    <Route path="products/*" element={<Products/>}/>

                    <Route path="admin/*" element={<ProtectedRouteRole><AdminView/></ProtectedRouteRole>}/>

                    <Route path="employee/*" element={<ProtectedRouteRole><EmployeeView/></ProtectedRouteRole>}/>

                    <Route path="*" element={
                        FourOneFour()
                    }>
                    </Route>
                    
                </Routes>
            </BrowserRouter>
        </PersistGate>
    </Provider>,
    document.getElementById('root')
);

export function FourOneFour()
{
    return <><Navbar/><p><h1>404</h1> Site not found</p><p><a href='/'>Go back to the main page</a></p></>
}
