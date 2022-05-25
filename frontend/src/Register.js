import React from "react";
import api from "./actions/api";
import Navbar from "./components/Navbar";
import './Register.css'

class Register extends React.Component
{
    constructor(props)
    {
        super(props)
        this.state = {
            Login: "", //<-- Email
            Name: "",
            Surname: "",
            Password: "",
            Password2: "",
            Phone_number: "",
            Street: "",
            City: "",
            ZIPCode: "",
            State: "",

        }
    }

    render()
    {
        return(
            <>
                <Navbar/>
                <div class="form-signup top-space">
                <form>
                    <h1 class="h3 mb-3 fw-normal text-center">Rejestracja</h1> 

                    <div class="row">
                        {this.registerElement("floatingName", "text", "Name", "Imię", this.state.Name)}
                        {this.registerElement("floatingSurname", "text", "Surname", "Nazwisko", this.state.Surname)}
                    </div>
                    <div class="row">
                        {this.registerElement("floatingEmail", "email", "Login", "Adres E-Mail", this.state.Login)}
                        {this.registerElement("floatingPhone", "tel", "Phone_number", "Numer telefonu", this.state.Phone_number)}
                    </div>
                    <div class="row">
                        {this.registerElement("floatingPass", "password", "Password", "Hasło", this.state.Password)}
                        {this.registerElement("floatingPass2", "password", "Password2", "Powtórz hasło", this.state.Password2)}
                    </div>

                    <h1 class="h5 mt-4">Adres</h1>
                    <div class="row">
                        {this.registerElement("floatingStreet", "text", "Street", "Ulica, numer domu i mieszkania", this.state.Street)}
                        {this.registerElement("floatingCity", "text", "City", "Miasto", this.state.City)}
                    </div>
                    <div class="row">
                        {this.registerElement("floatingPost", "text", "ZIPCode", "Kod pocztowy", this.state.ZIPCode)}
                        {this.registerElement("floatingState", "text", "State", "Województwo", this.state.State)}
                    </div>
                    
                    <button class="w-100 btn btn-lg btn-primary mt-5" type="submit">Zarejestruj się</button>
                    
                </form>
            </div>
            </>
        )
    }

    registerElement(id, type, placeholder, label, val)
    {
        return(
            <>
                <div class="col">
                    <div class="form-floating form-myBox">
                        <input type={type} id={id} placeholder={placeholder} value={ val } class="form-control" onChange={e => this.handleChange(e, placeholder) }/>
                        <label for={id}>{label}</label>   
                    </div>
                </div>
            </>
        )
    }

    handleChange(e, val)
    {

        //Dont check things while writing, but at the end!
        // var EmailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/

        // if(val == "Login" && e.target.value.match(EmailRegex) != null)
        //     this.setState({[val]: e.target.value});
        // else if(val === "ZIPCode")
        //     {console.log("Hello?");
        //     if(e.target.value.match(/^\d{2}-\d{3}$/) != null) // <--- Don't check now, but at the end!
        //         this.setState({[val]: e.target.value});}
        // else
            this.setState({[val]: e.target.value});
    }

    checkRegisterForm()
    {
        var allGood = true;
        var EmailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/;

        if(this.state.Login.match(EmailRegex) == null)
        {
            allGood = false
        }
        if(this.state.ZIPCode.match(/^\d{2}-\d{3}$/) == null)
        {
            allGood = false;
        }
        if(this.state.Street.match(/^[a-zA-Z]+ \d+((\/){1}[0-9]+)?$/) == null)
        {
            allGood = false;
        }

        if(allGood)
        {
            var newUser = {
                Login: this.state.Login,
                Password: this.Password.Password,
                Name: this.state.Name,
                Surname: this.state.Surname,
                Address: this.state.ZIPCode + this.state.City + this.state.Street,
                Phone_number: this.state.Phone_number
            }
            api.User().register(newUser);
        }
    }

}



export default Register;