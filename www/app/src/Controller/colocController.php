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

    #[Route('/addrenter', 'addrenter', ['POST', 'GET'])]
    public function addrenter()
    {

        $userRepo = new UserRepository(new PDOFactory());
        $argsRenter =  [...$_POST];
        $renterUpdate = $userRepo->updateStatus($argsRenter);
        $this->renderJSON([
            "renterUpdate" => $renterUpdate
        ]);
        http_response_code(200);
        die;

    }

} 