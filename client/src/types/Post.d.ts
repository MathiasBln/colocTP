import {Dispatch, SetStateAction} from "react";

export interface FormColoc {
    title: string,
    content: string
}

export interface IColoc extends FormColoc {
    id: number,
    author: string,
    createdAt: object,
    userId: number
}

interface IShowProps {
    setColoc: Dispatch<SetStateAction<{ coloc: IColoc[] }>>
    coloc: { coloc: IColoc[] }
}

export interface formDataColocInterface {
    coloc_id: string
}