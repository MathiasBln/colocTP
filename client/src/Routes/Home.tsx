import {IShowProps} from "../types/Post";
import { useNavigate, NavLink } from "react-router-dom";
import React, {useEffect, useState} from "react";

export default function Home({setColoc, coloc}: IShowProps) {

    const navigate = useNavigate()

    const deco = () => {
        sessionStorage.removeItem('token');
        navigate("/login");
    }

    return(
        <>
            <div className="container d-flex flex-column align-content-center justify-content-cente py-2 w-75">
              <h2 className="text-center">Bienvenue dans l'espace de colocation des Avatars</h2>
                <h3>Message à l'attention des nouveaux arrivants: </h3>
                <p className="mt-3">
                    Si vous êtes ici sans parrain, nous vous invitons à en trouver un lors de nos soirées de parrainage au Birdies tous les troisième vendredi du mois.
                    En effet, ce site est un simple relai pour consulter des données liées à la colocation et valider le parrainage via création d'un compte.
                    Néanmoins s'inscrire dés maintenant montre votre motivation et vous serez privilégié lors de la soirée de la prochaine soirée de parrainage.
                    Vous n'êtes cependant officiellement colocataire que lors de l'entretien lors de la soirée et aprés la signature des documents le lendemain.
                    A ce moment votre statut d'utilisateur change est vous êtes officiellement invité par le propriétaire dans la coloc.
                    C'est la raison pour laquelle l'inscription vaut en même temps connexion afin de minimiser au maximum les démarches.
                    Tous les autres échanges, notamment lié à l'invitation potentielle passe par les soirée de parrainage.
                    Le lieu est tenu secret mais il est officiellement inscris en base de donnée.</p>
                    <p className="mt-2">
                    Nous sommes disponible pour vous renseigner plus sur notre colocation lors de nos soirée de parrainage.
                    Le lieu n'est communiqué que par votre parrain. C'est l'occasion de devenir parrain et amener vos amis pouvant être parrainés.
                    Nous sommes une joyeuses bande d'amis qui avons décidé d'investir dans cette immense maison afin d'inviter des colocataires.
                    Si vous n'êtes pas encore un colocataire, vous pouvez nous contacter via l'email que vous avez reçu lors du parrainage.
                    Aucune demande de colocation</p>
                <h3> Message à l'attention des colocataires: </h3>
                <p className="mt-3">Si vous avez été parrainé et que vous avez entré le pseudo que l'on vous a donné avec un mot de passe de votre choix: vous êtes officiellement colocataire !
                    Vous pouvez alors consulter votre tableau de bord pour y découvrir les dépenses de la colocation et votre balance (dettes/créances) ou autres échanges.
                    Pour toute autre demande, notre politique favorise l'échange par email ou oral avec votre colocataire parrain ou le propriétaire.</p>

            </div>
            <div className="container mt-2 rounded-2 d-flex align-content-center justify-content-center gap-2 py-2 w-75">
                <NavLink className="btn btn-success btn-sm" to="dashboard">Voir mon tableau de bord</NavLink>
                <button className="btn btn-secondary btn-sm" onClick={deco}>Me déconnecter de l'espace</button>
            </div>
            {/* <ShowPost setPosts={setPosts} posts={posts}/> */}
        </>
    )
}