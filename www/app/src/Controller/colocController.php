<?php
namespace App\Controller;
use App\Model\Factory\PDOFactory;
use App\Model\Repository\ColocRepository;
use App\Model\Repository\UserRepository;
use App\Route\Route;
use App\Model\Entity\Coloc;
use App\Model\Entity\User;
use App\Services\JWTHelper;

class colocController extends Controller
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

    #[Route('/addrenter', 'addrenter', ['GET'])]
    public function addrenter()
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

        $args = [...$_POST, 'proprioID' => $userId];
        $colocRepository = new ColocRepository(new PDOFactory());
        $renter = new Coloc($args);
        $renter = $colocRepository->insert($coloc);

        $getColocID = $colocRepository->getColocByUserId($userId);
        $argsUser = ['id' => $userId,'coloc_id' => $getColocID->getID()];
        $userbis = new User($argsUser);
        $changeUserStatus = $userRepository->updateStatus($userbis);
        
        $this->renderJSON([
            "renter" => $renter
        ]);
        http_response_code(200);
        die;
    }
} 