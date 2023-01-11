<?php

namespace App\Model\Repository;

use App\Model\Entity\Coloc;

class ColocRepository extends Repository
{
    // public function getAllPost(): array
    // {
    //     $selectArticles = 'SELECT * FROM `posts` AS a ORDER BY `created_at` DESC';
    //     $query = $this->pdo->query($selectArticles);
    //     $articles = [];
    //     while ($result = $query->fetch(\PDO::FETCH_ASSOC)) {
    //         $articles[] = new Post($result);
    //     }
    //     return $articles;
    // }

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

    // public function update(Post $post): bool
    // {
    //     $updateUser =
    //     'UPDATE `users`
    //     SET `coloc_id` = :colocID
    //     WHERE `id` = :user_id'; 
    //     $newquery = $this->pdo->prepare($updateUser);
    //     var_dump($coloc->getId());
    //     var_dump($coloc->getProprioID());

    //     $newquery->bindValue(':colocID', $coloc->getId());
    //     $newquery->bindValue(':user_id', $coloc->getProprioID());
    //     return $newquery->execute();
    // }

    // public function delete($id)
    // {
    //     $deletePost = "DELETE FROM `posts` WHERE `id` = :id";
    //     $query = $this->pdo->prepare($deletePost);
    //     $query->bindValue(':id', $id);

    //     return $query->execute();
    // }
}
