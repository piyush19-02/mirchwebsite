<?php

namespace App\Controllers;
use App\Models\HeroImage;

class HeroImages extends BaseController
{
    // Get all images
 public function index()
{
    return $this->response->setJSON(
        (new HeroImage())
            ->where('status', 1)
            ->orderBy('slot', 'ASC')
            ->findAll()
    );
}


    // Upload image
  public function upload()
{
    $file = $this->request->getFile('image');
    $slot = $this->request->getPost('slot');

    if (!$file || !$file->isValid()) {
        return $this->response->setJSON(['error' => 'Invalid file'], 400);
    }

    $path = FCPATH . 'uploads/hero';
    if (!is_dir($path)) mkdir($path, 0777, true);

    $name = $file->getRandomName();
    $file->move($path, $name);

    $model = new \App\Models\HeroImage();

    // 🔥 same slot ka old image replace karo
    $old = $model->where('slot', $slot)->first();
    if ($old && file_exists(FCPATH . $old['image'])) {
        unlink(FCPATH . $old['image']);
        $model->delete($old['id']);
    }

    $model->insert([
        'image' => 'uploads/hero/' . $name,
        'slot'  => $slot,
        'status'=> 1
    ]);

    return $this->response->setJSON(['success' => true]);
}


    // Delete image
    public function delete($id)
    {
        $model = new HeroImage();
        $image = $model->find($id);

        if ($image) {
            if (file_exists($image['image'])) {
                unlink($image['image']);
            }
            $model->delete($id);
        }

        return $this->response->setJSON(['success' => true]);
    }
}
