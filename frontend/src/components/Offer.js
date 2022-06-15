import React from "react";
import api from "../actions/api";
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
            retailPrice: '' + props.product.retailPrice,

            selectedAmount: 1,
            EditButton: <></>,

            newPrice: '' + props.product.retailPrice
        }
    }

    componentDidMount()
    {
        if(store.getState().persistedReducer.role === "EMPLOYEE" || true)
        {
            var EditButton = <>
                <div className="col-2 text-center mt-2">
                    <input type="button" className="btn btn-secondary" value="Edytuj cenę" data-bs-toggle="modal" data-bs-target={"#EditProduct" + this.state.productId} />
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
                <div className="modal fade" id={"EditProduct" + this.state.productId} data-bs-backdrop="static" tabIndex="-1" aria-labelledby="EditProduct" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="EditProduct">Edycja ceny produktu</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                <form className="needs-validation">
                                    <div className="row">
                                        <div className="col my-2 form-group">
                                            <label className="form-control-label" htmlFor="retailPriceModal">Cena</label>
                                            <input type="text" value={this.state.newPrice} maxLength={10} id="retailPriceModal" className="form-control"
                                                onChange={e => this.setState({newPrice: e.target.value})} required/>
                                            <div className="invalid-feedback">Niepoprawna wartość</div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Anuluj</button>
                                <button type="button" className="btn btn-primary" onClick={(e)=> this.saveProduct(e)}>Zapisz</button>
                            </div>
                        </div>
                    </div>
                </div> 
            </>
        )
    }


    checkPriceInput()
    {
        var isGood = true
        if(this.state.newPrice.match(/^\d+((,|\.)\d{1,2})?$/) == null)
        {
            document.getElementById('retailPriceModal')?.classList.add("is-invalid");
            isGood = false;
        }
        else
        {
            document.getElementById('retailPriceModal')?.classList.remove("is-invalid");
        }
        return isGood;
    }

    saveProduct(e)
    {
        if(this.checkPriceInput() === true)
        {
            e.currentTarget.setAttribute("data-bs-dismiss", "modal");

            api.Product().changePrice(this.state.productId, this.newPrice)
            .catch(err => console.log(err))
            alert("Zapisno!");
            this.setState({retailPrice: this.state.newPrice.replace(',','.')})
        }
        else
            e.currentTarget.removeAttribute("data-bs-dismiss");
    }

    render(){
        return(
            <>
                <div className="row my-5 Offer">
                    <div className="col-2">
                        <img alt="Product_img"/>
                    </div>
                    <div className="col">
                        <div className="row text-break">Nazwa: {this.state.name} </div>
                        <div className="row text-break">Producent: { this.state.producer != null ? this.state.producer : "Nieznany"} </div>
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
                                <input className="btn btn-info" type="button" value="Dodaj do koszyka" onClick={() => this.addToCart()}/>
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

    addToCart()
    {
        if(this.state.selectedAmount !== '')
        {
            var cartId = store.getState().persistedReducer.loggedIn ? api.Cart().getUserCart(store.getState().persistedReducer.id) : api.Cart().getNotLogCart();

            api.Cart().insert(cartId, this.state.productId, this.state.selectedAmount)
            .catch(err => console.log(err))
        }
    }
}

export default Offer