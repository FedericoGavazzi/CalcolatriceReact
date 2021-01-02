import React from "react";
import "./style.css";

export function Footer(){
    return(
        <div className="footer fixed-bottom">
            <div className="d-flex justify-content-around">
                <div>Copyright © - 2020 Federico Gavazzi</div>
                <a href="https://github.com/FedericoGavazzi/CalcolatriceReact" target="blank"><img src="https://raw.githubusercontent.com/FedericoGavazzi/CalcolatriceReact/main/GitHub-Mark-Light-32px.png"/></a>
            </div>
        </div>
    )}