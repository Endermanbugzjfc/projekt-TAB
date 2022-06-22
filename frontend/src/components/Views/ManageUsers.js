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
        }
    }

    render()
    {
        return <>
            <div className="mt-3 col">
                <div className="col">
                    <label className="mt-2 me-4">User type:</label>
                    <select id="selectionType">
                        <option>Customer</option>
                        <option>Employee</option>
                    </select> <br/>
                    <label className="mt-2  me-4">Serach by:</label>
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

    }


}

export default ManageUsers