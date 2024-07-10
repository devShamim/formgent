<?php

namespace FormGent\App\Http\Controllers\Admin;

defined( 'ABSPATH' ) || exit;

use FormGent\App\Http\Controllers\Controller;
use FormGent\App\Repositories\AnalyticRepository;
use FormGent\App\Repositories\FormRepository;

use FormGent\WpMVC\Routing\Response;
use FormGent\WpMVC\RequestValidator\Validator;

use WP_REST_Request;
use Exception;

class AnalyticsController extends Controller {
    public AnalyticRepository $analytic_repository;

    public FormRepository $form_repository;
    
    public function __construct( AnalyticRepository $analytic_repository, FormRepository $form_repository ) {
        $this->analytic_repository = $analytic_repository;
        $this->form_repository     = $form_repository;
    }

    public function form_summary( Validator $validator, WP_REST_Request $wp_rest_request ) {
        $validator->validate( [ 'id' => 'required|numeric' ] );

        if ( $validator->is_fail() ) {
            return Response::send(
                [
                    'messages' => $validator->errors
                ], 422
            );
        }

        $form = $this->form_repository->get_by_id( absint( $wp_rest_request->get_param( 'id' ) ) );

        if ( ! $form ) {
            return Response::send(
                [
                    'messages' => esc_html__( 'Form not found', 'formgent' )
                ], 404
            );
        }

        $data = $this->analytic_repository->form_summary( $wp_rest_request->get_param( 'id' ) );
        $data = apply_filters( 'formgent_form_summary', $data, $wp_rest_request );

        return Response::send( [ 'data' => $data ] );
    }

    public function increment_or_decrement_form_view_count( Validator $validator, WP_REST_Request $wp_rest_request ) {
        $validator->validate(
            [
                'type' => 'required|string|accepted:+,-',
            ]
        );

        if ( $validator->is_fail() ) {
            return Response::send(
                [
                    'messages' => $validator->errors
                ], 422
            );
        }

        $wp_rest_request->set_param( 'count', 1 );

        return $this->update_form_view_count( $validator, $wp_rest_request );
    }

    public function update_form_view_count( Validator $validator, WP_REST_Request $wp_rest_request ) {
        $validator->validate(
            [
                'id'    => 'required|numeric',
                'count' => 'required|numeric',
                'type'  => 'string|accepted:=,+,-',
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
            $form = $this->form_repository->get_by_id( absint( $wp_rest_request->get_param( 'id' ) ) );

            if ( ! $form ) {
                return Response::send(
                    [
                        'messages' => esc_html__( 'Form not found', 'formgent' )
                    ], 404
                );
            }

            return Response::send(
                [
                    'new_count' => $this->analytic_repository->update_form_view_count(
                        absint( $wp_rest_request->get_param( 'id' ) ), 
                        absint( $wp_rest_request->get_param( 'count' ) ),
                        $wp_rest_request->get_param( 'type' ) ?? '='
                    )
                ]
            );
        } catch ( Exception $e ) {
            return Response::send(
                [
                    'messages' => esc_html__( 'Could\'t update the view count', 'formgent' )
                ], 422
            );
        }
    }
}