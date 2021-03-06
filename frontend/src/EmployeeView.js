import React from "react";
import api from "./actions/api.js";
import { store } from "./actions/store.js";
import Navbar from "./components/Navbar.js";
import AddNewProduct from "./components/Views/AddNewProduct.js";
import UserInfo from "./components/Views/UserInfo.js";
import "./EmployeeView.css"

class EmployeeView extends React.Component{

    constructor(props){
        super(props);

        this.state = {
            currentRaport: null,
            raportFrom: null,
            raportTo: null,
            raportProductId: '',
        }

        if(store.getState().persistedReducer.role !== 'EMPLOYEE' && !(!process.env.NODE_ENV || process.env.NODE_ENV === 'development'))
        {
            window.location.href = '/'
        }
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
                            <a className="list-group-item list-group-item-action" id="newProduct"  data-bs-toggle="list" href="#addNewProduct" role="tab" aria-controls="addNewProduct">Dodaj nowy produkt</a>
                        </div>
                    </div>
                    <div className="col">
                        <div className="tab-content" id="nav-tabContent">
                            <div className="tab-pane fade show active" id="employee_data" role="tabpanel" aria-labelledby="employee_data_list">
                                <UserInfo/>
                            </div>
                            <div className="tab-pane fade" id="generate_report" role="tabpanel" aria-labelledby="generate_report_list">
                                {this.GenerateReport()}
                            </div>
                            <div className="tab-pane fade" id="addNewProduct" role="tabpanel" aria-labelledby="newProduct">
                                <AddNewProduct/>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }

    GenerateReport(props){
        return(
            <>
            <h2>Wygeneruj raport</h2>
            <div className="row">
                <div className="input-group mb-3 dateSelect row mx-1">
                    <span className="input-group-text" id="date_from">Od:</span>
                    <input type="date" className="form-control" aria-label="date_from_input" aria-describedby="inputGroup-sizing-default" id="raportDateFrom" onChange={(e)=>this.setState({raportFrom : e.target.value})} />
                </div>
                <div className="input-group mb-3 dateSelect row mx-1">
                    <span className="input-group-text" id="date_to">Do:</span>
                    <input type="date" className="form-control" aria-label="date_to_input" aria-describedby="inputGroup-sizing-default" id="raportDateTo" onChange={(e)=>this.setState({raportTo : e.target.value})}/>
                </div>
                <div className="col-4 mx-1">
                    <div className="row">
                        <select className="form-select" id="raportRange">
                            <option value="0">Ca??okszta??t</option>
                            <option value="1">Dla pojedy??czgo produktu</option>
                        </select>
                    </div>
                    <div className="row mt-2">
                        <input type="text" placeholder="ID produktu" id="IDproduktu" value={this.state.raportProductId} onChange={(e) => this.setState({raportProductId: e.target.value})}/>
                    </div>
                </div>
            </div>
            <div className="row">
                <div>
                    <button type="button" className="btn btn-success" onClick={() => this.setState({currentRaport: this.CheckRaportRequest()})}>Generuj</button>
                </div>
            </div>
            <div className="mt-3">
                {this.state.currentRaport}
            </div>
            </>
        )
    }

    CheckRaportRequest()
    {
        var raport = <>io</>;
        if(this.state.raportFrom ==null || this.state.raportTo == null || this.state.raportFrom === "" ||this.state.raportTo === "" )
        {
            raport = <> Nie podano przedzia??u czasowego! </>
        }
        else if(this.state.raportFrom > this.state.raportTo)
        { 
            raport = <> Data pocz??tkowa nie mo??e by?? p????niej ni?? data ko??cowa! </>
        }
        else if(this.state.raportProductId.length < 1 && document.getElementById("raportRange").value === "1") 
        {
            raport = <> Nie podano id produktu! </>
        }
        else 
        {
            raport = this.ShowReport(document.getElementById("raportRange").value);
        }
        return raport;
    }

    ShowReport(index){
        var dateFrom = document.getElementById("raportDateFrom").value
        var dateTo = document.getElementById("raportDateTo").value
        var RaportInfo = {productName: "B????d", totalExpense: "B????d", totalIncome: "B????d"};
        if(index === "0")
        {
            api.Product().getFullReport({start: dateFrom, end: dateTo})
            .then(
                response => RaportInfo = response.data
            )
            .catch(
                err => {
                    console.log(err)
                }
            )
        }
        else
        {
            api.Product().getProductReport(this.state.raportProductId, {start: dateFrom, end: dateTo})
            .then(
                response => RaportInfo = response.data
            )
            .catch(
                err => {
                    console.log(err)
                }
            )
        }

        return( 
               <>
               <div className="report">
                    <h3>Raport pieni????ny za okres <br/> <b>{dateFrom} - {dateTo}</b></h3>
                    <div className="row me-1">
                        <div className="my-2">
                            Nazwa produktu:  <b>{RaportInfo.productName}</b>
                        </div>
                    </div>
                    <div className="row me-1">
                        <div className="my-2">
                            Wydatki:  <b>{RaportInfo.totalExpense}</b>
                        </div>
                    </div>
                    <div className="row me-1">
                        <div className="my-2">
                            Przych??d:  <b>{RaportInfo.totalIncome}</b>
                        </div>
                    </div>
                    <div className="row me-1">
                        <div className="my-2">
                            Doch??d:  <b>{RaportInfo.totalIncome - RaportInfo.totalExpense}</b>
                        </div>
                    </div>
                </div>
               </>
        )
    }


}

export default EmployeeView