import {IShowProps} from "../types/Post";
import { useNavigate, NavLink } from "react-router-dom";
import React, {useEffect, useState} from "react";
import FormPost from "../Component/FormPost";

export default function Home({setColoc, coloc}: IShowProps) {

    const navigate = useNavigate()
    const [viewColoc, setViewColoc] = useState<any>("");
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


    // @ts-ignore
    return(
        <>
            <div className="container d-flex flex-column align-content-center justify-content-cente py-2 w-75">
              <h2 className="text-center">Bienvenue dans l'espace de colocation</h2>
            </div>
            <div className="container mt-2 rounded-2 d-flex align-content-center justify-content-center gap-2 py-2 w-75">
                <NavLink className="btn btn-success btn-sm" to="dashboard">Voir mon tableau de bord</NavLink>
                <button className="btn btn-secondary btn-sm" onClick={deco}>Me déconnecter de l'espace</button>
            </div>

            <div className="container mt-2 rounded-2 bg-grey w-50">
                <h3 className="text-center my-2"> Nos colocs :</h3>
                <div className="d-flex flex-column align-items-center justify-content-center">
                    <ul className="container list-group list-group-flush">
                        {
                            //@ts-ignore
                            viewColoc.allColocs?.map( (el: any, key: any) => (
                                <li className="list-group-item text-center fw-bold" key={key} >{el['title']}</li>
                            ))}
                    </ul>
                </div>
            </div>

            <div className="container mt-2 rounded-2 bg-grey w-50">
                <p className="text-center fw-bold">Pour devenir propriétaire d'une coloc, vous pouvez remplir ce formulaire:</p>
                <FormPost setColoc={setColoc} coloc={coloc}/>
            </div>
            {/* <ShowPost setPosts={setPosts} posts={posts}/> */}
        </>
    )
}

// export default function Home({setColoc, coloc}: IShowProps) {
//
//     const navigate = useNavigate()
//
//     const deco = () => {
//         sessionStorage.removeItem('token');
//         navigate("/login");
//     }
//
//     return(
//         <>
//             <button className="btn btn-outline-dark btn-lg px-5" onClick={deco}>Logout</button>
//             <FormPost setColoc={setColoc} coloc={coloc}/>
//             <div className="container py-2 h-100">
//                 <h1>OU</h1>
//                 <h3>Demander à votre proprio l'accès à votre coloc</h3>
//             </div>
//             {/* <ShowPost setPosts={setPosts} posts={posts}/> */}
//         </>
//     )
// }