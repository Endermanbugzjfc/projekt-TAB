import React from "react";


const Offer = (props) =>{
    return(
        <>
            <div class="row my-5">
                <div class="col-2">
                    <img/>
                </div>
                <div class="col">
                    <div class="row"> {props.product.title} </div>
                    <div class="row">Producent: { props.product.producer != null ? props.product.producer : "Nieznany"} </div>
                    <div class="row">Opis: {props.product.description != null ? props.product.description : "Brak" } </div>
                </div>
                <div class="col">
                    <div class="row">{props.product.price} zł </div>
                    <div class="row">
                        W magazynie zostało { props.product.left > 0 ? props.product.left : 0 } sztuk
                    </div>
                    <div class="row">
						<div class="col">
							<input placeholder="Ilość" value={1}/>
						</div>
						<div class="col">
							<input type="button"  value="Dodaj do koszyka" onClick={console.log("clicked the button")}/>
						</div>
                    </div>
                </div>
            </div>
            {props.product.message}
        </>
    )
}

export default Offer