<?php
namespace App\Controllers;

use App\Models\OrderModel;

class Orders extends BaseController
{
    public function create()
    {
        $data = $this->request->getJSON(true);

        (new OrderModel())->insert([
            'product_id'    => $data['product_id'],
            'product_name'  => $data['product_name'],
            'qty'           => $data['qty'],
            'customer_name' => $data['customer_name'],
            'mobile'        => $data['mobile'],
            'location'      => $data['location'],
        ]);

        return $this->response->setJSON(['success' => true]);
    }

    public function list()
    {
        return $this->response->setJSON(
            (new OrderModel())->orderBy('id', 'DESC')->findAll()
        );
    }
}
