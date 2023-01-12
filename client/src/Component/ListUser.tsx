import React, {useState, useEffect, FormEvent, ChangeEvent } from "react";

export default function ListUser(props :any) {
    // @ts-ignore
    const [fetchUsers, setFetchUsers] = useState<any>("");
    const [formData, setFormData] = useState<any>({ id: 0, coloc_id: 0 })
    const hasChange = formData.id > 0;
    const token = JSON.parse(sessionStorage.token);

    useEffect( () => {
        fetch('http://localhost:5657/userslist', {
            method: "POST",
            mode: "cors",
            credentials: "include",
            headers: new Headers({
                "Authorization" : "Bearer " + token.token,
                "Content-type":  "application/x-www-form-urlencoded"
            })
        })
        .then((response) =>  response.json())
        .then((data) => {
            
            setFetchUsers(data);
        }).catch(error => console.log("Erreur dans la requête fetch : " + error)) 
    }, [])


    const handleChange = (e :ChangeEvent) => {
        e.preventDefault();
        setFormData({id: e.target.value, coloc_id: props.colocId})
    }

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        fetch('http://localhost:5657/invitation', {
            method: "POST",
            mode: "cors",
            body: new URLSearchParams({
                ...formData
            }),
            credentials: "include",
            headers: new Headers({
                "Authorization" : "Bearer " + token.token,
                "Content-type":  "application/x-www-form-urlencoded"
            })
        })
        setFormData({id: 0, coloc_id: 0})
    }

    return (
            <>
            {fetchUsers.users?.filter( (ele: any) => ele['coloc_id'] == null).map( (item: any, key: any) => (
                <div key={key}>
                    <h1>{item['username']}</h1>
                    <button onClick={handleChange} value={item["id"]}>Ajouter à la coloc</button>
                </div>
            ))}
            {hasChange &&
                <form onSubmit={handleSubmit}>
                    <button type="submit">Confirmer</button>
                </form>
            }
        </>
    );
}

