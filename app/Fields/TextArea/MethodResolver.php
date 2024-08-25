<?php

namespace FormGent\App\Fields\TextArea;

defined( 'ABSPATH' ) || exit;

use FormGent\App\Summary\Pagination;

trait MethodResolver {

    use Pagination;

    public static function get_key(): string {
        return 'textarea';
    }
}
