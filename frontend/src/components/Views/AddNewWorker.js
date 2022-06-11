import React from "react";
import api from "../../actions/api";

class AddNewWorker extends React.Component
{
    constructor(props)
    {
        super(props)
        this.state = {
            role: props.role,

            Name: '',
            Surname: '',
            Street: '',
            HouseNumber: '',
            PostCode: '',
            City: '',
            Country: '',
            Phone: '',
            BirthDate: '',
            Pesel: '',
            EmploymentDate: '',
            UserName: '',
            Password1: '',
            Password2: ''
        }
    }

    render()
    {
        return(
            <>
                <div class="mt-3">
                    <form className="needs-validation">
                        <div class="row">
                            {this.FormElement("name", "Imię", "text", "name_input", this.state.Name, "Name")}
                            {this.FormElement("surname", "Nazwisko", "text", "surname_input", this.state.Surname, "Surname")}
                        </div>
                        <div class="row">
                            {this.FormElement("street_name", "Ulica", "text", "street_input", this.state.Street, "Street")}
                            {this.FormElement("street_number", "Numer domu/mieszkania", "text", "street_nr_input", this.state.HouseNumber, "HouseNumber")}
                        </div>
                        <div class="row">
                            {this.FormElement("zip_code", "Kod pocztowy", "text", "zip_code_input", this.state.PostCode, "PostCode")}
                            {this.FormElement("location", "Miejscowość", "text", "location_input", this.state.City, "City")}
                        </div>
                        <div class="row">
                            {this.FormElement("country_code", "Kraj", "text", "country_input", this.state.Country, "Country")}
                            {this.FormElement("phone_number", "Numer telefonu", "tel", "phone_number_input", this.state.Phone, "Phone")}
                        </div>
                        <div class="row">
                            {this.FormElement("birth_date", "Data urodzenia", "date", "birth_date_input", this.state.BirthDate, "BirthDate")}
                            {this.FormElement("pesel", "Pesel", "text", "pesel_input", this.state.Pesel, "Pesel")}
                        </div>
                            {this.FormElement("employment_date", "Data zatrudnienia", "date", "employment_date_input", this.state.EmploymentDate, "EmploymentDate")}
                            {this.FormElement("login", "Login", "text", "login_input", this.state.UserName, "UserName")}
                            {this.FormElement("password", "Hasło", "text", "password_input", this.state.Password1, "Password1")}
                            {this.FormElement("password2", "Powtórz sasło", "text", "password2_input", this.state.Password2, "Password2")}

                        <div class="btn-toolbar" role="toolbar" aria-label="Toolbar with button groups">
                            <div class="btn-group me-2" role="group" aria-label="First button">
                                <button type="button" class="btn btn-danger" onClick={() => this.handleOnCancelClick()}>Odrzuć zmiany</button>
                            </div>
                            <div class="btn-group me-2" role="group" aria-label="Second button">
                                <button type="button" class="btn btn-success" onClick={ () => this.CreateWorker()}>Zapisz</button>
                            </div>
                        </div>
                    </form>
                </div>
            </>
        )
    }

    FormElement(id, span, type, label, value, valueName)
    {
        return(<>
            <div class="col">
                <div class="input-group mb-3">
                    <span class="input-group-text">{span}</span>
                    <input type={type} class="form-control" id={valueName + "Form"+this.state.role} aria-label={label} aria-describedby="inputGroup-sizing-default" value={value} onChange={e =>{this.setState({[valueName]: e.target.value})}} />
                </div>
            </div>
        </>)
    }

    CreateWorker()
    {
        if(this.CheckAddForm())
        {
            var worker = {
                userName: this.state.UserName,
                password: this.state.Password1,
                legalName: this.state.Name,
                surname: this.state.Surname,
                phoneNumber: this.state.Phone,
                type: this.state.role,
                birthDay: this.state.BirthDate,
                pesel: this.state.Pesel,
                employmentDate: this.state.EmploymentDate,
                address : {
                    country: this.state.Country,
                    zipCode: this.state.PostCode,
                    location: this.state.City,
                    streetName: this.state.Street,
                    streetNumber: this.state.HouseNumber
                },
            }

            api.User().register(worker)
            .then(response => {
                if(response.status === 200)
                {
                    this.Cleanup();
                }
                else
                {
                    alert("Coś poszło nie tak w trakcie zapisywania")
                }
                })
            .catch(err => {
                console.log(err)
                alert("Nie udało się dodać nowego prawocnika")
            })

        }
    }

    Cleanup()
    {
        this.setState({UserName: ''});
        this.setState({Password1: ''});
        this.setState({Name: ''});
        this.setState({Surname: ''});
        this.setState({Phone: ''});
        this.setState({role: ''});
        this.setState({BirthDate: ''});
        this.setState({Pesel: ''});
        this.setState({EmploymentDate: ''});
        this.setState({Country: ''});
        this.setState({PostCode: ''});
        this.setState({City: ''});
        this.setState({Street: ''});
        this.setState({HouseNumber: ''});
    }


    CheckOneEntry(id, regex, state)
    {
        if(state.match(regex) == null)
        {
            document.getElementById(id)?.classList.add("is-invalid");
            return false;
        }
        else
        {
            document.getElementById(id).classList.remove("is-invalid");
            return true;
        }
    }

    CheckAddForm()
    {
        var isGood = true;
        isGood = this.CheckOneEntry("NameForm"+this.state.role, /^[a-zA-Z]+$/, this.state.Name) && isGood;
        isGood = this.CheckOneEntry("SurnameForm"+this.state.role, /^[a-zA-Z]+$/, this.state.Surname) && isGood;
        isGood = this.CheckOneEntry("PhoneForm"+this.state.role, /^(\+\d{2})?( )?\d{1,9}$/, this.state.Phone) && isGood;
        isGood = this.CheckOneEntry("StreetForm"+this.state.role, /^[a-zA-Z]+$/, this.state.Street) && isGood;
        isGood = this.CheckOneEntry("HouseNumberForm"+this.state.role, /^\d+(\/{1}\d+)?$/, this.state.HouseNumber) && isGood;
        isGood = this.CheckOneEntry("CityForm"+this.state.role, /^[a-zA-Z]+$/, this.state.City) && isGood;
        isGood = this.CheckOneEntry("PostCodeForm"+this.state.role, /^\d+(-\d+)?$/, this.state.PostCode) && isGood;
        isGood = this.CheckOneEntry("CountryForm"+this.state.role, /^[a-zA-Z]+$/, this.state.Country) && isGood;
        isGood = this.CheckOneEntry("PeselForm"+this.state.role, /^[0-9]{11}$/, this.state.Pesel) && isGood;
        isGood = this.CheckOneEntry("UserNameForm"+this.state.role, /^\w+$/, this.state.UserName) && isGood;

        if(this.state.BirthDate.length < 1)
        {
            document.getElementById("BirthDateForm"+this.state.role)?.classList.add("is-invalid");
            isGood = false;
        }
        else
            document.getElementById("BirthDateForm"+this.state.role).classList.remove("is-invalid");

        if(this.state.EmploymentDate.length < 1)
        {
            document.getElementById("EmploymentDateForm"+this.state.role)?.classList.add("is-invalid");
            isGood = false;
        }
        else
            document.getElementById("EmploymentDateForm"+this.state.role).classList.remove("is-invalid");

        if(this.state.Password1 !== this.state.Password2 || this.state.Password1.length < 1 || this.state.Password2.length < 1)
        {
            document.getElementById("Password1Form"+this.state.role)?.classList.add("is-invalid");
            document.getElementById("Password2Form"+this.state.role)?.classList.add("is-invalid");
            isGood = false;
        }
        else
        {
            document.getElementById("Password1Form"+this.state.role).classList.remove("is-invalid");
            document.getElementById("Password2Form"+this.state.role).classList.remove("is-invalid");
        }
        
        return isGood;
    }

}

export default AddNewWorker