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
                <div class="form-signin top-space">
                    <form className="needs-validation">
                        <h1 class="h3 mb-3 fw-normal text-center">Logowanie</h1> 

                        <div class="form-floating">
                            <input type="email" class="form-control" id="floatingEmail" placeholder="name@example.com" value={this.state.Login} onChange={e => this.handleChange(e, "Login")} />
                            <label for="floatingEmail">Adres E-mail</label>
                            <div className="invalid-feedback">Nieprawidłowy e-mail</div>
                        </div>
                        <div class="form-floating form-myBox">
                            <input type="password" class="form-control" id="floatingPassword" placeholder="Password" value={this.state.Password} onChange={e => this.handleChange(e, "Password")}/>
                            <label for="floatingPassword">Hasło</label>
                            <div className="invalid-feedback">Wpisz haslo</div>
                        </div>

                        <div class="checkbox mb-4 mt-3">
                            <label>
                                <input type="checkbox" value="remember-me"/> Zapamiętaj mnie
                            </label>
                        </div>
                        <input class="w-100 btn btn-lg btn-primary" type="button" value="Zaloguj się" onClick={() => this.CheckLoginForm()}/>
                        <p class="mt-3 text-center">Nie masz konta?</p>
                        <Link to="/register">
                            <p class="text-center">Załóż nowe konto</p>
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
        var EmailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

        var Email =  document.getElementById("floatingEmail");
        var Pass =  document.getElementById("floatingPassword");

        if(this.state.Login.match(EmailRegex) == null)
        {
            allGood = false;
            Email.classList.add("is-invalid")
        }
        else Email.classList.remove("is-invalid")

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

            var testUser = {id: "1", login: "A1", name:"Alvin"}
            store.dispatch(login(testUser))
        }
    }

}

export default Login