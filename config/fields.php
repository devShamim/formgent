<?php

defined( 'ABSPATH' ) || exit;

use FormGent\App\Fields\GDPR\GDPR;
use FormGent\App\Fields\PhoneNumber\PhoneNumber;
use FormGent\App\Fields\Website\Website;
use FormGent\App\Fields\Name\Name;
use FormGent\App\Fields\Email\Email;
use FormGent\App\Fields\Text\Text;
use FormGent\App\Fields\TextArea\TextArea;
use FormGent\App\Fields\Number\Number;

return apply_filters(
    'formgent_fields', [
        Text::get_key()        => [
            'class'                     => Text::class,
            'allowed_in_response'       => true,
            'allowed_in_response_table' => true
        ],
        TextArea::get_key()    => [
            'class'                     => TextArea::class,
            'allowed_in_response'       => true,
            'allowed_in_response_table' => true
        ],
        Name::get_key()        => [
            'class'                     => Name::class,
            'allowed_in_response'       => true,
            'allowed_in_response_table' => false
        ],
        Email::get_key()       => [
            'class'                     => Email::class,
            'allowed_in_response'       => true,
            'allowed_in_response_table' => true
        ],
        Number::get_key()      => [
            'class'                     => Number::class,
            'allowed_in_response'       => true,
            'allowed_in_response_table' => true
        ],
        GDPR::get_key()        => [
            'class'                     => GDPR::class,
            'allowed_in_response'       => true,
            'allowed_in_response_table' => false
        ],
        PhoneNumber::get_key() => [
            'class'                     => PhoneNumber::class,
            'allowed_in_response'       => true,
            'allowed_in_response_table' => true
        ],
        Website::get_key()     => [
            'class'                     => Website::class,
            'allowed_in_response'       => true,
            'allowed_in_response_table' => true
        ],
    ]
);