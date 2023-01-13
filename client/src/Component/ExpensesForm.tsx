import {ChangeEvent, FormEvent, useCallback, useState} from "react";
import {useNavigate} from "react-router-dom";
import { FormExpense } from "../types/Expense";
import { IShowProps } from "../types/Expense";


export default function ExpensesForm({setExpenses, expenses}: IShowProps ) {

    const [formData, setFormData] = useState<FormExpense>({ title: "", cost: "" })
	const token = JSON.parse(sessionStorage.token)
    const navigate = useNavigate()

    const handleSubmit = useCallback((e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        fetch('http://localhost:5657/newExpense', {
            method: "POST",
            mode: "cors",
            body: new URLSearchParams({
                ...formData
            }),
            credentials: "include",
			headers: new Headers({
                "Authorization" : "Bearer " + token.token,
                "Content-type":  "application/x-www-form-urlencoded"
            })
        })
            .then(data => data.json())
            .then(json => {
                if (json.message) {
                    if (json.message === "invalid cred") {
                        sessionStorage.removeItem('token');
                        navigate("/login")
                    }
                    return
                }
                setExpenses(
                    prevState => {
                        return {
                            expenses: [
                                json.expenses,
                                ...prevState?.expenses,
                            ]
                        }
                    }
                )

            })
            window.location.reload();
    },[formData, token.token, navigate, setExpenses])

    const handleChange = ({target}:any) => {
        setFormData(prevState => {
            return {
                ...prevState,
                // @ts-ignore
                [target.name]: target.value
            }
        })
    }

    return (
        <>
			<form className="card-body p-5" onSubmit={handleSubmit}>
				<div className="form-outline form-white mb-4">
					<label className="form-label" htmlFor="typeEmailX">Reason</label>
					<input type="text" id="typeEmailX" className="form-control form-control-lg" name="title" onChange={handleChange}/>
				</div>
				<div className="form-outline form-white mb-4">
					<label className="form-label" htmlFor="typePasswordX">Amount</label>
					<textarea id="typePasswordX" className="form-control form-control-lg" name="cost" onChange={handleChange}/>
					<button className="btn black px-5" type="submit">Submit</button>
				</div>
			</form>
        </>
    )
}