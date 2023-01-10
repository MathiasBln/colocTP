import {ChangeEvent, FormEvent, useState} from "react";
import {useNavigate} from "react-router-dom";
import InviteUser from "../Component/InviteBoard";
import React, { useEffect } from "react";
import Balance from '../Component/Balance';

export default function Dashboard(coloc_name:string) {
    // fetch user
    const user:any = [];
    return (
         <>
         <h1>Bienvenue chez {coloc_name} </h1>
         <InviteBoard />
         </>
    )
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
            <Balance />
            {/* <ShowPost setPosts={setPosts} posts={posts}/> */}
        </>)

}