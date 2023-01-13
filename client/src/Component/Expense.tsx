import { useEffect } from "react";
import { IShowProps } from "../types/Expense";

const Expense = ({setExpenses, expenses}: IShowProps ) => {
    const token = JSON.parse(sessionStorage.token);

    useEffect( () => {
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
    },[expenses, token.token, setExpenses])

    return (<>{expenses.expenses?.map((e) => {
        return <>
        <h1>{e?.title}</h1>
        <p>{e?.cost}</p>
        </>
    })}</>)
}

export default Expense;