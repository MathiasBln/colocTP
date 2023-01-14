import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Balance from '../Component/Balance';
import Expense from "../Component/Expense";
import ExpensesForm from "../Component/ExpensesForm";
import ListUser from "../Component/ListUser";
import { IExpense } from "../types/Expense";
import WelcomeDashBoard from "../Component/WelcomeDashboard";
import NavBarDashboard from "../Component/NavBarDashboard";
import "../style/Dashboard.css"
import "../style/Utilities.css"


export default function Dashboard() {

    const token = JSON.parse(sessionStorage.token)
    const [coloc, setColoc] = useState({title:"", content:"", id:""} || undefined)
    const [expenses, setExpenses] = useState<{ expenses: IExpense[] }>({expenses: []})
    const navigate = useNavigate()

    const deco: any = () => {
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
        {/* La navBar qui a été créé inclu déjà un logout (se déconnecter) */}
        {/* <button className="btn btn-outline-dark btn-lg px-5" onClick={deco}>Logout</button> */}
        <NavBarDashboard deco={deco} coloc={coloc} />
        <div className="dashboard">
            <h1 className="title">{coloc?.title}</h1>
            <WelcomeDashBoard coloc={coloc} />
            <div className="container dashboard__section">
                <div className="w-25 dashboard__section__group bg-warning px-4 py-2">
                    <h3 className="subtitle fs-4 mt-2 mb-3">Dépenses</h3>
                    <Expense setExpenses={setExpenses} expenses={expenses}/>
                </div>
                <div className="w-50 dashboard__section__group bg-success text-white">
                    <h3 className="subtitle fs-4 mt-2 mb-2">Ajout d'une dépense</h3>
                    <p className="fs-6 mb-0">Inscrivez seulement vos dépenses servant la vie commune</p>
                    <ExpensesForm setExpenses={setExpenses} expenses={expenses}/>
                </div>
                <div className="w-25 dashboard__section__group bg-warning text-dark px-4 py-2">
                    <h3 className="subtitle fs-4 my-2">Potentiels colocataires</h3>
                    <ListUser colocId={coloc?.id}/>
                </div>
            </div>
            <div className="w-100 container dashboard__section">
                <div className="dashboard__section__group bg-success mx-0 py-5 text-dark">
                    <Balance coloc={coloc} setExpenses={setExpenses} expenses={expenses} />
                </div>
                <div>

                </div>
            </div>
        </div>
        </>
    )
}