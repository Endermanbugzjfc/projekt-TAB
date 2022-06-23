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
            Login: "",
            Name: "",
            Surname: "",
            Password: "",
            Password2: "",
            Phone_number: "",
            Street: "",
            HouseNumber: '',
            City: "",
            ZIPCode: "",
            Country: "",

        }
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
                        {this.registerElement("floatingLogin", "text", "Login", "Nazwa użytkownika", this.state.Login, "Musisz podać poprawną nazwę użytkownika")}
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
                        {this.registerElement("floatingCountry", "text", "Country", "Kraj", this.state.Country, "Musisz podać poprawny kraj")}
                    </div>
                    
                    <input className="w-100 btn btn-lg btn-primary mt-5" type="button" onClick={() => this.checkRegisterForm()} value="Zarejestruj się" />
                    
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
        this.setState({[val]: e.target.value});
    }

    addInvalid(element)
    {
        element.classList.add("is-invalid");
    }
    removeInvalid(element)
    {
        element.classList.remove("is-invalid");
    }

    checkRegisterForm()
    {
        var allGood = true;


        var Login =  document.getElementById("floatingLogin");
        var ZIPCode =  document.getElementById("floatingPost");
        var Street = document.getElementById("floatingStreet");
        var Phone = document.getElementById("floatingPhone");
        var Pass = document.getElementById("floatingPass");
        var Pass2 = document.getElementById("floatingPass")
        var Name = document.getElementById("floatingName");
        var Surname = document.getElementById("floatingSurname");
        var City = document.getElementById("floatingCity");
        var Country = document.getElementById("floatingCountry");

        if(this.state.Login.match(/^\w+$/) == null)
        {
            allGood = false;
            this.addInvalid(Login);
        }
        else this.removeInvalid(Login);

        if(this.state.ZIPCode.match(/^\d{2}-\d{3}$/) == null)
        {
            allGood = false;
            this.addInvalid(ZIPCode);
        }
        else this.removeInvalid(ZIPCode);

        if(this.state.Street.match(/^[a-zA-Z]+$/) == null)
        {
            allGood = false;
            this.addInvalid(Street);
        }
        else this.removeInvalid(Street);

        if(this.state.Phone_number.match(/^(\+\d{2})?( )?\d{1,9}$/) == null)
        {
            allGood = false;
            this.addInvalid(Phone);
        }
        else this.removeInvalid(Phone);

        if(this.state.Password !== this.state.Password2 || this.state.Password.length < 1)
        {
            allGood = false;
            this.addInvalid(Pass);
            this.addInvalid(Pass2);
        }
        else 
        {
            this.removeInvalid(Pass);
            this.removeInvalid(Pass2);
        }

        if(this.state.Name.match(/^[a-zA-Z]+$/) == null)
        {
            allGood = false;
            this.addInvalid(Name);
        }
        else this.removeInvalid(Name);

        if(this.state.Surname.match(/^[a-zA-Z]+$/) == null)
        {
            allGood = false;
            this.addInvalid(Surname);
        }
        else this.removeInvalid(Surname);

        if(this.state.City.match(/^[a-zA-Z]+$/) == null)
        {
            allGood = false;
            this.addInvalid(City);
        }
        else this.removeInvalid(City);

        if(this.state.Country.match(/^[a-zA-Z]+$/) == null)
        {
            allGood = false;
            this.addInvalid(Country);
        }
        else this.removeInvalid(Country);
        

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
            api.User().register(newUser).catch(err => console.log(err));
        }
    }

}



export default Register;