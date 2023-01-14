import {useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { IShowProps } from "../types/Post"; 
import { IExpense } from "../types/Expense";

const Balance = ({coloc}:any): JSX.Element => {
    
    const navigate = useNavigate();
    const [fetchExpenses, setFetchExpenses] = useState<any>("");
    const [fetchUsers, setFetchUsers] = useState<any>("");
    const [expenses, setExpenses] = useState<{ expenses: IExpense[] }>({expenses: []});

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
    }, [token.token, navigate])

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
                setFetchExpenses(data);
            }).catch(error => console.log("Erreur dans la requête fetch : " + error))     
    }, [token.token, navigate])

    let count: number = 0;
    useEffect( () => {
        count = 0
        fetch('http://localhost:5657/allExpense', {
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
           setExpenses(data);
        }).catch(error => console.log("Erreur dans la requête fetch : " + error)) 
    },[setExpenses, token.token])

    let accumulatorDebt: Array<number> = [];
    let total: number = 0;
    let result: number = 0;
    let quote:number = 0;
    let usersNumber: number = 0;
    let userColocId: number = 0;

    fetchExpenses.users?.filter( (elem: any) => (token.token === elem['token'])  ).map((colocUser: any, key: any) => {
        userColocId = colocUser['coloc_id']
     })
     
    usersNumber = fetchExpenses.users?.length;
    quote = count/usersNumber;
   
    return(
        <div id='balance' className="mb-2">
        {expenses.expenses?.map((e) => {count += e.cost;})}
        {fetchUsers.users?.filter( (elem: any) => ((elem['token'] === token.token))  ).map((el: any, index: any) => {
                  return (
            <div className="container w-50 mb-5 mt-3 bg-dark rounded p-3 shadow" key={index}>
                <h3 className="text-center fs-4 mb-2 text-white">Votre balance</h3>
                <h4 className="text-center fs-6 mb-3 text-white">Visualisez vos créances et dettes</h4>
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
                        result = quote - total
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
                        <td colSpan={2} className="text-dark text-center fw-bold fs-6">TOT</td>
                        <td colSpan={2} className="text-dark text-center fw-bold fs-6">{total}</td>
                     </tr>
                     <tr>
                        <td colSpan={3} className="text-dark fw-bold fs-6">Résultat net</td>
                        <td colSpan={2} className="text-dark text-center fw-bold fs-6">{result}</td>
                     </tr>
                    </tbody>
                </table>
            </div>         
                   );
                })}
        </div>)
}

export default Balance;