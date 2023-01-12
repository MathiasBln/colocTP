import {useState, useEffect, ChangeEvent, FormEvent} from "react";
import { useNavigate } from "react-router-dom";
import {IformDataColoc, IColoc, IShowProps} from "../types/Post"

export default function Wallet({setFetchUsers, fetchUsers}:any) {


    return(<>
        <div className="container w-50 my-5">
            <h3 className="text-center fs-4 mb-3">Vue synthétique de votre balance</h3>
            <table className="table table-hover table-success border border-2 border-dark">
                <thead>
                <tr>
                    <th>Vos Créances</th>
                    <th>Vos Dettes</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td>25</td>
                    <td>63</td>
                </tr>
                </tbody>
            </table>
        </div>
    </>)
};