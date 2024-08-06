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

    public function validate( array $field, WP_REST_Request $wp_rest_request, Validator $validator ) {
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
        $dto = new AnswerDTO();
        return $dto->set_form_id( $form->ID )->set_field_type( $field['field_type'] )->set_field_id( $field['id'] )->set_value( $wp_rest_request->get_param( static::get_key() ) );
    }
 
    public function get_children_dtos( array $field, WP_REST_Request $wp_rest_request, stdClass $form ): array {
        return [];
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

    public static function get_label_by_id( int $id, array $form_fields ): ?string {
        $field = self::get_form_field( 'id', $id, $form_fields );

        if ( ! $field ) {
            return null;
        }

        self::get_label( $field );
    }

    public static function get_label_by_name( string $name, array $form_fields ): ?string {
        $field = self::get_form_field( 'name', $name, $form_fields );

        if ( ! $field ) {
            return null;
        }

        self::get_label( $field );
    }

    public static function get_label( array $field ): string {
        return $field['label'];
    }

    public static function get_form_field( $column_key, $value, array $form_fields ) {
        $value = strval( $value );

        foreach ( $form_fields as $field ) {
            if ( strval( $field[ $column_key ] ) === $value ) {
                return $field;
            }
        }

        return null;
    }
}