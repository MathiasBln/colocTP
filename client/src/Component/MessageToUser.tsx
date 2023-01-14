import React from "react";
import { useNavigate, NavLink} from "react-router-dom";
import { IShowProps, IViewColoc, IListColoc} from "../types/Post";
import "../style/Utilities.css";

export default function ViewColocs({setViewColoc, viewColoc}: IViewColoc) {

const navigate = useNavigate()
const deco = () => {
    sessionStorage.removeItem('token');
    navigate("/login");
}

// @ts-ignore
return(
    <>
    
        </>
        );
    };