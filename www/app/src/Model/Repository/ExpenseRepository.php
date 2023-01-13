<?php

namespace App\Model\Repository;

use App\Model\Entity\Expense;

class ExpenseRepository extends Repository
{
    public function getExpenseByUserId($colocId)
    {
        $query = $this->pdo->prepare(
            "SELECT *
            FROM `expense`
            WHERE `coloc_id` = :colocId"
        );
        $query->bindValue(':colocId', $colocId);
        $query->execute();
        $expense = $query->fetchAll(\PDO::FETCH_ASSOC);
        if ($expense) {
            return $expense;
        }
        return null;
    }

    public function insert(Expense $expense)
    {
        $newExpense =
            'INSERT INTO `expense` (`title`, `cost`, `coloc_id`, `user_id`)
            VALUES(:title, :cost, :coloc_id, :user_id)';

        $query = $this->pdo->prepare($newExpense);
        $query->bindValue(':title', $coloc->getTitle());
        $query->bindValue(':cost', $coloc->getCost());
        $query->bindValue(':coloc_id', $coloc->getColocID());
        $query->bindValue(':user_id', $coloc->getUserID());
        $query->execute();
    }

}