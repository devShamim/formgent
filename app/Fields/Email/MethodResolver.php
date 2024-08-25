<?php

namespace FormGent\App\Fields\Email;

defined( 'ABSPATH' ) || exit;

use FormGent\App\Summary\Pagination;

trait MethodResolver {

    use Pagination;

    public static function get_key(): string {
        return 'email';
    }

    protected function get_validation_rules(): array {
        return ['string', 'email', 'max:250'];
    }
}
