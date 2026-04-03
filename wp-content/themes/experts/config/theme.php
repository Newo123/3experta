<?php

return [
  'styles' => [
    [
      'name' => '',
      'url' => 'https://cdn.jsdelivr.net/npm/notyf@3/notyf.min.css'
    ],
    [
      'name' => 'swiper',
      'url' => 'https://cdn.jsdelivr.net/npm/swiper@12/swiper-bundle.min.css',

    ],
    [
      'name' => 'app',
      'url' => get_template_directory_uri() . '/assets/css/style.min.css',
    ],

  ],
  'scripts' => [
    [
      'name' => '',
      'url' => 'https://cdn.jsdelivr.net/npm/notyf@3/notyf.min.js'
    ],
    [
      'name' => 'swiper',
      'url' => 'https://cdn.jsdelivr.net/npm/swiper@12/swiper-bundle.min.js'
    ],
    [
      'name' => 'particles',
      'url' => get_template_directory_uri() . '/assets/js/particles.js'
    ],
    [
      'name' => 'app',
      'url' => get_template_directory_uri() . '/assets/js/app.js'
    ],

  ]
];