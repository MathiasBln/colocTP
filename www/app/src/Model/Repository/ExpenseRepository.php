<?php

namespace App\Model\Repository;

use App\Model\Entity\Expense;

class ExpenseRepository extends Repository
{
    public function getAllExpenses(): array
    {
        $query = $this->pdo->query("SELECT * FROM expense");
        $expenses = [];
        while ($data = $query->fetch(\PDO::FETCH_ASSOC)) {
            $expenses[] = new Expense($data);
        }
        return $expenses;
    }

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
            'INSERT INTO `expense` (`title`, `cost`, `user_id`,  `coloc_id`)
            VALUES(:title, :cost, :user_id, :coloc_id)';

        $query = $this->pdo->prepare($newExpense);
        $query->bindValue(':title', $expense->getTitle());
        $query->bindValue(':cost', $expense->getCost());
        $query->bindValue(':user_id', $expense->getUserID());
        $query->bindValue(':coloc_id', $expense->getColocID());
        $query->execute();
    }

}