import React from "react";
import api from "./actions/api.js";
import { store } from "./actions/store.js";
import Navbar from "./components/Navbar.js";
import "./UserView.css"

class UserView extends React.Component{

    constructor(props){
        super(props);

        this.state = {
            Name: '',
            Surname: '',
            Phone: '',
            PostCode: '',
            City: '',
            HouseNumber: '',
            Street: '',
            newInfo : {
                Name: '',
                Surname: '',
                Phone: '',
                PostCode: '',
                City: '',
                HouseNumber: '',
                Street: ''
            }
        }
    }

    componentDidMount(){

        api.User().getUserById(store.getState().persistedReducer.id)
        .then(response =>
            {
                var addr = response.data.Address.split(',');
                //Street,HouseNr,ApNr,City,ZIP
                this.setState({
                Name: response.data.Name,
                Surname: response.data.Surname,
                Phone: response.data.Phone,
                PostCode: addr[4],
                City: addr[3],
                HouseNumber: addr[1],
                ApatrmentNumber: addr[2],
                Street: addr[0]
                })
            })
        .catch(err => console.log(err));


        //Setting the current informations for the change form modal
        this.setState(() => ({
            newInfo: {
                Name: this.state.Name,
                Surname: this.state.Surname,
                Phone: this.state.Phone,
                PostCode: this.state.PostCode,
                City: this.state.City,
                HouseNumber: this.state.HouseNumber,
                ApatrmentNumber: this.state.ApatrmentNumber,
                Street: this.state.Street
            } 
        }))

    }   

    render(){
        return(
            <>
                <Navbar/>
                <div class="back row">
                    <div class="col-3">
                        <div class="list-group" id="list-tab" role="tablist">
                            <a class="list-group-item list-group-item-action active" id="list-info-list" data-bs-toggle="list" href="#list-info" role="tab" aria-controls="info">Informacje osobiste</a>
                            <a class="list-group-item list-group-item-action" id="list-history-list" data-bs-toggle="list" href="#list-history" role="tab" aria-controls="history">Historia zamówień</a>
                            <a class="list-group-item list-group-item-action" id="list-delete-list" data-bs-toggle="list" href="#list-delete" role="tab" aria-controls="delete" style={{color: "red"}}>Usuń konto</a>
                        </div>
                    </div>
                    <div class="col">
                        <div class="tab-content" id="nav-tabContent">
                            <div class="tab-pane fade show active" id="list-info" role="tabpanel" aria-labelledby="list-info-list">
                                {this.Info()}
                            </div>
                            <div class="tab-pane fade" id="list-history" role="tabpanel" aria-labelledby="list-history-list">
                                Historia jest jeszcze niedostępna
                                {this.History()}
                            </div>
                            <div class="tab-pane fade" id="list-delete" role="tabpanel" aria-labelledby="list-delete-list">
                                {this.Delete()}
                            </div>
                            
                        </div>

                    </div>
                </div>
            </>
        )
    }


    Info(props){
        return(
            <>
                <div class="row me-5">
                    <div class="my-3">
                        Imię:  <b> {this.state.Name} </b>
                    </div>
                </div>
                <div class="row me-5">
                    <div class="my-1">
                        Nazwisko:  <b> {this.state.Surname}</b>
                    </div>
                </div>
                <div class="row me-5">
                    <div class="my-3">
                        Numer telefonu: <b>{this.state.Phone}</b>
                    </div>
                </div>
                <div class="row me-5">
                    <div class="my-1">
                        Adres:  <b>{() => this.getPrettyAddress()}</b>
                    </div>
                </div>
                <button class="btn btn-secondary mt-3" data-bs-toggle="modal" data-bs-target="#EditPersonalInfo" >Edytuj dane</button>

                <div class="modal fade" id="EditPersonalInfo" data-bs-backdrop="static" tabindex="-1" aria-labelledby="EditPersonalInfoLabel" aria-hidden="true">
                    <div class="modal-dialog modal-lg">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="EditPersonalInfoLabel">Edycja informacji</h5>
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div class="modal-body">
                                <form>
                                    <div class="row">
                                        {this.modalElement("Imię", this.state.newInfo.Name, 50, "Name")}
                                        {this.modalElement("Nazwisko", this.state.newInfo.Surname, 50, "Surname")}
                                        {this.modalElement("Telefon", this.state.newInfo.Phone, 19, "Phone")}
                                    </div>
                                    <div class="row">
                                        {this.modalElement("Ulica", this.state.newInfo.Street, 50, "Street")}
                                        {this.modalElement("Numer domu", this.state.newInfo.HouseNumber, 4, "HouseNumber")}
                                        {this.modalElement("Numer mieszkania", this.state.newInfo.ApatrmentNumber, 4, "ApatrmentNumber")}
                                    </div>
                                    <div class="row">
                                        {this.modalElement("Miasto", this.state.newInfo.City, 30, "City")}
                                        {this.modalElement("Kod Pocztowy", this.state.newInfo.PostCode, 6, "PostCode")}
                                    </div>
                                </form>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Anuluj</button>
                                <button type="button" class="btn btn-primary" data-bs-dismiss="modal" onClick={()=> this.saveNewData()}>Zapisz</button>
                            </div>
                        </div>
                    </div>
                </div>

                
            </>
        )
    }

    saveNewData()
    {
        api.User().update(this.state.Id, this.state.newInfo)
    }

    modalElement(NamePL, value, maxLength, valueName)
    {
        return(
            <div class="col my-2">
                {NamePL}<br/>
                <input type="text"  value={value} maxLength={maxLength}
                    onChange={e => this.setState(prevState => ({
                    newInfo: {
                        ...prevState.newInfo,
                        [valueName]: e.target.value
                    }   
                }))}/>
            </div>
        )
    }

    getPrettyAddress()
    {
        var Address = '';
        Address += this.state.Street + ' ' + this.state.HouseNumber + ', ';
        Address += this.state.PostCode + ' ' + this.state.City;
                  
        return Address;
    }

    HistoryEntry(props2)
    {
        return(
            <>
                <div class="accordion-item">
                    <h2 class="accordion-header" id={"panelsStayOpen-heading"+props2.id}>
                    <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target={"#panelsStayOpen-collapse"+props2.id} aria-expanded="true" aria-controls={"panelsStayOpen-collapse"+props2.id}>
                        {props2.Date}
                    </button>
                    </h2>
                    <div id={"panelsStayOpen-collapse"+props2.id} class="accordion-collapse collapse" aria-labelledby={"panelsStayOpen-heading"+props2.id}>
                        <div class="accordion-body">
                            <ul class="list-group">
                                {props2.Products?.map(item => {
                                    console.log("here", item)
                                    if(item !== undefined)
                                        return(
                                            <li class="list-group-item" key={item.id}>
                                                <div class="row">
                                                    <div class="col">
                                                        <div class="row">
                                                            Nazwa produktu
                                                        </div>
                                                        <div class="row">
                                                            {item.Name} 
                                                        </div>
                                                    </div>
                                                    <div class="col">
                                                        <div class="row">
                                                            Zamówiona ilość
                                                        </div>
                                                        <div class="row">
                                                        {item.Amount}
                                                        </div>
                                                    </div>
                                                    <div class="col">
                                                        <div class="row">
                                                            Cena jednostkowa
                                                        </div>
                                                        <div class="row">
                                                            {item.PricePerPiece} zł
                                                        </div>
                                                    </div>
                                                </div>
                                            </li>
                                        )
                                })}
                            </ul>
                        </div>
                    </div>
                </div>
            </>
        )
    }

    History(props){
        var orderHistory = [ //JUST FOR TESTS TODO: Delete this
            {
                id: 1,
                Date: "1.1.2022",
                Products: [
                    {
                    Name: "Cement",
                    Amount: 5,
                    PricePerPiece: 10,
                },
                {
                    Name: "Rura",
                    Amount: 1,
                    PricePerPiece: 11,
                }
                ]
            },
            {
                id: 2,
                Date: "2.1.2022",
                Products: [
                    {
                        Name: "Dachówka",
                        Amount: 100,
                        PricePerPiece: 8
                    },
                    {
                        Name: "Rura",
                        Amount: 18,
                        PricePerPiece: 11,
                    }
                ]
            }
        ]

        if(orderHistory.length > 0)
        {
            return(
                <>
                    {orderHistory.map(i => {
                        return(
                            <div class="accordion" id="accordionPanelsStayOpen">
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
                <h3 class="my-4">Czy aby na pewno chcesz usunąć twoje konto?</h3>
                <input type="button" className="btn btn-danger" value="Usuń konto" />
            </>
        )
    }

}

export default UserView