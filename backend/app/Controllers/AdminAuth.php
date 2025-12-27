<?php

namespace App\Controllers;

use App\Controllers\BaseController;

class AdminAuth extends BaseController
{public function login()
{
    $data = $this->request->getJSON(true);

    if (!$data) {
        return $this->response->setJSON([
            'success' => false,
            'message' => 'No data received'
        ]);
    }

    $adminModel = new \App\Models\AdminModel();
    $admin = $adminModel->where('email', $data['email'])->first();

    if (!$admin) {
        return $this->response->setJSON([
            'success' => false,
            'message' => 'Admin not found'
        ]);
    }

    // plain password (as you wanted)
    if ($data['password'] !== $admin['password']) {
        return $this->response->setJSON([
            'success' => false,
            'message' => 'Invalid password'
        ]);
    }

    session()->set('admin', [
        'id' => $admin['id'],
        'email' => $admin['email']
    ]);

    return $this->response->setJSON([
        'success' => true,
        'message' => 'Login successful'
    ]);
}

}
