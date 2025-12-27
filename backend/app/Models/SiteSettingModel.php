<?php
namespace App\Models;

use CodeIgniter\Model;

class SiteSettingModel extends Model
{
    protected $table = 'background';
    protected $primaryKey = 'id';
    protected $allowedFields = [ 'bg_color'];
}
