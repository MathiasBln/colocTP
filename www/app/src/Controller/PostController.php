<?php

namespace App\Controller;

use App\Model\Factory\PDOFactory;
use App\Model\Repository\ColocRepository;
use App\Model\Repository\Coloc_User_Repository;
use App\Model\Repository\UserRepository;
use App\Route\Route;
use App\Model\Entity\Coloc;
use App\Services\JWTHelper;

class PostController extends Controller
{
    #[Route('/', 'homePage', ['GET'])]
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
        $postRepository = new PostRepository(new PDOFactory());
        $posts = $postRepository->getAllPost();
        if($posts) {
            $this->renderJSON([
                "posts" => $posts
            ]);
            http_response_code(200);
            die;
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
        // $userRepository = new UserRepository(new PDOFactory());
        // $user = $userRepository->getUserByToken($cred);
        // $author = $user->getUsername();
        // $userId = $user->getId();

        $args = [...$_POST];
        $colocRepository = new ColocRepository(new PDOFactory());
        $coloc_user = new Coloc_User_Repository(new PDOFactory());
        $coloc = new Coloc($args);
        //Mettre l'id 
        $colocUser = new Coloc_X_User()
        $coloc = $colocRepository->insert($coloc);
        $this->renderJSON([
            "coloc" => $coloc
        ]);
        http_response_code(200);
        die;
    }

}
