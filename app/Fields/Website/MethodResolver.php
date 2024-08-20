<?php

namespace FormGent\App\Fields\Website;

defined( 'ABSPATH' ) || exit;

use FormGent\App\Summary\Pagination;

trait MethodResolver {

    use Pagination;
    
    public static function get_key(): string {
        return 'website';
    }

    protected function get_validation_rules(): array {
        return ['string', 'url', 'max:250'];
    }
}
