import {useState, useEffect, ChangeEvent, FormEvent} from "react";
import { useNavigate } from "react-router-dom";
import {formDataColocInterface, IColoc, IShowProps} from "../types/Post"

export default function UserList() {
    // @ts-ignore
    const [fetchUsers, setFetchUsers] = useState<any>("");
    const [formDataColoc, setFormDataColoc] = useState<formDataColocInterface>({user_id: "", coloc_id:""});
    let [colocData, setColocData] = useState<object>({colocId: '', userId: ''})
    const token = JSON.parse(sessionStorage.token);
    const navigate = useNavigate();
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
        console.log(formDataColoc)
        fetch('http://localhost:5657/addrenter', {
            method: "POST",
            mode: "cors",
            body: JSON.stringify(colocData),
            credentials: "include",
            headers: new Headers({
                "Authorization" : "Bearer " + token.token,
                "Content-type":  "application/x-www-form-urlencoded"
            })
        }).then((data) =>  data.json())
            .then((json) => {
                console.log(json);
                // if (json.message) {
                //     if (json.message === "invalid cred") {
                //         sessionStorage.removeItem('token');
                //         navigate("/login")
                //     }
                //     return
                // }

            }).catch(error => console.log("Erreur dans la requête fetch : " + error))
    }



    const handleChange = (event: any) => {
        let value = event.target.value;
        let name = event.target.name;

        setColocData((prevalue) => {
            return {
                ...prevalue,   // Spread Operator
                [name]: value
            }
        })
    }

console.log(colocData);
    return (
            <>
            {fetchUsers.users?.filter( (ele: any) => ele['coloc_id'] == null).map( (item: any, key: any) => (
                    <div className=""  key={key}>
                        <div className="">
                            <h1>{item['username']}</h1>
                            <form onSubmit={handleSubmit}>
                                {fetchUsers.users?.filter( (elem: any) => elem['coloc_id'] != null).map( (el: any, key: any) => (
                                    <div key={key}>
                                        <h3> Propriétaire : {el['username']}</h3>
                                        <p> L'id de la coloc est {el['coloc_id']} </p>
                                        <input type="hidden" id="colocId" name="colocId" value={el['coloc_id']} onChange={handleChange}/>
                                    </div>
                                ))}
                                <input type="hidden" id="userId" name="userId" value={item['id']} onChange={handleChange}/>
                                <button className="btn btn-primary btn-sm" type="submit">Ajouter à a coloc</button>
                            </form>
                        </div>
                    </div>
            ))}
        </>
    );
};


