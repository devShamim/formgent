<?php

namespace FormGent\App\Fields\Number;

defined( 'ABSPATH' ) || exit;

use FormGent\WpMVC\RequestValidator\Validator;
use FormGent\App\Summary\Pagination;
use WP_REST_Request;
use stdClass;

trait MethodResolver {

    use Pagination;

    public static function get_key(): string {
        return 'number';
    }

    protected function get_validation_rules(): array {
        return [];
    }

    public function validate( array $field, WP_REST_Request $wp_rest_request, Validator $validator, stdClass $form ) {
        $rules = $this->get_validation_rules();

        if ( isset( $field["required"] ) && '1' ===  $field["required"] ) {
            $rules[] = 'required';
        }

        switch ( $field['format'] ) {
            case 'non_decimal':
                $rules[] = 'integer';
                break;
            default:
                $rules[] = 'numeric';
                break;
        }

        $validator->validate(
            [
                $field['name'] => implode( '|', $rules ),
            ]
        );
    }
}
