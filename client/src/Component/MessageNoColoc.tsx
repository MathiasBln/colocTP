import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Loader from "./Loader";
import NoColocContent from "./NoColocContent";
import "../style/Utilities.css";
import "../style/Dashboard.css"

export default function MessageNoColoc({coloc}: any) {

const navigate = useNavigate()

const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    let timer = setTimeout(() => setLoaded(true), 1500);
    return () => {
      clearTimeout(timer);
    };
  }, []);



// @ts-ignore
return(
    <>
      {!loaded ? (
         <Loader />
      ) : (
        <NoColocContent />
      )}
    </>
        );
};