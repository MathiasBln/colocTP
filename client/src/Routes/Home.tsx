import {IShowProps} from "../types/Post";
import FormPost from "../Component/FormPost";
import { useNavigate} from "react-router-dom";
import React from "react";

export default function Home({setColoc, coloc}: IShowProps) {

    const navigate = useNavigate()

    const deco = () => {
        sessionStorage.removeItem('token');
        navigate("/login");
    }

    return(
        <>
            <button className="btn btn-outline-dark btn-lg px-5" onClick={deco}>Logout</button>
            <FormPost setColoc={setColoc} coloc={coloc}/>
            <div className="container py-2 h-100">
                <h1>OU</h1>
                <h3>Demander à votre proprio l'accès à votre coloc</h3>
            </div>
            {/* <ShowPost setPosts={setPosts} posts={posts}/> */}
        </>
    )
}