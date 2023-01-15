import React from "react";
import "../style/Utilities.css";

export default function ViewColocs() {

// @ts-ignore
return(
     <div className="container mt-2  mb-5 py-3 rounded-2  warning-background-50 shadow w-75">
            <h3 className="text-center fs-4 fw-bold my-2"> Il n'y a pas encore de colocations </h3>
            <p className="text-center">Créer une colocation pour être le premier à en créer une.</p>
        </div>
    );
};