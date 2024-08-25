<?php

namespace FormGent\App\Fields\Number;

defined( 'ABSPATH' ) || exit;

use FormGent\App\Summary\Pagination;

trait MethodResolver {
    
    use Pagination;
    
    public static function get_key(): string {
        return 'number';
    }
}
