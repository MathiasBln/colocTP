import { useState, useEffect } from "react";
// import IUsers from '../types/User' - TODO: faire une belle interface 

export default function UserList() {

    const [fetchUsers, setFetchUsers] = useState<any>("");

    useEffect( () => {

        fetch('http://localhost:5657', {
            method: "GET",
            mode: "cors",
            credentials: "include"
        } )
            .then((response) =>  response.json())
            .then((data) => {
                setFetchUsers(data);
            }).catch(error => console.log("Erreur dans la requête fetch : " + error))
    }, [])

    return (
            <>
            {fetchUsers.renters?.map( (item: any, key: any) => (
                    <div className=""  key={key}>

                            <div
                                className=""
                            />
                        <div className="">
                            <h1>{item['username']}</h1>
                            <p>{item['userId']}</p>
                            <p>{item['colocId']}</p>
                        </div>
                    </div>
            ))}
        </>
    );
};


