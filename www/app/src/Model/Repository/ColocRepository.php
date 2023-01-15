<?php

namespace App\Model\Repository;

use App\Model\Entity\Coloc;

class ColocRepository extends Repository
{
    public function getAllColocs(): array
    {
        $colocs = 'SELECT * FROM colocGroup';
        $query = $this->pdo->query($colocs);
        $allColocs = [];
        while ($result = $query->fetch(\PDO::FETCH_ASSOC)) {
            $allColocs[] = new Coloc($result);
        }
        return $allColocs;
    }

    
    
    public function getColocByID($id): ?Coloc
    {
        $query = $this->pdo->prepare(
            "SELECT *
            FROM `colocGroup`
            WHERE `id` = :id"
        );
        $query->bindValue(':id', $id);
        $query->execute();
        $coloc = $query->fetch(\PDO::FETCH_ASSOC);
        if ($coloc) {
            return new Coloc($coloc);
        }
        return null;
    }

    public function getColocByUserId($id): ?Coloc
    {
        $query = $this->pdo->prepare(
            "SELECT *
            FROM `colocGroup`
            WHERE `proprioID` = :id"
        );
        $query->bindValue(':id', $id);
        $query->execute();
        $coloc = $query->fetch(\PDO::FETCH_ASSOC);
        if ($coloc) {
            return new Coloc($coloc);
        }
        return null;
    }

    public function insert(Coloc $coloc)
    {
        $newColoc =
            'INSERT INTO `colocGroup` (`title`, `content`, `proprioID`)
            VALUES(:title, :content, :proprioID)';

        $query = $this->pdo->prepare($newColoc);
        $query->bindValue(':title', $coloc->getTitle());
        $query->bindValue(':content', $coloc->getContent());
        $query->bindValue(':proprioID', $coloc->getProprioID());
        $query->execute();
    }


}
