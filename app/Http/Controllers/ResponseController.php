<?php

namespace FormGent\App\Http\Controllers;

defined( 'ABSPATH' ) || exit;

use FormGent\App\Models\Answer;
use FormGent\App\DTO\ResponseDTO;
use FormGent\App\EnumeratedList\ResponseStatus;
use FormGent\App\Exceptions\RequestValidatorException;
use FormGent\App\Http\Controllers\Controller;
use FormGent\App\Repositories\ResponseRepository;
use FormGent\App\Repositories\AnswerRepository;
use FormGent\App\Repositories\FormRepository;
use FormGent\WpMVC\RequestValidator\Validator;
use FormGent\WpMVC\Routing\Response;
use stdClass;
use WP_REST_Request;
use FormGent\App\DTO\AnswerDTO;

class ResponseController extends Controller {
    private ResponseRepository $repository;

    private AnswerRepository $answer_repository;

    private FormRepository $form_repository;

    /**
     * Constructor for initializing repositories.
     *
     * @param ResponseRepository $repository
     * @param AnswerRepository $answer_repository
     * @param FormRepository $form_repository
     */
    public function __construct( ResponseRepository $repository, AnswerRepository $answer_repository, FormRepository $form_repository ) {
        $this->repository        = $repository;
        $this->answer_repository = $answer_repository;
        $this->form_repository   = $form_repository;
    }

    /**
     * Handles the storage of form responses.
     *
     * @param Validator $validator
     * @param WP_REST_Request $request
     * @return array
     */
    public function store( Validator $validator, WP_REST_Request $request ) {
        // Validate the request parameters.
        $validator->validate(
            [
                'id'             => 'required|integer',
                'form_data'      => 'required|array',
                'response_token' => 'required|string',
            ]
        );

        // Check if validation failed.
        if ( $validator->is_fail() ) {
            return Response::send( ['messages' => $validator->errors], 422 );
        }

        // Retrieve the form by its ID.
        $id   = $request->get_param( 'id' );
        $form = $this->form_repository->get_by_id_publish( $id, ['ID', 'post_content'] );

        // Return 404 if the form is not found.
        if ( ! $form ) {
            return Response::send( ['message' => esc_html__( 'Form not found', 'formgent' )], 404 );
        }

        $response = formgent_get_response_by_token( $request->get_param( 'response_token' ), $form->ID );

        if ( ! $response ) {
            return Response::send(
                [
                    'message' => esc_html__( "Response not found.", "formgent" )
                ], 404
            );
        }

        if ( '1' === $response->is_completed ) {
            return Response::send(
                [
                    'message' => esc_html__( "Response already completed", "formgent" )
                ], 404
            );
        }

        $form_id = intval( $request->get_param( 'id' ) );

        if ( $form_id != $response->form_id ) {
            return Response::send(
                [
                    'message' => esc_html__( "Oops, something went wrong. Please try again.", "formgent" )
                ], 404
            );
        }

        // Set additional form properties.
        $form->form_type            = get_post_meta( $form->ID, 'formgent_type', true );
        $form->save_incomplete_data = (bool) get_post_meta( $form->ID, 'formgent_save_incomplete_data', true );

        // Validate form data and create DTOs.
        $validate_data = $this->validate_form_data( $form, $validator, $request );
        if ( ! empty( $validate_data['errors'] ) ) {
            return Response::send( ['messages' => $validate_data['errors']], 422 );
        }

        $this->answer_repository->creates( $response->id, $validate_data['field_dtos'] );

        // Handle child fields if present.
        if ( ! empty( $validate_data['parent_field_names'] ) ) {
            $this->handle_child_fields( $response->id, $validate_data );
        }

        $this->repository->mark_as_completed( $response->id );

        // Trigger the after response creation hook.
        do_action( "formgent_after_create_form_response", $response->id, $form, $request );

        // Return a success response.
        return Response::send( ['message' => esc_html__( 'The form was submitted successfully!', 'formgent' )], 201 );
    }

    /**
     * Validates form data and creates DTOs for fields.
     *
     * @param stdClass $form
     * @param Validator $validator
     * @param WP_REST_Request $request
     * @return array
     */
    private function validate_form_data( stdClass $form, Validator $validator, WP_REST_Request $request ): array {
        $form_data = $request->get_param( 'form_data' );
        $request->set_body_params( $form_data );

        $registered_fields = formgent_config( "fields" );
        $fields            = formgent_get_form_field_settings( parse_blocks( $form->post_content ) );

        $errors             = [];
        $field_dtos         = [];
        $children_dtos      = [];
        $parent_field_names = [];

        foreach ( $form_data as $field_name => $field_data ) {
            // Skip if the field is not found in the form's field settings.
            if ( empty( $fields[$field_name] ) ) {
                unset( $form_data[$field_name] );
                continue;
            }

            $field = $fields[$field_name];

            // Skip if the field type is not allowed in the response.
            if ( empty( $registered_fields[$field['field_type']]['allowed_in_response'] ) ) {
                continue;
            }

            try {
                // Get the field handler for this field type.
                $field_handler = formgent_field_handler( $field['field_type'] );

                // Skip if the form type is not supported by the field handler.
                if ( ! in_array( $form->form_type, $field_handler::get_supported_form_types(), true ) ) {
                    continue;
                }

                // Validate the field and create its DTO.
                $field_handler->validate( $field, $request, $validator, $form );
                $dto = $field_handler->get_field_dto( $field, $request, $form );

                // Handle child fields if present.
                if ( $field_handler->has_children ) {
                    $children                      = $this->get_children_dtos( $form, $validator, $request, $field );
                    $validator->wp_rest_request    = $request;
                    $children_dtos[$field['name']] = $children['field_dtos'];

                    if ( ! empty( $children['errors'] ) ) {
                        $errors[$field['name']] = $children['errors'];
                    }

                    $parent_field_names[] = $dto->get_field_name();
                }

                $field_dtos[$field['name']] = $dto;

            } catch ( RequestValidatorException $exception ) {
                // Merge any validation errors from the field handler.
                $errors = array_merge( $errors, $exception->get_messages() );
            }
        }

        return compact( 'field_dtos', 'children_dtos', 'parent_field_names', 'errors' );
    }

    /**
     * Handles child fields and stores them in the database.
     *
     * @param int $response_id
     * @param array $validate_data
     */
    private function handle_child_fields( int $response_id, array $validate_data ): void {
        $parent_fields = Answer::query()
            ->select( 'id', 'field_name' )
            ->where( 'response_id', $response_id )
            ->where_in( 'field_name', $validate_data['parent_field_names'] )
            ->get();

        // Extract parent field IDs indexed by field names.
        $parent_names = wp_list_pluck( $parent_fields, 'id', 'field_name' );

        $children_items = [];

        foreach ( $validate_data['children_dtos'] as $key => $dtos ) {
            foreach ( $dtos as $dto ) {
                /**
                 * @var AnswerDTO $dto
                 * 
                 * Prepare the AnswerDTO for storing in the database.
                 * 
                 * - Set the parent ID of the answer (from the previously retrieved parent field IDs).
                 * - Set the response ID to associate this answer with the current form response.
                 * - Convert the DTO to an array for insertion into the database.
                 */
                $children_items[] = $dto->set_parent_id( $parent_names[$key] )->set_response_id( $response_id )->to_array();
            }
        }

        // Store child answers in the database.
        $this->answer_repository->creates_from_array( $children_items );
    }

    /**
     * Retrieves and validates child field DTOs.
     *
     * @param stdClass $form
     * @param Validator $validator
     * @param WP_REST_Request $request
     * @param array $parent_field
     * @return array
     */
    public function get_children_dtos( stdClass $form, Validator $validator, WP_REST_Request $request, array $parent_field ): array {
        $children_request = new WP_REST_Request( 'POST', '/' );
        $form_data        = $request->get_param( $parent_field['name'] );

        if ( is_array( $form_data ) ) {
            $children_request->set_body_params( $form_data );
        }

        $validator->wp_rest_request = $children_request;
        $registered_fields          = formgent_config( "fields" );
        $fields                     = $parent_field['children'];

        $field_dtos = [];
        $errors     = [];

        foreach ( $form_data as $field_name => $field_data ) {
            // Skip if the field is not found in the parent field's children.
            if ( empty( $fields[$field_name] ) ) {
                unset( $form_data[$field_name] );
                continue;
            }

            $field = $fields[$field_name];

            // Skip if the field type is not allowed in the response.
            if ( empty( $registered_fields[$field['field_type']]['allowed_in_response'] ) ) {
                continue;
            }

            try {
                // Get the field handler for this field type.
                $field_handler = formgent_field_handler( $field['field_type'] );

                // Skip if the form type is not supported by the field handler.
                if ( ! in_array( $form->form_type, $field_handler::get_supported_form_types(), true ) ) {
                    continue;
                }

                // Validate the field and create its DTO.
                $field_handler->validate( $field, $children_request, $validator, $form );
                $dto = $field_handler->get_field_dto( $field, $children_request, $form );

                $field_dtos[$field['name']] = $dto;

            } catch ( RequestValidatorException $exception ) {
                // Merge any validation errors from the field handler.
                $errors = array_merge( $errors, $exception->get_messages() );
            }
        }

        return compact( 'field_dtos', 'errors' );
    }

    public function generate_token( Validator $validator, WP_REST_Request $wp_rest_request ) {
        $validator->validate(
            [
                'form_id' => 'required|integer'
            ]
        );

        if ( $validator->is_fail() ) {
            return Response::send(
                [
                    'messages' => $validator->errors
                ], 422
            );
        }

        $form_id = $wp_rest_request->get_param( 'form_id' );

        $form = $this->form_repository->get_by_id_publish( $form_id );

        if ( ! $form ) {
            return Response::send(
                [
                    'message' => esc_html__( 'Form not found', 'formgent' )
                ], 404
            );
        }
        
        $response_dto = new ResponseDTO;
        $response_dto->set_status( ResponseStatus::DRAFT )->set_is_completed( 0 )->set_form_id( $form_id )->set_ip( formgent_get_user_ip_address() );
        $this->store_browser_info( $response_dto, $wp_rest_request );

        if ( is_user_logged_in() ) {
            $response_dto->set_created_by( wp_get_current_user()->ID );
        }

        return Response::send(
            [
                'response_token' => $this->repository->create_and_get_token( $response_dto )
            ]
        );
    }

    /**
     * Stores browser information in the ResponseDTO.
     *
     * @param ResponseDTO $response_dto
     * @param WP_REST_Request $request
     */
    private function store_browser_info( ResponseDTO $response_dto, WP_REST_Request $request ): void {
        $which_browser = new \FormGent\WhichBrowser\Parser( $request->get_header( 'user-agent' ) );
        $browser       = $which_browser->browser;

        if ( $browser ) {
            $response_dto->set_browser( $browser->name );
            $response_dto->set_browser_version( $browser->version instanceof \FormGent\WhichBrowser\Model\Version ? $browser->version->value : null );
            $response_dto->set_device( $which_browser->os->name );
        }
    }
}
