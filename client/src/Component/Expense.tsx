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

    return (<>{expenses.expenses?.map((e) => {
        count += e.cost;
        return <>
        <div className="expense" id="expenses">
            <h1 className="expense-title">{e?.title}</h1>
            <p className="expense-price">{e?.cost}€</p>
        </div>
        </>
    })}
    <p>TOTAL : {count}</p>
    </>)
}

export default Expense;