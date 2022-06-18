import React from "react";
import api from "./actions/api.js";
import { store } from "./actions/store.js";
import Navbar from "./components/Navbar.js";
import UserInfo from "./components/Views/UserInfo.js";
import { logout } from "./reducers/dUser.js";
import "./UserView.css"

class UserView extends React.Component{

    constructor(props){
        super(props);

        this.state = {
            
        }
    }


    render(){
        return(
            <>
                <Navbar/>
                <div className="back row">
                    <div className="col-3">
                        <div className="list-group" id="list-tab" role="tablist">
                            <a className="list-group-item list-group-item-action active" id="list-info-list" data-bs-toggle="list" href="#list-info" role="tab" aria-controls="info">Informacje osobiste</a>
                            <a className="list-group-item list-group-item-action" id="list-history-list" data-bs-toggle="list" href="#list-history" role="tab" aria-controls="history">Historia zamówień</a>
                            <a className="list-group-item list-group-item-action" id="list-delete-list" data-bs-toggle="list" href="#list-delete" role="tab" aria-controls="delete" style={{color: "red"}}>Usuń konto</a>
                        </div>
                    </div>
                    <div className="col">
                        <div className="tab-content" id="nav-tabContent">
                            <div className="tab-pane fade show active" id="list-info" role="tabpanel" aria-labelledby="list-info-list">
                                <UserInfo/>
                            </div>
                            <div className="tab-pane fade" id="list-history" role="tabpanel" aria-labelledby="list-history-list">
                                {this.History()}
                            </div>
                            <div className="tab-pane fade" id="list-delete" role="tabpanel" aria-labelledby="list-delete-list">
                                {this.Delete()}
                            </div>
                        </div>

                    </div>
                </div>
            </>
        )
    }

    HistoryEntry(props)
    {
        //JSON template
        
        var properties = { 
            id: '1',
            orderDate: 'HEHE',
            paymentMethod: 'HAH',
            orderedProducts: [{
                id: '', quantity: 0, price: 0.0, productDto: {}
            }],
            totalCost: 0.0
        }
        

        var properties2 = {}
        api.User().getOrderById(this.state.Id, props.id)
        .then(response => properties = response)
        .catch(err=>console.log(err))

        return(
            <>
                <div className="accordion-item">
                    <h2 className="accordion-header" id={"panelsStayOpen-heading"+props.id}>
                    <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target={"#panelsStayOpen-collapse"+props.id} aria-expanded="true" aria-controls={"panelsStayOpen-collapse"+props.id}>
                        {props.orderDate} &emsp; {properties.totalPrice} zł
                    </button>
                    </h2>
                    <div id={"panelsStayOpen-collapse"+props.id} className="accordion-collapse collapse" aria-labelledby={"panelsStayOpen-heading"+props.id}>
                        <div className="accordion-body">
                            <ul className="list-group">
                                {                                 
                                properties.orderedProducts?.map(item => {
                                    if(item !== undefined)
                                        return(
                                            <li className="list-group-item" key={item.id}>
                                                <div className="row">
                                                    <div className="col">
                                                        <div className="row">
                                                            Nazwa produktu
                                                        </div>
                                                        <div className="row">
                                                            {item.product.name} 
                                                        </div>
                                                    </div>
                                                    <div className="col">
                                                        <div className="row">
                                                            Zamówiona ilość
                                                        </div>
                                                        <div className="row">
                                                        {item.quantity}
                                                        </div>
                                                    </div>
                                                    <div className="col">
                                                        <div className="row">
                                                            Cena jednostkowa
                                                        </div>
                                                        <div className="row">
                                                            {item.price} zł
                                                        </div>
                                                    </div>
                                                </div>
                                            </li>
                                        )
                                    else return <></>
                                })}
                            </ul>
                        </div>
                    </div>
                </div>
            </>
        )
    }

    History(props){
        //JSON template
        
        var temp = 
            {
                id: '1',
                orderDate: '2.1.2022',
                paymentMethod: 'BLIK'
            }
        
        

        var orderHistory = []
        api.User().getOrders(this.state.Id)
        .then(response => orderHistory = response)
        .catch(err => console.log(err));


        if(orderHistory.length > 0)
        {
            return(
                <>
                    {orderHistory.map(i => {
                        return(
                            <div className="accordion" id="accordionPanelsStayOpen">
                                {this.HistoryEntry(i)}
                            </div>
                        )
                })}
                </>
            )
        }
        else
        {
            return(
                <>
                    <h4>Nie masz żadnej historii zamówień</h4>
                </>
            )
        }
    }
    
    Delete(props){
        return(
            <>
                <h3 className="my-4">Czy aby na pewno chcesz usunąć twoje konto?</h3>
                <input type="button" className="btn btn-danger" value="Usuń konto" onClick={()=> {
                    api.User().delete(this.state.Id)
                    api.User().logout()
                    store.dispatch(logout())
                    window.location.href = '/';
                }
                } />
            </>
        )
    }

}

export default UserView