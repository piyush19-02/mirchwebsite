<?php

namespace App\Models;
use CodeIgniter\Model;

class StoryModel extends Model
{
    protected $table = 'team_members';
    protected $primaryKey = 'id';

    protected $allowedFields = [
        'name',
        'role',
        'image',
        'status'
    ];
}
