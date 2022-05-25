import React from "react";
import Offer from "./components/Offer";
import Navbar from "./components/Navbar.js";
import api from "./actions/api";

class Products extends React.Component{

    constructor(props)
    {
        super(props);
        this.state = {
            minPrice: "",
            maxPrice: "",
            category: "",
            products: null
        }
    }

    componentDidMount()
    {
        api.Product().getByCategory(this.state.category)
        .then(res => this.setState({products: res}))
        .catch(err => console.log(err));
    }

    tempList = {
        id: 1,
        price: 60,
        left: 7,
        title: "Farby malarskie"
    }
    tempList2 = {
        id: 2,
        price: 5,
        left: 0,
        title: "Kolorowa lampa ogrodowa"
    }

    render(){
        return(
            <>
                <Navbar/>
                <div class="row">
                    <div class="col-3">
                        <div class="container">
                            <h3> Cena </h3>
                            <input placeholder="Od" size={10} value={this.state.minPrice} id="minPrice" onChange={e => this.handleNumerChange(e, "minPrice")}></input>
                            -
                            <input placeholder="Do" size={10} value={this.state.maxPrice} id="maxPrice" onChange={e => this.handleNumerChange(e, "maxPrice")}></input>
                        </div>
                    </div>
                    <div class="col">
                        {
                            <>
                            <Offer product={this.tempList}/>
                            
                            
                            <Offer product={this.tempList2}/>
                            </>
                        }
                    </div>
                </div>
            </>
        )
    }

    handleNumerChange(e, name)
    {
        if(e.target.value.match(/^\d{0,6}$/) != null)
        {
            this.setState({[name]: e.target.value})
        }
    }

}

export default Products