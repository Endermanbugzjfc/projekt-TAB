import React from "react";
import Navbar from "./Navbar";
import "./UserView.css"

class UserView extends React.Component{

    constructor(props){
        super(props);
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
                                Info
                            </div>
                            <div class="tab-pane fade" id="list-history" role="tabpanel" aria-labelledby="list-history-list">
                                Historia jest jeszcze niedostępna
                            </div>
                            <div class="tab-pane fade" id="list-delete" role="tabpanel" aria-labelledby="list-delete-list">
                                Delete!
                            </div>
                            
                        </div>

                    </div>
                </div>
            </>
        )
    }

}

export default UserView