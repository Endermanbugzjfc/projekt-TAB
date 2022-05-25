import React from "react";
import Navbar from "./components/Navbar"
import "./Basket.css"
import api from "./actions/api";
import { store } from "./actions/store";

class Basket extends React.Component
{
    constructor(props)
    {
        super(props)
        this.state = {
            products: null
        }
    }

    componentDidMount()
    {
        //if(store.LoggedIn)
        api.Cart().getNotLogCart()
        .then( response => this.setState({products: response}))
        .catch(err => console.log(err));
        //else
        //api.Cart().getUserCart(store.getUserId)
    }


    render()
    {
        return(
            <>
                <Navbar/>
                <div class="container">
                    <h1 class="h1 text-center"> Basket </h1>
                    {this.listOFProducts()}
                </div>
            </>
        )
    }

    listOFProducts()
    {
        var returns;
        if(this.state.products != null) 
        {
            returns = this.state.products.map(prod =>{
            return this.displayProduct(prod);
            })
        } 
        else
        returns = <><div class="text-center mt-5">
            Nie masz żadnych produktów w koszyku
        </div></>
        return returns;
    }

    displayProduct(product)
    {
        return(
            <>
                <div class="row offer">
                    <div class="col">
                        {product.name} name
                    </div>
                    <div class="col my-5" id="emptySpace"></div>
                    <div class="col me-2"> {product.amount} amount </div>
                    <div class="col">
                        {product.price} price
                    </div>

                </div>
            </>
        )
    }

}

export default Basket;