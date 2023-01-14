import React, { useEffect, useState } from "react";
import { IExpense } from "../types/Expense";
import { useNavigate } from "react-router-dom";
import WelcomeDashBoard from "../Component/WelcomeDashboard";
import Balance from '../Component/Balance';
import Expense from "../Component/Expense";
import ExpensesForm from "../Component/ExpensesForm";
import ListUser from "../Component/ListUser";
import "../style/Utilities.css";
import "../style/Dashboard.css"


export default function MessageColoc({coloc}: any) {

const token = JSON.parse(sessionStorage.token)
const [expenses, setExpenses] = useState<{ expenses: IExpense[] }>({expenses: []})
const navigate = useNavigate()

const deco = () => {
    sessionStorage.removeItem('token');
    navigate("/login");
}

// @ts-ignore
return(
    <>
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
        </>
        );
    };