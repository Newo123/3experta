<?php

use Rareloop\Lumberjack\Facades\Router;
use Laminas\Diactoros\Response\JsonResponse;

// Router::get('hello-world', function () {
//     return new HtmlResponse('<h1>Hello World!</h1>');
// });

Router::post('/mail/send', 'MailController@send');
Router::get('/popup/{slug}', 'PopupController@get');
