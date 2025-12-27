<?php
namespace App\Controllers;

use App\Controllers\BaseController;
use App\Models\SiteSettingModel;

class SiteSettings extends BaseController
{
    // GET color
    public function get()
    {
        $setting = (new SiteSettingModel())->find(1);

        return $this->response->setJSON($setting);
    }

    // UPDATE color
    public function update()
    {
        $data = $this->request->getJSON(true);

        if (!isset($data['bg_color'])) {
            return $this->response->setStatusCode(400)->setJSON([
                'success' => false,
                'message' => 'bg_color missing'
            ]);
        }

        (new SiteSettingModel())->update(1, [
            'bg_color' => $data['bg_color']
        ]);

        return $this->response->setJSON([
            'success' => true,
            'bg_color' => $data['bg_color'],
            'message' => 'Background color updated successfully'
        ]);
    }
}
