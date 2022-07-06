import React from "react";
import Navbar from "./components/Navbar"
import "./Basket.css"
import api from "./actions/api";
import {store} from "./actions/store";

class Basket extends React.Component
{
    constructor(props)
    {
        super(props)
        this.state = {
            Cart: {}
        }

        /**
         * Cart DTO:
         *  cart = {
            id: '',
            creationDate: '',
            selectedProducts: [
                {
                    id: '',
                    product: {}
                }
            ]
            }
         */
    }

    componentDidMount()
    {
        var loginStatus = store.getState().persistedReducer.loggedIn;

        if(loginStatus === false)
        {
            api.Cart().getNotLogCart()
            .then( response => this.setState({Cart: response.data.shoppingCart}))
            .catch(err => console.log(err));
        }
        else
        {
            api.Cart().getUserCart(store.getState().persistedReducer.id)
            .then( response => this.setState({Cart: response.data.shoppingCart}))
            //.then( response => console.log(response.data.shoppingCart))
            .catch(err => console.log(err));
        }
    }


    render()
    {
        return(
            <>
                <Navbar/>
                <div className="container">
                    <h1 className="h1 text-center"> Koszyk </h1>
                    <div className="row">
                        <div className="col"> {this.listOfProducts()}</div>
                        <div className="col-3"> {this.payment()} </div>
                    </div>
                </div>
            </>
        )
    }

    listOfProducts()
    {
        var returns;
        if(this.state.Cart != null) 
        {
            returns = <>
                <div className="col">
                    <div className="container">
                        <div className="row">
                            <div className="container row mx-2">
                                <div className="col-2"><strong>Nazwa</strong></div>
                                <div className="col-2"><strong>Ilość</strong></div>
                                <div className="col-2"><strong>Zostało w <br/>magazynie</strong></div>
                                <div className="col-2"><strong>Cena<br/>za szt.</strong></div>
                                <div className="col-2"><strong>Cena<br/>całkowita</strong></div>
                            </div>
                        </div>
                        <div className="accordion border border-dark border-start-0 border-end-0 border-bottom-0" id="accordionBasket">
                            {
                                this.state.Cart.selectedProducts?.map(prod =>{
                                return this.displayProduct(prod)
                                })
                            }
                        </div>
                    </div>
                </div>
            </>
        } 
        else
        returns = <><div className="text-center mt-5">
            Nie masz żadnych produktów w koszyku
        </div></>
        return returns;
    }

    payment()
    {
        var price = 0;
        this.state.Cart.selectedProducts?.map(product => price += parseFloat(product.product.retailPrice).toFixed(2) * parseInt(product.quantity) )
        return <>
        <form>
            <div className="mt-5 row">
                <b>Do zapłaty jest: {price} zł</b>
            </div>
            <div className="my-2 row">
                Wybierz fromę płatności:
                <div className="btn-group" id="PaymentMethod" role="group" aria-label="Payment radio toggle button group">
                    <input type="radio" className="btn-check" name="btnradio" id="btnradio1" autoComplete="off" onClick={() => this.setState({payment: "BLIK"})}/>
                    <label className="btn btn-outline-dark" htmlFor="btnradio1">BLIK</label>

                    <input type="radio" className="btn-check" name="btnradio" id="btnradio2" autoComplete="off" onClick={() => this.setState({payment: "Transfer"})}/>
                    <label className="btn btn-outline-dark" htmlFor="btnradio2">Transfer</label>

                    <input type="radio" className="btn-check" name="btnradio" id="btnradio3" autoComplete="off" onClick={() => this.setState({payment: "Karta"})}/>
                    <label className="btn btn-outline-dark" htmlFor="btnradio3">Kartą</label>

                    <input type="radio" className="btn-check" name="btnradio" id="btnradio4" autoComplete="off" onClick={() => this.setState({payment: "Pobranie"})}/>
                    <label className="btn btn-outline-dark" htmlFor="btnradio4">Przy odbiorze</label>
                </div>
            </div>
            <div className="my-2">
                <input type="button" value="Kup" className="btn btn-success" onClick={() => this.Buy()}/>
            </div>
        </form>

        </>
    }

    displayProduct(entry)
    {
        return(
            <>
            <div className="accordion-item">
                <h2 className="accordion-header" id={"heading" + entry.product.productId}>
                    <button className="accordion-button collapsed text-break" type="button" data-bs-toggle="collapse" data-bs-target={"#collapse" + entry.product.productId} aria-expanded="true" aria-controls={"collapse" + entry.product.productId}>
                    
                        <div className="col-2">{entry.product.name}</div>
                        <div className="col-2 ms-2">{entry.quantity}</div>
                        <div className="col-2 ms-3" id={"inStock" + entry.product.productId}>{entry.product.inStock}</div>
                        <div className="col-2">{parseFloat(entry.product.retailPrice).toFixed(2)} zł</div>
                        <div className="col-2">{parseFloat(entry.product.retailPrice).toFixed(2) * parseFloat(entry.quantity).toFixed(2) } zł</div>
                        </button>
                        <div className="col text-end mb-1"> <input type="button" className="btn btn-danger btn-sm" value="Usuń" onClick={() => {this.deleteFromBasket(entry.product.productId)}}/> </div>

                </h2>
                <div id={"collapse" + entry.product.productId} className="accordion-collapse collapse" aria-labelledby={"heading" + entry.product.productId} data-bs-parent="#accordionBasket">
                    <div className="accordion-body text-break">
                        <strong>Producent:</strong> {entry.product.producer} <br/>
                        <strong>Opis:</strong> {entry.product.description}
                    </div>
                </div>
            </div>
                
            </>
        )
    }

    Buy()
    {
        if(store.getState().persistedReducer.loggedIn === false)
        {
            alert("Aby coś zapupić, musisz być zalogowany!");
            window.location.href = '/login'
            return
        }

        if(this.state.payment !== undefined)
            api.Cart().BuyAll(this.state.Cart.id, this.state.payment)
            .catch(err => console.log(err))
        else
        {
            alert("Wybierz formę płatności!")
            return
        }

    }

    deleteFromBasket(ProdId)
    {
        api.Cart().deleteProduct(this.state.Cart.cartId, ProdId).catch(err => console.log(err))
    }

}

export default Basket;
