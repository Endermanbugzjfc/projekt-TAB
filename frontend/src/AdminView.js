import React from "react";
import Navbar from "./components/Navbar.js";
import "./AdminView.css"
import UserInfo from "./components/Views/UserInfo.js";

class AdminView extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
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

        this.handleTelephoneNumberChange = this.handleTelephoneNumberChange.bind(this);
        this.handlePeselChange = this.handlePeselChange.bind(this);
        this.handleOnCancelClick = this.handleOnCancelClick.bind(this);
        this.handleOnSaveClick = this.handleOnSaveClick.bind(this);
    }

    componentDidMount() {
    }

    render() {
        return (
            <>
                <Navbar />
                <div class="back row">
                    <div class="col-3">
                        <div class="list-group" id="list-tab" role="tablist">
                            <a class="list-group-item list-group-item-action active" id="admin_data_list" data-bs-toggle="list" href="#admin_data" role="tab" aria-controls="admin_data">Twoje dane</a>
                            <a class="list-group-item list-group-item-action" id="add_admin_list" data-bs-toggle="list" href="#add_admin" role="tab" aria-controls="add_admin">Załóż nowe konto administratora</a>
                            <a class="list-group-item list-group-item-action" id="add_employee_list" data-bs-toggle="list" href="#add_employee" role="tab" aria-controls="add_employee">Dodaj nowego pracownika do bazy</a>
                            <a class="list-group-item list-group-item-action" id="delete_employee_list" data-bs-toggle="list" href="#delete_employee" role="tab" aria-controls="delete_employee" style={{ color: "red" }}>Usuń konto pracownika z bazy</a>
                            <a class="list-group-item list-group-item-action" id="modify_employee_data_list" data-bs-toggle="list" href="#modify_employee_data" role="tab" aria-controls="modify_employee_data">Zmodyfikuj dane pracownika</a>
                            <a class="list-group-item list-group-item-action" id="delete_customer_list" data-bs-toggle="list" href="#delete_customer" role="tab" aria-controls="delete_customer" style={{ color: "red" }}>Usuń konto klienta z bazy</a>
                        </div>
                    </div>
                    <div class="col">
                        <div class="tab-content" id="nav-tabContent">
                            <div class="tab-pane fade show active" id="admin_data" role="tabpanel" aria-labelledby="admin_data_list">
                                {/* {this.AdminData()} */}
                                <UserInfo/>
                            </div>
                            <div class="tab-pane fade" id="add_admin" role="tabpanel" aria-labelledby="add_admin_list">
                                {this.AddNewWorkerForm("admin")}
                            </div>
                            <div class="tab-pane fade" id="add_employee" role="tabpanel" aria-labelledby="add_employee_list">
                                {this.AddNewWorkerForm("employee")}
                            </div>
                            <div class="tab-pane fade" id="delete_employee" role="tabpanel" aria-labelledby="delete_employee_list">
                                {this.ManageWorkers("Znajdź zwalnianego pracownika poprzez:", "find_delete_employee")}
                            </div>
                            <div class="tab-pane fade" id="modify_employee_data" role="tabpanel" aria-labelledby="modify_employee_data_list">
                                {this.ManageWorkers("Znajdź modyfikowanego pracownika poprzez:", "find_modify_employee")}
                            </div>
                            <div class="tab-pane fade" id="delete_customer" role="tabpanel" aria-labelledby="delete_customer_list">
                                {this.ManageWorkers("Znajdź konto usuwanego klienta poprzez:", "find_delete_customer" )}
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }

    AddNewWorkerForm(role) {
        return(<>
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
                        <button type="button" class="btn btn-success" onClick={ () => this.handleOnSaveClick(role)}>Zapisz</button>
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
                    <input type={type} class="form-control" id={valueName + "Form"} aria-label={label} aria-describedby="inputGroup-sizing-default" value={value} onChange={e =>{this.setState({[valueName]: e.target.value})}} />
                </div>
            </div>
        </>)
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
        isGood = this.CheckOneEntry("NameForm", /^[a-zA-Z]+$/, this.state.Name) && isGood;
        isGood = this.CheckOneEntry("SurnameForm", /^[a-zA-Z]+$/, this.state.Surname) && isGood;
        isGood = this.CheckOneEntry("PhoneForm", /^(\+\d{2})?( )?\d{1,9}$/, this.state.Phone) && isGood;
        isGood = this.CheckOneEntry("StreetForm", /^[a-zA-Z]+$/, this.state.Street) && isGood;
        isGood = this.CheckOneEntry("HouseNumberForm", /^\d+(\/{1}\d+)?$/, this.state.HouseNumber) && isGood;
        isGood = this.CheckOneEntry("CityForm", /^[a-zA-Z]+$/, this.state.City) && isGood;
        isGood = this.CheckOneEntry("PostCodeForm", /^\d+(-\d+)?$/, this.state.PostCode) && isGood;
        isGood = this.CheckOneEntry("CountryForm", /^[a-zA-Z]+$/, this.state.Country) && isGood;
        isGood = this.CheckOneEntry("PeselForm", /^[0-9]{11}$/, this.state.Pesel) && isGood;
        isGood = this.CheckOneEntry("UserNameForm", /^\w+$/, this.state.UserName) && isGood;

        if(this.state.BirthDate.length < 1)
        {
            document.getElementById("BirthDateForm")?.classList.add("is-invalid");
            isGood = false;
        }
        else
            document.getElementById("BirthDateForm").classList.remove("is-invalid");

        if(this.state.EmploymentDate.length < 1)
        {
            document.getElementById("EmploymentDateForm")?.classList.add("is-invalid");
            isGood = false;
        }
        else
            document.getElementById("EmploymentDateForm").classList.remove("is-invalid");

        if(this.state.Password1 !== this.state.Password2 || this.state.Password1.length < 1 || this.state.Password2.length < 1)
        {
            document.getElementById("Password1Form")?.classList.add("is-invalid");
            document.getElementById("Password2Form")?.classList.add("is-invalid");
            isGood = false;
        }
        else
        {
            document.getElementById("Password1Form").classList.remove("is-invalid");
            document.getElementById("Password2Form").classList.remove("is-invalid");
        }
        
        return isGood;

    }


    // TODO: implement displaying employees
    ChoosePersonToDelete(props, employees) {
        employees.map(id => {
            return (
                <>
                    <row>
                        <div class="list-group">
                            <div class="list-group-item list-group-item-action list-group-item-light" onClick={this.Delete(id)}>Here should be name, surname, id and date of employment of employee</div>
                        </div>
                    </row>
                </>
            )
        }
        )
    }

    // TODO: meybe better way to display information about deleting the user?
    Delete(props, id) {
        alert('Użytkownik z id:' + id + ' został usunięty.')
    }

    ManageWorkers(text, label)
    {
        return(
            <div className="mt-3 col">
                <div className="col">
                    <label>{text}</label>
                </div>
                <div className="col">
                    <select>
                        <option>ID</option>
                        <option>Imię i nazwisko</option>
                        <option>Numer PESEL</option>
                    </select>
                    <form className="d-flex my-2">
                        <input class="form-control me-2" type="search" placeholder="Wyszukaj" aria-label={label} />
                        <input class="btn btn-outline-success" type="button" value="Szukaj" onClick={() =>{/*TODO*/}} />
                    </form>
                </div>
            </div>
        )
    }

    // TODO: implement displaying employees
    ChoosePersonToModifyData(props, employees) {
        employees.map(id => {
            return (
                <>
                    <row>
                        <div class="list-group">
                            <div class="list-group-item list-group-item-action list-group-item-light" onClick={this.Modify(id)}>Here should be name, surname, id and date of employment of employee</div>
                        </div>
                    </row>
                </>
            )
        }
        )
    }

    // TODO: implement displaying customers
    ChooseCustomerToDelete(props, customers) {
        customers.map(id => {
            return (
                <>
                    <row>
                        <div class="list-group">
                            <div class="list-group-item list-group-item-action list-group-item-light" onClick={this.DeleteCustomerAccount(id)}>Here should be name, surname and id of customer</div>
                        </div>
                    </row>
                </>
            )
        }
        )
    }


    handleTelephoneNumberChange(e) {
        if (e.target.value.match(/^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/) != null) {
            this.setState({ Phone: e.target.value });
        }
    }

    handlePeselChange(e) {
        if (e.target.value.match(/[0-9]{11}$/) != null) {
            this.setState({ Pesel: e.target.value });
        }
    }

    // TODO -> Implement all functions below
    handleOnCancelClick(e) {
        alert('Hello! handleOnCancelClick() here! Implement me!');
    }

    handleOnSaveClick(role) {
        
       if(this.CheckAddForm()) alert('Good!');
        

    }
}


export default AdminView