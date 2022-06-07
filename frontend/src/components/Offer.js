import React from "react";
import { store } from "../actions/store";


const Offer = (props) =>{
    
    const saveData = () => {

    }
    const EditModal = () => {
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
                                <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={()=>this.saveData()}>Zapisz</button>
                            </div>
                        </div>
                    </div>
                </div> 
            </>
        )
    }

    var EditButton = <></>;
    if(store.getState().persistedReducer.role == "EMPLOYEE" || true)
    {
        EditButton = <>
            <div className="col">
                <input type="button" className="btn btn-secondary" value="Edytuj produkt"/>
            </div>
        </>
    }
    return(
        <>
            <div class="row my-5">
                <div class="col-2">
                    <img alt="Product_img"/>
                </div>
                <div class="col">
                    <div class="row"> {props.product.title} </div>
                    <div class="row">Producent: { props.product.producer != null ? props.product.producer : "Nieznany"} </div>
                    <div class="row">Opis: {props.product.description != null ? props.product.description : "Brak" } </div>
                </div>
                <div class="col">
                    <div class="row">{props.product.price} zł / szt </div>
                    <div class="row">
                        W magazynie zostało { props.product.left > 0 ? props.product.left : 0 } sztuk
                    </div>
                    <div class="row">
						<div class="col form-floating">
							<input className="form-control" type="text" placeholder="Ilość" id="amount" value={1}/>
                            <label for="amount">Ilość</label>
						</div>
						<div class="col">
							<input className="btn btn-info" type="button" value="Dodaj do koszyka" onClick={console.log("clicked the button")}/>
						</div>
                    </div>
                </div>
                {EditButton}
            </div>
        </>
    )
}

export default Offer