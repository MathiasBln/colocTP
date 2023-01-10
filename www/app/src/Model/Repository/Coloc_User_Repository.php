<?php

namespace App\Model\Repository;

use App\Model\Entity\Coloc_X_User;

class Coloc_User_Repository extends Repository
{
    public function insert(Coloc_X_User $moreColoc)
    {
        $newColoc =
            'INSERT INTO `coloc_user_junction` (`coloc_id`, `user_id`, `isProprio`)
            VALUES(:coloc_id, :user_id, :isProprio)';

        $query = $this->pdo->prepare($newColoc);
        $query->bindValue(':coloc_id', $moreColoc->getTitle());
        $query->bindValue(':user_id', $moreColoc->getContent());
        $query->bindValue(':isProprio', $moreColoc->getIsProprio());
        return $query->execute();
    }

}
