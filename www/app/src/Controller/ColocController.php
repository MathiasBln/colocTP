<?php

namespace App\Controller;


use App\Model\Factory\PDOFactory;
use App\Model\Repository\ColocRepository;
use App\Model\Repository\UserRepository;
use App\Route\Route;
use App\Model\Entity\Coloc;
use App\Model\Entity\User;
use App\Services\JWTHelper;

class ColocController extends Controller
{    

    #[Route('/userslist', 'userslist', ['POST'])]
    public function listUsers() {
        $userRepository = new UserRepository(new PDOFactory());
        $users = $userRepository->getAllUsers();
        
        $this->renderJson(["users" => $users]);
        http_response_code(200);
        exit();
      
    }

    #[Route('/coloclist', 'coloclist', ['POST'])]
    public function colocList() {
        $colocRepository = new ColocRepository(new PDOFactory());
        $allColocs = $colocRepository->getAllColocs();

        $this->renderJson(["allColocs" => $allColocs]);
        http_response_code(200);
        exit();

    }

    #[Route('/coloc', 'colocInformation', ['POST','GET'])]
    public function allInformationFromColoc()
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

        $args = ['id' => $userColocId];
        $colocRepository = new ColocRepository(new PDOFactory());
        $colocID = new Coloc($args);
        $coloc = $colocRepository->getColocByID($colocID->getId());
        $this->renderJSON([
            "coloc" => $coloc
        ]);
        http_response_code(200);
        die;
    }

    #[Route('/invitation', 'invitation', ['POST', 'GET'])]
    public function invitation()
    {
        var_dump($_POST);
        $userRepository = new UserRepository(new PDOFactory());
        $argsUser = [$_POST];
        $userbis = new User($argsUser);
        $changeUserStatus = $userRepository->updateStatus($userbis);
        $this->renderJSON([
            "userStatus" => $changeUserStatus
        ]);
        http_response_code(200);
        die;
    }
}
