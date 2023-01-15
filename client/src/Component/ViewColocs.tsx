import React from "react";
import { useNavigate, NavLink} from "react-router-dom";
import { IShowProps, IViewColoc, IListColoc} from "../types/Coloc";
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
        <div className="container mt-2  mb-5 py-3 rounded-2  warning-background-50 shadow w-100">
            <h3 className="text-center fs-4 fw-bold my-2"> Nos colocations </h3>
            <p className="text-center">Envoyez un email au contact de la colocation. Si votre profil correspond, vous serez invité à devenir colocataire.</p>
            <table className="table table-hover table-success table-striped w-75 mx-auto">
                <thead>
                    <tr>
                    <th>Nom de la coloc</th>
                    <th>Addresse</th>
                    <th>Contact</th>
                    </tr>
                </thead>
                <tbody>
                {
                //@ts-ignore
                viewColoc.allColocs?.map( (el: any, key: any) => (
                    <tr key={el['id']}>
                        <td>{el['title']}</td>
                        <td>{el['content']}</td>
                        <td className="cursor-pointer hover-blue">{el['title'].trim().replace(/ /g, "")}@yakmail.eu</td>
                    </tr>
                    ))}
                </tbody>
            </table>            
        </div>
        </>
        );
    };