import React from "react";
import Offer from "./components/Offer";
import Navbar from "./Navbar";

class Products extends React.Component{

    constructor(props)
    {
        super(props);
    }

    tempList = {
        id: 1,
        price: 0,
        title: "Product title"
    }

    render(){
        return(
            <>
                <Navbar/>
                <div class="row">
                    <div class="col-3">
                        <div class="container">
                            <h3> Cena </h3>
                            <input placeholder="Od" size={10} id="mixPrice"></input>
                            <input placeholder="Do" size={10} id="maxPrice"></input>
                        </div>
                    </div>
                    <div class="col">
                        {
                            <>
                            <Offer product={this.tempList}/>
                            
                            
                            <Offer product={this.tempList}/>
                            </>
                        }
                    </div>
                </div>
            </>
        )
    }
}

export default Products