<?php

namespace App\Providers;

use Illuminate\Support\Arr;
use Rareloop\Lumberjack\Page;
use Rareloop\Lumberjack\Post;
use Rareloop\Lumberjack\Providers\ServiceProvider;
use Timber\Timber;

class AppServiceProvider extends ServiceProvider
{
  public function register()
  {
  }
  public function boot()
  {
    add_filter('timber/post/classmap', fn($classmap) => [
      ...Arr::wrap($classmap),
      Post::getPostType() => Post::class,
      Page::getPostType() => Page::class,
    ]);
    add_filter('timber_context', [$this, 'registerContext']);
    add_filter('upload_mimes', [$this, 'uploadMimes']);

  }

  public function registerContext($context)
  {
    // Навигация
    $context['header_menu'] = Timber::get_menu('header-menu');
    $context['footer_menu'] = Timber::get_menu('footer-menu');
    $context['service_menu'] = Timber::get_menu('service-menu');

    // Логотипы
    $context['header_logo'] = get_template_directory_uri() . '/assets/img/logo.png';
    $context['header_logo_brand'] = get_template_directory_uri() . '/assets/img/logo-brand.png';

    // Настройки темы
    $context['phone'] = get_field('site_phone', 'options');
    $context['socials'] = get_field('site_socials', 'options');
    $context['worktime'] = get_field('site_worktime', 'options');
    $context['email'] = get_field('site_email', 'options');
    $context['location'] = get_field('site_location', 'options');
    $context['privacy'] = get_field('site_privacy', 'options');
    $context['agreement'] = get_field('site_agreement', 'options');
    $context['telegram'] = $this->extractTelegram($context['socials']);
    $context['whatsapp'] = $this->extractWhatsapp($context['socials']);
    return $context;
  }

  public function uploadMimes($mimes)
  {
    $mimes['svg'] = 'image/svg+xml';
    return $mimes;
  }
  public function extractTelegram($socials)
  {
    if (empty($socials) || !is_array($socials)) {
      return null;
    }

    foreach ($socials as $social) {
      // Проверяем массив link и поле title
      if (isset($social['link']['title']) && strtolower($social['link']['title']) === 'telegram') {
        return $social['link']['url'] ?? null;
      }
    }

    return null;
  }
  public function extractWhatsapp($socials)
  {
    if (empty($socials) || !is_array($socials)) {
      return null;
    }

    foreach ($socials as $social) {
      // Проверяем массив link и поле title
      if (isset($social['link']['title']) && strtolower($social['link']['title']) === 'whatsapp') {
        return $social['link']['url'] ?? null;
      }
    }

    return null;
  }


}
