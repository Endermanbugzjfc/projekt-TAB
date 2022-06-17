import React from "react";
import api from "../../actions/api";

class AddNewProduct extends React.Component {

    constructor(props)
    {
        super(props)
        this.state = {
            name: '',
            producer: '',
            description: '',
            category: '',
            inStock: '0',
            purchasePrice: '0.0',
            retailPrice: '0.0',

            categories: [],
            priceAknowledge: false
        }
    }

    componentDidMount()
    {
        api.Product().getCategories()
        .then(response => this.setState({categories: response.data}))
        .catch(err => console.log(err))
    }

    render()
    {
        return <>
            <div class="mt-3">
                <form className="needs-validation">
                    <div class="row">
                        {this.FormElement("Nazwa", "text", "name_input", this.state.name, "name")}
                        {this.FormElement("Producent", "text", "producer_input", this.state.producer, "producer")}
                    </div>
                    <div class="row">
                        <div class="col">
                            <div class="input-group mb-3">
                                <span class="input-group-text">Kategoria</span>
                                <select class="form-select" aria-label="Category select">

                                    {this.state.categories.map(cat => {
                                        return <>
                                            <option value={cat.id}>{cat.name}</option>
                                        </>
                                        }
                                        )}
                                </select>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col">
                            <div class="input-group mb-3">
                                <span class="input-group-text">Opis</span>
                                <textarea className="form-control" value={this.state.description} id="descriptionForm" maxLength={1000} onChange={e =>{this.setState({description: e.target.value})}}/>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        {this.FormElement("Cena zakupu", "text", "purchase_price_input", this.state.purchasePrice, "purchasePrice")}
                        {this.FormElement("Cena sprzedaży", "text", "retail_price_input", this.state.retailPrice, "retailPrice")}
                    </div>

                    <div class="btn-toolbar" role="toolbar" aria-label="Toolbar with button groups">
                        <div class="btn-group me-2" role="group" aria-label="First button">
                            <button type="button" class="btn btn-danger" onClick={() => this.handleOnCancelClick()}>Odrzuć zmiany</button>
                        </div>
                        <div class="btn-group me-2" role="group" aria-label="Second button">
                            <button type="button" class="btn btn-success" onClick={ () => this.AddProduct()}>Zapisz</button>
                        </div>
                    </div>
                </form>
            </div>
        </>
    }

    FormElement(span, type, label, value, valueName)
    {
        return(<>
            <div class="col">
                <div class="input-group mb-3">
                    <span class="input-group-text">{span}</span>
                    <input type={type} class="form-control" id={valueName + "Form"} aria-label={label} aria-describedby="inputGroup-sizing-default" value={value} onChange={e =>{this.setState({[valueName]: e.target.value})}} />
                </div>
            </div>
        </>)
    }

    handleOnCancelClick()
    {
        this.setState({ 
            productId: '',
            name: '',
            producer: '',
            description: '',
            category: '',
            inStock: 0,
            purchasePrice: 0.0,
            retailPrice: 0.0
        })
    }

    AddProduct()
    {
        if(this.valideteForm())
        {
            var newProduct = {
                name: this.state.name,
                producer: this.state.producer,
                description: this.state.description,
                category: this.state.category,
                inStock: this.state.inStock,
                purchasePrice: this.state.purchasePrice,
                retailPrice: this.state.retailPrice
            }

            api.Product().createProduct(newProduct)
            .catch(err => console.log(err))
        }
    }

    valideteForm()
    {
        var allGood = true
        if(this.state.name.length < 1)
        {
            allGood = false;
            document.getElementById("nameForm")?.classList.add("is-invalid")
        }
        else
            document.getElementById("nameForm")?.classList.remove("is-invalid")
        if(this.state.description.length < 1)
        {
            allGood = false;
            document.getElementById("descriptionForm")?.classList.add("is-invalid")
        }
        else
            document.getElementById("descriptionForm")?.classList.remove("is-invalid")

        if(this.state.inStock.length < 1)
        {
            allGood = false;
            document.getElementById("inStockForm")?.classList.add("is-invalid")
        }
        else
            document.getElementById("inStockForm")?.classList.remove("is-invalid")

        if(this.state.producer.length < 1)
        {
            allGood = false;
            document.getElementById("producerForm")?.classList.add("is-invalid")
        }
        else
            document.getElementById("producerForm")?.classList.remove("is-invalid")

        if(this.state.retailPrice.match(/^\d+((,|\.)\d{1,2})?$/) == null )
        {
            allGood = false;
            document.getElementById("retailPriceForm")?.classList.add("is-invalid")
        }
        else
            document.getElementById("retailPriceForm")?.classList.remove("is-invalid")

        if(this.state.purchasePrice.match(/^\d+((,|\.)\d{1,2})?$/) == null)
        {
            allGood = false;
            document.getElementById("purchasePriceForm")?.classList.add("is-invalid")
        }
        else
            document.getElementById("purchasePriceForm")?.classList.remove("is-invalid")
            
        this.setState({retailPrice: this.state.retailPrice.replace(',','.')})
        this.setState({purchasePrice: this.state.purchasePrice.replace(',','.')})


        if(this.state.retailPrice <= this.state.purchasePrice && this.state.priceAknowledge === false)
        {
            alert("Uwaga! Ustawiłeś cenę sprzedaży mniejszą niż cenę zakupu!");
        }

        return allGood
    }
}

export default AddNewProduct