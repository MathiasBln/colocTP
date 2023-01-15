import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "../style/Utilities.css";
import "../style/Dashboard.css"

export default function MessageNoColoc({coloc}: any) {

const navigate = useNavigate()

const deco = () => {
    sessionStorage.removeItem('token');
    navigate("/login");
}

const redirect = () => {
    navigate("/home");
}



// @ts-ignore
return(
    <>
    <div className="container mt-5 pt-5 px-5 warning-background-50 d-flex flex-column shadow rounded">
        <h1 className="fw-bold fs-3 text-center text-uppercase">Information</h1>
        <div className="fw-bold mb-2 mt-2">
        <p className="fs-4 mt-2">Bonjour, nous vous informons que vous n'avez pas ou plus accés à l'espace de gestion.<br/>
        Nous vous invitons à écrire un email à l'une des colocations mentionnés en page d'accueil pour tenter une admission afin de devenir colocataire.
        Le fait d'être colocataire donne accés à l'espace de gestion de votre colocation.<br/>
        Il est également possible qu'une mesure de sécurité ou un incident technique vous ait retiré votre statut de colocataire sur le site. 
        Dans ce cas il vous suffit de vous déconnecter et de vous reconnecter.
        </p>

        <p className="fs-4">Si vous vous sentez l'âme d'un entrepreneur ou que vous avez déjà de l'immobilier, vous pouvez créer votre colocation via le formulaire.
        Vous devenez alors votre premier colocataire en cumulant cela avec le statut d'administrateur de la colocation. 
        Vous avez alors la capacité de gestion étendue des colocataires</p>
        </div>

        <div className="row align-content-center justify-content-center gap-2 pb-5"> 
            <button className="btn btn-success shadow w-25 fw-bold fs-4 mx-auto" onClick={redirect}>Voir les colocations</button>
            <button className="btn btn-success shadow w-25 fw-bold fs-4 mx-auto" onClick={deco}>Me déconnecter</button>
        </div>
    </div>
  
        </>
        );
};