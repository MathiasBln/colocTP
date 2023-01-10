<?php

namespace App\Model\Entity;

use App\Model\Entity\BaseEntity;

class Expense extends BaseEntity
{
    private ?string $title = null;
    private ?int $cost = null;

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
        return $this->content;
    }

    public function setCost($cost)
    {
        $this->cost = $cost;
        return $this;
    }
}
