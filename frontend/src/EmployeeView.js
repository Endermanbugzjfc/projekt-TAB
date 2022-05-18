import React from "react";
import Navbar from "./Navbar";
import "./EmployeeView.css"

class EmployeeView extends React.Component{

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
        this.ShowReport = this.ShowReport.bind(this);
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
                            <a class="list-group-item list-group-item-action active" id="employee_data_list" data-bs-toggle="list" href="#employee_data" role="tab" aria-controls="employee_data">Twoje dane</a>
                            <a class="list-group-item list-group-item-action" id="generate_report_list"  data-bs-toggle="list" href="#generate_report" role="tab" aria-controls="generate_report">Wygeneruj raport</a>
                            <a class="list-group-item list-group-item-action" id="stock_list"  data-bs-toggle="list" href="#show_stock" role="tab" aria-controls="show_stock">Magazyn</a>
                        </div>
                    </div>
                    <div class="col">
                        <div class="tab-content" id="nav-tabContent">
                            <div class="tab-pane fade show active" id="employee_data" role="tabpanel" aria-labelledby="employee_data_list">
                                {this.EmployeeData()}
                            </div>
                            <div class="tab-pane fade" id="generate_report" role="tabpanel" aria-labelledby="generate_report_list">
                                {this.GenerateReport()}
                            </div>
                            <div class="tab-pane fade" id="show_stock" role="tabpanel" aria-labelledby="stock_list">
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

    // TODO: date_from and date_to should have the same size (I don't know why they are different)
    GenerateReport(props){
        return(
            <>
            <h2>Wygeneruj raport</h2>
            <row>
                <div class="input-group mb-3">
                    <span class="input-group-text" id="date_from">Od:</span>
                    <input type="date" class="form-control" aria-label="date_from_input" aria-describedby="inputGroup-sizing-default"/>
                </div>
            </row>
            <row>
                <div class="input-group mb-3">
                    <span class="input-group-text" id="date_to">Do:</span>
                    <input type="date" iclass="form-control" aria-label="date_to_input" aria-describedby="inputGroup-sizing-default"/>
                </div>
            </row>
            <row>
                <div>
                    <button type="button" class="btn btn-success" onClick={this.ShowReport}>Generuj</button>
                </div>
            </row>
            </>
        )
    }

    // TODO: Display it after clicking on "Generuj" button by the user
    ShowReport(props){
           return(
               <>
               <div class="report">
                    <h3>Raport pieniężny za okres <b>-</b></h3>
                    <div class="row me-5">
                        <div class="my-3">
                            Wydatki:  <b>-</b>
                        </div>
                    </div>
                    <div class="row me-5">
                        <div class="my-1">
                            Przychód:  <b>-</b>
                        </div>
                    </div>
                    <div class="row me-5">
                        <div class="my-1">
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