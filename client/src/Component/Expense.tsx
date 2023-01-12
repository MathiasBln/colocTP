import { useEffect, useState } from "react";

const Expense = () => {
    const [fetchUsers, setFetchUsers] = useState<any>();
    const token = JSON.parse(sessionStorage.token);

useEffect( () => {
        fetch('http://localhost:5657/expense', {
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
    console.log(fetchUsers);
    return (<></>)
}

export default Expense;