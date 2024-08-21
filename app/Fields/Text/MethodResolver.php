<?php

namespace FormGent\App\Fields\Text;

defined( 'ABSPATH' ) || exit;

trait MethodResolver {
    public static function get_key(): string {
        return 'text';
    }

    protected function get_validation_rules(): array {
        return ['string', 'min:1', 'max:250'];
    }
}
