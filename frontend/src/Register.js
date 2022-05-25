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
        this.checkRegisterForm = this.checkRegisterForm.bind(this);
    }

    render()
    {
        return(
            <>
                <Navbar/>
                <div className="form-signup top-space">
                <form className="needs-validation">
                    <h1 className="h3 mb-3 fw-normal text-center">Rejestracja</h1> 

                    <div className="row">
                        {this.registerElement("floatingName", "text", "Name", "Imię", this.state.Name, "Musisz podać poprawne imię")}
                        {this.registerElement("floatingSurname", "text", "Surname", "Nazwisko", this.state.Surname, "Musisz podać poprawne nazwisko")}
                    </div>
                    <div className="row">
                        {this.registerElement("floatingEmail", "email", "Login", "Adres E-Mail", this.state.Login, "Musisz podać poprawny mail")}
                        {this.registerElement("floatingPhone", "tel", "Phone_number", "Numer telefonu", this.state.Phone_number, "Musisz podać poprawny numer telefonu (wszystko pisane razem)")}
                    </div>
                    <div className="row">
                        {this.registerElement("floatingPass", "password", "Password", "Hasło", this.state.Password, "Hasło się nie zgadza")}
                        {this.registerElement("floatingPass2", "password", "Password2", "Powtórz hasło", this.state.Password2, "Hasło się nie zgadza")}
                    </div>

                    <h1 className="h5 mt-4">Adres</h1>
                    <div className="row">
                        {this.registerElement("floatingStreet", "text", "Street", "Ulica, numer domu i mieszkania", this.state.Street, "Musisz podać poprawną ulicę")}
                        {this.registerElement("floatingCity", "text", "City", "Miasto", this.state.City, "Musisz podać poprawne miasto")}
                    </div>
                    <div className="row">
                        {this.registerElement("floatingPost", "text", "ZIPCode", "Kod pocztowy", this.state.ZIPCode, "Musisz podać poprawny kod pocztowy")}
                        {this.registerElement("floatingState", "text", "State", "Województwo", this.state.State, "Musisz podać poprawne Województwo")}
                    </div>
                    
                    <input className="w-100 btn btn-lg btn-primary mt-5" type="button" onClick={this.checkRegisterForm} value="Zarejestruj się" />
                    
                </form>
            </div>
            </>
        )
    }

    registerElement(id, type, placeholder, label, val, invalidText)
    {
        return(
            <>
                <div className="col">
                    <div className="form-floating form-myBox">
                        <input type={type} id={id} placeholder={placeholder} value={ val } className="form-control" onChange={e => this.handleChange(e, placeholder) }/>
                        <label htmlFor={id}>{label}</label>
                        <div className="invalid-feedback" id="firstInvalid">{invalidText}</div>
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
        var EmailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        if(this.state.Login.match(EmailRegex) == null)
        {
            allGood = false;
            document.getElementById("floatingEmail").classList.add("is-invalid");
        }
        else document.getElementById("floatingEmail").classList.remove("is-invalid");

        if(this.state.ZIPCode.match(/^\d{2}-\d{3}$/) == null)
        {
            allGood = false;
            document.getElementById("floatingPost").classList.add("is-invalid");
        }
        else document.getElementById("floatingPost").classList.remove("is-invalid");

        if(this.state.Street.match(/^[a-zA-Z]+ \d+((\/){1}[0-9]+)?$/) == null)
        {
            allGood = false;
            document.getElementById("floatingStreet").classList.add("is-invalid");
        }
        else document.getElementById("floatingStreet").classList.remove("is-invalid");

        if(this.state.Phone_number.match(/^(\+\d{2})?( )?\d{1,9}$/) == null)
        {
            allGood = false;
            document.getElementById("floatingPhone").classList.add("is-invalid");
        }
        else document.getElementById("floatingPhone").classList.remove("is-invalid");

        if(this.state.Password !== this.state.Password2 || this.state.Password.length < 1)
        {
            allGood = false;
            document.getElementById("floatingPass").classList.add("is-invalid");
            document.getElementById("floatingPass2").classList.add("is-invalid");
        }
        else 
        {
            document.getElementById("floatingPass").classList.remove("is-invalid");
            document.getElementById("floatingPass2").classList.remove("is-invalid");
        }

        if(this.state.Name.match(/^[a-zA-Z]+$/) == null)
        {
            allGood = false;
            document.getElementById("floatingName").classList.add("is-invalid");
        }
        else document.getElementById("floatingName").classList.remove("is-invalid");

        if(this.state.Surname.match(/^[a-zA-Z]+$/) == null)
        {
            allGood = false;
            document.getElementById("floatingSurname").classList.add("is-invalid");
        }
        else document.getElementById("floatingSurname").classList.remove("is-invalid");

        if(this.state.City.match(/^[a-zA-Z]+$/) == null)
        {
            allGood = false;
            document.getElementById("floatingCity").classList.add("is-invalid");
        }
        else document.getElementById("floatingCity").classList.remove("is-invalid");

        if(this.state.State.match(/^[a-zA-Z]+$/) == null)
        {
            allGood = false;
            document.getElementById("floatingState").classList.add("is-invalid");
        }
        else document.getElementById("floatingState").classList.remove("is-invalid");
        

        if(allGood)
        {
            var newUser = {
                Login: this.state.Login,
                Password: this.state.Password,
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