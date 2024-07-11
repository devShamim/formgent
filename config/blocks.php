<?php

defined( 'ABSPATH' ) || exit;

use FormGent\App\Fields\Name\Name;
use FormGent\App\Fields\Email\Email;
use FormGent\App\Fields\Text\Text;
use FormGent\App\Fields\Number\Number;
use FormGent\App\Fields\Button\Button;
use FormGent\App\Fields\Phone\Phone;
use FormGent\App\Fields\Dropdown\Dropdown;
use FormGent\App\Fields\Address\Address;
use FormGent\App\Fields\GDPR\GDPR;
use FormGent\App\Fields\MultiChoice\MultiChoice;

return [
    'formgent/form'         => [],
    'formgent/name'         => [
        'types'      => ['general', 'conversational'],
        'field_type' => Name::get_key(),
    ],
    'formgent/email'        => [
        'types'      => ['general', 'conversational'],
        'field_type' => Email::get_key(),
    ],
    'formgent/text'         => [
        'types'      => ['general', 'conversational'],
        'field_type' => Text::get_key(),
    ],
    'formgent/number'       => [
        'types'      => ['general', 'conversational'],
        'field_type' => Number::get_key()
    ],
    'formgent/button'       => [
        'types'      => ['general', 'conversational'],
        'field_type' => Button::get_key()
    ],
    'formgent/phone-number' => [
        'types'      => ['general', 'conversational'],
        'field_type' => Phone::get_key()
    ],
    'formgent/dropdown'     => [
        'types'      => ['general', 'conversational'],
        'field_type' => Dropdown::get_key()
    ],
    'formgent/multi-choice' => [
        'types'      => ['general', 'conversational'],
        'field_type' => MultiChoice::get_key()
    ],
    'formgent/address'      => [
        'types'      => ['general', 'conversational'],
        'field_type' => Address::get_key()
    ],
    'formgent/gdpr'         => [
        'types'      => ['general', 'conversational'],
        'field_type' => GDPR::get_key()
    ],
];