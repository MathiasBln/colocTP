<?php

namespace App\Model\Entity;

use App\Model\Entity\BaseEntity;

class Expense extends BaseEntity
{
    private ?string $title = null;
    private ?int $cost = null;
    private ?int $user_id  = null;
    private ?int $coloc_id = null;
    
    public function getTitle()
    {
        return $this->title;
    }

    public function setTitle($title)
    {
        $this->title = $title;
        return $this;
    }

    public function getCost()
    {
        return $this->cost;
    }

    public function setCost($cost)
    {
        $this->cost = $cost;
        return $this;
    }

    public function getUserId()
    {
        return $this->user_id;
    }

    public function setUserId($user_id)
    {
        $this->user_id = $user_id;
        return $this;
    }

    public function getColocId()
    {
        return $this->coloc_id;
    }

    public function setColocId($coloc_id)
    {
        $this->coloc_id = $coloc_id;
        return $this;
    }

}