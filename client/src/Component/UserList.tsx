import {useState, useEffect, ChangeEvent, FormEvent} from "react";
import { useNavigate } from "react-router-dom";
import {formDataColocInterface, IColoc, IShowProps} from "../types/Post"

export default function UserList({setFetchUsers, fetchUsers}:any) {
    // @ts-ignore
    const [formDataColoc, setFormDataColoc] = useState<formDataColocInterface>({user_id: "", coloc_id:""});
    let [colocData, setColocData] = useState<object>({colocId: '', userId: ''})
    const token = JSON.parse(sessionStorage.token);
    const navigate = useNavigate();

    // useEffect( () => {
    //
    //     const usersList = fetch('http://localhost:5657/userslist', {
    //         method: "POST",
    //         mode: "cors",
    //         credentials: "include",
    //         headers: new Headers({
    //             "Authorization" : "Bearer " + token.token,
    //             "Content-type":  "application/x-www-form-urlencoded"
    //         })
    //     }).then((response) =>  response.json())
    //     .then((data) => {
    //
    //         setFetchUsers(data);
    //     }).catch(error => console.log("Erreur dans la requête fetch : " + error))
    // }, [])


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

    return (
            <>
                <div className="w-75 mb-3">
                    <h4 className="text-center">Liste des candidats à la colocation:</h4>
                </div>
                <ul className="list-group mt-2 w-75">
                    {fetchUsers.users?.filter( (ele: any) => ele['coloc_id'] == null).map( (item: any, key: any) => (
                       <li className="list-group-item"  key={key}>
                           <div className="d-flex py-2 justify-content-around gap-2">
                               <span>{item['username']}</span>
                               <span>
                                   <form onSubmit={handleSubmit}>
                                   {fetchUsers.users?.filter( (elem: any) => elem['coloc_id'] != null).map( (el: any, key: any) => (
                                       <div key={key}>
                                           <input type="hidden" id="colocId" name="colocId" value={el['coloc_id']} onChange={handleChange}/>
                                       </div>
                                   ))}
                                       <input type="hidden" id="userId" name="userId" value={item['id']} onChange={handleChange}/>
                                   <button className="list-group-item p-0 border-0 btn btn-link" type="submit">Inviter</button>
                               </form>
                               </span>
                           </div>
                        </li>
                    ))}
                </ul>
        </>
    );
};


