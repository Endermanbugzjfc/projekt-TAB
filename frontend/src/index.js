import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Login from './Login';
import Navbar from './Navbar';
import {BrowserRouter, Routes, Route} from "react-router-dom"
import UserView from './UserView';
import { Provider } from 'react-redux';
import {store} from "./actions/store"
import Products from './Products';
import AdminView from './AdminView';
import EmployeeView from './EmployeeView';

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<App/>}/>
                
                <Route path="login" element={<Login/>}/>

                <Route path="user/*" element={<UserView/>}/>

                <Route path="products/*" element={<Products/>}/>

                <Route path="admin/*" element={<AdminView/>}/>

                <Route path="employee/*" element={<EmployeeView/>}/>

                <Route path="*" element={
                    <><Navbar/><p><h1>404</h1> Site not found</p><p><a href='/'>Go back to the main page</a></p></>
                }>
                </Route>
                
            </Routes>
        </BrowserRouter>
    </Provider>,
    document.getElementById('root')
);
