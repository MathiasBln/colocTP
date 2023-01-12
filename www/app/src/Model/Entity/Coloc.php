<?php

namespace App\Model\Entity;

use App\Model\Entity\BaseEntity;

class Coloc extends BaseEntity
{
    private ?string $title = null;
    private ?string $content = null;
    private ?int $proprioID = null;

    public function getTitle()
    {
        return $this->title;
    }

    public function setTitle($title)
    {
        $this->title = $title;
        return $this;
    }

    public function getContent()
    {
        return $this->content;
    }

    public function setContent($content)
    {
        $this->content = $content;
        return $this;
    }

    public function getProprioID()
    {
        return $this->proprioID;
    }

    public function setProprioID($proprioID)
    {
        $this->proprioID = $proprioID;
        return $this;
    }
}
