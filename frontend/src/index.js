import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Login from './Login';
import Navbar from './Navbar';
import {BrowserRouter, Routes, Route} from "react-router-dom"

ReactDOM.render(
    <BrowserRouter>
        <Routes>
            <Route path='/' element={<App/>}/>
            
            <Route path="login" element={<Login/>}/>

            <Route path="*" element={
                <><Navbar/><p><h1>404</h1> Site not found</p><p><a href='/'>Go back to the main page</a></p></>
            }>
            </Route>
            
        </Routes>
    </BrowserRouter>,
    document.getElementById('root')
);
