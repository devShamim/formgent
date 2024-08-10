<?php

namespace FormGent\App\Form\Fields\Website;

defined( 'ABSPATH' ) || exit;

trait MethodResolver {
    public static function get_key(): string {
        return 'website';
    }

    protected function get_validation_rules(): array {
        return ['string', 'url', 'max:250'];
    }
}
