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
    
    #[Route('/home', 'homePage', ['POST', 'GET'])]
    public function home($error = [])
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
        $userColoc = $user->getColocID();
        if ($userColoc){
            return redirect('/coloc');
        }

        $this->renderJSON([
            "message" => "No Post"
        ]);
        die;
    }

    #[Route('/createcoloc', 'newColocCreated', ['POST'])]
    public function newColocCreated()
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
        $coloc = new Coloc($args);
        $coloc = $colocRepository->insert($coloc);

        $getColocID = $colocRepository->getColocByUserId($userId);
        $argsUser = ['id' => $userId,'coloc_id' => $getColocID->getID()];
        $userbis = new User($argsUser);
        $changeUserStatus = $userRepository->updateStatus($userbis);
        $this->renderJSON([
            "coloc" => $coloc
        ]);
        http_response_code(200);
        die;
    }

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

    #[Route('/addrenter', 'addrenter', ['POST', 'GET'])]
    public function addRenter()
    {
        
        $userRepository = new UserRepository(new PDOFactory());
        $argsUser = [...$_POST];
        $userbis = new User($argsUser);
        $renter = $userRepository->updateStatus($userbis);
        $this->renderJSON([
            "renter" => $renter
        ]);
        http_response_code(200);
        die;
    }

    #[Route('/excluderenter', 'excluderenter', ['POST', 'GET'])]
    public function excludeRenter()
    {
        $userRepository = new UserRepository(new PDOFactory());
        $argsUser = [...$_POST];
        $userInfo = new User($argsUser);
        $renter = $userRepository->deleteUser($userInfo);
        $this->renderJSON([
            "renter" => $renter
        ]);
        http_response_code(200);
        die;
    }
}
