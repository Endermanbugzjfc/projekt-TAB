import React from "react";
import api from "./actions/api.js";
import { store } from "./actions/store.js";
import Navbar from "./components/Navbar.js";
import "./EmployeeView.css"

class EmployeeView extends React.Component{

    constructor(props){
        super(props);

        this.state = {
            Id: '',
            Name: '',
            Surname: '',
            BirthDay: '',
            Pesel: '',
            Phone: '',
            PostCode: '',
            City: '',
            HouseNumber: '',
            Street: '',
            Salary: 0,
            EmploymentDate: '',
            newInfo : {
                Name: '',
                Surname: '',
                BirthDay: '',
                Pesel: '',
                Phone: '',
                PostCode: '',
                City: '',
                HouseNumber: '',
                Street: '',
                Salary: 0,
                EmploymentDate: ''
            }
        }
        this.ShowReport = this.ShowReport.bind(this);
    }

    componentDidMount(){
        api.User().getUserById(store.getState().persistedReducer.id)
        .then(response =>
            {
                var addr = response.data.Address.split(',');
                //Street,HouseNr,ApNr,City,ZIP
                this.setState({
                Id: response.data.id,
                Name: response.data.Name,
                Surname: response.data.Surname,
                Phone: response.data.Phone,
                PostCode: addr[4],
                City: addr[3],
                HouseNumber: addr[1],
                ApatrmentNumber: addr[2],
                Street: addr[0],
                EmploymentDate: response.data.EmploymentDate,
                BirthDay: response.data.BirthDay,
                })
            })
        .catch(err => console.log(err));

        this.setState(() => ({
            newInfo: {
                Name: this.state.Name,
                Surname: this.state.Surname,
                BirthDay: this.state.BirthDay,
                Pesel: this.state.Pesel,
                Phone: this.state.Phone,
                PostCode: this.state.PostCode,
                City: this.state.City,
                HouseNumber: this.state.HouseNumber,
                Street: this.state.Street,
                Salary: this.state.Salary,

            } 
        }))
    }   

    render(){
        return(
            <>
                 <Navbar/>
                <div className="back row">
                    <div className="col-3">
                        <div className="list-group" id="list-tab" role="tablist">
                            <a className="list-group-item list-group-item-action active" id="employee_data_list" data-bs-toggle="list" href="#employee_data" role="tab" aria-controls="employee_data">Twoje dane</a>
                            <a className="list-group-item list-group-item-action" id="generate_report_list"  data-bs-toggle="list" href="#generate_report" role="tab" aria-controls="generate_report">Wygeneruj raport</a>
                            <a className="list-group-item list-group-item-action" id="stock_list"  data-bs-toggle="list" href="#show_stock" role="tab" aria-controls="show_stock">Magazyn</a>
                        </div>
                    </div>
                    <div className="col">
                        <div className="tab-content" id="nav-tabContent">
                            <div className="tab-pane fade show active" id="employee_data" role="tabpanel" aria-labelledby="employee_data_list">
                                {this.EmployeeData()}
                            </div>
                            <div className="tab-pane fade" id="generate_report" role="tabpanel" aria-labelledby="generate_report_list">
                                {this.GenerateReport()}
                            </div>
                            <div className="tab-pane fade" id="show_stock" role="tabpanel" aria-labelledby="stock_list">
                                {this.ShowStock()}
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }
    
    EmployeeData(props){
        return(
            <>
                <div className="row me-5">
                    <div className="my-2">
                        Imię:  <b>{this.state.Name}</b>
                    </div>
                </div>
                <div className="row me-5">
                    <div className="my-2">
                        Nazwisko:  <b>{this.state.Surname}</b>
                    </div>
                </div>
                <div className="row me-5">
                    <div className="my-2">
                        Pesel:  <b>{this.state.Pesel}</b>
                    </div>
                </div>
                <div className="row me-5">
                    <div className="my-2">
                        Numer telefonu: <b>{this.state.Phone}</b>
                    </div>
                </div>
                <div className="row me-5">
                    <div className="my-2">
                        Adres: <b>{this.getPrettyAddress()}</b> 
                    </div>
                </div>
                <div className="row me-5">
                    <div className="my-2">
                        Data zatrudnienia:  <b>{this.state.EmploymentDate}</b>
                    </div>
                </div>
                <button className="btn btn-secondary mt-3" data-bs-toggle="modal" data-bs-target="#EditPersonalInfo" >Edytuj dane</button>

                <div className="modal fade" id="EditPersonalInfo" data-bs-backdrop="static" tabIndex="-1" aria-labelledby="EditPersonalInfoLabel" aria-hidden="true">
                    <div className="modal-dialog modal-lg">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="EditPersonalInfoLabel">Edycja informacji</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                <form>
                                <div className="row">
                                        {this.modalBodyElement("Imię", "text", this.state.newInfo.Name, "Name")}
                                        {this.modalBodyElement("Nazwisko", "text", this.state.newInfo.Surname, "Surname")}
                                    </div>
                                    <div className="row">
                                        {this.modalBodyElement("Telefon", "tel", this.state.newInfo.Phone, "Phone")}
                                        {this.modalBodyElement("Data zatrudnienia", "date", this.state.newInfo.EmploymentDate, "EmploymentDate")}
                                    </div>
                                    <div className="row">
                                        {this.modalBodyElement("Ulica", "text", this.state.newInfo.Street, "Street")}
                                        {this.modalBodyElement("Numer domu", "text", this.state.newInfo.HouseNumber, "HouseNumber")}
                                    </div>
                                    <div className="row">
                                        {this.modalBodyElement("Miasto", "text", this.state.newInfo.City, "City")}
                                        {this.modalBodyElement("Kod pocztowy", "text", this.state.newInfo.PostCode, "PostCode")}
                                    </div>
                                </form>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Anuluj</button>
                                <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={()=>this.saveNewData()}>Zapisz</button>
                            </div>
                        </div>
                    </div>
                </div> 
            </>
        )
    }

    saveNewData()
    {
        api.User().update(this.state.Id, this.state.newInfo)
    }

    modalBodyElement(text, type, value, stateName)
    {
        return(
            <>
                <div className="col">
                    {text} <br/>
                    <input type={type} value={value}
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

    getPrettyAddress()
    {
        var Address = '';
        Address += this.state.Street + ' ' + this.state.HouseNumber + ', ';
        Address += this.state.PostCode + ' ' + this.state.City;
                  
        return Address;
    }

    // TODO: date_from and date_to should have the same size (I don't know why they are different)
    GenerateReport(props){
        return(
            <>
            <h2>Wygeneruj raport</h2>
            <div className="row">
                <div className="input-group mb-3">
                    <span className="input-group-text" id="date_from">Od:</span>
                    <input type="date" className="form-control" aria-label="date_from_input" aria-describedby="inputGroup-sizing-default"/>
                </div>
            </div>
            <div className="row">
                <div className="input-group mb-3">
                    <span className="input-group-text" id="date_to">Do:</span>
                    <input type="date" iclass="form-control" aria-label="date_to_input" aria-describedby="inputGroup-sizing-default"/>
                </div>
            </div>
            <div className="row">
                <div>
                    <button type="button" className="btn btn-success" onClick={this.ShowReport}>Generuj</button>
                </div>
            </div>
            </>
        )
    }

    // TODO: Display it after clicking on "Generuj" button by the user
    ShowReport(props){
           return(
               <>
               <div className="report">
                    <h3>Raport pieniężny za okres <b>-</b></h3>
                    <div className="row me-5">
                        <div className="my-3">
                            Wydatki:  <b>-</b>
                        </div>
                    </div>
                    <div className="row me-5">
                        <div className="my-1">
                            Przychód:  <b>-</b>
                        </div>
                    </div>
                    <div className="row me-5">
                        <div className="my-1">
                            Dochód:  <b>-</b>
                        </div>
                    </div>
                </div>
               </>
           )
    }

    // TODO: implement displaying stock
    ShowStock(props){
        return(
            <>
                Stock here
            </>
        )
    }

}


export default EmployeeView