import { useNavigate} from "react-router-dom";

export default function InviteBoard() {

    const navigate = useNavigate()
    
   
    // si ProprioID de coloc == id de user => alors c'est l'admin et le bouton inviter s'affiche. 
    // A chaque bouton inviter je poste l'id de l'user invité au back et l'id de la coloc choisi pour ce user 
    // "inviter" sera lié à l'id de la coloc que j'ai créé (si j'en créé une et une seule). => je poste l'id de coloc (fetch de post)
    // Je dois donc avoir une liste de user non-invité (dont le coloc_id de la table user est null)
    // J'utilise un .map à partir de la liste des user et je met une condition, c'est que coloc_id soit null 
    // Cette liste je la fectch (get) depuis "tous les user" de la base et surtout chaque colonne du tableau. Déjà là ?
    return (
      <></>
      
    )
}