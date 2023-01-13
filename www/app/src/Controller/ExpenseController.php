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
        $colocId = $userRepository->getColocId();
        
        $args = [...$_POST, 'coloc_id' => $colocId, 'user_id' => $userId];
        $expenseRepository = new ExpenseRepository(new PDOFactory());
        $expense = new Expense($args);
        $expense = $expenseRepository->insert($expense);

        $argsExpense = ['id' => $userId,'coloc_id' => $colocId];
        $expensebis = new Expense($argsExpense);
        $changeExpenseStatus = $ExpenseRepository->updateStatus($expense);
        $this->renderJSON([
            "expense" => $expense
        ]);
        http_response_code(200);
        die;
    }

}

