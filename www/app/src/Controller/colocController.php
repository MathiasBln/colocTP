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

    #[Route('/addrenter', 'addrenter', ['POST'])]
    public function addrenter()
    {
        $args = [...$_POST];
        var_dump($args);
    }

} 