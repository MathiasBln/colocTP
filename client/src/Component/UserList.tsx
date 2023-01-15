import {useState, useEffect, ChangeEvent, FormEvent} from "react";
import { useNavigate } from "react-router-dom";
import { IColoc, IShowProps, FormColoc, IRenter, INewRenter, FormRenter} from "../types/Post"
import "../style/Utilities.css";
export default function UserList({setFetchUsers, fetchUsers}:any) {

    const token = JSON.parse(sessionStorage.token);
    const [formRenter, setFormRenter] = useState<FormRenter>({ id: "", coloc_id: "" });
    const [renter, setRenter] = useState<{ renter: IRenter[] }>({renter: []})
    const navigate = useNavigate();

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        fetch('http://localhost:5657/addrenter', {
            method: "POST",
            mode: "cors",
            body: new URLSearchParams({
            ...formRenter
            }),
            credentials: "include",
            headers: new Headers({
                "Authorization" : "Bearer " + token.token,
                "Content-type":  "application/x-www-form-urlencoded"
            })
        }).then((data) =>  data.json())
            .then((json) => {
                console.log(json.renter)
                if (json.message) {
                    if (json.message === "invalid cred") {
                        sessionStorage.removeItem('token');
                        navigate("/login")
                    }
                    return
                }
                // @ts-ignore
                setRenter(
                    prevState => {
                        // @ts-ignore
                        return {
                            renter: [
                                // @ts-ignore
                                json.renter,
                                ...prevState.renter,
                            ]
                        }
                    }
                )
               

            }).catch(error => console.log("Erreur dans la requête fetch : " + error))
    }
  
    const handleChange = (e: ChangeEvent) => {
        setFormRenter(prevState => {
            return {
                ...prevState,
                // @ts-ignore
                [e.target.name]: e.target.value

            }
        })
    }


    const colocIdArray:Array<number|string> = [];
    fetchUsers.users?.filter( (elem: any) => elem['coloc_id'] !== null).map( (el: any, key: any) => (
        colocIdArray.push(el.coloc_id)
    ))
    const colocOnlyId =  colocIdArray[0];
    console.log("formRenter "+formRenter);
    return (    
        <div className="shadow text-center mx-auto bg-white w-75 my-3">
             <div className="row text-dark border-bottom border-2 border-dark bg-success">
                <div className="col-12 p-2">
                    <h4 className="mx-auto fs-6 fs-md-5 text-uppercase fw-bold text-white">Potentiels colocataires</h4>
                    <p className="mx-auto fw-bold text-white">En vous aidant des informations, entrez le identifiants pour les inviter dans une colocation</p>
                </div>
            </div>
            <div className="row text-dark bg-success">
                <div className="col-2 p-2">
                    <h4 className="fs-6 fs-md-5">Nom</h4>
                </div>
                <div className="col-1 p-2">
                    <h4 className="fs-6 fs-md-5">Id</h4>
                </div>
                <div className="col-1 p-2">
                    <h4 className="fs-6 fs-md-5">Coloc n°</h4>
                </div>
                <div className="col-8 p-2">
                    <h4 className="fs-6 fs-md-5">formulaire d'invitation</h4>
                </div>
            </div>

            <div className="row text-dark">
                {fetchUsers.users?.filter( (ele: any) => ele['coloc_id'] == null).map( (item: any, key: any) => (
                    <div className="row text-dark p-3" key={item['id']}>
                        <div className="col-2 d-flex flex-column">
                                <span>{item['username']}</span>
                        </div>
                        <div className="col-1 d-flex flex-column">
                                <span>{item['id']}</span>
                        </div>
                        <div className="col-1 d-flex flex-column">
                                <span>{colocOnlyId} </span>
                        </div>
                        <div className="col-8">
                            <span>
                                <form className="d-flex align-content-center justify-content-between align-items-center gap-2" onSubmit={handleSubmit}>
                                        <div className="form-outline form-white" key={key}>
                                        <label className="form-label" htmlFor="ColocId">Identifiant coloc:</label>
                                        <input title='coloc_id' type="text" id="ColocId" className="form-control form-control-sm" name="coloc_id" onChange={handleChange}/>
                                            {/* <input type="hidden" name="coloc_id" value={colocOnlyId} onChange={handleChange}/> */}
                                        </div>
                                        <div className="form-outline form-white">
                                        <label className="form-label" htmlFor="userId">Identifiant candidat:</label>
                                        <input title='id' type="text" id="userId" className="form-control form-control-sm" name="id" onChange={handleChange}/>
                                        </div>
                                        
                                    {/* <input type="hidden" name="id" value={item['id']} onChange={handleChange}/> */}
                                        <div className="form-outline form-white">
                                        <button className="py-2 px-4 btn btn-success text-white hover-blue fw-bold shadow" type="submit">Inviter</button>
                                        </div>
                                </form>
                            </span>
                        </div>
                    </div>
                    ))}
            </div>
        </div>
    );
};


