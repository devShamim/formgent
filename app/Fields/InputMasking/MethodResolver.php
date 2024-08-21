<?php

namespace FormGent\App\Fields\InputMasking;

defined( 'ABSPATH' ) || exit;

trait MethodResolver {
    public static function get_key(): string {
        return 'input-masking';
    }

    protected function get_validation_rules(): array {
        return ['string', 'min:1', 'max:250'];
    }
}
