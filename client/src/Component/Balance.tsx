import {useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Balance = ({}): JSX.Element => {
    
    const navigate = useNavigate();
    const [fetchExpenses, setFetchExpenses] = useState<any>("");
    const [fetchUsers, setFetchUsers] = useState<any>("");
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
        }).then((response) =>  response.json())
            .then((data) => {
                
                if (data.message) {
                    if (data.message === "invalid cred") {
                        sessionStorage.removeItem('token');
                        navigate("/login")
                    }
                    return
                }
                setFetchUsers(data);
            }).catch(error => console.log("Erreur dans la requête fetch : " + error))
    }, [])

    useEffect( () => {

        fetch('http://localhost:5657/getexpenses', {
            method: "POST",
            mode: "cors",
            credentials: "include",
            headers: new Headers({
                "Authorization" : "Bearer " + token.token,
                "Content-type":  "application/x-www-form-urlencoded"
            })
        }).then((response) =>  response.json())
            .then((data) => {
                
                if (data.message) {
                    if (data.message === "invalid cred") {
                        sessionStorage.removeItem('token');
                        navigate("/login")
                    }
                    return
                }
                console.log(data.costs)
                setFetchExpenses(data);
            }).catch(error => console.log("Erreur dans la requête fetch : " + error))

            
            
    }, [])

    let accumulatorDebt: Array<number> = [];
    let total: number = 0;
    
    return(
        <div id='balance' className="mb-3">
        {fetchUsers.users?.filter( (elem: any) => (elem['token'] === token.token)  ).map((el: any, index: any) => {
                  return (
            <div className="container w-50 my-5 bg-dark rounded p-3 shadow" key={index}>
                <h3 className="text-center fs-4 mb-2 text-white">Vue synthétique de votre balance</h3>
                <h4 className="text-center fs-6 mb-3 text-white">Visualisez vos propre créances et dettes par colocation</h4>
                <table className="table table-hover table-success border border-2 border-success">
                    <thead>
                    <tr>
                        <th>Identifiant de colocation</th>
                        <th>Vos Créances</th>
                        <th>Vos Dettes</th>
                        <th>Créances cumulées</th>
                        <th>Dettes cumulées</th>
                    </tr>
                    </thead>
                    <tbody>
                       
                    {fetchExpenses.costs?.filter( (elem: any) => (el['id'] === elem['user_id'])  ).map((ele: any, key: any) => {
                        
                        accumulatorDebt.push(ele['cost']);
                        total = accumulatorDebt.reduce((a,v) =>  a = a + v , 0 )
                        return( 
                        <tr key={key}>
                            <td>{ele['coloc_id']}</td>
                            <td>Créances</td>
                            <td>{ele['cost']}</td>
                            <td>Créances cumul</td>
                            <td>{total}</td>
                        </tr>
                        );
                     })}
                     <tr>
                        <td className="text-dark fw-bold fs-6">TOTAUX</td>
                        <td colSpan={2} className="text-dark text-center fw-bold fs-6">tot creance</td>
                        <td colSpan={2} className="text-dark text-center fw-bold fs-6">{total}</td>
                     </tr>
                    
                    </tbody>
                </table>
            </div>         
                   );
                })}
        </div>)
}

export default Balance;