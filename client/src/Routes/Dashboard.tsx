import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import NavBarDashboard from "../Component/NavBarDashboard";
import  SubDashboard from "../Component/SubDashboard";
import MessageNoColoc from "../Component/MessageNoColoc";
import "../style/Dashboard.css"
import "../style/Utilities.css"


export default function Dashboard() {

    const token = JSON.parse(sessionStorage.token)
    const [coloc, setColoc] = useState({title:"", content:"", id:""} || undefined)
    const navigate = useNavigate()

    const deco: any = () => {
        sessionStorage.removeItem('token');
        navigate("/login");
    }

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
        {coloc?.id && <NavBarDashboard deco={deco} coloc={coloc} />}
        <div className="dashboard">
            {!coloc?.id && <MessageNoColoc />}
            {coloc?.id &&  <SubDashboard coloc={coloc} />}
        </div>
        </>
    )
}