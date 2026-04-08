<?php

namespace App\Http\Controllers;

use Laminas\Diactoros\Response\JsonResponse;
use Rareloop\Lumberjack\Facades\Session;
use Rareloop\Lumberjack\Http\Controller as BaseController;
use Rareloop\Lumberjack\Email\Facades\Email;
use App\Forms\ContactForm;

class MailController extends BaseController
{
  public function send(ContactForm $form)
  {
    try {
      if (empty($_POST)) {
        return new JsonResponse([
          'success' => false,
          'message' => 'Нет данных для обработки'
        ], 400);
      }

      $lastSend = Session::get('last_send_time', 0);
      $now = time();

      if ($lastSend && ($now - $lastSend) < 30) {
        return new JsonResponse([
          'success' => false,
          'message' => 'Пожалуйста, подождите 30 секунд перед следующей отправкой'
        ], 429);
      }

      Session::put('last_send_time', $now);

      Session::push('send_history', [
        'time' => date('H:i:s'),
        'ip' => $_SERVER['REMOTE_ADDR'] ?? ''
      ]);

      $history = Session::get('send_history', []);
      if (count($history) > 5) {
        Session::put('send_history', array_slice($history, -5));
      }

      $is_valid = $form->validate($_POST);

      if (!$is_valid) {
        $errors = $form->errors();

        return new JsonResponse([
          'success' => false,
          'message' => 'Данные не валидны',
          'errors' => $errors,
        ], 400);
      }

      $formData = array_merge(
        $form->values(),
        [
          'site_url' => get_site_url(),
          'ip' => $_SERVER['REMOTE_ADDR'] ?? '',
          'date' => date('d-m-Y H:i:s'),
        ]
      );

      $to = get_field('site_email_to');

      Email::sendHTMLFromTemplate(
        $to,
        'Новое сообщение от ' . ($formData['name'] ?: 'пользователя') . ' | 3experta',
        'mail/email.twig',
        $formData,
        '3experta <noreply@3experta.com>'
      );

      return new JsonResponse([
        'success' => true,
        'message' => 'Письмо отправлено успешно',
      ], 200);

    } catch (\Throwable $th) {
      error_log('MailController error: ' . $th->getMessage());

      return new JsonResponse([
        'success' => false,
        'message' => 'Ошибка сервера: ' . $th->getMessage()
      ], 500);
    }
  }
}