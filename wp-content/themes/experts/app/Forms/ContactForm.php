<?php

namespace App\Forms;

use Rareloop\Lumberjack\Validation\AbstractForm;


class ContactForm extends AbstractForm
{
  protected $rules = [
    'name' => 'required',
    'phone' => 'required',
    'policy' => 'required',
  ];
}