import {useState, ChangeEvent, FormEvent} from "react";
import { useNavigate } from "react-router-dom";
import { IRenter, FormRenter} from "../types/Coloc";
import { IAlert } from "../types/User";
import "../style/Utilities.css";

export default function ManageUsers({setFetchUsers, fetchUsers, thiscoloc}:any) {

    const token = JSON.parse(sessionStorage.token);
    const [formRenter, setFormRenter] = useState<FormRenter>({ id: "", coloc_id: "" });
    const [renter, setRenter] = useState<{ renter: IRenter[] }>({renter: []})
    const [alert, setAlert] = useState<IAlert>({isAlert: false, message: "", color:"alert-warning"})
    const navigate = useNavigate();
     
    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault(); 
        fetch('http://localhost:5657/excluderenter', {
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
            window.location.reload()
            }).catch((error) => {
                setAlert({...alert, isAlert: true, message: "Votre requête n'a pu aboutir, vérifiez que vous ayez bien entré la donnée.", color:"alert-danger"})
             }
            
           )
    }       
  console.log("alert  "+alert);
    const handleChange = (e: ChangeEvent) => {
        setFormRenter(prevState => {
            return {
                ...prevState,
                // @ts-ignore
                [e.target.name]: e.target.value

            }
        })
    }

    return (    
        <div className="shadow text-center mx-auto bg-white w-75 my-3">
             <div className="row text-dark border-bottom border-2 border-dark bg-success">
                <div className="col-12 p-2">
                    <h4 className="mx-auto fs-4 fs-md-5 text-uppercase fw-bold text-white">Gerer les colocataires</h4>
                    <p className="mx-auto fs-6 fw-bold text-white">En vous aidant des informations ci-dessus et ci-dessous, entrez le identifiants pour gérer les colocataires</p>
                </div>
            </div>
            <div className="row text-dark bg-success">
                <div className="col-2 p-2 d-flex align-content-center justify-content-between align-items-center gap-2">
                    <h4 className="fs-6 fs-md-5">Nom</h4>
                </div>
                <div className="col-1 p-2 d-flex align-content-center justify-content-between align-items-center gap-2">
                    <h4 className="fs-6 fs-md-5">Id</h4>
                </div>
                <div className="col-1 p-2 d-flex align-content-center justify-content-between align-items-center gap-2">
                    <h4 className="fs-6 fs-md-5">Id Coloc</h4>
                </div>
                <div className="col-8 p-2 d-flex align-content-center justify-content-between align-items-center gap-2">
                    <h4 className="fs-6 fs-md-5">formulaire</h4>
                </div>
            </div>

            <div className="row text-dark">
                {fetchUsers.users?.filter( (ele: any) => (ele['coloc_id'] === thiscoloc && ele['token'] !== token.token)).map( (item: any, key: any) => (
                    <div className="row text-dark p-3" key={item['id']}>
                        <div className="col-2 d-flex align-content-center justify-content-between align-items-center gap-2">
                                <span>{item['username']}</span>
                        </div>
                        <div className="col-1 d-flex align-content-center justify-content-between align-items-center gap-2">
                                <span>{item['id']}</span>
                        </div>
                        <div className="col-1 d-flex align-content-center justify-content-between align-items-center gap-2">
                                <span>{thiscoloc}</span>
                        </div>
                        <div className="col-8">
                            <span>
                                <form className="d-flex align-content-center justify-content-between align-items-center gap-2" onSubmit={handleSubmit}>
                                        <div className="form-outline form-white" key={key}>
                                        <label className="form-label" htmlFor="ColocId">Identifiant coloc:</label>
                                        <input title='coloc_id' type="text" id="ColocId" className="form-control form-control-sm" name="coloc_id" onChange={handleChange}/>
                                        </div>
                                        <div className="form-outline form-white">
                                        <label className="form-label" htmlFor="userId">Identifiant colocataire:</label>
                                        <input title='id' type="text" id="userId" className="form-control form-control-sm" name="id" onChange={handleChange}/>
                                        </div>
                                        <div className="form-outline form-white">
                                        <button className="py-2 px-4 btn btn-danger text-white hover-blue fw-bold shadow" type="submit">Exclure</button>
                                        </div>
                                </form>
                            </span>
                        </div>
                    </div>
                    ))}
            </div>
            {alert.isAlert &&
            <div className="row">
                <div className="col-12">
                    <div className={`alert ${alert.color} fw-bold`} role="alert">
                    {alert.message}
                    </div>
                </div>
            </div>}
         
        </div>
    );
};