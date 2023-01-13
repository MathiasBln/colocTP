import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Balance from '../Component/Balance';
import Expense from "../Component/Expense";
import ExpensesForm from "../Component/ExpensesForm";
import ListUser from "../Component/ListUser";
import { IExpense } from "../types/Expense";


export default function Dashboard() {
    const token = JSON.parse(sessionStorage.token)
    const [coloc, setColoc] = useState({title:"", content:"", id:""} || undefined)
    const [expenses, setExpenses] = useState<{ expenses: IExpense[] }>({expenses: []})
    const navigate = useNavigate()

    const deco = () => {
        sessionStorage.removeItem('token');
        navigate("/login");
    }

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
            <button className="btn btn-outline-dark btn-lg px-5" onClick={deco}>Logout</button>
            <h1>{coloc?.title}</h1>
            <Balance />
            <ListUser colocId={coloc?.id}/>
            <Expense setExpenses={setExpenses} expenses={expenses}/>
            <ExpensesForm setExpenses={setExpenses} expenses={expenses}/>
        </>
    )
}