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

interface IuserList extends IShowProps {
    setFetchUsers: Dispatch<SetStateAction<any>>
    fetchUsers: any
}

export interface FormRenter {
    id: string,
    coloc_id: string,
}

export interface IRenter extends FormRenter {
    id: number,
    author: string,
    createdAt: object,
    userId: number
}

interface INewRenter {
    setRenter: Dispatch<SetStateAction<{ renter: IRenter[] }>>
    renter: { renter: IRenter[] }
}