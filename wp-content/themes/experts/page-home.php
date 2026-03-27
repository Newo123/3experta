<?php

/*
 * Template Name: Home Template
 */

namespace App;

use Timber\Timber;
use Rareloop\Lumberjack\Http\Responses\TimberResponse;
use App\ViewModels\HeaderViewModel;
use App\Http\Controllers\Controller;

class PageHomeController extends Controller
{

  public function handle()
  {
    $context = Timber::context();

    $context['hero'] = get_field('hero');
    $context['advantages'] = get_field('advantages');
    $context['solutions'] = get_field('solutions');
    $context['services'] = get_field('services');
    $context['services_posts'] = Timber::get_posts([
      'post_type' => 'services'
    ]);
    $context['process'] = get_field('process');
    $context['founder'] = get_field('founder');
    $context['cases'] = get_field('cases');
    $context['cases_posts'] = Timber::get_posts([
      'post_type' => 'cases'
    ]);
    $context['reviews'] = get_field('reviews');
    $context['reviews_posts'] = Timber::get_posts([
      'post_type' => 'reviews'
    ]);
    $context['faq'] = get_field('faq');



    return new TimberResponse('templates/home.twig', $context);
  }
}