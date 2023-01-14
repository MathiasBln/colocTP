import {IShowProps} from "../types/Post";
import FormPost from "../Component/FormPost";
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
                <nav className="navbar navbar-expand-lg navbar-dark bg-dark py-0">
            <div className="container-fluid">
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                    <div className="navbar-nav">
                        <ul className="nav">
                            <li className="nav-item mr-5">
                                <button className="nav-link border-0 bg-success text-white fw-bold" onClick={deco}>Me déconnecter</button>
                            </li>
                            <li className="nav-item mr-5">
                                <NavLink className="nav-link active bg-success text-white fw-bold" aria-current="page" to="/coloc">Mon espace client</NavLink>
                            </li>
                        </ul>          
                    </div>
                </div>
            </div>
        </nav>

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