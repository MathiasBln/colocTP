<?php

namespace App\Model\Repository;

use App\Model\Entity\Expense;

class ExpenseRepository extends Repository
{
    public function getExpenseByUserId($id): ?Coloc
    {
        $query = $this->pdo->prepare(
            "SELECT *
            FROM `expense`
            WHERE `coloc_id` = :id"
        );
        $query->bindValue(':id', $id);
        $query->execute();
        $expense = $query->fetch(\PDO::FETCH_ASSOC);
        if ($expense) {
            return new Expense($expense);
        }
        return null;
    }

    public function insert(Expense $expense)
    {
        $newExpense =
            'INSERT INTO `expense` (`title`, `cost`, `coloc_id`)
            VALUES(:title, :cost, :coloc_id)';

        $query = $this->pdo->prepare($newExpense);
        $query->bindValue(':title', $coloc->getTitle());
        $query->bindValue(':cost', $coloc->getCost());
        $query->bindValue(':coloc_id', $coloc->getColocID());
        $query->execute();
    }

}