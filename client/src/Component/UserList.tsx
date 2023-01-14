import {useState, useEffect, ChangeEvent, FormEvent} from "react";
import { useNavigate } from "react-router-dom";
import { IColoc, IShowProps, FormColoc, IRenter, INewRenter, FormRenter} from "../types/Post"

export default function UserList({setFetchUsers, fetchUsers}:any) {
    // @ts-ignore
    const [formData, setFormData] = useState<FormColoc>({ title: "", content: "" });
    const [coloc, setColoc] = useState<{ coloc: IColoc[] }>({coloc: []})

    const [formRenter, setFormRenter] = useState<FormRenter>({ id: "", coloc_id: "" });
    const [renter, setRenter] = useState<{ renter: IRenter[] }>({renter: []})


    const token = JSON.parse(sessionStorage.token);
    const navigate = useNavigate();

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        fetch('http://localhost:5657/addrenter', {
            method: "POST",
            mode: "cors",
            body: new URLSearchParams({
            ...formRenter
            }),
            credentials: "include",
            headers: new Headers({
                "Authorization" : "Bearer " + token.token,
                "Content-type":  "application/x-www-form-urlencoded"
            })
        }).then((data) =>  data.json())
            .then((json) => {

                if (json.message) {
                    if (json.message === "invalid cred") {
                        sessionStorage.removeItem('token');
                        navigate("/login")
                    }
                    return
                }
                // @ts-ignore
                setRenter(
                    prevState => {
                        // @ts-ignore
                        return {
                            renter: [
                                // @ts-ignore
                                json.renter,
                                ...prevState.renter,
                            ]
                        }
                    }
                )

            }).catch(error => console.log("Erreur dans la requête fetch : " + error))
    }

    const handleChange = (e: ChangeEvent) => {
        setFormRenter(prevState => {
            return {
                ...prevState,
                // @ts-ignore
                [e.target.name]: e.target.value

            }
        })
    }

    return (
            <>
                <ul className="list-group mt-2 w-50 mx-auto">
                    {fetchUsers.users?.filter( (ele: any) => ele['coloc_id'] == null).map( (item: any, key: any) => (
                       <li className="list-group-item"  key={key}>
                           <div className="d-flex py-2 justify-content-around gap-2">
                               <span>{item['username']}</span>
                               <span>
                                   <form onSubmit={handleSubmit}>
                                   {fetchUsers.users?.filter( (elem: any) => elem['coloc_id'] != null).map( (el: any, key: any) => (
                                       <div key={key}>
                                           <input type="hidden" name="coloc_id" value={el['coloc_id']} onChange={handleChange}/>
                                       </div>
                                   ))}
                                       <input type="hidden" name="id" value={item['id']} onChange={handleChange}/>
                                   <button className="list-group-item btn btn-sm rounded-5 bg-success shadow border-0 border text-white fw-bold" type="submit">Inviter</button>
                               </form>
                               </span>
                           </div>
                        </li>
                    ))}
                </ul>
        </>
    );
};


