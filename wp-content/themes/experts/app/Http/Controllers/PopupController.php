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


    if ($slug === 'news') {
      return $this->getNew($request->query('id'));
    }

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

  private function getNew($newId)
  {

    if (!$newId) {
      return new JsonResponse([
        'success' => false,
        'message' => 'ID новости не передан'
      ], 400);
    }
    $post = get_post($newId);

    if (!$post || $post->post_type !== 'news') {
      return new JsonResponse([
        'success' => false,
        'message' => 'Новость не найдена'
      ], 404);
    }

    $data = [
      'id' => $post->ID,
      'title' => get_the_title($post),
      'content' => apply_filters('the_content', $post->post_content),
      'excerpt' => get_the_excerpt($post),
      'slug' => $post->post_name,
      'link' => get_permalink($post),
      'thumbnail' => get_the_post_thumbnail_url($post, 'full'),
    ];

    $context = Timber::get_context();
    $context['new'] = $data;

    $html = Timber::compile('includes/new.twig', $context);

    return new JsonResponse([
      'success' => true,
      'html' => $html,
      'data' => $data
    ]);
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

    $agreement = get_field('site_agreement', 'options');

    if (!$agreement) {
      return new JsonResponse([
        'success' => false,
        'message' => 'Страница соглашения не найдена'
      ], 404);
    }

    $context = Timber::get_context();
    $context['agreement'] = [
      'content' => $agreement,
    ];

    $html = Timber::compile('includes/agreement.twig', $context);

    return new JsonResponse([
      'success' => true,
      'html' => $html
    ]);
  }

  private function getPrivacy()
  {
    $privacy = get_field('site_privacy', 'options');

    if (!$privacy) {
      return new JsonResponse([
        'success' => false,
        'message' => 'Страница соглашения не найдена'
      ], 404);
    }

    $context = Timber::get_context();
    $context['privacy'] = [
      'content' => $privacy,
    ];

    $html = Timber::compile('includes/privacy.twig', $context);

    return new JsonResponse([
      'success' => true,
      'html' => $html
    ]);
  }
}