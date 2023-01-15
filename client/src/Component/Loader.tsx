import "../style/Utilities.css";
import "../style/Dashboard.css"
import "../style/Loader.css";

export default function Loader() { 

    return(
        <>
        <div className="page-loader-container success-background-50">
            <div className="mt-5 d-flex align-content-center justify-content-center">
                <span className="loader"></span>
            </div>
        </div>
          
        </>
    )

}