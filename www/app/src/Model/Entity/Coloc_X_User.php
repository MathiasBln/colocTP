<?php

namespace App\Model\Entity;

use App\Model\Entity\BaseEntity;

class Coloc_X_User extends BaseEntity
{
    private ?int $coloc_id = null;
    private ?int $user_id = null;
    private ?boolean $isProprio = null;

    public function getColocId()
    {
        return $this->coloc_id;
    }

    public function setColocId($coloc_id)
    {
        $this->coloc_id = $coloc_id;
        return $this;
    }

    public function getUserId()
    {
        return $this->user_id;
    }

    public function setContent($user_id)
    {
        $this->user_id = $user_id;
        return $this;
    }

    public function getIsProprio()
    {
        return $this->isProprio;
    }

    public function setIsProprio($isProprio)
    {
        $this->isProprio = $isProprio;
        return $this;
    }
}
