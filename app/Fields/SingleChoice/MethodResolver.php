<?php

namespace FormGent\App\Fields\SingleChoice;

defined( 'ABSPATH' ) || exit;

use FormGent\WpMVC\RequestValidator\Validator;
use stdClass;
use WP_REST_Request;

trait MethodResolver {
    public static function get_key(): string {
        return 'single-choice';
    }

    protected function get_validation_rules(): array {
        return ['string'];
    }

    public function validate( array $field, WP_REST_Request $wp_rest_request, Validator $validator, stdClass $form ) {
        $rules = $this->get_validation_rules();

        if ( isset( $field["required"] ) && '1' ===  $field["required"] ) {
            $rules[] = 'required';
        }

        $rules[] = 'accepted:' . implode( ',', wp_list_pluck( $field['options'], 'value' ) );
    
        $validator->validate(
            [
                $field['name'] => implode( '|', $rules ),
            ]
        );
            
        static::throw_validator_errors( $validator );
    }
}
