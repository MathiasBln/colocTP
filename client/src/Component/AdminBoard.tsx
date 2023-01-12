import { useNavigate} from "react-router-dom";
import UserList from "./UserList";
import {FormColoc, IColoc, IShowProps} from "../types/Post";
import FormPost from "./FormPost";
import React, {useEffect, useState} from "react";

export default function AdminBoard({setColoc, coloc}: IShowProps) {
    // @ts-ignore
    const navigate = useNavigate()
    const [fetchColoc, setFetchColoc] = useState<any>("");
    const [fetchUsers, setFetchUsers] = useState<any>("");
    const token = JSON.parse(sessionStorage.token);

    useEffect( () => {

        const colocsList = fetch('http://localhost:5657/coloclist', {
            method: "POST",
            mode: "cors",
            credentials: "include",
            headers: new Headers({
                "Authorization" : "Bearer " + token.token,
                "Content-type":  "application/x-www-form-urlencoded"
            })
        }).then((response) =>  response.json())
            .then((data) => {

                setFetchColoc(data);
            }).catch(error => console.log("Erreur dans la requête fetch : " + error))
    }, [])

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

    return (
      <>
              {fetchColoc.allColocs?.map((item: any, index: any) => {
                  return (
                      <div key={index}>
                          <div className="container bg-dark text-white rounded mb-5 mt-5 p-4">
                              <h2 className="text-center fw-bold">La colocation {item.title} est heureuse de vous accueillir</h2>
                              <p> Ici vous pouvez consulter l'état de vos finance, vos dettes ou vos créance.
                                  Vous avez également une vision synthétique de l'état des finances de la colocation.</p>
                          </div>
                          {fetchUsers.users?.filter( (elem: any) => (elem['id'] === item['proprioID']) && (elem['token'] === token.token)  ).map((el: any, key: any) => {
                              return (
                                  <div className="container bg-dark text-white rounded mb-5 p-4" key={key}>
                                      <div className="d-flex flex-column align-content-center justify-content-center align-item-center justify-item-center">
                                          <h3 className="text-center fw-bold mb-2">Bienvenue <span className="text-success">{el['username']}</span> dans votre espace d'administration</h3>
                                      </div>
                                      <div className="mx-auto">
                                          <UserList setFetchUsers={setFetchUsers} fetchUsers={fetchUsers} />
                                      </div>
                                  </div>
                              );
                          })}
                          {fetchUsers.users?.filter( (elem: any) => (elem['id'] !== item['proprioID']) && (elem['token'] === token.token)  ).map((el: any, key: any) => {
                              return (
                                  <div className="container row d-flex align-content-center justify-content-center">
                                      <div className="col-5 shadow p-3 mb-3">
                                          <h3 className="text-center mb-2">Vos informations: </h3>
                                          <ul className="text-dark list-group list-group-flush rounded" key={key}>
                                              <li className="list-group-item"> Votre pseudo: <span className="fw-bold">{el['username']}</span></li>
                                              <li className="list-group-item"> Votre identifiant unique: <span className="fw-bold">{el['id']}</span></li>
                                          </ul>
                                      </div>
                                  </div>

                              );
                          })}
                      </div>
                  );
              })}
      </>
      
    )
}