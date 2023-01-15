import {useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { IExpense } from "../types/Expense";
import '../style/Utilities.css';

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
    let color: string = "white";
    let words: string = "Vous devez payer ou être payé d'un montant de";

    fetchExpenses.users?.filter( (elem: any) => (token.token === elem['token'])  ).map((colocUser: any, key: any) => {
        userColocId = colocUser['coloc_id']
     })

    expenses.expenses?.map((e) => {count += e.cost;})
     
    usersNumber = fetchExpenses.users?.length;

    quote = Math.round(count/usersNumber);
   
    return(
        <div id='balance' className="mb-2">
       
        {fetchUsers.users?.filter( (elem: any) => ((elem['token'] === token.token))  ).map((el: any, index: any) => {
                  return (
            <div className="w-100 mb-5 mt-3 bg-transparent rounded p-3" key={index}>
                <h3 className="text-center fs-3 mb-2 text-white">Votre balance</h3>
                <table className="w-75 mx-auto table table-hover table-success border border-4 border-success">
                    <thead>
                    <tr>
                        <th>Colocation n°:</th>
                        <th>Description</th>
                        <th>Vos dépenses</th>
                        <th>cumul</th>
                    </tr>
                    </thead>
                    <tbody>
                       
                    {fetchExpenses.costs?.filter( (elem: any) => (el['id'] === elem['user_id'])  ).map((ele: any, key: any) => {
                        
                        accumulatorDebt.push(ele['cost']);
                        total = accumulatorDebt.reduce((a,v) =>  a = a + v , 0 )
                        result = total - quote
                     
                        if(result > 0){ 
                            color = "success"
                            words = "Vous avez une créance de"
                            } else if (result < 0) {
                            color = "danger"
                            words = "Vous avez une dette de"
                            } 
                        return( 
                        <tr key={key}>
                            <td>{ele['coloc_id']}</td>
                            <td>{ele['title']}</td>
                            <td>{ele['cost']}€</td>
                            <td>{total}€</td>
                        </tr>
                        );
                     })}
                     <tr>
                        <td colSpan={2} className="text-dark fw-bold fs-6">Vos dépenses totales:</td>
                        <td colSpan={2} className="text-dark text-center fw-bold fs-6">{Math.round(total)}€</td>
                     </tr>
                     <tr>
                        <td colSpan={2} className="text-dark fw-bold fs-6">Votre quote part:</td>
                        <td colSpan={2} className="text-dark text-center fw-bold fs-6">{Math.round(quote)}€</td>
                     </tr>
                    <tr>
                        <td colSpan={2} className="text-dark fw-bold fs-6">Résultat net</td>
                        <td colSpan={2} className={`text-${color} bg-dark shadow text-center fw-bold fs-5`}>{Math.round(result)}€</td>
                    </tr>
                    </tbody>
                </table>
                <div className="w-75 rounded mx-auto">
                    <p className="text-center fs-4 text-dark fw-bold py-5">{words} <span className={`fw-bold fs-3 text-${color}`}>{Math.abs(Math.round(result))}</span><span className="fw-bold fs-3"> €</span> vis à vis des autres colocataires</p>
                   <div className="border border-white border-3 rounded bg-dark">
                        <h4 className="text-center fs-3 text-center text-white success-background-50 w-100 py-4 rounded-top">Explication:</h4>
                        <p className="text-center fs-4 text-warning">Nous avons divisé le total des dépenses de la colocation, <span className="text-success fw-bold">{count}€</span>, par le nombre de colocataires: <span className="text-success fw-bold">{usersNumber}</span>. </p>
                        <p className="text-center fs-4 text-warning">Le résultat est un seuil minimal que vous devez au pot commun: <span className="text-success fw-bold">{quote}€</span> </p>
                        <p className="text-center fs-4 text-warning">Attention, ce seuil minimal augmente dés qu'une dépense est engagé. Ainsi une part de votre dépense augmentera ce seuil.</p>
                        <p className="text-center fs-4 text-warning">Le résultat net est votre créance ou votre dette en fonction de votre quote part minimale de contribution: <span className="fw-bold text-white">{Math.abs(result)}€</span>  </p>
                    </div>
                </div>
                
            </div>         
                   ); 
                })}
        </div>)
}

export default Balance;