import React from 'react';
import { useEffect, useState} from "react";
import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Login from "./Routes/Login";
import Dashboard from "./Routes/Dashboard";
import {IColoc} from "./types/Post";
import Home from "./Routes/Home";
import NeedAuth from "./Routes/NeedAuth";



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
                    
                    <Route path={"dashboard"} element={<NeedAuth><Dashboard /></NeedAuth>}/>
                    
                    <Route path={'/'} element={
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
