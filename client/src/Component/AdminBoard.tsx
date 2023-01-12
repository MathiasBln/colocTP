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

        const usersList = fetch('http://localhost:5657/coloclist', {
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
                          <h2>Nom de la coloc: {item.title}</h2>
                          <h3>Id du propriétaire:{item['proprioID']}</h3>
                          {fetchUsers.users?.filter( (elem: any) => elem['id'] === item['proprioID'] ).map((el: any, key: any) => {
                              return (
                                  <div className="container bg-dark text-white rounded mb-5 p-4" key={key}>
                                      <div className="d-flex flex-column align-content-center justify-content-center">
                                      <h3 className="text-center mb-2">Votre espace administrateur</h3>
                                      <p className="text-center mb-2">Bienvenue {el['username']} -- id:  {el['id']}  </p>
                                      </div>
                                      <div className="d-flex flex-sm-row flex-column align-content-center justify-content-center">
                                          <div className="w-50 d-flex flex-column align-content-center">
                                              <UserList setFetchUsers={setFetchUsers} fetchUsers={fetchUsers} />
                                          </div>
                                          <div className="w-50">
                                              <FormPost setColoc={setColoc} coloc={coloc}/>
                                          </div>
                                      </div>
                                  </div>
                              );
                          })}
                      </div>
                  );
              })}





          {/*{fetchColoc.allColocs?.filter( (ele: any) => ele['proprioID'] != null).map( (item: any, key: any) => {*/}
          {/*    return(  <ul  key={key}>*/}
          {/*    <li>{item['title']}</li>*/}
          {/*    <li>{item['content']}</li>*/}
          {/*    <li>{item['proprioID']}</li>*/}
          {/*    </ul>)*/}
          {/*})}*/}
          {/*{fetchUsers.users?.filter( (elem: any) => elem['coloc_id'] != null).map( (el: any, key: any) => {*/}
          {/*    return(*/}
          {/*      */}
          {/*    )*/}
          {/*})}*/}

      </>
      
    )
}