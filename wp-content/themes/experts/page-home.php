<?php

/*
 * Template Name: Home Template
 */

namespace App;

use Timber\Timber;
use Rareloop\Lumberjack\Http\Responses\TimberResponse;
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

    $context['process'] = get_field('process');
    $context['founder'] = get_field('founder');
    $context['cases'] = get_field('cases');
    $context['cases_posts'] = Timber::get_posts([
      'post_type' => 'cases',
      'posts_per_page' => -1
    ]);
    $context['reviews'] = get_field('reviews');
    $context['reviews_posts'] = Timber::get_posts([
      'post_type' => 'reviews',
      'posts_per_page' => -1
    ]);
    $context['faq'] = get_field('faq');

    // ========== НОВОСТИ С ГРУППИРОВКОЙ ПО КАТЕГОРИЯМ ==========

    // Получаем все новости
    $all_news = Timber::get_posts([
      'post_type' => 'news',
      'posts_per_page' => -1
    ]);

    // Инициализируем массив для сгруппированных новостей
    $grouped_news = [];

    // Проверяем, существует ли таксономия 'categories'
    if (taxonomy_exists('categories')) {

      // Получаем все категории
      $categories = get_terms([
        'taxonomy' => 'categories',
        'hide_empty' => false,
      ]);

      // Проверяем, что категории получены без ошибок
      if (!empty($categories) && !is_wp_error($categories)) {

        // Проходим по каждой категории
        foreach ($categories as $category) {

          // Собираем посты для текущей категории
          $category_posts = [];

          foreach ($all_news as $post) {
            if (has_term($category->term_id, 'categories', $post->ID)) {
              $category_posts[] = $post;
            }
          }

          // Добавляем категорию только если в ней есть посты
          if (!empty($category_posts)) {
            $grouped_news[$category->slug] = [
              'term' => $category,
              'posts' => $category_posts
            ];
          }
        }
      }
    }

    // Передаем сгруппированные новости в контекст
    $context['news'] = $grouped_news;

    return new TimberResponse('templates/home.twig', $context);
  }
}