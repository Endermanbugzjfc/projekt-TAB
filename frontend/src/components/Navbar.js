import React from "react";
import { Link } from "react-router-dom";
import api from "../actions/api";
import {store} from "../actions/store";
import { logout } from "../reducers/dUser";
import "./Navbar.css"

class Navbar extends React.Component
{
    constructor(props){
        super(props);
        this.state = { username: "", loggedIn: false, basket:[], categories:[] };
    }

    componentDidMount(){
        var status = store.getState().persistedReducer.loggedIn
        this.setState({loggedIn: status})

        if(this.state.loggedIn)
        {
            var newName = store.getState().user.name;
            //console.log("New name:", newName)
            this.setState({username: newName})
        }

        api.Product().getCategories()
        .then(response => this.setState({categories: response.data}))
        .catch(err => console.log(err.request))

        var logged =  store.getState().persistedReducer.loggedIn
        if(this.state.loggedIn !== logged)
        {
            this.setState({loggedIn: logged})
        } 
        if(this.state.loggedIn && this.state.username.length < 1)
        {
            this.setState({username: store.getState().persistedReducer.name})
        }

    }

    componentDidUpdate()
    {
        //console.log(this.state.username)
        //console.log(logged)
    }

    render()
    {
        return(
            <>
                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <div className="container-fluid">
                        <Link to="/" className="navbar-brand">
                            {/*LOGO HERE*/}
                            <img src="https://images.vexels.com/media/users/3/244009/isolated/preview/81033627bb6d646896521d32c8dadc1c-wood-screw-cut-out.png" alt="Sklep budowlany" width="40px"/>
                        </Link>
                        {/*This button below is for small displays*/}
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                            <div className="col col-2 btn" data-bs-toggle="offcanvas" href="#offcanvasCategories" role="button" aria-controls="offcanvasCategories">Kategorie</div>

                            <div className="col-6 col">
                                <form className="d-flex">
                                    <input className="form-control me-2" type="search" placeholder="Wyszukaj" aria-label="Search"/>
                                    <button className="btn btn-outline-success" type="submit">Szukaj</button>
                                </form>
                            </div>
                            <div className="col col"></div>
                            <div className="col-2 col">
                                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                                    <li className="nav-item dropdown">
                                        {this.userIconAndLogin()}
                                    </li>
                                    <li className="nav-item"> 
                                        
                                        <Link to="/basket" className="nav-link active bi bi-basket position-relative">&nbsp;Koszyk
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </nav>
                {this.categoriesOffcanvas()}
                
            </>
        );
    }

    userIconAndLogin(){
        if(this.state.loggedIn){
            var link = '/user';
            if(store.getState().persistedReducer.role === 'CUSTOMER')
                link = '/user'
            else if (store.getState().persistedReducer.role === 'EMPLOYEE')
                link = '/employee'
            else if (store.getState().persistedReducer.role === 'ADMIN')
                link = '/admin'
            return(
                <>
                    <span key="1" className="nav-link dropdown-toggle active bi bi-person" id="navbarDarkDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    &nbsp;
                        {
                             this.state.username
                        }
                    </span>
                    <ul className="dropdown-menu dropdown-menu-dark" aria-labelledby="navbarDarkDropdownMenuLink">
                        
                        <li><Link to={link} className="dropdown-item">Zarządzaj</Link></li>
                        <li><input value={"Wyloguj"} className="dropdown-item" type="button" onClick={() => this.logOut()}/></li>
                    </ul>
                </>
            )
        }
        else{
            return(
                <>
                    <Link to="/login" className="nav-link active bi bi-person">&nbsp;Zaloguj</Link>
                </>
            )
        }
    }

    logOut()
    {
        api.User().logout(store.getState().persistedReducer.userName);
        store.dispatch(logout())
        window.location.reload();
    }

    categoriesOffcanvas() {
        return(
            <>
            <div className="offcanvas offcanvas-start" tabIndex="-1" id="offcanvasCategories" aria-labelledby="offcanvasCategoriesLabel">
                <div className="offcanvas-header">
                    <h5 className="offcanvas-title" id="offcanvasCategoriesLabel">Kategorie produktów</h5>
                    <button type="button" className="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                </div>
                <div className="offcanvas-body">
                    <div className="container">
                     {
                        this.state.categories.map((cat) => {
                            return <>
                            <div className="row">
                                <input type="buttom" className="col btn category" value={cat} onClick={() => {window.location.href = '/products/' + cat}} />
                            </div>
                            </>
                            
                        })
                    }   
                    </div>
                    
                </div>
            </div>
        </>
        )
    }
}

export default Navbar
