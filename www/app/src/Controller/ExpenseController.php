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
    public function AllExpense($error = [])
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

        $userColocId = $user->getColocId();

        $expenseRepository = new ExpenseRepository(new PDOFactory());
        $expenses = $expenseRepository->getExpenseByUserId($userColocId);

        $this->renderJSON([
            "expense" => $expenses
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
        $coloc = $userRepository->getColoc();
        
        $args = [...$_POST, 'proprioID' => $userId];
        $colocRepository = new ExpenseRepository(new PDOFactory());
        $expense = new Expense($args);
        $expenses = $colocRepository->insert($expense);

        $getColocID = $colocRepository->getColocByUserId($userId);
        $argsUser = ['id' => $userId,'coloc_id' => $getColocID->getID()];
        $userbis = new User($argsUser);
        $changeUserStatus = $userRepository->updateStatus($userbis);
        $this->renderJSON([
            "expense" => $expenses
        ]);
        http_response_code(200);
        die;
    }


    #[Route('/coloc', 'colocById', ['POST'])]
    public function colocById()
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
        $userId = $user->getToken();
        $userColoc = $user->getColocId();

        $args = [$userColoc];
        $colocRepository = new ColocRepository(new PDOFactory());
        $coloc = new Coloc($args);
        $coloc = $colocRepository->insert($coloc);
    

        $this->renderJSON([
            "coloc" => $coloc
        ]);
        http_response_code(200);
        die;
    }


}

