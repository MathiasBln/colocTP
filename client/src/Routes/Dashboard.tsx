import React, { useEffect, useState } from "react";
import Balance from '../Component/Balance';
import ListUser from "../Component/ListUser";

// interface IUser {
//     title:string;
//     content:string;
// }

export default function Dashboard() {
    const token = JSON.parse(sessionStorage.token)
    const [coloc, setColoc] = useState({title:"", content:"", id:""} || undefined)

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
            <h1>{coloc?.title}</h1>
            <Balance />
            <ListUser colocId={coloc?.id}/>
            {/* <ShowPost setPosts={setPosts} posts={posts}/> */}
        </>
    )
}