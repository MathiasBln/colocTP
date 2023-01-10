<?php

namespace App\Model\Entity;

use App\Model\Entity\BaseEntity;

class Coloc extends BaseEntity
{
    private ?string $title = null;
    private ?string $content = null;

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
}
