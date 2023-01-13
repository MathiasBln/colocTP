import { useEffect, useState } from "react";

const Expense = (): JSX.Element => {
    const [fetchExpenses, setFetchExpenses] = useState<{expenses:[{title:'', cost: number, user_id: number}]}>({expenses:[{title:'', cost: 0, user_id: 0}]});
    const token = JSON.parse(sessionStorage.token);

    useEffect( () => {
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
            console.log("data", data);
           setFetchExpenses(data);
        }).catch(error => console.log("Erreur dans la requête fetch : " + error)) 
    },[])
    console.log("fetch", fetchExpenses.expenses);

    return (<>{fetchExpenses.expenses.map((e) => {
        return <>
        <h1>{e.title}</h1>
        <p>{e.cost}</p>
        </>
    })}</>)
}

export default Expense;