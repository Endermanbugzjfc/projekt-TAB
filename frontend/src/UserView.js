import React from "react";
import Navbar from "./Navbar";
import "./UserView.css"

class UserView extends React.Component{

    constructor(props){
        super(props);

        this.state = {
            Name: "Alberto",
            newInfo : {
                Name: '',
                Surname: '',
                Phone: '',
                PostCode: '',
                City: '',
                HouseNumber: null,
                ApatrmentNumber: null,
                Street: ''
            }
        }
    }

    componentDidMount(){
        //Setting the current informations for the change form
        this.setState(() => ({
            newInfo: {
                Name: this.state.Name,
                Surname: '',
                Phone: '',
                PostCode: '',
                City: '',
                HouseNumber: null,
                ApatrmentNumber: null,
                Street: ''
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
                        Imię:  <b>-</b>
                    </div>
                </div>
                <div class="row me-5">
                    <div class="my-1">
                        Nazwisko:  <b>-</b>
                    </div>
                </div>
                <div class="row me-5">
                    <div class="my-3">
                        Numer telefonu: <b>-</b>
                    </div>
                </div>
                <div class="row me-5">
                    <div class="my-1">
                        Adres:  <b>-</b>
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
                                        <div class="col">
                                            Imie<br/>
                                            <input type="text" value={this.state.newInfo.Name} placeholder="Imię" maxLength="50"
                                             onChange={e => this.setState(prevState => ({
                                                newInfo: {
                                                    ...prevState.newInfo,
                                                    Name: e.target.value
                                                }   
                                            }))}/>
                                        </div>
                                        <div class="col">
                                            Nazwisko<br/>
                                            <input type="text" value={this.state.newInfo.Surname} placeholder="Nazwisko" maxLength="50"
                                             onChange={e => this.setState(prevState => ({
                                                newInfo: {
                                                    ...prevState.newInfo,
                                                    Surname: e.target.value
                                                }   
                                            }))}/>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col">
                                            Telefon<br/>
                                            <input type="text"  value={this.state.newInfo.Phone} placeholder="Numer telefonu" maxLength="19"
                                             onChange={e => this.setState(prevState => ({
                                                newInfo: {
                                                    ...prevState.newInfo,
                                                    Phone: e.target.value
                                                }   
                                            }))}/>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col">
                                            Ulica<br/>
                                            <input type="text"  value={this.state.newInfo.Street} placeholder="Ulica"
                                             onChange={e => this.setState(prevState => ({
                                                newInfo: {
                                                    ...prevState.newInfo,
                                                    Street: e.target.value
                                                }   
                                            }))}/>
                                        </div>
                                        <div class="col">
                                            Numer domu<br/>
                                            <input type="text"  value={this.state.newInfo.HouseNumber} maxLength="4"
                                             onChange={e => this.setState(prevState => ({
                                                newInfo: {
                                                    ...prevState.newInfo,
                                                    HouseNumber: e.target.value
                                                }   
                                            }))}/>
                                        </div>
                                        <div class="col">
                                            Numer mieszkania<br/> 
                                            <input type="text"  value={this.state.newInfo.ApatrmentNumber} maxLength="6"
                                             onChange={e => this.setState(prevState => ({
                                                newInfo: {
                                                    ...prevState.newInfo,
                                                    ApatrmentNumber: e.target.value
                                                }   
                                            }))}/>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col">
                                            Miasto<br/>
                                            <input type="text"  value={this.state.newInfo.City} placeholder="Miasto" maxLength="30"
                                             onChange={e => this.setState(prevState => ({
                                                newInfo: {
                                                    ...prevState.newInfo,
                                                    City: e.target.value
                                                }   
                                            }))}/>
                                        </div>
                                        <div class="col">
                                            Kod pocztowy<br/>
                                            <input type="text"  value={this.state.newInfo.PostCode} placeholder="Kod pocztowy" maxLength="6"
                                             onChange={e => this.setState(prevState => ({
                                                newInfo: {
                                                    ...prevState.newInfo,
                                                    PostCode: e.target.value
                                                }   
                                            }))}/>
                                        </div>
                                    </div>
                                </form>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Anuluj</button>
                                <button type="button" class="btn btn-primary">Zapisz</button>
                            </div>
                        </div>
                    </div>
                </div>

                
            </>
        )
    }

    History(props){
        return(
            <>

            </>
        )
    }
    
    Delete(props){
        return(
            <>
            <h3>Czy aby na pewno chcesz usunąć twoje konto?</h3>
            </>
        )
    }

}

export default UserView