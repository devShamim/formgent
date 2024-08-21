<?php

namespace FormGent\App\Fields\MultipleChoice;

defined( 'ABSPATH' ) || exit;

use FormGent\WpMVC\RequestValidator\Validator;
use FormGent\App\DTO\AnswerDTO;
use stdClass;
use WP_REST_Request;

trait MethodResolver {
    public static function get_key(): string {
        return 'multiple-choice';
    }

    protected function get_validation_rules(): array {
        return ['array'];
    }

    public function get_field_dto( array $field, WP_REST_Request $wp_rest_request, stdClass $form ): AnswerDTO {
        return ( new AnswerDTO() )->set_form_id( $form->ID )->set_field_type( $field['field_type'] )->set_field_name( $field['name'] )->set_value( wp_json_encode( $wp_rest_request->get_param( $field['name'] ) ) );
    }

    public function validate( array $field, WP_REST_Request $wp_rest_request, Validator $validator, stdClass $form ) {
        $rules   = $this->get_validation_rules();
        $options = wp_list_pluck( $field['options'], 'value' );
        
        $validator->validate(
            [
                $field['name'] => implode( '|', $rules ),
            ]
        );
            
        static::throw_validator_errors( $validator );
        
        $is_required = isset( $field["required"] ) && '1' ===  $field["required"];
        $values      = $wp_rest_request->get_param( $field['name'] );

        if ( '1' === $is_required && empty( $values ) ) {
            static::throw_errors(
                [
                    $field['name'] => [
                        sprintf( "The %s field is required.", $field['name'] )
                    ]
                ] 
            );
        }

        if ( array_unique( $values ) !== $values ) {
            static::throw_errors(
                [
                    $field['name'] => [
                        sprintf( "The %s field does not allow the same value multiple times", $field['name'] )
                    ]
                ] 
            );
        }

        if ( ! empty( array_diff( $values, $options ) ) ) {
            static::throw_errors(
                [
                    $field['name'] => [
                        sprintf( "The value of %s must be between %s", $field['name'], implode( ',', $options ) )
                    ]
                ]
            );
        }
    }
}
