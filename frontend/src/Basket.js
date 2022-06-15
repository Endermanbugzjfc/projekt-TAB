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
                        productId:'2',
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
                <div className="table-responsive-sm col">
                    <table className="table">
                        <thead>
                            <tr>
                            <th scope="col">Nazwa</th>
                            <th scope="col">Producent</th>
                            <th scope="col">Ilość</th>
                            <th scope="col">Zostało w <br/>magazynie</th>
                            <th scope="col">Cena<br/>za szt.</th>
                            <th scope="col">Cena<br/>całkowita</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.Cart.selectedProducts.map(prod =>{
                                return this.displayProduct(prod);
                                })
                            }
                        </tbody>
                    </table>
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
                <input type="submit" value="Kup" className="btn btn-success" onClick={() => this.Buy()}/>
            </div>
        </form>

        </>
    }

    displayProduct(product)
    {
        return(
            <>
                <tr id={product.productDTO.productId} key={product.productDTO.productId}>
                    <td>{product.productDTO.name}</td>
                    <td>{product.productDTO.producer}</td>
                    <td>{product.quantity}</td>
                    <td id={"inStock" + product.productDTO.productId}>{product.productDTO.inStock}</td>
                    <td>{product.productDTO.retailPrice} zł</td>
                    <td>{parseFloat(product.productDTO.retailPrice) * parseFloat(product.quantity) } zł</td>
                    <td> <a className="btn btn-secondary btn-sm" href={"/product/" + product.productDTO.productId}>Zobacz w sklepie</a> </td>
                    <td> <input type="button" className="btn btn-danger btn-sm" value="Usuń" onClick={() => {this.deleteFromBasket(product.productDTO.productId)}}/> </td>
                </tr>
            </>
        )
    }

    Buy()
    {
        if(this.state.payment !== undefined)
            api.Cart().BuyAll(this.state.Cart.id, this.state.payment)
            .catch(err => console.log(err))
    }

    deleteFromBasket(ProdId)
    {
        api.Cart().deleteProduct(this.state.Cart.id, ProdId).catch(err => console.log(err))
    }

}

export default Basket;