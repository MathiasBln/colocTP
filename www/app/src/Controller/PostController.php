<?php
namespace App\Controller;
use App\Model\Factory\PDOFactory;
use App\Model\Repository\ColocRepository;
use App\Model\Repository\UserRepository;
use App\Route\Route;
use App\Model\Entity\Coloc;
use App\Model\Entity\User;
use App\Services\JWTHelper;

class PostController extends Controller
{
    // #[Route('/', 'homePage', ['GET'])]
    // public function home($error = [])
    // {
    //     $cred = str_replace("Bearer ", "", getallheaders()['authorization']);
    //     $token = JWTHelper::decodeJWT($cred);
    //     if (!$token) {
    //         $this->renderJSON([
    //             "message" => "invalid cred"
    //         ]);
    //         die;
    //     }
    // }

    #[Route('/newcoloc', 'newColoc', ['POST'])]
    public function newPost()
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
        $userId = $user->getId();
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
