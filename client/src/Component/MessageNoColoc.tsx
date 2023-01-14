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
    <div className="container mt-5 pt-5 warning-background-50 d-flex flex-column shadow rounded">
        <h1 className="fw-bold fs-4 text-center text-uppercase">Information</h1>
        <div className="fw-bold mb-2 mt-2">
        <p className="fs-5 mt-2">Bonjour, nous vous informons que vous n'avez pas accés à cet espace car vous n'avez pas de colocation.
     Nous vous invitons à écrire un email à l'une des colocations mentionnés en page d'accueil pour tenter une admission
     </p>

     <p className="fs-5">Si vous vous sentez l'âme d'un entrepreneur ou que vous avez déjà de l'immobilier, vous pouvez créer votre colocation via le formulaire.
     Vous devenez alors votre premier colocataire en cumulant cela avec le statut d'administrateur de la colocation. 
        Vous avez alors la capacité de gestion étendue des colocataires et vous serez en interface directe avec le propriétaire du bien lui-même.
        </p>
        </div>

<div className="d-grid pb-5"> 
    <button className="btn btn-success shadow w-25 fw-bold fs-4 mx-auto" onClick={redirect}>Voir les colocations</button>
</div>
    </div>
  
        </>
        );
};