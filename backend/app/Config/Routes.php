<?php

use CodeIgniter\Router\RouteCollection;
use App\Controllers\HeroImages;

/**
 * @var RouteCollection $routes
 */
$routes->get('/', 'Home::index');
$routes->post('api/products', 'Products::add');
$routes->get('api/products', 'Products::list');
$routes->delete('api/products/(:num)', 'Products::delete/$1');
$routes->get('api/products/(:num)', 'Products::show/$1');
$routes->post('api/products/(:num)', 'Products::update/$1');
$routes->group('api/admin', function ($routes) {
    $routes->post('login', 'AdminAuth::login');
    $routes->get('logout', 'AdminAuth::logout');
});
$routes->get('uploads/products/(:any)', 'Products::image/$1');
//added routes for orders admin
$routes->post('api/orders', 'Orders::create');
$routes->get('api/orders', 'Orders::list');
//story images route
$routes->group('api/admin', function($routes){
    $routes->get('hero-images', 'HeroImages::index');
    $routes->post('hero-images', 'HeroImages::upload');
    $routes->delete('hero-images/(:num)', 'HeroImages::delete/$1');
});

$routes->get('api/hero-images', 'HeroImages::index'); // frontend slider
$routes->get('api/settings', 'SiteSettings::get');
$routes->post('api/settings', 'SiteSettings::update');
$routes->options('api/(:any)', function () {
    return service('response')
        ->setHeader('Access-Control-Allow-Origin', '*')
        ->setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')
        ->setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        ->setStatusCode(200);
});
//count products
$routes->get('api/dashboard/counts', 'Products::counts');
