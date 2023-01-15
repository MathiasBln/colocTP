import { useNavigate } from "react-router-dom";
import "../style/Utilities.css";
import "../style/Dashboard.css"

export default function NoColocContent() { 

    const navigate = useNavigate()
    const deco = () => {
        sessionStorage.removeItem('token');
        navigate("/login");
    }
    
    const redirect = () => {
        navigate("/home");
    }

    return(
        <>
        <div className="container mt-5 pt-5 px-5 warning-background-50 d-flex flex-column shadow rounded">
        <h1 className="fw-bold fs-3 text-center text-uppercase">Information</h1>
        <div className="fw-bold mb-2 mt-2">
        <p className="fs-4 mt-2"> Vous n'êtes pas colocataire ou le système ne vous identifie plus comme colocataire.</p>
        <p className="fs-5 mt-2">Si vous n'êtes pas encore colocataire, je vous invite à demander une admission dans une colocation. La liste se situe sur la page d'accueil. 
        Ecrivez un email à l'une des colocation qui étudiera votre demande et si elle est retenue, vous pourrez avoir pleinement accés à un espace de gestion.</p>
        <p className="fs-5 mt-2">Si vous êtes colocataire, une mesure de sécurité ou un incident technique empêcher l'accés à votre identifiant de colocataire: 
        pour être à nouveau considéré comme colocataire, je vous invite à vous reconnecter</p>
        </div>
        <div className="row align-content-center justify-content-center gap-2 pb-5"> 
            <button className="btn btn-success shadow w-25 fw-bold fs-4 mx-auto" onClick={redirect}>Voir les colocations</button>
            <button className="btn btn-success shadow w-25 fw-bold fs-4 mx-auto" onClick={deco}>Me déconnecter</button>
        </div>
    </div>
        </>
    )

}