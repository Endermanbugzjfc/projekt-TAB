import React from "react";
import Navbar from "./components/Navbar.js";
import "./AdminView.css"
import UserInfo from "./components/Views/UserInfo.js";
import AddNewWorker from "./components/Views/AddNewWorker.js";
import { store } from "./actions/store.js";
import ManageUsers from "./components/Views/ManageUsers.js";

class AdminView extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
        }
        if(store.getState().persistedReducer.role !== 'ADMIN'  && !(!process.env.NODE_ENV || process.env.NODE_ENV === 'development'))
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
                            <a className="list-group-item list-group-item-action" id="delete_employee_list" data-bs-toggle="list" href="#delete_employee" role="tab" aria-controls="delete_employee">Zarządzaj użytkownikami w bazie</a>
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
                                <ManageUsers id="find_user"/>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}


export default AdminView