import { useState, useEffect } from "react";
import { useNavigate} from "react-router-dom";

export default function UserList() {
    // @ts-ignore
    const [fetchUsers, setFetchUsers] = useState<any>("");
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

    const addUser = () => { 
        
    };   
    console.log(fetchUsers.users);
    return (
            <>
            {fetchUsers.users?.map( (item: any, key: any) => (
                    <div className=""  key={key}>

                            <div
                                className=""
                            />
                        <div className="">
                            <h1>{item['username']}</h1>
                            <button onClick={addUser}>Ajouter à la coloc</button>
                        </div>
                    </div>
            ))}
        </>
    );
};


