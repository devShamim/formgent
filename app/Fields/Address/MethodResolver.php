<?php

namespace FormGent\App\Fields\Address;

defined( 'ABSPATH' ) || exit;

use FormGent\App\Fields\ParentMethodResolver;

trait MethodResolver {
    use ParentMethodResolver;

    public static function get_key(): string {
        return 'address';
    }
}