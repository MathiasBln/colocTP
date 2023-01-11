import {useState, useEffect, ChangeEvent, FormEvent} from "react";
import { useNavigate} from "react-router-dom";
import { formDataColocInterface } from "../types/Post"

export default function UserList() {
    // @ts-ignore
    const [fetchUsers, setFetchUsers] = useState<any>("");
    const [formDataColoc, setFormDataColoc] = useState<formDataColocInterface>({user_id: ""});
    const navigate = useNavigate();
    const token = JSON.parse(sessionStorage.token);

    useEffect( () => {
        const usersList = fetch('http://localhost:5657/userslist', {
            method: "POST",
            mode: "cors",
            credentials: "include",
            headers: new Headers({
                "Authorization" : "Bearer " + token.token,
                "Content-type":  "application/x-www-form-urlencoded"
            })
        }).then((response) =>  response.json())
        .then((data) => {
            
            setFetchUsers(data);
        }).catch(error => console.log("Erreur dans la requête fetch : " + error)) 
    }, [])


    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        fetch('http://localhost:5657/addrenter', {
            method: "POST",
            mode: "cors",
            body: new URLSearchParams({
                ...formDataColoc
            }),
            credentials: "include",
            headers: new Headers({
                "Authorization" : "Bearer " + token.token,
                "Content-type":  "application/x-www-form-urlencoded"
            })
        }).then((response) =>  response.text())
            .then((data) => {
                console.log("DATA IS"+data);
            }).catch(error => console.log("Erreur dans la requête fetch : " + error))
    }
    const handleChange = (e: ChangeEvent) => {

        setFormDataColoc(prevState => {
            return {
                ...prevState,
                // @ts-ignore
                [e.target.name]: e.target.value
            }
        })
    }

    console.log("formDataColoc is"+formDataColoc);
    return (
            <>
            {fetchUsers.users?.filter( (ele: any) => ele['coloc_id'] == null).map( (item: any, key: any) => (

                    <div className=""  key={key}>

                            <div
                                className=""
                            />
                        <div className="">
                            <h1>{item['username']}</h1>
                            <form onSubmit={handleSubmit}>
                                <input type="hidden" id="colocIdInput" name="colocIdInput" value={item['id']} onChange={handleChange}/>
                                <button className="btn btn-primary btn-sm" type="submit">Ajouter à a coloc</button>
                            </form>
                        </div>
                    </div>
            ))}
        </>
    );
};


