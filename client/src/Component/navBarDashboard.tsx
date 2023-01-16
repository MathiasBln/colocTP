import { NavLink} from "react-router-dom";
import "../style/Utilities.css";

export default function navBarDashboard({deco, coloc}: any) { 

    return(
    <>
        <nav className="navbar success-background-50 navbar-expand-lg fixed-top z-index-199 navbar py-0">
            <div className="container-fluid">
                <NavLink className="navbar-brand text-uppercase fs-2 fw-bold" to={"/home"}>{coloc?.title}</NavLink>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse justify-content-center my-0" id="navbarNavAltMarkup">
                    <div className="navbar-nav my-0">
                        <ul className="nav fs-4 my-0">
                            <li className="nav-item bg-transparent px-5 my-0">
                                <NavLink className="nav-link active hover-blue text-white fw-bold" aria-current="page" to="/home">Retour à l'accueil</NavLink>
                            </li>
                            <li className="nav-item bg-transparent px-5 my-0">
                                <a className="nav-link hover-blue text-white fw-bold" href="#expenses">Nos dépenses</a>
                            </li>
                            <li className="nav-item bg-transparent px-5 my-0">
                                <a className="nav-link  hover-blue text-white fw-bold" href="#balance">Ma balance</a>
                            </li>
                            <li className="nav-item bg-transparent px-5 my-0">
                                <button className="nav-link hover-blue bg-transparent border-0 text-white fw-bold" onClick={deco}>Me déconnecter</button>
                            </li>
                        </ul>          
                    </div>
                </div>
            </div>
        </nav>
    </>
    )
}