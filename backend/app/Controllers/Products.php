<?php
namespace App\Controllers;

use App\Models\ProductModel;

class Products extends BaseController
{
    public function add()
    {
        $model = new ProductModel();

        $image = $this->request->getFile('image');
        $imageName = null;

        if ($image && $image->isValid()) {
            $imageName = $image->getRandomName();
            $image->move(ROOTPATH . 'public/uploads/products', $imageName);
        }

        $data = [
            'name' => $this->request->getPost('name'),
            'price' => $this->request->getPost('price'),
            'description' => $this->request->getPost('description'),
            'active' => $this->request->getPost('active'),
            'image' => $imageName,
        ];

        $model->insert($data);

        return $this->response->setJSON([
            'success' => true,
            'message' => 'Product added successfully'
        ]);
    }

    public function list()
    {
        return $this->response->setJSON(
            (new ProductModel())->findAll()
        );
    }
    public function delete($id)
{
    $model = new \App\Models\ProductModel();

    $product = $model->find($id);
    if (!$product) {
        return $this->response->setStatusCode(404)->setJSON([
            'success' => false,
            'message' => 'Product not found'
        ]);
    }

    // image delete (optional but recommended)
    if (!empty($product['image'])) {
        $path = ROOTPATH . 'public/uploads/products/' . $product['image'];
        if (file_exists($path)) {
            unlink($path);
        }
    }

    $model->delete($id);

    return $this->response->setJSON([
        'success' => true,
        'message' => 'Product deleted'
    ]);
}
public function show($id)
{
    return $this->response->setJSON(
        (new ProductModel())->find($id)
    );
}public function update($id)
{
    $model = new \App\Models\ProductModel();
    $product = $model->find($id);

    if (!$product) {
        return $this->response->setJSON([
            'success' => false,
            'message' => 'Product not found'
        ]);
    }

    $imageName = $product['image'];

    $file = $this->request->getFile('image');

    if ($file && $file->isValid() && !$file->hasMoved()) {

        $imageName = $file->getRandomName();

        // ✅ MOVE TO PUBLIC FOLDER
        $file->move(FCPATH . 'uploads/products', $imageName);

        // ✅ DELETE OLD IMAGE FROM PUBLIC
        if (!empty($product['image'])) {
            $old = FCPATH . 'uploads/products/' . $product['image'];
            if (file_exists($old)) {
                unlink($old);
            }
        }
    }

    $model->update($id, [
        'name'        => $this->request->getPost('name'),
        'price'       => $this->request->getPost('price'),
        'description' => $this->request->getPost('description'),
        'active'      => $this->request->getPost('active'),
        'image'       => $imageName
    ]);

    return $this->response->setJSON([
        'success' => true,
        'message' => 'Product updated successfully'
    ]);
}

public function image($filename)
{
    $path = WRITEPATH . 'uploads/products/' . $filename;

    if (!file_exists($path)) {
        throw \CodeIgniter\Exceptions\PageNotFoundException::forPageNotFound();
    }

    return $this->response
        ->setHeader('Content-Type', mime_content_type($path))
        ->setBody(file_get_contents($path));
}
 public function counts()
    {
        $productModel = new ProductModel();

        return $this->response->setJSON([
            'totalProducts' => $productModel->countAllResults()
        ]);
    }

}
