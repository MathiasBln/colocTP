import {IShowProps, IViewColoc, IListColoc} from "../types/Post";
import FormPost from "../Component/CreateColoc";
import NavBarHome from "../Component/NavBarHome";
import ViewColocs from "../Component/ViewColocs";
import { useState, useEffect } from "react";
import { useNavigate, NavLink} from "react-router-dom";
import React from "react";

export default function Home({setColoc, coloc}: IShowProps) {

    const navigate = useNavigate()
    const [viewColoc, setViewColoc] = useState<any>({id:0, title:"",content:"", proprioID:0});
    const token = JSON.parse(sessionStorage.token);
    
    useEffect( () => {
        const colocsList = fetch('http://localhost:5657/coloclist', {
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
        <div>
        <NavBarHome deco={deco} />

        {/* <button className="btn btn-outline-dark btn-lg px-5" onClick={deco}>Logout</button> */}
           <div className="container py-2 d-flex flex-column align-content-center justify-content-center">
                <h1 className="text-center fs-4 text-uppercase mt-5 mb-2 fw-bold">Devenir gérant de colocation</h1>
                <p className="text-center fs-5 fw-bold">Remplissez ce formulaire afin de créer la colocation et devenez pleinement gérant de la colocation</p>
                <FormPost setColoc={setColoc} coloc={coloc}/>
                <hr className="border border-5 border-success bg-success w-25 mx-auto rounded my-5"/>
           </div>
           <div className="container py-2 d-flex flex-column align-content-center justify-content-center">
                <div className="w-75 mx-auto">
                    <p className="text-center fs-6 fw-bold">
                        Dans le cas où il y a des colocations libre, une liste s'affiche ci-dessous avec des informations.
                        Vous avez notamment accés à l'email rattaché à chaque colocation.
                        Si vous désirez devenir colocataire, contactez une colocation pour demander à y être invité par son propriétaire.
                    </p>
                </div>
                {viewColoc.allColocs?.length > 0 && <ViewColocs setViewColoc={setViewColoc} viewColoc={viewColoc} />}
                <p className="text-center fs-5 fw-bold mb-2">...Ou accédez à votre espace de gestion si vous êtes colocataire:</p>
                <button className="btn btn-success shadow w-25 mx-auto" onClick={goToColoc}>J'ai une coloc</button>
            </div>
        </div>
        
    );
};