<?php

namespace FormGent\App\Fields;

defined( 'ABSPATH' ) || exit;

use FormGent\App\DTO\AnswerDTO;
use FormGent\App\EnumeratedList\FormType;
use FormGent\App\Exceptions\RequestValidatorException;
use FormGent\App\Repositories\AnswerRepository;
use FormGent\WpMVC\RequestValidator\Validator;
use stdClass;
use WP_REST_Request;

abstract class Field {
    public AnswerRepository $answer_repository;

    public $has_children = false;

    public function __construct( AnswerRepository $answer_repository ) {
        $this->answer_repository = $answer_repository;
    }

    abstract public static function get_key(): string;

    public static function get_supported_form_types(): array {
        return [FormType::GENERAL, FormType::CONVERSATIONAL];
    }

    protected function get_validation_rules(): array {
        return [];
    }

    public function validate( array $field, WP_REST_Request $wp_rest_request, Validator $validator, stdClass $form ) {
        $rules = $this->get_validation_rules();

        if ( isset( $field["required"] ) && '1' ===  $field["required"] ) {
            $rules[] = 'required';
        }

        if ( ! empty( $rules ) ) {

            $validator->validate(
                [
                    $field['name'] => implode( '|', $rules ),
                ]
            );
                
            static::throw_validator_errors( $validator );
        }
    }

    public function get_field_dto( array $field, WP_REST_Request $wp_rest_request, stdClass $form ): AnswerDTO {
        return ( new AnswerDTO() )->set_form_id( $form->ID )->set_field_type( $field['field_type'] )->set_field_name( $field['name'] )->set_value( $wp_rest_request->get_param( $field['name'] ) );
    }

    protected static function throw_validator_errors( Validator $validator ) {
        if ( $validator->is_fail() ) {
            $errors            = $validator->errors;
            $validator->errors = [];
            static::throw_errors( $errors );
        }
    }

    protected static function throw_errors( array $errors ) {
        throw new RequestValidatorException( $errors, 422, null );
    }
}