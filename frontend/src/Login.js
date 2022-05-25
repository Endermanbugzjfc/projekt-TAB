import React from "react";
import Navbar from "./components/Navbar.js";
import './Login.css'
import { Link } from "react-router-dom";

class Login extends React.Component
{
    render()
    {
        return(
            <>
                <Navbar/>
                <LoginForm/>
    
            </>
        )
    }
}

function LoginForm()
{
    return(
        <>
            <div class="form-signin top-space">
                <form className="needs-validation">
                    <h1 class="h3 mb-3 fw-normal text-center">Logowanie</h1> 

                    <div class="form-floating">
                        <input type="email" class="form-control" id="floatingInput" placeholder="name@example.com"/>
                        <label for="floatingInput">Adres E-mail</label>
                    </div>
                    <div class="form-floating form-myBox">
                        <input type="password" class="form-control" id="floatingPassword" placeholder="Password"/>
                        <label for="floatingPassword">Hasło</label>
                        <div className="invalid-feedback">Nieprawidłowy e-mail</div>
                    </div>

                    <div class="checkbox mb-4 mt-3">
                        <label>
                            <input type="checkbox" value="remember-me"/> Zapamiętaj mnie
                        </label>
                    </div>
                    <input class="w-100 btn btn-lg btn-primary" type="button" value="Zaloguj się" onClick={CheckLoginForm}/>
                    <p class="mt-3 text-center">Nie masz konta?</p>
                    <Link to="/register">
                        <p class="text-center">Załóż nowe konto</p>
                    </Link>
                </form>
            </div>
        </>
    )
}

function CheckLoginForm()
{
    
}

export default Login