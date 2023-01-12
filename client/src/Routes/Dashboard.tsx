// import React, { useEffect } from "react";
import Balance from '../Component/Balance';
import AdminBoard from "../Component/AdminBoard";
import {FormColoc, IColoc, IShowProps} from "../types/Post";
import React, {useEffect, useState} from "react";
import {useNavigate, NavLink} from "react-router-dom";
import FormPost from "../Component/FormPost";
import Wallet from "../Component/Wallet";

export default function Dashboard({setColoc, coloc}: IShowProps) {
    const navigate = useNavigate();
    return(
        <>
            <div className="container">
              <div className="mx-auto d-flex flex-column align-content-center justify-content-center">
                  <h2 className="text-center mt-2 mb-2"> Tableau de bord </h2>
                  <NavLink  className="mx-auto btn btn-sm btn-secondary w-25" to="/">Retour à l'accueil</NavLink>
              </div>
                <AdminBoard setColoc={setColoc} coloc={coloc} />
                <Balance />
                <Wallet />
            </div>

        </>)

}