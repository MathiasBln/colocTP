<?php

namespace App\Controller;
use App\Model\Factory\PDOFactory;
use App\Model\Repository\ColocRepository;
use App\Model\Repository\UserRepository;
use App\Model\Repository\ExpenseRepository;
use App\Route\Route;
use App\Model\Entity\Coloc;
use App\Model\Entity\User;
use App\Model\Entity\Expense;
use App\Services\JWTHelper;

class ExpenseController extends Controller
{
    #[Route('/allExpense', 'ExpenseId', ['POST'])]
    public function AllExpense()
    {
        $cred = str_replace("Bearer ", "", getallheaders()['authorization']);
        $token = JWTHelper::decodeJWT($cred);
        if (!$token) {
            $this->renderJSON([
                "message" => "invalid cred"
            ]);
            die;
        }
        $userRepository = new UserRepository(new PDOFactory());
        $user = $userRepository->getUserByToken($cred);
        $userColocId = $user->getColocId();

        $expenseRepository = new ExpenseRepository(new PDOFactory());
        $expenses = $expenseRepository->getExpenseByUserId($userColocId);

        $this->renderJSON([
            "expenses" => $expenses
        ]);
        http_response_code(200);
        die;
    }

    #[Route('/newExpense', 'newExpense', ['POST'])]
    public function newExpense()
    {
        $cred = str_replace("Bearer ", "", getallheaders()['authorization']);
        $token = JWTHelper::decodeJWT($cred);
        if (!$token) {
            $this->renderJSON([
                "message" => "invalid cred"
            ]);
            die;
        }
        $userRepository = new UserRepository(new PDOFactory());
        $user = $userRepository->getUserByToken($cred);
        $userId = $user->getId();
        $colocId = $user->getColocId();
        $args = [...$_POST, 'user_id' => $userId, 'coloc_id' => $colocId];
        $expenseRepository = new ExpenseRepository(new PDOFactory());
        $expense = new Expense($args);
        $expense = $expenseRepository->insert($expense);

        $this->renderJSON([
            "expense" => $expense
        ]);
        http_response_code(200);
        die;
    }

    #[Route('/getexpenses', 'getexpenses', ['POST', 'GET'])]
    public function getExpenses()
    {
        $userRepository = new UserRepository(new PDOFactory());
        $expenseRepository = new ExpenseRepository(new PDOFactory());
        $costs = $expenseRepository->getAllExpenses();
        $users = $userRepository->getAllUsers();
        
        $this->renderJSON([
            "costs" => $costs,
            "users" => $users
        ]);
        http_response_code(200);
        exit();
    }
}

