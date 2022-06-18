import React from "react";
import Navbar from "./components/Navbar.js";
import './Login.css'
import { Link } from "react-router-dom";
import api from "./actions/api.js";
import {store} from "./actions/store.js";
import { login } from "./reducers/dUser.js";

class Login extends React.Component
{
    constructor(props)
    {
        super(props)
        this.state = {
            Login: "",
            Password: ""
        }

        if(store.getState().persistedReducer.loggedIn)
            window.location.href = '/'

    }


    render()
    {
        return(
            <>
                <Navbar/>
                {this.LoginForm()}
    
            </>
        )
    }

    LoginForm()
    {
        return(
            <>
                <div className="form-signin top-space">
                    <form className="needs-validation">
                        <h1 className="h3 mb-3 fw-normal text-center">Logowanie</h1> 

                        <div className="form-floating">
                            <input type="text" className="form-control" id="floatingLogin" placeholder="name@example.com" value={this.state.Login} onChange={e => this.handleChange(e, "Login")} />
                            <label htmlFor="floatingLogin">Nazwa użytkownika</label>
                            <div className="invalid-feedback">Nieprawidłowy login</div>
                        </div>
                        <div className="form-floating form-myBox">
                            <input type="password" className="form-control" id="floatingPassword" placeholder="Password" value={this.state.Password} onChange={e => this.handleChange(e, "Password")}/>
                            <label htmlFor="floatingPassword">Hasło</label>
                            <div className="invalid-feedback">Wpisz haslo</div>
                        </div>

                        <div className="checkbox mb-4 mt-3">
                            <label>
                                <input type="checkbox" value="remember-me"/> Zapamiętaj mnie
                            </label>
                        </div>
                        <input className="w-100 btn btn-lg btn-primary" type="button" value="Zaloguj się" onClick={() => this.CheckLoginForm()}/>
                        <p className="mt-3 text-center">Nie masz konta?</p>
                        <Link to="/register">
                            <p className="text-center">Załóż nowe konto</p>
                        </Link>
                    </form>
                </div>
            </>
        )
    }

    handleChange(e, val)
    {
        this.setState({[val]: e.target.value});
    }

    CheckLoginForm()
    {
        var allGood = true;

        var Login = document.getElementById("floatingLogin");
        var Pass =  document.getElementById("floatingPassword");

        if(this.state.Login.match(/^\w+$/) == null)
        {
            allGood = false;
            Login.classList.add("is-invalid")
        }
        else Login.classList.remove("is-invalid")

        if(this.state.Password.length < 1)
        {
            allGood = false;
            Pass.classList.add("is-invalid")
        }
        else 
            Pass.classList.remove("is-invalid");

        if(allGood)
        {

            var User = {
                login: this.state.Login,
                password: this.state.Password
            }

            api.User().login(User);

            var testUser = {id: "1", login: "A1", name:"Alvin", role: 'CUSTOMER'} //TODO: delete this
            store.dispatch(login(testUser))
            window.location.href = '/'
        }
    }

}

export default Login