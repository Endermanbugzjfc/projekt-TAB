import React from "react";
import api from "../../actions/api";

class ManageUsers extends React.Component
{
    constructor(props)
    {
        super(props)
        this.state = {
            gottenWorkers : [],
            searchBar: '',
            selectedUser: 0,
            newInfo : {
                UserName: '',
                Name: '',
                Surname: '',
                Phone: '',
                PostCode: '',
                City: '',
                HouseNumber: '',
                Street: '',
                Country: ''
            },
        }
    }

    render()
    {
        return <>
            <div className="mt-3 col">
                <div className="col">
                    <label className="mt-2 me-4">Typ użytkownika:</label>
                    <select id="selectionType">
                        <option>Klient</option>
                        <option>Pracownik</option>
                    </select> <br/>
                    <label className="mt-2  me-4">Szukaj po:</label>
                        <select id="selectionOptions">
                            <option>ID</option>
                            <option>Imię i nazwisko</option>
                            <option>Numer PESEL</option>
                        </select>
                    <form className="d-flex my-2">
                        <input className="form-control me-2" type="search" placeholder="Wyszukaj" id="SearchBar" aria-label={this.props.id} value={this.state.searchBar} onChange={e => this.setState({searchBar: e.target.value})}/>
                        <input className="btn btn-outline-success" type="button" value="Szukaj" onClick={(e) =>{this.Search(e)}} />
                    </form>
                </div>
            </div>
            {this.ShowResult()}
            {this.modifyUserModal()}
            {this.deleteUserModal()}
        </>
    }

    Search(e)
    {
        var typeIndex = document.getElementById("selectionType")?.selectedIndex
        var type = typeIndex === 0 ? "CUSTOMER" : "EMPOLYEE"

        var selectedIndex = document.getElementById("selectionOptions")?.selectedIndex
        var searched = {}
        if(selectedIndex === 0)
            searched.id = this.state.searchBar
        else if(selectedIndex === 1)
        {
            searched.legalName = this.state.searchBar.split(' ')[0]
            searched.surname = this.state.searchBar.split(' ')[1]
            if(searched.surname === undefined) searched.surname = ''
        }
        else if(selectedIndex === 2)
            searched.pesel = this.state.searchBar
        else
            alert("Something went wrong!")

        api.User().searchUser(searched, type)
        .then(response => this.setState({gottenWorkers: response.data}))
        .catch(err => console.log(err))

    }

    ShowResult()
    {
        console.log(this.state.gottenWorkers)
        var returns = <>
            <ul className="list-group">
            {this.state.gottenWorkers.map((user, id) =>
                {
                    return <>
                        <div key={user.id}>
                                <li className="list-group-item">
                                    <div className="row">
                                        <div className="col">
                                            <div className="row"><div className="col"> ID: {user.id} </div></div>
                                            <div className="row">
                                                <div className="col">
                                                    Imię i nazwisko: {user.legalName} {user.surname}
                                                </div>
                                                <div className="col">Pesel: {user.pesel}</div>
                                            </div>
                                            <div className="row">
                                                <div className="col">
                                                    Numer telefonu: {user.phoneNumber}
                                                </div>
                                                <div className="col">Data urodzenia: {user.birthDate}</div>
                                            </div>
                                        </div>
                                        <div className="col-2">
                                            <input type="button" className="btn btn-danger my-1" value="Usuń" data-bs-toggle="modal" data-bs-target="#DeleteUser"/>
                                            <input type="button" className="btn btn-secondary my-1" data-bs-toggle="modal" data-bs-target="#EditUserInfo" value="Modyfikuj"
                                             onClick={() => {this.setState({selectedUser: id})
                                             var newUser= {
                                                UserName: this.state.gottenWorkers[id].userName,
                                                Name: this.state.gottenWorkers[id].legalName,
                                                Surname: this.state.gottenWorkers[id].surname,
                                                Phone: this.state.gottenWorkers[id].phoneNumber,
                                                PostCode: this.state.gottenWorkers[id].addressDto.zipCode,
                                                City: this.state.gottenWorkers[id].addressDto.city,
                                                HouseNumber: this.state.gottenWorkers[id].addressDto.streetNumber,
                                                Street: this.state.gottenWorkers[id].addressDto.streetName,
                                                Country: this.state.gottenWorkers[id].addressDto.location
                                             }
                                             this.setState({newInfo: newUser})}}
                                            />
                                        </div>
                                    </div>
                                    
                                </li>
                        </div>
                    </>
                })
            }
            </ul>
        </> 

        return returns;
    
    }

    deleteUserModal()
    {
        return <>
            <div className="modal fade" id="DeleteUser" data-bs-backdrop="static" tabIndex="-1" aria-labelledby="DeleteUserLabel" aria-hidden="true">
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="DeleteUserLabel">Usuwanie uzytkownika</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            Czy na pewno chcesz usunąć tego użytkownika? <br/>
                            {this.state.gottenWorkers[this.state.selectedUser]?.legalName} {this.state.gottenWorkers[this.state.selectedUser]?.surname} <br/>
                            Pesel: {this.state.gottenWorkers[this.state.selectedUser]?.pesel}
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Anuluj</button>
                            <button type="button" className="btn btn-danger" data-bs-dismiss="modal" onClick={()=>this.deleteUser()}>Usuń</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    }
    deleteUser()
    {
        api.User().delete(this.state.gottenWorkers[this.state.selectedUser].id)
        .catch(err => console.log(err))
    }
    
    modifyUserModal()
    {
        return(
            <>
                <div className="modal fade" id="EditUserInfo" data-bs-backdrop="static" tabIndex="-1" aria-labelledby="EditUserInfoLabel" aria-hidden="true">
                    <div className="modal-dialog modal-lg">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="EdiUserInfoLabel">Edycja informacji</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                <form className="needs-validation">
                                    <div className="row">
                                        {this.modalElement("Imię", this.state.newInfo.Name, 50, "Name")}
                                        {this.modalElement("Nazwisko", this.state.newInfo.Surname, 50, "Surname")}
                                    </div>
                                    <div className="row">
                                        {this.modalElement("Telefon", this.state.newInfo.Phone, 19, "Phone")}
                                        {this.modalElement("Kraj zamieszkania", this.state.newInfo.Country, 60, "Country" )}
                                    </div>
                                    <div className="row">
                                        {this.modalElement("Ulica", this.state.newInfo.Street, 50, "Street")}
                                        {this.modalElement("Numer domu", this.state.newInfo.HouseNumber, 4, "HouseNumber")}
                                    </div>
                                    <div className="row">
                                        {this.modalElement("Miasto", this.state.newInfo.City, 30, "City")}
                                        {this.modalElement("Kod Pocztowy", this.state.newInfo.PostCode, 6, "PostCode")}
                                    </div>
                                </form>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Anuluj</button>
                                <button type="button" className="btn btn-primary" onClick={() => this.saveNewData()}>Zapisz</button>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }
    
    modalElement(NamePL, value, maxLength, valueName)
    {
        return(
            <div className="col my-2">
                {NamePL}<br/>
                <input type="text" value={value} maxLength={maxLength} id={valueName+'Modal'} className="form-control"
                    onChange={e => this.setState(prevState => ({
                    newInfo: {
                        ...prevState.newInfo,
                        [valueName]: e.target.value
                    }   
                }))}/>
                <div className="invalid-feedback" id="firstInvalid">Niepoprawna wartość</div>
            </div>
        )
    }

    saveNewData()
    {
        if(this.checkNewData() === true) 
        {
            //e.currentTarget.setAttribute("data-bs-dismiss", "modal");

            var newUserInfo = this.findChanges();

            console.log(newUserInfo)

            api.User().update(this.state.Id, newUserInfo)
            .then(() => {})
            .catch(err => 
                {
                    console.log(err)
                    alert("Niestety, nie udało się zapisać zmian")
                });
            //e.currentTarget.click();
        }
        else console.log("bad")
        console.log(this.state.newInfo)
    }

    findChanges()
    {
        var userInfo = {}
        userInfo.legalName = this.state.newInfo.Name
        userInfo.surname = this.state.newInfo.Surname
        userInfo.phoneNumber = this.state.newInfo.Phone
        userInfo.addressDto = {}
        userInfo.addressDto.zipCode = this.state.newInfo.PostCode
        userInfo.addressDto.city = this.state.newInfo.City
        userInfo.addressDto.streetNumber = this.state.newInfo.HouseNumber
        userInfo.addressDto.streetName = this.state.newInfo.Street
        return userInfo;
    }

    checkNewData()
    {
        var isGood = true;
        if(this.state.newInfo.Name.match(/^[a-zA-Z]+$/) == null)
        {
            isGood = false;
            document.getElementById('NameModal')?.classList.add("is-invalid");
        }
        else
            document.getElementById('NameModal').classList.remove("is-invalid");
        if(this.state.newInfo.Surname.match(/^[a-zA-Z]+$/) == null)
        {
            isGood = false;
            document.getElementById('SurnameModal').classList.add("is-invalid");
        }
        else
            document.getElementById('SurnameModal').classList.remove("is-invalid");
        if(this.state.newInfo.Phone.match(/^(\+\d{2})?( )?\d{1,9}$/) == null)
        {
            isGood = false;
            document.getElementById('PhoneModal').classList.add("is-invalid");
        }
        else
            document.getElementById('PhoneModal').classList.remove("is-invalid");
        if(this.state.newInfo.Street?.match(/^[a-zA-Z]+$/) == null)
        {
            isGood = false;
            document.getElementById('StreetModal').classList.add("is-invalid");
        }
        else
            document.getElementById('StreetModal').classList.remove("is-invalid");
        if(this.state.newInfo.HouseNumber?.match(/^\d+(\/{1}\d+)?$/) == null)
        {
            isGood = false;
            document.getElementById('HouseNumberModal').classList.add("is-invalid");
        }
        else
            document.getElementById('HouseNumberModal').classList.remove("is-invalid");
        if(this.state.newInfo.City?.match(/^[a-zA-Z]+$/) == null)
        {
            isGood = false;
            document.getElementById('CityModal').classList.add("is-invalid");
        }
        else
            document.getElementById('CityModal').classList.remove("is-invalid");
        if(this.state.newInfo.PostCode?.match(/^\d+(-\d+)?$/) == null)
        {
            isGood = false;
            document.getElementById('PostCodeModal').classList.add("is-invalid");
        }
        else
            document.getElementById('PostCodeModal').classList.remove("is-invalid");

        return isGood;
    }


}

export default ManageUsers