<?php

namespace App\Models;

use CodeIgniter\Model;

class HeroImage extends Model
{
    protected $table = 'hero_images';
    protected $primaryKey = 'id';
    protected $allowedFields = ['image', 'slot', 'status'];
}
