import { NavLink} from "react-router-dom";

export default function NavBarDashboard({deco, coloc}: any) { 

    return(
    <>
        <nav className="navbar navbar-expand-lg navbar-success bg-success py-0">
            <div className="container-fluid">
                <NavLink className="navbar-brand text-uppercase fs-2 fw-bold" to={"/"}>{coloc?.title}</NavLink>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                    <div className="navbar-nav">
                        <ul className="nav">
                            <li className="nav-item mr-5">
                                <NavLink className="nav-link active bg-success text-white fw-bold" aria-current="page" to="/home">Retour à l'accueil</NavLink>
                            </li>
                            <li className="nav-item mr-5">
                                <a className="nav-link bg-success text-white fw-bold" href="#expenses">Nos dépenses</a>
                            </li>
                            <li className="nav-item mr-5">
                                <a className="nav-link bg-success text-white fw-bold" href="#balance">Ma balance</a>
                            </li>
                            <li className="nav-item mr-5">
                                <button className="nav-link border-0 bg-success text-white fw-bold" onClick={deco}>Me déconnecter</button>
                            </li>
                        </ul>          
                    </div>
                </div>
            </div>
        </nav>
    </>
    )
}