import React, { useState } from "react";
import { IExpense } from "../types/Expense";
import WelcomeDashBoard from "./WelcomeDashboard";
import Balance from './Balance';
import Expense from "./Expense";
import ExpensesForm from "./ExpensesForm";
import "../style/Utilities.css";
import "../style/Dashboard.css"

export default function SubDashboard({coloc}: any) {

const [expenses, setExpenses] = useState<{ expenses: IExpense[] }>({expenses: []})

// @ts-ignore
return(
    <>
     <h1 className="title">{coloc?.title}</h1>
     <WelcomeDashBoard coloc={coloc} />
     <div className="container dashboard__section">
                <div className="w-25 dashboard__section__group warning-background-50 px-4 py-2">
                    <h3 className="subtitle fs-4 mt-2 mb-3">Dépenses</h3>
                    <Expense setExpenses={setExpenses} expenses={expenses}/>
                </div>
                <div className="w-50 dashboard__section__group success-background-50 text-white">
                    <h3 className="subtitle fs-4 mt-2 mb-2">Ajout d'une dépense</h3>
                    <p className="fs-6 mb-0">Inscrivez seulement vos dépenses servant la vie commune</p>
                    <ExpensesForm setExpenses={setExpenses} expenses={expenses}/>
                </div>
            </div>
            <div className="w-100 container dashboard__section">
                <div className="dashboard__section__group warning-background-50 mx-0 py-5 text-dark">
                    <Balance coloc={coloc} setExpenses={setExpenses} expenses={expenses} />
                </div>
                <div>

                </div>
            </div>
        </>
        );
    };