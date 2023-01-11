import React, { useEffect } from "react";
import Balance from '../Component/Balance';
import InviteBoard from "../Component/InviteBoard";

export default function Dashboard() {
    const token = JSON.parse(sessionStorage.token)
    useEffect(()=> {
        fetch('http://localhost:5657/coloc', {
            method: "POST",
            mode: "cors",
            credentials: "include",
            headers: new Headers({
                "Authorization" : "Bearer " + token.token,
                "Content-type":  "application/x-www-form-urlencoded"
            })
        })
    })
    return(
        <>
            <h1>Bienvenue chez la coloc </h1>
            <InviteBoard />
            <Balance />
        </>)

}