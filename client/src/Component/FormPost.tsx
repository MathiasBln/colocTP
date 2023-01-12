import {ChangeEvent, FormEvent, useState} from "react";
import {FormColoc, IColoc, IShowProps} from "../types/Post";
import {useNavigate} from "react-router-dom";


export default function Form({setColoc, coloc}: IShowProps) {
    // @ts-ignore
    const [formData, setFormData] = useState<FormColoc>({ title: "", content: "" })
    const token = JSON.parse(sessionStorage.token)
    const navigate = useNavigate()

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
                "Authorization" : "Bearer " + token.token,
                "Content-type":  "application/x-www-form-urlencoded"
            })
        })
            .then(data => data.json())
            .then((json) => {
                if (json.message) {
                    if (json.message === "invalid cred") {
                        sessionStorage.removeItem('token');
                        navigate("/login")
                    }
                    return
                }
                setColoc(
                    prevState => {
                        return {
                            coloc: [
                                json.coloc,
                                ...prevState.coloc,
                            ]
                        }
                    }
                )
            })
        navigate('dashboard');
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
            <div className="container py-2 h-100">
                <div className="row d-flex justify-content-center align-items-center h-100">
                    <div className="col-10 bg-white rounded-2 p-5">
                        <h4 className="text-center text-black fw-bold mb-3">Création d'une coloc</h4>
                        <div className="row align-content-center justify-content-center bg-white text-dark rounded-2">
                            <form className="col-12" onSubmit={handleSubmit}>
                                <div className="form-outline form-white mb-4">
                                    <label className="form-label fw-bold" htmlFor="typeEmailX">Nom de votre coloc</label>
                                    <input type="text" id="typeEmailX" className="form-control form-control-lg" name="title" onChange={handleChange}/>
                                </div>
                                <div className="form-outline form-white mb-4">
                                    <label className="form-label fw-bold" htmlFor="typePasswordX">Address de la coloc</label>
                                    <textarea id="typePasswordX" className="form-control form-control-lg" name="content" onChange={handleChange}/>
                                </div>
                                <button className="btn btn-dark btn-outline-light btn-lg px-5" type="submit">Créer</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}