<?php

namespace FormGent\App\Fields\Number;

defined( 'ABSPATH' ) || exit;

trait MethodResolver {
    public static function get_key(): string {
        return 'number';
    }
}