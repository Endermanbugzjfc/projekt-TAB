import React from "react";
import { Link } from "react-router-dom";
import { store } from "../actions/store";
import "./Navbar.css"

class Navbar extends React.Component
{
    constructor(props){
        super(props);
        this.state = { userInfo: [], loggedIn: false, basket:[] };
    }

    componentDidMount(){
        //this.getUserData();
        //this.getBasket();
    }

    render()
    {
        return(
            <>
                <nav class="navbar navbar-expand-lg navbar-light bg-light">
                    <div class="container-fluid">
                        <Link to="/" className="navbar-brand">
                            {/*LOGO HERE*/}
                            <img src="https://images.vexels.com/media/users/3/244009/isolated/preview/81033627bb6d646896521d32c8dadc1c-wood-screw-cut-out.png" alt="Sklep budowlany" width="40px"/>
                        </Link>
                        {/*This button below is for small displays*/}
                        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                            <span class="navbar-toggler-icon"></span>
                        </button>
                        <div class="collapse navbar-collapse" id="navbarSupportedContent">
                            <div class="col col-2 btn" data-bs-toggle="offcanvas" href="#offcanvasCategories" role="button" aria-controls="offcanvasCategories">Kategorie</div>

                            <div class="col-6 col">
                                <form class="d-flex">
                                    <input class="form-control me-2" type="search" placeholder="Wyszukaj" aria-label="Search"/>
                                    <button class="btn btn-outline-success" type="submit">Szukaj</button>
                                </form>
                            </div>
                            <div class="col col"></div>
                            <div class="col-2 col">
                                <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                                    <li class="nav-item">
                                        {this.userIconAndLogin()}
                                    </li>
                                    <li class="nav-item"> 
                                        
                                        <Link to="/basket" className="nav-link active bi bi-basket position-relative">    Koszyk
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

    // async getUserData() {
    //     const response = store.getState().dUser;
    //     console.log(response);
    //     const userData = await response.json();
    //     this.state.userInfo = userData;
    // }

    // async getBasket(){
    //     const response = await fetch('basket');
    //     const basketContent = await response.json();
    //     this.state.basket = basketContent;
    // }

    userIconAndLogin(){
        if(this.state.loggedIn){
            return(
                <>
                    <Link to="/user" className="nav-link active bi bi-person">
                        {
                            this.state.userInfo.map(user => user.username)
                        }
                    </Link>
                </>
            )
        }
        else{
            return(
                <>
                    <Link to="/login" className="nav-link active bi bi-person"> Zaloguj</Link>
                </>
            )
        }
    }

    categoriesOffcanvas() {

        var categories = ['Kategoria 1', 'Kategoria 2', 'Kategoria 3', 'Kategoria 4', 'Kategoria 5', 'Kategoria 6'];

        return(
            <>
            <div class="offcanvas offcanvas-start" tabindex="-1" id="offcanvasCategories" aria-labelledby="offcanvasCategoriesLabel">
                <div class="offcanvas-header">
                    <h5 class="offcanvas-title" id="offcanvasCategoriesLabel">Kategorie produktów</h5>
                    <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                </div>
                <div class="offcanvas-body">
                    {/*Button grid*/}
                    {/*I just started learning React, please don't kill me for this mess ;-; */}   
                    {
                        [0,1].map((i) => {
                            return <div class="row" key={i}>{
                                [0,1,2].map((j) => {
                                    return <div class="col btn category-button" key={(i+1)*3+j}>
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