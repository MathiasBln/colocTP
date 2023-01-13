import { useEffect } from "react";
import { IShowProps } from "../types/Expense";

const Expense = ({setExpenses, expenses}: IShowProps ) => {
    const token = JSON.parse(sessionStorage.token);
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

    return (<>{expenses.expenses?.map((e) => {
        count += e.cost;
        return <>
        <h1>{e?.title}</h1>
        <p>{e?.cost}</p>
        </>
    })}
    <p>TOTAL : {count}</p>
    </>)
}

export default Expense;