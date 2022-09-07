<?php

use App\Controller\Controller;

require __DIR__ . '/../vendor/autoload.php';

$router = new \Bramus\Router\Router();

$router->post('/save', function () {
    $_POST = json_decode(file_get_contents("php://input"), true);
    $controller = new Controller();
    $controller->save($_POST);
    return res($controller->getResponse());
});

$router->run();
