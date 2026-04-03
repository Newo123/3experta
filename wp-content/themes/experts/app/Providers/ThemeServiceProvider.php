<?php

namespace App\Providers;

use Rareloop\Lumberjack\Facades\Config;
use Rareloop\Lumberjack\Providers\ServiceProvider;

class ThemeServiceProvider extends ServiceProvider
{
  protected $styles;
  protected $scripts;

  /**
   * Register any app specific items into the container
   */
  public function register()
  {
  }

  /**
   * Perform any additional boot required for this application
   */
  public function boot()
  {
    add_action('wp_enqueue_scripts', [$this, 'registerStyles']);
    add_action('wp_enqueue_scripts', [$this, 'registerScripts']);
  }

  public function registerStyles()
  {
    $this->styles = Config::get('theme.styles') ?? [];
    foreach ($this->styles as $style) {
      wp_enqueue_style('style-' . $style['name'], $style['url'], [], wp_get_theme()->get('Version'));
    }
  }
  public function registerScripts()
  {
    $this->scripts = Config::get('theme.scripts') ?? [];
    foreach ($this->scripts as $script) {
      wp_enqueue_script('script-' . $script['name'], $script['url'], [], wp_get_theme()->get('Version'), true);
    }
  }
}
