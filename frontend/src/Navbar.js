import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css"

class Navbar extends React.Component
{
    constructor(props){
        super(props);
        this.state = { userInfo: [] };
    }

    componentDidMount(){
        this.getUserData();
    }

    render()
    {
        return(
            <>
                <nav class="navbar navbar-expand-lg navbar-light bg-light">
                    <div class="container-fluid">
                        <Link to="/" class="navbar-brand">
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
                                        <Link to="/login" class="nav-link active">Zaloguj</Link>
                                    </li>
                                    <li class="nav-item"> 
                                        <Link to="/basket" class="nav-link active">Koszyk</Link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </nav>

                <div class="offcanvas offcanvas-start" tabindex="-1" id="offcanvasCategories" aria-labelledby="offcanvasCategoriesLabel">
                    <div class="offcanvas-header">
                        <h5 class="offcanvas-title" id="offcanvasCategoriesLabel">Kategorie produktów</h5>
                        <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                    </div>
                    <div class="offcanvas-body">
                        {/*Button grid*/}
                        <div class="row">
                            <div class="col btn category-button">
                                Materiały budowlane
                            </div>
                            <div class="col btn category-button">
                                Urządzanie wnętrz
                            </div>
                            <div class="col btn category-button">
                                Artykuły ogrodnicze
                            </div>
                        </div>
                    
                        <div class="row">
                            <div class="col btn category-button">
                                Instalacje
                            </div>
                            <div class="col btn category-button">
                                Wykończenie
                            </div>
                            <div class="col btn category-button">
                                Narzędzia
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    }

    getUserData() {
        //const response = await fetch('userData');
        //const userData = await response.json();
        //this.state.userInfo = userData;
    }

}

export default Navbar