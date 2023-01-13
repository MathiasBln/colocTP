import {ChangeEvent, FormEvent, useState} from "react";
import {FormSpent} from "../types/Post";
import {useNavigate} from "react-router-dom";


export default function Form() {

    const [formData, setFormData] = useState<FormSpent>({ title: "", cost: "" })
	const token = JSON.parse(sessionStorage.token)
    const navigate = useNavigate()

    // @ts-ignore

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        fetch('http://localhost:5657/post', {
            method: "POST",
            mode: "cors",
            body: new URLSearchParams({
                ...formData
            }),
            credentials: "include",
			headers: new Headers({
                "Authorization" : "Basic amZnbWFpbC5jb206cGFzc3dvcmQ=",
                "Content-type":  "application/x-www-form-urlencoded"
            })
        })
            .then(data => data.json())
            .then(json => {
                if (json.token) {
                    sessionStorage.setItem('token', JSON.stringify(json))
                    navigate("/")
                }
            })
    }

    const handleChange = (e: ChangeEvent) => {
        setFormData(prevState => {
            return {
                ...prevState,
                // @ts-ignore
                [e.target.name]: e.target.value
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