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

    #[Route('/post', 'newPost', ['POST'])]
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


}
