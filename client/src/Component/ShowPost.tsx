import { useEffect } from "react";
import { IShowProps} from "../types/Post";
import { useNavigate} from "react-router-dom";
import Post from "./Post";


export default function ShowPost({setColoc, coloc}: IShowProps) {

    // @ts-ignore
    const token = JSON.parse(sessionStorage.token)
    const navigate = useNavigate()

    useEffect(() => {
        fetch('http://localhost:5657/', {
            headers: new Headers({
                "Authorization" : "Bearer " + token.token,
            })
        })
            .then(data => data.json())
            .then(json => {
                if (json.message) {
                    if (json.message === "invalid cred") {
                        sessionStorage.removeItem('token');
                        navigate("/login")
                    }
                    return
                }
                setColoc(json)
            })

    },[])

    return (
        <>

            {coloc.coloc.map((value, index) => {
                return (<Post key={index} {...value}/>)
            })}
        </>
    )
}