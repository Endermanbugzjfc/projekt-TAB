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
            products: []
        }
    }

    componentDidMount()
    {
        var category = window.location.href.split('/products')[1]
        if(category.length !== 0)
        {
            category = category.split('/')[1]
            this.setState({category: category})
        }
        var realCategories = [];
        api.Product().getCategories().then(res => realCategories = res).catch(err => console.log(err))

        if(!realCategories.includes(category) && realCategories.length > 0) window.location.href = '/'


        api.Product().getByCategory(category)
        .then(res => this.setState({products: res}))
        .catch(err => console.log(err));
    }

    tempList = {
        productId: '1',
        name: 'Farby malarskie',
        producer: 'WOW',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus non magna risus. Quisque id est volutpat, faucibus arcu ac, laoreet leo.',
        category: 'huh',
        inStock: 10,
        purchasePrice: 1.56,
        retailPrice: 5.1
    }
    tempList2 = {
        productId: '2',
        name: 'Dachówki',
        producer: 'Ryn',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus non magna risus. Quisque id est volutpat, faucibus arcu ac, laoreet leo.',
        category: 'huqweqh',
        inStock: 6123341,
        purchasePrice: 1123.4,
        retailPrice: 12234.14
    }

    render(){
        return(
            <>
                <Navbar/>
                <div className="row">
                    <div className="col-3">
                        <div className="container">
                            <h3> Cena </h3>
                            <div className="row">
                                <input placeholder="Od" value={this.state.minPrice} id="minPrice" className="col me-2 form-control" onChange={e => this.handleNumerChange(e, "minPrice")}></input>
                                _
                                <input placeholder="Do" value={this.state.maxPrice} id="maxPrice" className="col ms-2 form-control" onChange={e => this.handleNumerChange(e, "maxPrice")}></input>
                                    
                            </div>
                            <div className="row">
                                <div className="col"> 
                                    <input type="button" value="Szukaj" className="btn btn-primary mt-3" onClick={() => {this.SearchPrice()}}/>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col">
                        {
                            this.state.products.map(prod => {
                                return <Offer product={prod}/>
                            })
                        }
                        {/* //TODO: DELETE */}
                        <Offer product={this.tempList}/>
                        
                        
                        <Offer product={this.tempList2}/>
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

    SearchPrice()
    {
        var priceQueryDTO = {}
        if(this.state.minPrice.length > 0) priceQueryDTO.min =this.state.minPrice
        if(this.state.maxPrice.length > 0) priceQueryDTO.max =this.state.maxPrice

        api.Product().getProductsByPriceAndCategory(priceQueryDTO, this.state.category)

    }

}

export default Products