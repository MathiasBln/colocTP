import {useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { IColoc, IShowProps} from "../types/Coloc"

export default function Wallet() {
    
    const [fetchExpenses, setFetchExpenses] = useState<any>("");
    const token = JSON.parse(sessionStorage.token);
    
    useEffect( () => {

        fetch('http://localhost:5657/getexpenses', {
            method: "POST",
            mode: "cors",
            credentials: "include",
            headers: new Headers({
                "Authorization" : "Bearer " + token.token,
                "Content-type":  "application/x-www-form-urlencoded"
            })
        }).then((response) =>  response.json())
            .then((data) => {
                setFetchExpenses(data);
            }).catch(error => console.log("Erreur dans la requête fetch : " + error))
    }, [])



    return(<>
        <div className="container w-50 my-5">
            <h3 className="text-center fs-4 mb-3">Vue synthétique de votre balance</h3>
            <table className="table table-hover table-success border border-2 border-dark">
                <thead>
                <tr>
                    <th>Vos Créances</th>
                    <th>Vos Dettes</th>
                </tr>
                </thead>
                <tbody>
                {fetchExpenses.expenses?.filter( (elem: any) => (elem['token'] === token.token)  ).map((ele: any, key: any) => {
                <tr>
                    <td>25</td>
                    <td>63</td>
                </tr>
                </tbody>
            </table>
        </div>
    </>)
};