import React from "react"
import api from "../../actions/api"
import { store } from "../../actions/store"

class UserInfo extends React.Component
{
    constructor(props)
    {
        super(props)
        this.state = {
            Id: '',
            Email : '', //login
            Name: '',
            Surname: '',
            BirthDay: '',
            Pesel: '',
            Phone: '',
            PostCode: '',
            City: '',
            HouseNumber: '',
            Street: '',
            Type: '', //role
            newInfo : {
                Email: '',
                Name: '',
                Surname: '',
                BirthDay: '',
                Pesel: '',
                Phone: '',
                PostCode: '',
                City: '',
                HouseNumber: '',
                Street: '',
                Type: '', //role
            },
        }
    }

    componentDidMount(){
        api.User().getUserById(store.getState().persistedReducer.id)
        .then(response =>
            {
                this.setState({
                Id: response.data.id,
                Email: response.data.userName,
                Name: response.data.legalName,
                Surname: response.data.surname,
                BirthDay: response.data.birthDay,
                Pesel: response.data.pesel,
                Phone: response.data.phoneNumber,
                PostCode: response.data.address.zipCode,
                City: response.data.address.location,
                HouseNumber: response.data.address.streetNumber,
                Street: response.data.address.streetName,
                Type: response.data.type,
                })
            })
        .catch(err => console.log(err));
        //Setting the current informations for the change form modal
        this.setState(() => ({
            newInfo: {
                Email: this.state.Email,
                Name: this.state.Name,
                Surname: this.state.Surname,
                BirthDay: this.state.BirthDay,
                Pesel: this.state.Pesel,
                Phone: this.state.Phone,
                PostCode: this.state.PostCode,
                City: this.state.City,
                HouseNumber: this.state.HouseNumber,
                Street: this.state.Street,
                Type: this.state.Type,
            }
        }))

    }
    

    render()
    {
        return(
            <>
                <div className="row me-5">
                    <div className="my-3">
                        Imię:  <b> {this.state.Name} </b>
                    </div>
                </div>
                <div className="row me-5">
                    <div className="my-1">
                        Nazwisko:  <b> {this.state.Surname}</b>
                    </div>
                </div>
                <div className="row me-5">
                    <div className="my-3">
                        Numer telefonu: <b>{this.state.Phone}</b>
                    </div>
                </div>
                <div className="row me-5">
                    <div className="my-1">
                        Adres:  <b>{this.getPrettyAddress()}</b>
                    </div>
                </div>
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
                                        {this.modalElement("Telefon", this.state.newInfo.Phone, 19, "Phone")}
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
        Address += this.state.PostCode + ' ' + this.state.City;
                  
        return Address;
    }

    saveNewData(e)
    {
        if(this.checkNewData() === true) 
        {
            e.currentTarget.setAttribute("data-bs-dismiss", "modal");

            api.User().update(this.state.Id, this.state.newInfo)
            .then(() => {})
            .catch(err => 
                {
                    console.log(err)
                    alert("Niestety, nie udało się zapisać zmian")
                });
            e.currentTarget.click();
        }
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