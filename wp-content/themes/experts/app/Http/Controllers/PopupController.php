<?php

namespace App\Http\Controllers;

use Laminas\Diactoros\Response\JsonResponse;
use Rareloop\Lumberjack\Http\Controller as BaseController;
use Rareloop\Lumberjack\Http\ServerRequest;
use Timber\Timber;

class PopupController extends BaseController
{
  public function get(ServerRequest $request, $slug)
  {
    if ($slug === 'services') {
      return $this->getService($request->query('id'));
    }

    if ($slug === 'agreement') {
      return $this->getAgreement();
    }

    if ($slug === 'privacy') {
      return $this->getPrivacy();
    }

    return new JsonResponse([
      'success' => false,
      'message' => 'Неверный запрос'
    ], 404);
  }

  private function getService($serviceId)
  {
    if (!$serviceId) {
      return new JsonResponse([
        'success' => false,
        'message' => 'ID услуги не передан'
      ], 400);
    }

    // Получаем пост
    $post = get_post($serviceId);

    // Проверяем существование
    if (!$post || $post->post_type !== 'services') {
      return new JsonResponse([
        'success' => false,
        'message' => 'Услуга не найдена'
      ], 404);
    }

    // Подготавливаем данные
    $data = [
      'id' => $post->ID,
      'title' => get_the_title($post),
      'content' => apply_filters('the_content', $post->post_content),
      'excerpt' => get_the_excerpt($post),
      'slug' => $post->post_name,
      'link' => get_permalink($post),
      'thumbnail' => get_the_post_thumbnail_url($post, 'full'),
    ];

    // Получаем контекст Timber
    $context = Timber::get_context();
    $context['service'] = $data;

    // Рендерим HTML в строку
    $html = Timber::compile('includes/service.twig', $context);

    // Возвращаем JSON с HTML
    return new JsonResponse([
      'success' => true,
      'html' => $html,
      'data' => $data // опционально, если нужно
    ]);
  }

  private function getAgreement()
  {
    $page = get_page_by_path('agreement', OBJECT, 'page');

    if (!$page) {
      return new JsonResponse([
        'success' => false,
        'message' => 'Страница соглашения не найдена'
      ], 404);
    }

    $context = Timber::get_context();
    $context['page'] = [
      'title' => $page->post_title,
      'content' => apply_filters('the_content', $page->post_content),
    ];

    $html = Timber::compile('includes/agreement.twig', $context);

    return new JsonResponse([
      'success' => true,
      'html' => $html
    ]);
  }

  private function getPrivacy()
  {
    $page = get_page_by_path('privacy', OBJECT, 'page');

    if (!$page) {
      return new JsonResponse([
        'success' => false,
        'message' => 'Страница политики не найдена'
      ], 404);
    }

    $context = Timber::get_context();
    $context['page'] = [
      'title' => $page->post_title,
      'content' => apply_filters('the_content', $page->post_content),
    ];

    $html = Timber::compile('includes/privacy.twig', $context);

    return new JsonResponse([
      'success' => true,
      'html' => $html
    ]);
  }
}