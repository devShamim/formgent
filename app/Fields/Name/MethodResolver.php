<?php

namespace FormGent\App\Fields\Name;

defined( 'ABSPATH' ) || exit;

use FormGent\App\Fields\ParentMethodResolver;

trait MethodResolver {
    use ParentMethodResolver;

    public static function get_key(): string {
        return 'name';
    }
}
