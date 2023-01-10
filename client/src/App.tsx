import React from 'react';
import { useEffect, useState} from "react";
import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Login from "./Routes/Login";
import {IColoc} from "./types/Post";
import Home from "./Routes/Home";
import NeedAuth from "./Routes/NeedAuth";
import Balance from './Component/Balance';


interface authInterface {
    value: boolean
}


function App() {
    const [auth, setAuth] = useState<authInterface>({value : false})
    const [coloc, setColoc] = useState<{ coloc: IColoc[] }>({coloc: []})

    useEffect(() => {
        if (sessionStorage.token) {
            setAuth({value : true})
        }
    },[])

    const deco = () => {
        sessionStorage.removeItem('token');
    }

    return (
        <div className="min-vh-100 gradient-custom">
            <BrowserRouter>
                <Routes>
                    <Route path={"/login"} element={<Login/>}/>
                    <Route path={'/'} element={
                        <NeedAuth>
                            <Home setColoc={setColoc} coloc={coloc}/>
                        </NeedAuth>
                    }/>
                </Routes>
            </BrowserRouter>
            <Balance></Balance>
        </div>
    );
}

export default App;
