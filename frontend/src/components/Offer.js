import React from "react";
import { store } from "../actions/store";
import './Offer.css'


class Offer extends React.Component{

    /* product DTO
        var product = {
            productId: '',
            name: '',
            producer: '',
            description: '',
            category: '',
            inStock: 0,
            purchasePrice: 0.0,
            retailPrice: 0.0
        }
    */
   

    constructor(props)
    {
        super(props)
        this.state = {
            productId: props.product.productId,
            name: props.product.name,
            producer: props.product.producer,
            description: props.product.description,
            category: props.product.category,
            inStock: props.product.inStock,
            purchasePrice: props.product.purchasePrice,
            retailPrice: props.product.retailPrice,

            selectedAmount: 1,
            EditButton: <></>,
        }
    }

    componentDidMount()
    {
        if(store.getState().persistedReducer.role === "EMPLOYEE" || true)
        {
            var EditButton = <>
                <div className="col-2 text-center mt-2">
                    <input type="button" className="btn btn-secondary" value="Edytuj" data-bs-toggle="modal" data-bs-target="#EditProduct" />
                </div>
            </>
            this.setState({EditButton: EditButton})
        }
    }
    
    saveData = () => {

    }
    EditModal = () => {
        return(
            <>
                <div className="modal fade" id="EditProduct" data-bs-backdrop="static" tabIndex="-1" aria-labelledby="EditProduct" aria-hidden="true">
                    <div className="modal-dialog modal-lg">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="EditProduct">Edycja produktu</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                {/* <form>
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
                                </form> */}
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Anuluj</button>
                                <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={()=>this.saveData()}>Zapisz</button>
                            </div>
                        </div>
                    </div>
                </div> 
            </>
        )
    }
    /*
    if(store.getState().persistedReducer.role == "EMPLOYEE" || true)
    {
        EditButton = <>
            <div className="col">
                <input type="button" className="btn btn-secondary" value="Edytuj produkt"/>
            </div>
        </>
    }
    */

    render(){
        return(
            <>
                <div className="row my-5 Offer">
                    <div className="col-2">
                        <img alt="Product_img"/>
                    </div>
                    <div className="col">
                        <div className="row  text-break">Nazwa: {this.state.name} </div>
                        <div className="row  text-break">Producent: { this.state.producer != null ? this.state.producer : "Nieznany"} </div>
                        <div className="row text-break">Opis: {this.state.description != null ? this.state.description : "Brak" } </div>
                    </div>
                    <div className="col">
                        <div className="row">{this.state.retailPrice} zł / szt </div>
                        <div className="row">
                            W magazynie zostało {this.state.inStock > 0 ? this.state.inStock : 0 } sztuk
                        </div>
                        <div className="row">
                            <div className="col form-floating">
                                <input className="form-control" type="text" placeholder="Ilość" id="amount" value={this.state.selectedAmount} onChange={e => this.handeAmountChange(e)}/>
                                <label htmlFor="amount">Ilość</label>
                            </div>
                            <div className="col">
                                <input className="btn btn-info" type="button" value="Dodaj do koszyka" onClick={() => console.log("clicked the button")}/>
                            </div>
                        </div>
                    </div>
                    {this.state.EditButton}
                    {this.EditModal()}
                </div>
            </>
        )
    }
    
    handeAmountChange(e)
    {
        if(e.target.value.match(/^\d*$/) != null)
        {
            this.setState({selectedAmount: e.target.value})
        }
    }
}

export default Offer