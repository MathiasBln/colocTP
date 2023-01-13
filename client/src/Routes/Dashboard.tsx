import React, { useEffect, useState } from "react";
import Balance from '../Component/Balance';
import ExpensesForm from "../Component/ExpensesForm";
import ListUser from "../Component/ListUser";
import { IExpense } from "../types/Expense";
import ListExpense from "../Component/ListExpense";


export default function Dashboard() {
    const token = JSON.parse(sessionStorage.token)
    const [coloc, setColoc] = useState({title:"", content:"", id:""} || undefined)
    const [expenses, setExpenses] = useState<{ expenses: IExpense[] }>({expenses: []})

    useEffect(() => {
        fetch('http://localhost:5657/coloc', {
        method: "POST",
        mode: "cors",
        credentials: "include",
        headers: new Headers({
            "Authorization" : "Bearer " + token.token,
            "Content-type":  "application/x-www-form-urlencoded"
        })})
        .then(response => response.json())
        .then(data => setColoc(data.coloc));
    }, [token.token]);
    return(
        <>  
            <h1>{coloc?.title}</h1>
            <Balance />
            <ListUser colocId={coloc?.id}/>
            <ListExpense />
            <ExpensesForm setExpenses={setExpenses} expenses={expenses}/>
        </>
    )
}