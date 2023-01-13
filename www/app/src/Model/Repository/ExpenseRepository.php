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

    public function getTotal($id): ?Expense
    {
        $query = $this->pdo->query("SELECT user_id, SUM(cost) FROM expense WHERE user_id = :id GROUP BY user_id");

        $query->bindValue(':id', $id);
        $query->execute();
        $total = $query->fetch(\PDO::FETCH_ASSOC);
        if ($total) {
            return new Expense($total);
        }
        return null;
    }
    
    public function getExpenseByUserId($colocId): ?Expense
    {
        $query = $this->pdo->prepare(
            "SELECT *
            FROM `expense`
            WHERE `coloc_id` = :colocId"
        );
        $query->bindValue(':colocId', $colocId);
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
            'INSERT INTO `expense` (`title`, `cost`, `coloc_id`, `user_id`)
            VALUES(:title, :cost, :coloc_id, :user_id)';

        $query = $this->pdo->prepare($newExpense);
        $query->bindValue(':title', $expense->getTitle());
        $query->bindValue(':cost', $expense->getCost());
        $query->bindValue(':coloc_id', $expense->getColocID());
        $query->bindValue(':user_id', $expense->getUserID());
        $query->execute();
    }

}