import { useEffect } from "react";
import { IShowProps } from "../types/Expense";
import "../style/Expense.css"

const Expense = ({setExpenses, expenses}: IShowProps ) => {
    const token = JSON.parse(sessionStorage.token);
    const mystyle = {
        display: "flex",
        flexDirection: "column",
        alignItems: 'center',
        justifyContent: "center"
      };
    let count = 0;
    useEffect( () => {
        count = 0
        fetch('http://localhost:5657/allExpense', {
            method: "POST",
            mode: "cors",
            credentials: "include",
            headers: new Headers({
                "Authorization" : "Bearer " + token.token,
                "Content-type":  "application/x-www-form-urlencoded"
            })
        })
        .then((response) =>  response.json())
        .then((data) => {
           setExpenses(data);
        }).catch(error => console.log("Erreur dans la requête fetch : " + error)) 
    },[setExpenses, token.token])

    return (<>
    <table id="expenses" className="table table-success table-striped table-hover table-sm table-bordered border border-3 border-success">
        <thead>
            <tr>
            <th className="fs-6 fw-bold" colSpan={2}>Dépenses de la coloc</th>  
            </tr>
            <tr>
            <th className="fs-6 fw-bold">Nom</th>
            <th className="fs-6 fw-bold">Montant</th>   
            </tr>
        </thead>
        <tbody>
            {expenses.expenses?.map((e, key) => {
            count += e?.cost;
            return <>
            <tr key={key}>
                <td className="fs-6 fw-bold">{e?.title}</td>
                <td className="fs-6 fw-bold">{e?.cost}€</td>
            </tr>
            </>
        })}
        <tr>
            <td className="fs-4 fw-bold">TOTAL</td>
            <td className="fs-4 fw-bold">{count}€</td>
        </tr>
        </tbody>
    </table>
    </>)
}

export default Expense;