<?php

defined( 'ABSPATH' ) || exit;

use FormGent\App\Fields\Address\Address;
use FormGent\App\Fields\Dropdown\Dropdown;
use FormGent\App\Fields\GDPR\GDPR;
use FormGent\App\Fields\PhoneNumber\PhoneNumber;
use FormGent\App\Fields\InputMasking\InputMasking;
use FormGent\App\Fields\Website\Website;
use FormGent\App\Fields\Name\Name;
use FormGent\App\Fields\Email\Email;
use FormGent\App\Fields\SingleChoice\SingleChoice;
use FormGent\App\Fields\MultipleChoice\MultipleChoice;
use FormGent\App\Fields\Text\Text;
use FormGent\App\Fields\TextArea\TextArea;
use FormGent\App\Fields\Number\Number;

return apply_filters(
    'formgent_fields', [
        Address::get_key()        => [
            'class'                     => Address::class,
            'allowed_in_response'       => true,
            'allowed_in_response_table' => false
        ],
        Text::get_key()           => [
            'class'                     => Text::class,
            'allowed_in_response'       => true,
            'allowed_in_response_table' => true
        ],
        TextArea::get_key()       => [
            'class'                     => TextArea::class,
            'allowed_in_response'       => true,
            'allowed_in_response_table' => true
        ],
        Name::get_key()           => [
            'class'                     => Name::class,
            'allowed_in_response'       => true,
            'allowed_in_response_table' => false
        ],
        Email::get_key()          => [
            'class'                     => Email::class,
            'allowed_in_response'       => true,
            'allowed_in_response_table' => true
        ],
        Number::get_key()         => [
            'class'                     => Number::class,
            'allowed_in_response'       => true,
            'allowed_in_response_table' => true
        ],
        GDPR::get_key()           => [
            'class'                     => GDPR::class,
            'allowed_in_response'       => true,
            'allowed_in_response_table' => false
        ],
        PhoneNumber::get_key()    => [
            'class'                     => PhoneNumber::class,
            'allowed_in_response'       => true,
            'allowed_in_response_table' => true
        ],
        Website::get_key()        => [
            'class'                     => Website::class,
            'allowed_in_response'       => true,
            'allowed_in_response_table' => true
        ],
        SingleChoice::get_key()   => [
            'class'                     => SingleChoice::class,
            'allowed_in_response'       => true,
            'allowed_in_response_table' => false
        ],
        MultipleChoice::get_key() => [
            'class'                     => MultipleChoice::class,
            'allowed_in_response'       => true,
            'allowed_in_response_table' => false
        ],
        Dropdown::get_key()       => [
            'class'                     => Dropdown::class,
            'allowed_in_response'       => true,
            'allowed_in_response_table' => false
        ],
        InputMasking::get_key()   => [
            'class'                     => InputMasking::class,
            'allowed_in_response'       => true,
            'allowed_in_response_table' => false
        ],
    ]
);