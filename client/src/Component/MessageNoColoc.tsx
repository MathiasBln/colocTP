import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Loader from "./Loader";
import NoColocContent from "./NoColocContent";
import "../style/Utilities.css";
import "../style/Dashboard.css"

export default function MessageNoColoc({coloc}: any) {

const navigate = useNavigate()

const [loaded, setLoaded] = useState(false);

//   the useEffect will run on the first rendering of the App component
//   after two seconds (about how long it takes for the data to load)
//   the loaded state will become true
  useEffect(() => {
    let timer = setTimeout(() => setLoaded(true), 2000);
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