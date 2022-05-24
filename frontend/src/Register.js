import React from "react";
import Navbar from "./components/Navbar";
import './Login.css'

class Register extends React.Component
{
    render()
    {
        return(
            <>
                <Navbar/>
                <RegisterForm/>
            </>
        )
    }
}

function RegisterForm()
{
    return(
        <>
            <div class="form-signin top-space">
                <form>
                    <h1 class="h3 mb-3 fw-normal text-center">Rejestracja</h1> 

                    {registerElement("floatingEmail", "email", "Mail", "Adres E-Mail")}
                    {registerElement("floatingName", "text", "Imię", "Imię")}
                    {registerElement("floatingSurname", "text", "Nazwisko", "Nazwisko")}
                    {registerElement("floatingStreet", "text", "Ulica", "Ulica, numer domu i mieszkania")}
                    {registerElement("floatingCity", "text", "Miasto", "Miasto")}
                    {registerElement("floatingPhone", "tel", "Telefon", "Numer telefonu")}

                    <button class="w-100 btn btn-lg btn-primary mt-5" type="submit">Zarejestruj się</button>
                    
                </form>
            </div>
        </>
    )
}

function registerElement(id, type, placeholder, label)
{
    return(
        <>
            <div class="form-floating form-myBox">
                <input type={type} id={id} placeholder={placeholder} class="form-control"/>
                <label for={id}>{label}</label>   
            </div>
        </>
    )
}

export default Register;