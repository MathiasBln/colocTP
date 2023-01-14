import { NavLink} from "react-router-dom";
import "../style/Utilities.css";

export default function NavBarHome({deco, coloc}: any) { 

    return(

<nav className="navbar navbar-expand-lg fixed-top z-index-199 navbar-dark bg-dark py-0">
<div className="container-fluid">
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
        <div className="navbar-nav">
            <ul className="nav">
                <li className="nav-item mr-5">
                    <button className="nav-link border-0 bg-success text-white fw-bold" onClick={deco}>Me déconnecter</button>
                </li>
                <li className="nav-item mr-5">
                    <NavLink className="nav-link active bg-success text-white fw-bold" aria-current="page" to="/coloc">Mon espace client</NavLink>
                </li>
            </ul>          
        </div>
    </div>
</div>
</nav>);
};