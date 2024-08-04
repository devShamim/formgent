<?php

namespace FormGent\App\Http\Controllers\Admin;

defined( 'ABSPATH' ) || exit;

use Exception;
use FormGent\App\DTO\FormDTO;
use FormGent\App\DTO\FormReadDTO;
use FormGent\App\EnumeratedList\FormType;
use FormGent\App\Http\Controllers\Controller;
use FormGent\App\Models\Answer;
use FormGent\App\Models\Post;
use FormGent\App\Repositories\FormRepository;
use FormGent\WpMVC\RequestValidator\Validator;
use FormGent\WpMVC\Routing\Response;
use WP_REST_Request;

class FormController extends Controller {
    public FormRepository $form_repository;

    public function __construct( FormRepository $form_repository ) {
        $this->form_repository = $form_repository;
    }

    public function index( Validator $validator, WP_REST_Request $wp_rest_request ) {
        $validator->validate(
            [
                'per_page'   => 'numeric',
                'page'       => 'numeric',
                's'          => 'string|max:255',
                'sort_by'    => 'string|accepted:last_modified,date_created,alphabetical,last_submission,unread,draft,publish',
                'date_type'  => 'string|accepted:all,today,yesterday,last_week,last_month,date_frame',
                'date_frame' => 'array',
                'type'       => 'string|accepted:all,general,conversational'
            ]
        );

        if ( $validator->is_fail() ) {
            return Response::send(
                [
                    'messages' => $validator->errors
                ], 422
            );
        }

        $dto = new FormReadDTO;
        $dto->set_page( intval( $wp_rest_request->get_param( 'page' ) ) );
        $dto->set_per_page( intval( $wp_rest_request->get_param( 'per_page' ) ) );
        $dto->set_search( (string) $wp_rest_request->get_param( 's' ) );

        if ( $wp_rest_request->has_param( 'sort_by' ) ) {
            $dto->set_sort_by( $wp_rest_request->get_param( 'sort_by' ) );
        }

        if ( $wp_rest_request->has_param( 'date_type' ) ) {
            $dto->set_date_type( $wp_rest_request->get_param( 'date_type' ) );
        }

        if ( $wp_rest_request->has_param( 'date_frame' ) ) {
            $dto->set_date_frame( $wp_rest_request->get_param( 'date_frame' ) );
        }

        if ( $wp_rest_request->has_param( 'type' ) ) {
            $dto->set_type( $wp_rest_request->get_param( 'type' ) );
        }

        $data                      = $this->form_repository->get( $dto );
        $response                  = $this->pagination( $wp_rest_request, $data['total'], $dto->get_per_page(), false );
        $response['types']         = $data['types'];
        $response['forms']         = $data['forms'];
        $response['form_edit_url'] = add_query_arg( ['action' => 'edit'], admin_url( 'post.php' ) );

        return Response::send( $response );
    }

    public function store( Validator $validator, WP_REST_Request $wp_rest_request ) {
        $validator->validate(
            [
                'title'  => 'required|string|max:255|min:5',
                'status' => 'required|string|accepted:publish,draft',
                // 'content' => 'required|json',
                'type'   => 'required|string|accepted:general,conversational'
            ]
        );

        if ( $validator->is_fail() ) {
            return Response::send(
                [
                    'messages' => $validator->errors
                ], 422
            );
        }

        try {
            $dto = new FormDTO;

            $dto->set_title( $wp_rest_request->get_param( 'title' ) );
            $dto->set_status( $wp_rest_request->get_param( 'status' ) );
            // $dto->set_content( $wp_rest_request->get_param( 'content' ) );
            $dto->set_type( $wp_rest_request->get_param( 'type' ) );

            do_action( "formgent_before_create_form", $dto, $wp_rest_request );

            $form_id = $this->form_repository->create( $dto );

            $dto->set_id( $form_id );

            do_action( "formgent_after_create_form", $dto, $wp_rest_request );

            return Response::send(
                [
                    'form_edit_url' => add_query_arg( ['post' => $form_id, 'action' => 'edit'], admin_url( 'post.php' ) ),
                    'message'       => esc_html__( 'The form has been created successfully.', 'formgent' )
                ], 201
            );
        } catch ( Exception $exception ) {
            return Response::send(
                [
                    'message' => $exception->getMessage()
                ],
                $exception->getCode()
            );
        }
    }

    public function update_title( Validator $validator, WP_REST_Request $wp_rest_request ) {
        $validator->validate(
            [
                'id'    => 'required|numeric',
                'title' => 'required|string|max:255|min:5',
            ]
        );

        if ( $validator->is_fail() ) {
            return Response::send(
                [
                    'messages' => $validator->errors
                ], 422
            );
        }

        do_action( 'formgent_before_update_form_title', $wp_rest_request );

        $this->form_repository->update_title( intval( $wp_rest_request->get_param( 'id' ) ), $wp_rest_request->get_param( 'title' ) );

        do_action( 'formgent_after_update_form_title', $wp_rest_request );

        return Response::send(
            [
                'message' => esc_html__( 'The form title has been updated successfully.', 'formgent' )
            ]
        );
    }

    public function update_status( Validator $validator, WP_REST_Request $wp_rest_request ) {
        $validator->validate(
            [
                'id'     => 'required|numeric',
                'status' => 'required|string|accepted:publish,draft'
            ]
        );

        if ( $validator->is_fail() ) {
            return Response::send(
                [
                    'messages' => $validator->errors
                ], 422
            );
        }

        do_action( 'formgent_before_update_form_status', $wp_rest_request );

        $this->form_repository->update_status( intval( $wp_rest_request->get_param( 'id' ) ), $wp_rest_request->get_param( 'status' ) );

        do_action( 'formgent_after_update_form_status', $wp_rest_request );

        return Response::send(
            [
                'message' => esc_html__( 'The form status has been updated successfully.', 'formgent' )
            ]
        );
    }

    public function duplicate( Validator $validator, WP_REST_Request $wp_rest_request ) {
        $validator->validate(
            [
                'id' => 'required|numeric'
            ]
        );

        if ( $validator->is_fail() ) {
            return Response::send(
                [
                    'messages' => $validator->errors
                ], 422
            );
        }

        $form = $this->form_repository->get_by_id( intval( $wp_rest_request->get_param( 'id' ) ) );

        if ( ! $form ) {
            return Response::send(
                [
                    'message' => esc_html__( 'Form not found', 'formgent' )
                ], 404
            );
        }

        $dto = new FormDTO;
        $dto->set_title( $form->post_title . ' - copy' );
        $dto->set_status( $form->post_status );
        $dto->set_content( $form->post_content );
        $dto->set_type( get_post_meta( $form->ID, 'formgent_type', true ) );
        $dto->set_save_incomplete_data( (bool) get_post_meta( $form->ID, 'formgent_save_incomplete_data', true ) );

        try {
            do_action( "formgent_before_duplicate_form", $dto, $wp_rest_request );

            $form_id = $this->form_repository->create( $dto );

            $dto->set_id( $form_id );

            do_action( "formgent_after_duplicate_form", $dto, $wp_rest_request );

            return Response::send(
                [
                    'data'    => [
                        'id' => $form_id
                    ],
                    'message' => esc_html__( 'The form has been duplicated successfully.', 'formgent' )
                ], 201
            );
        } catch ( Exception $exception ) {
            return Response::send(
                [
                    'message' => $exception->getMessage()
                ],
                $exception->getCode()
            );
        }
    }

    public function select( Validator $validator, WP_REST_Request $wp_rest_request ) {
        return Response::send(
            [
                'forms' => Post::query( 'post' )->select( 'post.post_title as label', 'post.ID as value' )->where( 'post.post_type', formgent_app_config( 'post_type' ) )->where( 'post.post_status', 'publish' )->order_by_desc( 'post.ID' )->get()
            ]
        );
    }

    public function delete( Validator $validator, WP_REST_Request $wp_rest_request ) {
        $validator->validate(
            [
                'id' => 'required|numeric'
            ]
        );

        if ( $validator->is_fail() ) {
            return Response::send(
                [
                    'messages' => $validator->errors
                ], 422
            );
        }

        $form_id = intval( $wp_rest_request->get_param( 'id' ) );

        $form = $this->form_repository->get_by_id( $form_id );

        do_action( 'formgent_before_delete_form', $form_id, $form );

        $this->form_repository->delete_by_id( $form_id );

        do_action( 'formgent_after_delete_form', $form_id, $form );

        return Response::send(
            [
                'message' => esc_html__( 'The form has been deleted successfully.', 'formgent' )
            ]
        );
    }

    public function delete_bulk_form( Validator $validator, WP_REST_Request $wp_rest_request ) {
        $validator->validate(
            [
                'ids' => 'required|array'
            ]
        );

        if ( $validator->is_fail() ) {
            return Response::send(
                [
                    'messages' => $validator->errors
                ], 422
            );
        }

        $form_ids = $wp_rest_request->get_param( 'ids' );

        if ( empty( $form_ids ) || ! formgent_is_one_level_array( $form_ids ) ) {
            return Response::send(
                [
                    'message' => esc_html__( 'Sorry, Something was wrong.', 'formgent' )
                ]
            );
        }

        try {
            $forms = $this->form_repository->deletes( $form_ids );

            foreach ( $forms as $form ) {
                do_action( 'formgent_after_delete_form', $form->ID, $form );
            }

            return Response::send(
                [
                    'message' => esc_html__( 'Forms have been successfully deleted.', 'formgent' )
                ]
            );
        } catch ( Exception $exception ) {
            return Response::send(
                [
                    'message' => $exception->getMessage()
                ],
                $exception->getCode()
            );
        }
    }

    public function insert_media( Validator $validator, WP_REST_Request $wp_rest_request ) {
        $validator->validate(
            [
                'url' => 'required|url'
            ]
        );

        if ( $validator->is_fail() ) {
            return Response::send(
                [
                    'messages' => $validator->errors
                ], 422
            );
        }

        $attachment_url = $wp_rest_request->get_param( 'url' );

        try {
            $data = [
                'data' => [
                    'status' => 201
                ]
            ];
            return Response::send( array_merge( $this->form_repository->insert_media( $attachment_url ), $data ), 201 );
        } catch ( Exception $exception ) {
            return Response::send(
                [
                    'message' => $exception->getMessage()
                ],
                $exception->getCode()
            );
        }
    }

    public function delete_field( Validator $validator, WP_REST_Request $wp_rest_request ) {
        $validator->validate(
            [
                'id'        => 'required|numeric',
                'field_id'  => 'required|string',
                'new_field' => 'json'
            ]
        );

        if ( $validator->is_fail() ) {
            return Response::send(
                [
                    'messages' => $validator->errors
                ], 422
            );
        }

        $response = [
            'message' => esc_html__( "Field response removed successfully!", "formgent" )
        ];

        $form_id  = $wp_rest_request->get_param( 'id' );
        $field_id = $wp_rest_request->get_param( 'field_id' );

        $form = $this->form_repository->get_by_id( $form_id );

        if ( ! $form ) {
            return Response::send( $response );
        }

        /**
         * Delete element from form content
         */
        $content = json_decode( $form->content, true );
        $fields  = $content['fields'];

        $field_key = array_search( $field_id, array_column( $fields, 'id' ) );

        if ( ! is_int( $field_key ) ) {
            return Response::send( $response );
        }

        $new_field = $wp_rest_request->get_param( 'new_field' );

        if ( ! empty( $new_field ) ) {
            $fields[$field_key] = json_decode( $new_field );
        } else {
            unset( $fields[$field_key] );
        }

        $content['fields'] = array_values( $fields );

        // $this->form_repository->update_content( $form_id, json_encode( $content ) );

        /**
         * Remove field response
         */
        Answer::query( "answer" )->where( 'answer.form_id', $form_id )->where( 'answer.field_id', $field_id )->delete();

        return Response::send( $response );
    }

    public function get_settings( Validator $validator, WP_REST_Request $wp_rest_request ) {
        $validator->validate(
            [
                'id' => 'required|numeric'
            ]
        );

        if ( $validator->is_fail() ) {
            return Response::send(
                [
                    'messages' => $validator->errors
                ], 422
            );
        }
        
        return Response::send(
            [
                'settings' => $this->form_repository->get_settings( intval( $wp_rest_request->get_param( 'id' ) ) ),
            ]  
        );
    }

    public function update_settings( Validator $validator, WP_REST_Request $wp_rest_request ) {
        $validator->validate(
            [
                'id'       => 'required|numeric',
                'settings' => 'required|array'
            ]
        );

        if ( $validator->is_fail() ) {
            return Response::send(
                [
                    'messages' => $validator->errors
                ], 422
            );
        }

        $form_id = intval( $wp_rest_request->get_param( 'id' ) );

        $this->form_repository->save_settings(
            $form_id,
            array_merge( 
                $this->form_repository->get_settings( $form_id ), 
                $wp_rest_request->get_param( 'settings' ) 
            )
        );

        return Response::send(
            [
                'message' => esc_html__( 'Settings have been saved successfully.', 'formgent' )
            ]
        );
    }
}