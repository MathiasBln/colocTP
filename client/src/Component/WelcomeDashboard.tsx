import { useNavigate, NavLink} from "react-router-dom";
import UserList from "./UserList";
import {FormColoc, IColoc, IShowProps} from "../types/Post";
import React, {useEffect, useState} from "react";

export default function WelcomeDashBoard({coloc}:any) {
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
          {fetchUsers.users?.filter( (elem: any) => (elem['token'] === token.token)  ).map((el: any, index: any) => {
              return (
                  <div className="container d-flex flex-column p-0" key={el['id']}>
                      {fetchUsers.users?.filter( (elem: any) => (elem['token'] === token.token)  ).map((ele: any, key: any) => {
                          return (
                            <>
                            <div className="row align-content-center justify-content-center my-5" key={key}>
                                <div className="col-7 bg-success text-white p-3">
                                    <h2 className="text-center fw-bold fs-3 mb-2">Bonjour {el['username']}</h2>
                                    <h3 className="text-center fw-bold fs-4 mb-3">la colocation <span className="text-dark">{coloc?.title}</span> est heureuse de vous accueillir</h3>
                                    <p> Ici vous pouvez consulter l'état des finances de la colocation, vos dettes ou vos créances.</p>
                                    <p>Si vous êtes propriétaire, la liste de vos colocations et les potentiels colocataires s'afficheront ci-dessous.</p>
                                </div>
                                <div className="col-4 bg-success text-white p-3">
                                    <h3 className="text-start mb-4">Vos informations: </h3>
                                    <ul className="text-dark list-group list-group-flush rounded">
                                        <li className="list-group-item"> Votre pseudo: <span className="fw-bold">{ele['username']}</span></li>
                                        <li className="list-group-item"> Votre identifiant unique: <span className="fw-bold">{ele['id']}</span></li>
                                    </ul>
                                </div>
                            </div>
                              </>
                          );
                      })}
                      {fetchColoc.allColocs?.filter( (iterator: any) => (iterator['proprioID'] === el['id'])).map((item: any, key: any) => {
                          return (
                              <div className="row dark-background-90 shadow-sm text-white rounded mb-5 p-2 mx-0" key={item['id']}>
                                  <div className="d-flex flex-column align-content-center justify-content-center align-item-center justify-item-center">
                                      <div className="mx-auto"><h3 className="text-center">Colocation <span className="fw-bold text-success">{item['title']}</span></h3></div>
                                      <p className="mx-auto">Vous trouvez ici des informations sur une colocation dont vous êtes propriétaire</p>  
                                      <h4 className="mx-auto fs-5">Addresse de la colocation: <span className="text-success fw-bold">{item['content']}</span></h4>  
                                  </div>

                                  <div className="shadow text-center mx-auto bg-white w-75 my-3">
                                      <div className="row text-dark bg-success">
                                          <div className="col-3">
                                              <h4 className="fs-6 fs-md-5">Propriétaire</h4>
                                          </div>
                                          <div className="col-3">
                                              <h4 className="fs-6 fs-md-5">Id propriétaire</h4>
                                          </div>
                                          <div className="col-3">
                                              <h4 className="fs-6 fs-md-5">Colocation</h4>
                                          </div>
                                          <div className="col-3">
                                              <h4 className="fs-6 fs-md-5">Id coloc</h4>
                                          </div>
                                      </div>
                                      <div className="row text-dark">
                                          <div className="col-3">
                                              {el['username']}
                                          </div>
                                          <div className="col-3">
                                              {el['id']}
                                          </div>
                                          <div className="col-3">
                                              {item['title']}
                                          </div>
                                          <div className="col-3">
                                              {item['id']}
                                          </div>
                                      </div>
                                  </div>
                                  <UserList setFetchUsers={setFetchUsers} fetchUsers={fetchUsers} />
                              </div>
                          );
                      })}
                  </div>
              );
          })}
      </>

    )
}