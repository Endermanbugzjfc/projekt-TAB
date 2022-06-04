import React from "react";
import { Link } from "react-router-dom";
import {store} from "../actions/store";
import "./Navbar.css"

class Navbar extends React.Component
{
    constructor(props){
        super(props);
        this.state = { username: "", loggedIn: false, basket:[] };
    }

    componentDidMount(){
        var status = store.getState().persistedReducer.isLoggedIn
        this.setState({loggedIn: status})

        if(this.state.loggedIn)
        {
            var newName = store.getState().user.name;
            //console.log("New name:", newName)
            this.setState({username: newName})
        }
    }

    componentDidUpdate()
    {
        var logged =  store.getState().persistedReducer.loggedIn
        if(this.state.loggedIn !== logged)
        {
            this.setState({loggedIn: logged})
        } 
        if(this.state.loggedIn && this.state.username.length < 1)
        {
            this.setState({username: store.getState().persistedReducer.name})
        }
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
                                    <li className="nav-item">
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
            return(
                <>
                    <Link to="/user" className="nav-link active bi bi-person">
                    &nbsp;{
                             this.state.username
                        }
                    </Link>
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

    categoriesOffcanvas() {

        var categories = ['Kategoria 1', 'Kategoria 2', 'Kategoria 3', 'Kategoria 4', 'Kategoria 5', 'Kategoria 6'];

        return(
            <>
            <div className="offcanvas offcanvas-start" tabIndex="-1" id="offcanvasCategories" aria-labelledby="offcanvasCategoriesLabel">
                <div className="offcanvas-header">
                    <h5 className="offcanvas-title" id="offcanvasCategoriesLabel">Kategorie produktów</h5>
                    <button type="button" className="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                </div>
                <div className="offcanvas-body">
                    {/*Button grid*/}
                    {/*I just started learning React, please don't kill me for this mess ;-; */}   
                    {
                        [0,1].map((i) => {
                            return <div className="row" key={i}>{
                                [0,1,2].map((j) => {
                                    return <div className="col btn category-button" key={(i+1)*3+j}>
                                        {categories[i*3+j]}
                                    </div>})
                            }
                            </div>
                        })
                    }
                </div>
            </div>
        </>
        )
    }
}

export default Navbar