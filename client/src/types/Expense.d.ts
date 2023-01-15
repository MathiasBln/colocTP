import {Dispatch, SetStateAction} from "react";

export interface FormExpense {
    title: string,
    cost: int
}

export interface IExpense extends FormExpense {
    id: number,
    title: string,
    cost: int,
    user_id: string,
    coloc_id: string
}


interface IShowProps {
    setExpenses: Dispatch<SetStateAction<{ expenses: IExpense[] }>>
    expenses: { expenses: IExpense[] }
}

export interface IUserColoc extends FormColoc {
    coloc_id: number | string
}

interface IUsersByColoc {
    setRenter: Dispatch<SetStateAction<{ coloc_id: IExpense[] }>>
    renter: { coloc_id: IExpense[] }
}