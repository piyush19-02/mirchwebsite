<?php

namespace App\Controllers;

use App\Controllers\BaseController;
use App\Models\StoryModel;

class StoryController extends BaseController
{
    public function index()
    {
        $model = new StoryModel();
        $data = $model
            ->where('status', 1)
            ->orderBy('id', 'ASC')
            ->findAll();

        return $this->response->setJSON($data);
    }

     public function store()
    {
        $image = $this->request->getFile('image');

        if (!$image->isValid()) {
            return redirect()->back()->with('error', 'Image required');
        }

        $newName = $image->getRandomName();
        $image->move('uploads/team', $newName);

        $model = new StoryModel();

        $model->insert([
    'name'   => $this->request->getPost('name'),
    'role'   => $this->request->getPost('role'),
    'image'  => '/uploads/team/' . $newName,
    'status' => 1, // 🔥 VERY IMPORTANT
]);


        return redirect()->back()->with('success', 'Team member added');
    }
    public function update($id)
{
    $model = new \App\Models\StoryModel();

    $data = [
        'name' => $this->request->getPost('name'),
        'role' => $this->request->getPost('role'),
    ];

    $image = $this->request->getFile('image');

    if ($image && $image->isValid()) {
        $newName = $image->getRandomName();
        $image->move('uploads/team', $newName);
        $data['image'] = '/uploads/team/' . $newName;
    }

    $model->update($id, $data);

    return $this->response->setJSON([
        'status' => 'success'
    ]);
}

public function delete($id)
{
    $model = new \App\Models\StoryModel();
    $model->delete($id);

    return $this->response->setJSON([
        'status' => 'deleted'
    ]);
}

}
