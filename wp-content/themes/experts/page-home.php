<?php 

/*
 * Template Name: Home Template
 */

namespace App;

use Timber\Timber;
use Rareloop\Lumberjack\Http\Responses\TimberResponse;

class PageHomeController
{
    public function handle()
    {
        $context = Timber::context();

        $context['post'] = Timber::get_post();
        $context['title'] = get_the_title();

        return new TimberResponse('templates/home.twig', $context);
    }
}