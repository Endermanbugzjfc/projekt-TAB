import React from "react";
import Navbar from "./components/Navbar.js";
import "./AdminView.css"
import UserInfo from "./components/Views/UserInfo.js";
import AddNewWorker from "./components/Views/AddNewWorker.js";
import { store } from "./actions/store.js";

class AdminView extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
        }
        if(store.getState().persistedReducer.role !== 'ADMIN')
            window.location.href = '/'
    }

    componentDidMount() {
    }

    render() {
        return (
            <>
                <Navbar />
                <div className="back row">
                    <div className="col-3">
                        <div className="list-group" id="list-tab" role="tablist">
                            <a className="list-group-item list-group-item-action active" id="admin_data_list" data-bs-toggle="list" href="#admin_data" role="tab" aria-controls="admin_data">Twoje dane</a>
                            <a className="list-group-item list-group-item-action" id="add_admin_list" data-bs-toggle="list" href="#add_admin" role="tab" aria-controls="add_admin">Załóż nowe konto administratora</a>
                            <a className="list-group-item list-group-item-action" id="add_employee_list" data-bs-toggle="list" href="#add_employee" role="tab" aria-controls="add_employee">Dodaj nowego pracownika do bazy</a>
                            <a className="list-group-item list-group-item-action" id="delete_employee_list" data-bs-toggle="list" href="#delete_employee" role="tab" aria-controls="delete_employee" style={{ color: "red" }}>Usuń konto pracownika z bazy</a>
                            <a className="list-group-item list-group-item-action" id="modify_employee_data_list" data-bs-toggle="list" href="#modify_employee_data" role="tab" aria-controls="modify_employee_data">Zmodyfikuj dane pracownika</a>
                            <a className="list-group-item list-group-item-action" id="delete_customer_list" data-bs-toggle="list" href="#delete_customer" role="tab" aria-controls="delete_customer" style={{ color: "red" }}>Usuń konto klienta z bazy</a>
                        </div>
                    </div>
                    <div className="col">
                        <div className="tab-content" id="nav-tabContent">
                            <div className="tab-pane fade show active" id="admin_data" role="tabpanel" aria-labelledby="admin_data_list">
                                <UserInfo/>
                            </div>
                            <div className="tab-pane fade" id="add_admin" role="tabpanel" aria-labelledby="add_admin_list">
                                <AddNewWorker role="admin"/>
                            </div>
                            <div className="tab-pane fade" id="add_employee" role="tabpanel" aria-labelledby="add_employee_list">
                                <AddNewWorker role="employee"/>
                            </div>
                            <div className="tab-pane fade" id="delete_employee" role="tabpanel" aria-labelledby="delete_employee_list">
                                {this.ManageWorkers("Znajdź zwalnianego pracownika poprzez:", "find_delete_employee")}
                            </div>
                            <div className="tab-pane fade" id="modify_employee_data" role="tabpanel" aria-labelledby="modify_employee_data_list">
                                {this.ManageWorkers("Znajdź modyfikowanego pracownika poprzez:", "find_modify_employee")}
                            </div>
                            <div className="tab-pane fade" id="delete_customer" role="tabpanel" aria-labelledby="delete_customer_list">
                                {this.ManageWorkers("Znajdź konto usuwanego klienta poprzez:", "find_delete_customer" )}
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }

    // TODO: implement displaying employees
    ChoosePersonToDelete(props, employees) {
        employees.map(id => {
            return (
                <>
                    <row>
                        <div className="list-group">
                            <div className="list-group-item list-group-item-action list-group-item-light" onClick={this.Delete(id)}>Here should be name, surname, id and date of employment of employee</div>
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
                        <input className="form-control me-2" type="search" placeholder="Wyszukaj" aria-label={label} />
                        <input className="btn btn-outline-success" type="button" value="Szukaj" onClick={() =>{/*TODO*/}} />
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
                        <div className="list-group">
                            <div className="list-group-item list-group-item-action list-group-item-light" onClick={this.Modify(id)}>Here should be name, surname, id and date of employment of employee</div>
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
                        <div className="list-group">
                            <div className="list-group-item list-group-item-action list-group-item-light" onClick={this.DeleteCustomerAccount(id)}>Here should be name, surname and id of customer</div>
                        </div>
                    </row>
                </>
            )
        }
        )
    }
}


export default AdminView