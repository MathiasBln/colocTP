import { useState, useEffect } from "react";
import { useNavigate} from "react-router-dom";

export default function UserList() {
    // @ts-ignore
    const [fetchUsers, setFetchUsers] = useState<any>("");
    const navigate = useNavigate();
    const token = JSON.parse(sessionStorage.token);
    useEffect( () => {
      
        fetch('http://localhost:5657', {
            method: "GET",
            mode: "cors",
            credentials: "include",
            headers: new Headers({
                "Authorization" : "Bearer " + token.token,
                "Content-type":  "application/x-www-form-urlencoded"
            })
        })
            .then((response) =>  response.text())
            .then((data) => {
               
                if (data) {
                    // if (data.message === "invalid cred") {
                    //     sessionStorage.removeItem('token');
                    //     navigate("/login")
                    // }     
                }
                let sette:any = setFetchUsers(data);
                console.log(sette);
            }).catch(error => console.log("Erreur dans la requête fetch : " + error))
    }, [])


    return (
            <>
            {/* {fetchUsers.renters?.map( (item: any, key: any) => (
                    <div className=""  key={key}>

                            <div
                                className=""
                            />
                        <div className="">
                            <h1>{item['username']}</h1>
                            <p>{item['colocId']}</p>
                        </div>
                    </div>
            ))} */}
        </>
    );
};


