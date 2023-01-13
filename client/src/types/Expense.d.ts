import {Dispatch, SetStateAction} from "react";

export interface FormExpense {
    title: string,
    cost: string
}

export interface IExpense extends FormExpense {
    id: number,
    title: string,
    cost: string,
    user_id: string,
    coloc_id: string
}


interface IShowProps {
    setExpenses: Dispatch<SetStateAction<{ expenses: IExpense[] }>>
    expenses: { expenses: IExpense[] }
}