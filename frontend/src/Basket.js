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
            Cart: null
        }

        /**
         * Cart DTO:
         *  cart = {
            id: '',
            creationDate: '',
            selectedProducts: [
                {
                    id: '',
                    productDTO: {}
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
            .then( response => this.setState({Cart: response}))
            .catch(err => console.log(err));
        }
        else
        {
            api.Cart().getUserCart(store.getState().persistedReducer.id)
            .then( response => this.setState({Cart: response}))
            .catch(err => console.log(err));
        }

        //TEMPORARY
        var cart = {
            id: '0',
            creationDate: '',
            selectedProducts: [
                {
                    id: '1',
                    quantity: 10,
                    productDTO: {
                        productId:'1',
                        name: 'Dachówka',
                        producer: 'Ja',
                        description: '1',
                        category: '1',
                        inStock: '1',
                        purchasePrice: '1.40',
                        retailPrice: '1'
                    }
                },
                {
                    id: '2',
                    quantity: 1,
                    productDTO: {
                        productId:'2',
                        name: 'Rynna',
                        producer: 'Aleksander Wielki',
                        description: '2',
                        category: '2',
                        inStock: '2',
                        purchasePrice: '2',
                        retailPrice: '2'
                    }
                },
                {
                    id: '2',
                    quantity: 1,
                    productDTO: {
                        productId:'6',
                        name: 'Rynna',
                        producer: 'Aleksander Wielki',
                        description: '2',
                        category: '2',
                        inStock: '2',
                        purchasePrice: '2',
                        retailPrice: '2'
                    }
                },
                {
                    id: '2',
                    quantity: 1,
                    productDTO: {
                        productId:'3',
                        name: 'Rynna',
                        producer: 'Aleksander Wielki',
                        description: '2',
                        category: '2',
                        inStock: '2',
                        purchasePrice: '2',
                        retailPrice: '2'
                    }
                },
                {
                    id: '2',
                    quantity: 1,
                    productDTO: {
                        productId:'4',
                        name: 'Rynnaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
                        producer: 'Aleksander WielkiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiWielkiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiWielkiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiii',
                        description: '2',
                        category: '2',
                        inStock: '2',
                        purchasePrice: '2',
                        retailPrice: '2'
                    }
                },
                {
                    id: '2',
                    quantity: 1,
                    productDTO: {
                        productId:'5',
                        name: 'Rynna',
                        producer: 'Aleksander Wielki',
                        description: '2',
                        category: '2',
                        inStock: '2',
                        purchasePrice: '2',
                        retailPrice: '2'
                    }
                }
            ]
        } 
        this.setState({Cart: cart})
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
                        <div class="accordion border border-dark border-start-0 border-end-0 border-bottom-0" id="accordionBasket">
                            {
                                this.state.Cart.selectedProducts.map(prod =>{
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
        this.state.Cart?.selectedProducts.map(product => price += parseFloat(product.productDTO.retailPrice) * parseFloat(product.quantity) )
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

    displayProduct(product)
    {
        return(
            <>
            <div class="accordion-item">
                <h2 class="accordion-header" id={"heading" + product.productDTO.productId}>
                    <button class="accordion-button collapsed text-break" type="button" data-bs-toggle="collapse" data-bs-target={"#collapse" + product.productDTO.productId} aria-expanded="true" aria-controls={"collapse" + product.productDTO.productId}>
                    
                        <div className="col-2">{product.productDTO.name}</div>
                        <div className="col-2 ms-2">{product.quantity}</div>
                        <div className="col-2 ms-3" id={"inStock" + product.productDTO.productId}>{product.productDTO.inStock}</div>
                        <div className="col-2">{product.productDTO.retailPrice} zł</div>
                        <div className="col-2">{parseFloat(product.productDTO.retailPrice) * parseFloat(product.quantity) } zł</div>
                        <div className="col"> <input type="button" className="btn btn-danger btn-sm" value="Usuń" onClick={() => {this.deleteFromBasket(product.productDTO.productId)}}/> </div>
                        
                    </button>
                </h2>
                <div id={"collapse" + product.productDTO.productId} class="accordion-collapse collapse" aria-labelledby={"heading" + product.productDTO.productId} data-bs-parent="#accordionBasket">
                    <div class="accordion-body text-break">
                        <strong>Producent:</strong> {product.productDTO.producer} <br/>
                        <strong>Opis:</strong> {product.productDTO.description}
                    </div>
                </div>
            </div>
                
            </>
        )
    }

    Buy()
    {
        if(this.state.payment !== undefined)
            api.Cart().BuyAll(this.state.Cart.id, this.state.payment)
            .catch(err => console.log(err))
        else
            alert("Wybierz formę płatności!")
    }

    deleteFromBasket(ProdId)
    {
        api.Cart().deleteProduct(this.state.Cart.id, ProdId).catch(err => console.log(err))
    }

}

export default Basket;