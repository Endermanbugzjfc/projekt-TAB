import React from "react";
import Navbar from "./components/Navbar.js";
import "./AdminView.css"

class AdminView extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            Name: "",
            newInfo: {
                Name: '',
                Surname: '',
                BirthDay: '',
                Pesel: '',
                Phone: '',
                PostCode: '',
                City: '',
                HouseNumber: null,
                Street: '',
                Salary: null,
                EmploymentDate: ''
            }
        }

        this.handleTelephoneNumberChange = this.handleTelephoneNumberChange.bind(this);
        this.handlePeselChange = this.handlePeselChange.bind(this);
        this.handleOnCancelClick = this.handleOnCancelClick.bind(this);
        this.handleOnSaveClick = this.handleOnSaveClick.bind(this);
    }

    componentDidMount() {
        this.setState(() => ({
            newInfo: {
                Name: this.state.Name,
                Surname: '',
                BirthDay: '',
                Pesel: '',
                Phone: '',
                PostCode: '',
                City: '',
                HouseNumber: null,
                Street: '',
                Salary: null,
                EmploymentDate: ''
            }
        }))
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
                                {this.AdminData()}
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
                                {this.ManageWorkers("Znajdź mdyfikowanego pracownika poprzez:", "find_modify_employee")}
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

    AdminData(props) {
        return (
            <>
                <div class="row me-5">
                    <div class="my-3">
                        Imię:  <b>-</b>
                    </div>
                </div>
                <div class="row me-5">
                    <div class="my-1">
                        Nazwisko:  <b>-</b>
                    </div>
                </div>
                <div class="row me-5">
                    <div class="my-1">
                        Pesel:  <b>-</b>
                    </div>
                </div>
                <div class="row me-5">
                    <div class="my-3">
                        Numer telefonu: <b>-</b>
                    </div>
                </div>
                <div class="row me-5">
                    <div class="my-1">
                        Adres:  <b>-</b>
                    </div>
                </div>
                <div class="row me-5">
                    <div class="my-1">
                        Data zatrudnienia:  <b>-</b>
                    </div>
                </div>
                <button class="btn btn-secondary mt-3" data-bs-toggle="modal" data-bs-target="#EditPersonalInfo" >Edytuj dane</button>

                <div class="modal fade" id="EditPersonalInfo" data-bs-backdrop="static" tabindex="-1" aria-labelledby="EditPersonalInfoLabel" aria-hidden="true">
                    <div class="modal-dialog modal-lg">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="EditPersonalInfoLabel">Edycja informacji</h5>
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div class="modal-body">
                                <form>
                                    <div class="row">
                                        {this.modalBodyElement("Imię", "text", this.state.newInfo.Name, "Name")}
                                        {this.modalBodyElement("Nazwisko", "text", this.state.newInfo.Surname, "Surname")}
                                    </div>
                                    <div class="row">
                                        {this.modalBodyElement("Telefon", "tel", this.state.newInfo.Phone, "Phone")}
                                        {this.modalBodyElement("Data zatrudnienia", "date", this.state.newInfo.EmploymentDate, "EmploymentDate")}
                                    </div>
                                    <div class="row">
                                        {this.modalBodyElement("Ulica", "text", this.state.newInfo.Street, "Street")}
                                        {this.modalBodyElement("Numer domu", "text", this.state.newInfo.HouseNumber, "HouseNumber")}
                                    </div>
                                    <div class="row">
                                        {this.modalBodyElement("Miasto", "text", this.state.newInfo.City, "City")}
                                        {this.modalBodyElement("Kod pocztowy", "text", this.state.newInfo.PostCode, "PostCode")}
                                    </div>
                                </form>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Anuluj</button>
                                <button type="button" class="btn btn-primary">Zapisz</button>
                            </div>
                        </div>
                    </div>
                </div>


            </>
        )
    }

    modalBodyElement(text, type, value, stateName)
    {
        return(
            <>
                <div class="col">
                    {text} <br/>
                    <input type={type} value={value} placeholder={text}
                        onChange={e => this.setState(prevState => ({
                            newInfo: {
                                ...prevState.newInfo,
                                [stateName]: e.target.value
                            }
                        }))} />
                </div>
            </>
        )
        
    }

    AddNewWorkerForm(role) {
        return(<>
        <div class="mt-3">
            <div class="row">
                {this.FormElement("name", "Imię", "text", "name_input")}
                {this.FormElement("surname", "Nazwisko", "text", "surname_input")}
            </div>
            <div class="row">
                {this.FormElement("street_name", "Ulica", "text", "street_input")}
                {this.FormElement("street_number", "Numer domu/mieszkania", "text", "street_nr_input")}
            </div>
            <div class="row">
                {this.FormElement("zip_code", "Kod pocztowy", "text", "zip_code_input")}
                {this.FormElement("location", "Miejscowość", "text", "location_input")}
            </div>
            <div class="row">
                {this.FormElement("country_code", "Kraj", "text", "country_input")}
                {this.FormElement("phone_number", "Numer telefonu", "tel", "phone_number_input")}
            </div>
            <div class="row">
                {this.FormElement("birth_date", "Data urodzenia", "date", "birth_date_input")}
                {this.FormElement("pesel", "Pesel", "text", "pesel_input")}
            </div>
            {this.FormElement("employment_date", "Data zatrudnienia", "date", "employment_date_input")}
            {this.FormElement("login", "Login(E-Mail)", "text", "login_input")}
            {this.FormElement("password", "Hasło", "text", "password_input")}
            {this.FormElement("password2", "Powtórz sasło", "text", "password2_input")}

            <div class="btn-toolbar" role="toolbar" aria-label="Toolbar with button groups">
                <div class="btn-group me-2" role="group" aria-label="First button">
                    <button type="button" class="btn btn-danger" onClick={this.handleOnCancelClick}>Odrzuć zmiany</button>
                </div>
                <div class="btn-group me-2" role="group" aria-label="Second button">
                    <button type="button" class="btn btn-success" onClick={this.handleOnSaveClick}>Zapisz</button>
                </div>
            </div>
        </div>
        </>
        )
    }

    FormElement(id, span, type, label)
    {
        return(<>
            <div class="col">
                <div class="input-group mb-3">
                    <span class="input-group-text" id={id}>{span}</span>
                    <input type={type} class="form-control" aria-label={label} aria-describedby="inputGroup-sizing-default" />
                </div>
            </div>
        </>)
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

    //TODO: href
    ManageWorkers(text, label)
    {
        return (
            <>
                <div class="mt-3 col">
                    <div class="btn-group">
                        <button type="button" class="btn btn-success dropdown-toggle me-2" data-bs-toggle="dropdown" aria-expanded="false">
                            {text}
                        </button>
                        <ul class="dropdown-menu">
                            <li><a class="dropdown-item" href="#">ID</a></li>
                            <li><a class="dropdown-item" href="#">Imię i nazwisko</a></li>
                            <li><a class="dropdown-item" href="#">Numer PESEL</a></li>
                        </ul>
                        <form class="d-flex">
                            <input class="form-control me-2" type="search" placeholder="Wyszukaj" aria-label={label} />
                            <button class="btn btn-outline-success" type="submit">Szukaj</button>
                        </form>
                    </div>
                </div>
            </>
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

    handleOnSaveClick(e) {
        alert('Hello! handleOnSaveClick() here! Implement me!');
    }
}


export default AdminView