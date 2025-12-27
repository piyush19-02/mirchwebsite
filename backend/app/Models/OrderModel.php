<?php
namespace App\Models;

use CodeIgniter\Model;

class OrderModel extends Model
{
    protected $table = 'orders';

    protected $allowedFields = [
        'product_id',
        'product_name',
        'qty',
        'customer_name',
        'mobile',
        'location'
    ];
}
