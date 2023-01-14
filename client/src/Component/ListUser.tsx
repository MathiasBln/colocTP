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


    const handleChange = (e :any) => {
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
                <div className="d-flex flex-column align-content-start justify-content-center gap-2 my-3" key={key}>
                    <h2 className="border border-0 bg-transparent fs-3" >{item['username']}</h2>
                    <button className="btn btn-sm border border-2 border-dark rounded text-center fs-4 bg-success" onClick={handleChange} value={item["id"]}>Attribuer la coloc
                </button>
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

