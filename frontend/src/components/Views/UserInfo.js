import React from "react"
import api from "../../actions/api"
import { store } from "../../actions/store"

class UserInfo extends React.Component
{
    /* USER_DTO:
        userData = {
            id: '',
            userName: '',
            password: '',
            legalName: '',
            surname: '',
            phoneNumber:'',
            type: '',
            birthDay: '',
            pesel: '',
            employmentDate: '',
            address : {id, country, zipCode, location, streetName, streetNumber},
            shoppingCart: {id, selectedProducts: []}
        }
    */

    constructor(props)
    {
        super(props)
        this.state = {
            Id: '',
            UserName : '', //login
            Name: '',
            Surname: '',
            BirthDay: '',
            Pesel: '',
            Phone: '',
            PostCode: '',
            City: '',
            HouseNumber: '',
            Street: '',
            Country:'',
            Type: '', //role
            EmploymentDate: '',
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

    componentDidMount(){
        api.User().getUserById(store.getState().persistedReducer.id)
        .then(response =>
        {
            this.setState({
            Id: response.data.id,
            UserName: response.data.userName,
            Name: response.data.legalName,
            Surname: response.data.surname,
            BirthDay: response.data.birthDay,
            Pesel: response.data.pesel,
            Phone: response.data.phoneNumber,
            PostCode: response.data.address.zipCode,
            City: response.data.address.location,
            HouseNumber: response.data.address.streetNumber,
            Street: response.data.address.streetName,
            Country: response.data.address.country,
            Type: response.data.type,
            EmploymentDate: response.data.employmentDate,
            })
        })
        .catch(err => console.log(err));
        //Setting the current informations for the change form modal
        this.setState(() => ({
            newInfo: {
                UserName: this.state.UserName,
                Name: this.state.Name,
                Surname: this.state.Surname,
                BirthDay: this.state.BirthDay,
                Pesel: this.state.Pesel,
                Phone: this.state.Phone,
                PostCode: this.state.PostCode,
                City: this.state.City,
                HouseNumber: this.state.HouseNumber,
                Street: this.state.Street,
                Country: this.state.Country
            }
        }))
    }
    

    render()
    {
        var list = []
        list.push(<>
            <div className="row me-5">
                <div className="my-2">
                    Nazwa użytkownika:  <b> {this.state.UserName} </b>
                </div>
            </div>
            <div className="row me-5">
                <div className="my-2">
                    Imię:  <b> {this.state.Name} </b>
                </div>
            </div>
            <div className="row me-5">
                <div className="my-2">
                    Nazwisko:  <b> {this.state.Surname}</b>
                </div>
            </div>
            <div className="row me-5">
                <div className="my-2">
                    Numer telefonu: <b>{this.state.Phone}</b>
                </div>
            </div>
            <div className="row me-5">
                <div className="my-2">
                    Adres:  <b>{this.getPrettyAddress()}</b>
                </div>
            </div>
        </>
        )
        if(store.getState().persistedReducer.role !== "CUSTOMER")
            list.push(
                <>
                <div className="row me-5">
                        <div className="my-2">
                            Pesel:  <b>{this.state.Pesel}</b>
                        </div>
                    </div>
                    <div className="row me-5">
                        <div className="my-2">
                            Data zatrudnienia:  <b>{this.state.EmploymentDate}</b>
                        </div>
                    </div>
                </>
            )
        return( 
            <>
                {list}
                <button className="btn btn-secondary mt-3" data-bs-toggle="modal" data-bs-target="#EditPersonalInfo" >Edytuj dane</button>
                {this.infoEditModal()}
            </>
        )
    }

    infoEditModal()
    {
        return(
            <>
                <div className="modal fade" id="EditPersonalInfo" data-bs-backdrop="static" tabIndex="-1" aria-labelledby="EditPersonalInfoLabel" aria-hidden="true">
                    <div className="modal-dialog modal-lg">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="EditPersonalInfoLabel">Edycja informacji</h5>
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
                                <button type="button" className="btn btn-primary" onClick={(e)=> this.saveNewData(e)}>Zapisz</button>
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
    getPrettyAddress()
    {
        var Address = '';
        Address += this.state.Street + ' ' + this.state.HouseNumber + ', ';
        Address += this.state.PostCode + ' ' + this.state.City + ', ' + this.state.Country;
                  
        return Address;
    }

    saveNewData(e)
    {
        if(this.checkNewData() === true) 
        {
            e.currentTarget.setAttribute("data-bs-dismiss", "modal");

            var newUserInfo = this.findChanges();

            api.User().update(this.state.Id, newUserInfo)
            .then(() => {})
            .catch(err => 
                {
                    console.log(err)
                    alert("Niestety, nie udało się zapisać zmian")
                });
            e.currentTarget.click();
        }
    }

    findChanges()
    {
        var userInfo = {}
        if(this.state.Name !== this.state.newInfo.Name) userInfo.legalName = this.state.newInfo.Name
        if(this.state.Surname !== this.state.newInfo.Surname) userInfo.surname = this.state.newInfo.Surname
        if(this.state.Phone !== this.state.newInfo.Phone) userInfo.phoneNumber = this.state.newInfo.Phone
        if(this.state.PostCode !== this.state.newInfo.PostCode) userInfo.zipCode = this.state.newInfo.PostCode
        if(this.state.City !== this.state.newInfo.City) userInfo.location = this.state.newInfo.City
        if(this.state.HouseNumber !== this.state.newInfo.HouseNumber) userInfo.streetNumber = this.state.newInfo.HouseNumber
        if(this.state.Street !== this.state.newInfo.Street) userInfo.streetName = this.state.newInfo.Street
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
        if(this.state.newInfo.Street.match(/^[a-zA-Z]+$/) == null)
        {
            isGood = false;
            document.getElementById('StreetModal').classList.add("is-invalid");
        }
        else
            document.getElementById('StreetModal').classList.remove("is-invalid");
        if(this.state.newInfo.HouseNumber.match(/^\d+(\/{1}\d+)?$/) == null)
        {
            isGood = false;
            document.getElementById('HouseNumberModal').classList.add("is-invalid");
        }
        else
            document.getElementById('HouseNumberModal').classList.remove("is-invalid");
        if(this.state.newInfo.City.match(/^[a-zA-Z]+$/) == null)
        {
            isGood = false;
            document.getElementById('CityModal').classList.add("is-invalid");
        }
        else
            document.getElementById('CityModal').classList.remove("is-invalid");
        if(this.state.newInfo.PostCode.match(/^\d+(-\d+)?$/) == null)
        {
            isGood = false;
            document.getElementById('PostCodeModal').classList.add("is-invalid");
        }
        else
            document.getElementById('PostCodeModal').classList.remove("is-invalid");

        return isGood;
    }

}

export default UserInfo