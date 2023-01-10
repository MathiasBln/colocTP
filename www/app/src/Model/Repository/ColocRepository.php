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

    // public function getPostById($id): ?Post
    // {
    //     $query = $this->pdo->prepare(
    //         "SELECT *
    //         FROM `posts`
    //         WHERE `id` = :id"
    //     );
    //     $query->bindValue(':id', $id);
    //     $query->execute();
    //     $post = $query->fetch(\PDO::FETCH_ASSOC);
    //     if ($post) {
    //         return new Post($post);
    //     }
    //     return null;
    // }

    public function insert(Coloc $coloc)
    {
        $newColoc =
            'INSERT INTO `colocGroup` (`title`, `content`)
            VALUES(:title, :content)';

        $query = $this->pdo->prepare($newColoc);
        $query->bindValue(':title', $coloc->getTitle());
        $query->bindValue(':content', $coloc->getContent());
        return $query->execute();
    }

    public function update(Post $post): bool
    {
        $updatePost =
            'UPDATE `posts`
            SET `title` = :title, `content`= :content
            WHERE `id` = :post_id';

        $query = $this->pdo->prepare($updatePost);
        $query->bindValue(':title', $post->getTitle());
        $query->bindValue(':content', $post->getContent());
        $query->bindValue(':post_id', $post->getId());

        return $query->execute();
    }

    // public function delete($id)
    // {
    //     $deletePost = "DELETE FROM `posts` WHERE `id` = :id";
    //     $query = $this->pdo->prepare($deletePost);
    //     $query->bindValue(':id', $id);

    //     return $query->execute();
    // }
}
