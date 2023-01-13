// import { useEffect, useState } from "react";

const Expense = (): JSX.Element => {
    // const [fetchExpenses, setFetchExpenses] = useState<[]>([]);
    // const token = JSON.parse(sessionStorage.token);

    // useEffect( () => {
    //     fetch('http://localhost:5657/allExpense', {
    //         method: "POST",
    //         mode: "cors",
    //         credentials: "include",
    //         headers: new Headers({
    //             "Authorization" : "Bearer " + token.token,
    //             "Content-type":  "application/x-www-form-urlencoded"
    //         })
    //     })
    //     .then((response) =>  response.json())
    //     .then((data) => {
            
    //        setFetchExpenses(...fetchExpenses, data);
    //     }).catch(error => console.log("Erreur dans la requête fetch : " + error)) 
    // }, [])
    
    return (
        <>
        <div>
            <h3>Tableau des dépenses ici</h3>
        </div>
        </>
    )
}

export default Expense;