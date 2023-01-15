import React, { useState, useEffect } from "react";
import {IShowProps} from "../types/Post";
import FormPost from "../Component/CreateColoc";
import NavBarHome from "../Component/NavBarHome";
import ViewColocs from "../Component/ViewColocs";
import HomeMessage from "../Component/HomeMessage"
import { useNavigate} from "react-router-dom";

export default function Home({setColoc, coloc}: IShowProps) {

    const navigate = useNavigate()
    const [viewColoc, setViewColoc] = useState<any>({id:0, title:"",content:"", proprioID:0});
    const token = JSON.parse(sessionStorage.token);
    
    useEffect( () => {
        fetch('http://localhost:5657/coloclist', {
            method: "POST",
            mode: "cors",
            credentials: "include",
            headers: new Headers({
                "Authorization" : "Bearer " + token.token,
                "Content-type":  "application/x-www-form-urlencoded"
            })
        }).then((response) =>  response.json())
            .then((data) => {
    
                setViewColoc(data);
            }).catch(error => console.log("Erreur dans la requête fetch : " + error))
    }, [])


    const deco = () => {
        sessionStorage.removeItem('token');
        navigate("/login");
    }
    
    const goToColoc = () => {
        navigate("/coloc");
    }

    return(
        <div className="container">
        <NavBarHome deco={deco} />
        <div className="row mt-5 align-content-center justify-items-center justify-content-center">
            <div className="container py-2 d-flex flex-column align-content-center justify-content-center">
                    <h1 className="text-center fs-3 text-uppercase mt-5 mb-2 fw-bold">Devenir gérant de colocation</h1>
                    <p className="text-center fs-4 fw-bold">Remplissez ce formulaire afin de créer la colocation et devenez pleinement gérant de la colocation:</p>
                    <FormPost setColoc={setColoc} coloc={coloc}/> 
            </div>
        </div>
           <div className="row mt-3 align-content-center justify-items-center justify-content-center">
            <div className="col-8">
                <div className=" py-5 d-flex flex-column align-content-center justify-content-center">
                <p className="text-center fs-4 fw-bold mb-2">...Ou accédez à votre espace de gestion si vous êtes colocataire:</p>
                <button className="btn btn-success shadow fw-bold fs-5 w-25 mt-2 mx-auto" onClick={goToColoc}>J'ai une coloc</button>
                </div>
            </div>
           </div>
           <div className="row mt-3 align-content-center justify-items-center justify-content-center">
           <div className="col-8">
                <div className="py-2 d-flex flex-column align-content-center justify-content-center">
                        {viewColoc.allColocs?.length > 0 ? <ViewColocs setViewColoc={setViewColoc} viewColoc={viewColoc} /> : <HomeMessage />}
                    </div>
                </div>
            </div>
        </div>        
    );
};