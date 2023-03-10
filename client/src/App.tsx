import React from 'react';
import { useEffect, useState} from "react";
import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Login from "./Routes/Login";
import {IColoc} from "./types/Coloc";
import Home from "./Routes/Home";
import NeedAuth from "./Routes/NeedAuth";
import Dashboard from './Routes/Dashboard';


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

    return (
        <div className="min-vh-100 gradient-custom fancy-background-yellow">
            <BrowserRouter>
                <Routes>
                    <Route path={"/login"} element={<Login/>}/>
                    <Route path={'/'} element={
                        <NeedAuth>
                            <Home setColoc={setColoc} coloc={coloc}/>
                        </NeedAuth>
                    }/>
                    <Route path={'/home'} element={
                        <NeedAuth>
                            <Home setColoc={setColoc} coloc={coloc}/>
                        </NeedAuth>
                    }/>
                    <Route path={'/coloc'} element={
                        <NeedAuth>
                            <Dashboard />
                        </NeedAuth>
                    }/>
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
