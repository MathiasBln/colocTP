import {IShowProps} from "../types/Post";
import FormPost from "../Component/FormPost";
import NavBarHome from "../Component/navBarHome"
import { useNavigate, NavLink} from "react-router-dom";
import React from "react";

export default function Home({setColoc, coloc}: IShowProps) {

    const navigate = useNavigate()

    const deco = () => {
        sessionStorage.removeItem('token');
        navigate("/login");
    }
    
    const goToColoc = () => {
        navigate("/coloc");
    }

    return(
        <div>
        <NavBarHome deco={deco} />

        {/* <button className="btn btn-outline-dark btn-lg px-5" onClick={deco}>Logout</button> */}
           <div className="container py-2 d-flex flex-column align-content-center justify-content-center">
                <h1 className="text-center fs-4 text-uppercase mt-5 mb-2 fw-bold">Devenir propriétaire</h1>
                <p className="text-center fs-5 fw-bold">Remplissez ce formulaire afin de créer la colocation et devenez pleinement propriétaire</p>
                <FormPost setColoc={setColoc} coloc={coloc}/>
           </div>
           <div className="container py-2 d-flex flex-column align-content-center justify-content-center">
                <p className="text-center fs-5 fw-bold mb-5">Si vous désirez devenir colocataire, merci de contacter le propriétaire pour demander à y être invité.</p>
                <p className="text-center fs-5 fw-bold mb-2">...Ou accédez à votre espace de gestion si vous êtes colocataire:</p>
                <button className="btn btn-success shadow w-25 mx-auto" onClick={goToColoc}>J'ai une coloc</button>
            </div>
        </div>
        
    );
}