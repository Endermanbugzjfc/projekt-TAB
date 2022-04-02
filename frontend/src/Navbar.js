import React from "react";

class Navbar extends React.Component
{
    render()
    {
        return(
            <nav class="navbar navbar-expand-lg navbar-light bg-light">
                <div class="container-fluid">
                    <a class="navbar-brand" href="#">
                        {/*LOGO HERE*/}
                        <img src="" alt="Sklep budowlany"/>
                    </a>
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarSupportedContent">
                        <form class="d-flex">
                            <input class="form-control me-2" type="search" placeholder="Wyszukaj" aria-label="Search"/>
                            <button class="btn btn-outline-success" type="submit">Szukaj</button>
                        </form>
                        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                            <li class="nav-item">
                                <a class="nav-link active" href="#">Zaloguj</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link active" href="#">Koszyk</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        );
    }
}

export default Navbar