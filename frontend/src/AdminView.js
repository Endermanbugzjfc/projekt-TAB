import React from "react";
import Navbar from "./components/Navbar.js";
import "./AdminView.css"

class AdminView extends React.Component{

    constructor(props){
        super(props);

        this.state = {
            Name: "Alberto",
            newInfo : {
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

    componentDidMount(){
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

    render(){
        return(
            <>
                 <Navbar/>
                <div class="back row">
                    <div class="col-3">
                        <div class="list-group" id="list-tab" role="tablist">
                            <a class="list-group-item list-group-item-action active" id="admin_data_list" data-bs-toggle="list" href="#admin_data" role="tab" aria-controls="admin_data">Twoje dane</a>
                            <a class="list-group-item list-group-item-action" id="add_admin_list"  data-bs-toggle="list" href="#add_admin" role="tab" aria-controls="add_admin">Załóż nowe konto administratora</a>
                            <a class="list-group-item list-group-item-action" id="add_employee_list"  data-bs-toggle="list" href="#add_employee" role="tab" aria-controls="add_employee">Dodaj nowego pracownika do bazy</a>
                            <a class="list-group-item list-group-item-action" id="delete_employee_list"  data-bs-toggle="list" href="#delete_employee" role="tab" aria-controls="delete_employee" style={{color: "red"}}>Usuń konto pracownika z bazy</a>
                            <a class="list-group-item list-group-item-action" id="modify_employee_data_list"  data-bs-toggle="list" href="#modify_employee_data" role="tab" aria-controls="modify_employee_data">Zmodyfikuj dane pracownika</a>
                            <a class="list-group-item list-group-item-action" id="delete_customer_list"  data-bs-toggle="list" href="#delete_customer" role="tab" aria-controls="delete_customer" style={{color: "red"}}>Usuń konto klienta z bazy</a>
                        </div>
                    </div>
                    <div class="col">
                        <div class="tab-content" id="nav-tabContent">
                            <div class="tab-pane fade show active" id="admin_data" role="tabpanel" aria-labelledby="admin_data_list">
                                {this.AdminData()}
                            </div>
                            <div class="tab-pane fade" id="add_admin" role="tabpanel" aria-labelledby="add_admin_list">
                                {this.AddAdmin()}
                            </div>
                            <div class="tab-pane fade" id="add_employee" role="tabpanel" aria-labelledby="add_employee_list">
                                {this.AddEmployee()}
                            </div>
                            <div class="tab-pane fade" id="delete_employee" role="tabpanel" aria-labelledby="delete_employee_list">
                                {this.DeleteEmployee()}
                            </div>
                            <div class="tab-pane fade" id="modify_employee_data" role="tabpanel" aria-labelledby="modify_employee_data_list">
                                {this.ModifyEmployeeData()}
                            </div>
                            <div class="tab-pane fade" id="delete_customer" role="tabpanel" aria-labelledby="delete_customer_list">
                                {this.DeleteCustomerAccount()}
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }
    
    AdminData(props){
        return(
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
                                        <div class="col">
                                            Imie<br/>
                                            <input type="text" value={this.state.newInfo.Name} placeholder="Imię" maxLength="50"
                                             onChange={e => this.setState(prevState => ({
                                                newInfo: {
                                                    ...prevState.newInfo,
                                                    Name: e.target.value
                                                }   
                                            }))}/>
                                        </div>
                                        <div class="col">
                                            Nazwisko<br/>
                                            <input type="text" value={this.state.newInfo.Surname} placeholder="Nazwisko" maxLength="50"
                                             onChange={e => this.setState(prevState => ({
                                                newInfo: {
                                                    ...prevState.newInfo,
                                                    Surname: e.target.value
                                                }   
                                            }))}/>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col">
                                            Telefon<br/>
                                            <input type="text"  value={this.state.newInfo.Phone} placeholder="Numer telefonu" maxLength="19"
                                             onChange={e => this.setState(prevState => ({
                                                newInfo: {
                                                    ...prevState.newInfo,
                                                    Phone: e.target.value
                                                }   
                                            }))}/>
                                        </div>
                                    <div class="col">
                                        Data zatrudnienia<br/>
                                        <input type="date"  value={this.state.newInfo.EmploymentDate}
                                            onChange={e => this.setState(prevState => ({
                                                newInfo: {
                                                    ...prevState.newInfo,
                                                    EmploymentDate: e.target.value
                                                }   
                                            }))}/>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col">
                                            Ulica<br/>
                                            <input type="text"  value={this.state.newInfo.Street} placeholder="Ulica"
                                             onChange={e => this.setState(prevState => ({
                                                newInfo: {
                                                    ...prevState.newInfo,
                                                    Street: e.target.value
                                                }   
                                            }))}/>
                                        </div>
                                        <div class="col">
                                            Numer domu<br/>
                                            <input type="text"  value={this.state.newInfo.HouseNumber} placeholder="Numer domu" maxLength="7"
                                             onChange={e => this.setState(prevState => ({
                                                newInfo: {
                                                    ...prevState.newInfo,
                                                    HouseNumber: e.target.value
                                                }   
                                            }))}/>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col">
                                            Miasto<br/>
                                            <input type="text"  value={this.state.newInfo.City} placeholder="Miasto" maxLength="30"
                                             onChange={e => this.setState(prevState => ({
                                                newInfo: {
                                                    ...prevState.newInfo,
                                                    City: e.target.value
                                                }   
                                            }))}/>
                                        </div>
                                        <div class="col">
                                            Kod pocztowy<br/>
                                            <input type="text"  value={this.state.newInfo.PostCode} placeholder="Kod pocztowy" maxLength="6"
                                             onChange={e => this.setState(prevState => ({
                                                newInfo: {
                                                    ...prevState.newInfo,
                                                    PostCode: e.target.value
                                                }   
                                            }))}/>
                                        </div>
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

    AddAdmin(props){
        return(
            <>
            <div class= "row">
                <div class="col">
                    <div class="input-group mb-3">
                        <span class="input-group-text" id="name">Imię</span>
                        <input type="text" class="form-control" aria-label="name_input" aria-describedby="inputGroup-sizing-default"/>
                    </div>
                </div>
                <div class="col">
                    <div class="input-group mb-3">
                        <span class="input-group-text" id="surname">Nazwisko</span>
                        <input type="text" class="form-control" aria-label="surname_input" aria-describedby="inputGroup-sizing-default"/>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col">
                        <div class="input-group mb-3">
                            <span class="input-group-text" id="street_name">Ulica</span>
                            <input type="text" class="form-control" aria-label="street_input" aria-describedby="inputGroup-sizing-default"/>
                        </div>
                    </div>
                    <div class="col">
                    <div class="input-group mb-3">
                        <span class="input-group-text" id="street_number">Numer domu/mieszkania</span>
                        <input type="text" class="form-control" aria-label="street_nr_input" aria-describedby="inputGroup-sizing-default"/>
                    </div>
                </div>
                </div>
                <div class="row">
                    <div class="col">
                        <div class="input-group mb-3">
                            <span class="input-group-text" id="zip_code">Kod pocztowy</span>
                            <input type="text" class="form-control " aria-label="zip_code_input" aria-describedby="inputGroup-sizing-small"/>
                        </div>
                    </div>
                    <div class="col">
                        <div class="input-group mb-3">
                             <span class="input-group-text" id="location">Miejscowość</span>
                            <input type="text" class="form-control" aria-label="location_input" aria-describedby="inputGroup-sizing-default"/>
                        </div>
                    </div>
                </div>
                <div class="input-group mb-3">
                    <span class="input-group-text" id="country">Kraj</span>
                    <input type="text" class="form-control" aria-label="country_input" aria-describedby="inputGroup-sizing-default"/>
                </div>
                <div class="input-group mb-3">
                    <span class="input-group-text" id="phone_number">Numer telefonu</span>
                    <input type="text" class="form-control" aria-label="phone_number_input" aria-describedby="inputGroup-sizing-default" value={this.state.Phone} onChange={this.handlePhoneNumberChange}/>
                </div>
                <div class="row">
                    <div class="col">
                        <div class="input-group mb-3">
                            <span class="input-group-text" id="birth_date">Data urodzenia</span>
                            <input type="date" class="form-control" aria-label="birth_date_input" aria-describedby="inputGroup-sizing-default"/>
                        </div>
                    </div>
                    <div class="col">
                        <div class="input-group mb-3">
                            <span class="input-group-text" id="pesel">Pesel</span>
                            <input type="text" inputmode="numeric" class="form-control" aria-label="pesel_input" aria-describedby="inputGroup-sizing-default" value={this.state.Pesel} onChange={this.handlePeselChange}/>
                        </div>
                    </div>
                </div>
                <div class="input-group mb-3">
                    <span class="input-group-text" id="employment_date">Data zatrudnienia</span>
                    <input type="date" class="form-control" aria-label="employee_date_input" aria-describedby="inputGroup-sizing-default"/>
                </div>
                <div class="input-group mb-3">
                    <span class="input-group-text" id="login">Login</span>
                    <input type="text" class="form-control" aria-label="login_input" aria-describedby="inputGroup-sizing-default"/>
                </div>
                <div class="input-group mb-3">
                    <span class="input-group-text" id="password">Hasło</span>
                    <input type="password" class="form-control" aria-label="password_input" aria-describedby="inputGroup-sizing-default"/>
                </div>
                <div class="input-group mb-3">
                    <span class="input-group-text" id="confirm_password">Powtórz hasło</span>
                    <input type="password" class="form-control" aria-label="confirm_password_input" aria-describedby="inputGroup-sizing-default"/>
                </div>

                <div class="btn-toolbar" role="toolbar" aria-label="Toolbar with button groups">
                    <div class="btn-group me-2" role="group" aria-label="First button">
                        <button type="button" class="btn btn-danger" onClick={this.handleOnCancelClick}>Odrzuć zmiany</button>
                    </div>
                    <div class="btn-group me-2" role="group" aria-label="Second button">
                        <button type="button" class="btn btn-success" onClick={this.handleOnSaveClick}>Zapisz</button>
                    </div>
                </div>
            </>
        )
    }
    

    AddEmployee(props){
        return(
            <>
                <div class= "row">
                <div class="col">
                    <div class="input-group mb-3">
                        <span class="input-group-text" id="name">Imię</span>
                        <input type="text" class="form-control" aria-label="name_input" aria-describedby="inputGroup-sizing-default"/>
                    </div>
                </div>
                <div class="col">
                    <div class="input-group mb-3">
                        <span class="input-group-text" id="surname">Nazwisko</span>
                        <input type="text" class="form-control" aria-label="surname_input" aria-describedby="inputGroup-sizing-default"/>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col">
                        <div class="input-group mb-3">
                            <span class="input-group-text" id="street_name">Ulica</span>
                            <input type="text" class="form-control" aria-label="street_input" aria-describedby="inputGroup-sizing-default"/>
                        </div>
                    </div>
                    <div class="col">
                    <div class="input-group mb-3">
                        <span class="input-group-text" id="street_number">Numer domu/mieszkania</span>
                        <input type="text" class="form-control" aria-label="street_nr_input" aria-describedby="inputGroup-sizing-default"/>
                    </div>
                </div>
                </div>
                <div class="row">
                    <div class="col">
                        <div class="input-group mb-3">
                            <span class="input-group-text" id="zip_code">Kod pocztowy</span>
                            <input type="text" class="form-control " aria-label="zip_code_input" aria-describedby="inputGroup-sizing-small"/>
                        </div>
                    </div>
                    <div class="col">
                        <div class="input-group mb-3">
                             <span class="input-group-text" id="location">Miejscowość</span>
                            <input type="text" class="form-control" aria-label="location_input" aria-describedby="inputGroup-sizing-default"/>
                        </div>
                    </div>
                </div>
                <div class="input-group mb-3">
                    <span class="input-group-text" id="country">Kraj</span>
                    <input type="text" class="form-control" aria-label="country_input" aria-describedby="inputGroup-sizing-default"/>
                </div>
                <div class="input-group mb-3">
                    <span class="input-group-text" id="phone_number">Numer telefonu</span>
                    <input type="text" class="form-control" aria-label="phone_number_input" aria-describedby="inputGroup-sizing-default" value={this.state.Phone} onChange={this.handlePhoneNumberChange}/>
                </div>
                <div class="row">
                    <div class="col">
                        <div class="input-group mb-3">
                            <span class="input-group-text" id="birth_date">Data urodzenia</span>
                            <input type="date" class="form-control" aria-label="birth_date_input" aria-describedby="inputGroup-sizing-default"/>
                        </div>
                    </div>
                    <div class="col">
                        <div class="input-group mb-3">
                            <span class="input-group-text" id="pesel">Pesel</span>
                            <input type="text" inputmode="numeric" class="form-control" aria-label="pesel_input" aria-describedby="inputGroup-sizing-default" value={this.state.Pesel} onChange={this.handlePeselChange}/>
                        </div>
                    </div>
                </div>
                <div class="input-group mb-3">
                    <span class="input-group-text" id="employment_date">Data zatrudnienia</span>
                    <input type="date" class="form-control" aria-label="employee_date_input" aria-describedby="inputGroup-sizing-default"/>
                </div>
                <div class="input-group mb-3">
                    <span class="input-group-text" id="login">Login</span>
                    <input type="text" class="form-control" aria-label="login_input" aria-describedby="inputGroup-sizing-default"/>
                </div>
                <div class="input-group mb-3">
                    <span class="input-group-text" id="password">Hasło</span>
                    <input type="password" class="form-control" aria-label="password_input" aria-describedby="inputGroup-sizing-default"/>
                </div>
                <div class="input-group mb-3">
                    <span class="input-group-text" id="confirm_password">Powtórz hasło</span>
                    <input type="password" class="form-control" aria-label="confirm_password_input" aria-describedby="inputGroup-sizing-default"/>
                </div>

                <div class="btn-toolbar" role="toolbar" aria-label="Toolbar with button groups">
                    <div class="btn-group me-2" role="group" aria-label="First button">
                        <button type="button" class="btn btn-danger" onClick={this.handleOnCancelClick}>Odrzuć zmiany</button>
                    </div>
                    <div class="btn-group me-2" role="group" aria-label="Second button">
                        <button type="button" class="btn btn-success" onClick={this.handleOnSaveClick}>Zapisz</button>
                    </div>
                </div>
            </>
        )
    }

    // TODO: implement displaying employees
    ChoosePersonToDelete(props, employees){
        employees.map(id => {  
            return (
                <>
                <row>
                    <div class="list-group">
                        <div class="list-group-item list-group-item-action list-group-item-light" onClick={this.Delete(id)}>Here should be name, surname, id and date of employment of employee</div>
                    </div>
                </row>
                </> 
            )}
        )
    }

    // TODO: meybe better way to display information about deleting the user?
    Delete(props, id){
            alert('Użytkownik z id:' + id + ' został usunięty.')
    }

    // TODO: add addresses to 'href'
    DeleteEmployee(props){
        return(
            <>
                <div class="col-30 col">
                    <div class="btn-group">
                        <button type="button" class="btn btn-success dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                            Znajdź zwalnianego pracownika poprzez:
                        </button>
                        <ul class="dropdown-menu">
                            <li><a class="dropdown-item" href="#">ID</a></li>
                            <li><a class="dropdown-item" href="#">imię i nazwisko</a></li>
                            <li><a class="dropdown-item" href="#">numer PESEL</a></li>
                        </ul>
                        <form class="d-flex">
                            <input class="form-control me-2" type="search" placeholder="Wyszukaj" aria-label="find_delete_employee"/>
                            <button class="btn btn-outline-success" type="submit">Szukaj</button>
                        </form>
                    </div>
                </div>
            </>
        )
    }

    // TODO: implement displaying employees
    ChoosePersonToModifyData(props, employees){
        employees.map(id => {  
            return (
                <>
                <row>
                    <div class="list-group">
                        <div class="list-group-item list-group-item-action list-group-item-light" onClick={this.Modify(id)}>Here should be name, surname, id and date of employment of employee</div>
                    </div>
                </row>
                </> 
            )}
        )
    }

    // TODO: add addresses to 'href'
    ModifyEmployeeData(props){
        return(
            <>
                <div class="col-30 col">
                    <div class="btn-group">
                        <button type="button" class="btn btn-success dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                            Znajdź pracownika, którego dane mają być zmodyfikowane, poprzez:
                        </button>
                        <ul class="dropdown-menu">
                            <li><a class="dropdown-item" href="#">ID</a></li>
                            <li><a class="dropdown-item" href="#">imię i nazwisko</a></li>
                            <li><a class="dropdown-item" href="#">numer PESEL</a></li>
                        </ul>
                        <form class="d-flex">
                            <input class="form-control me-2" type="search" placeholder="Wyszukaj" aria-label="find_modify_employee"/>
                            <button class="btn btn-outline-success" type="submit">Szukaj</button>
                        </form>
                    </div>
                </div>
            </>
        )
    }

    // TODO: add addresses to 'href'
    DeleteCustomerAccount(props){
        return(
            <>
                <div class="col-30 col">
                    <div class="btn-group">
                        <button type="button" class="btn btn-success dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                            Znajdź konto klienta, które chcesz usunąć, poprzez:
                        </button>
                        <ul class="dropdown-menu">
                            <li><a class="dropdown-item" href="#">ID</a></li>
                            <li><a class="dropdown-item" href="#">imię i nazwisko</a></li>
                            <li><a class="dropdown-item" href="#">numer PESEL</a></li>
                        </ul>
                        <form class="d-flex">
                            <input class="form-control me-2" type="search" placeholder="Wyszukaj" aria-label="find_delete_customer"/>
                            <button class="btn btn-outline-success" type="submit">Szukaj</button>
                        </form>
                    </div>
                </div>
            </>
        )
    }

    // TODO: implement displaying customers
    ChooseCustomerToDelete(props, customers){
        customers.map(id => {  
            return (
                <>
                <row>
                    <div class="list-group">
                        <div class="list-group-item list-group-item-action list-group-item-light" onClick={this.DeleteCustomerAccount(id)}>Here should be name, surname and id of customer</div>
                    </div>
                </row>
                </> 
            )}
        )
    }

    
    handleTelephoneNumberChange(e){
        if(e.target.value.match(/^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/) != null){
         this.setState({Phone: e.target.value});
        }
    }

    handlePeselChange(e){
        if(e.target.value.match(/[0-9]{11}$/) != null){
        this.setState({Pesel: e.target.value});
        }
    }

    // TODO -> Implement all functions below
    handleOnCancelClick(e){
        alert('Hello! handleOnCancelClick() here! Implement me!');
    }

    handleOnSaveClick(e){
        alert('Hello! handleOnSaveClick() here! Implement me!');
    }
}


export default AdminView