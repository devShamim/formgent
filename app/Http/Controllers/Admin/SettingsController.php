<?php

namespace FormGent\App\Http\Controllers\Admin;

defined( 'ABSPATH' ) || exit;

use FormGent\App\Http\Controllers\Controller;
use FormGent\App\Repositories\SettingsRepository;
use FormGent\WpMVC\RequestValidator\Validator;
use FormGent\WpMVC\Routing\Response;
use WP_REST_Request;

class SettingsController extends Controller
{
    public SettingsRepository $repository;

    /**
     * @param SettingsRepository $repository
     */
    public function __construct( SettingsRepository $repository ) {
        $this->repository = $repository;
    }

    public function index() {
        return Response::send(
            [
                'settings' => $this->repository->get(),
            ] 
        );
    }

    public function update( Validator $validator, WP_REST_Request $wp_rest_request ) {
        $validator->validate(
            [
                'settings' => 'required|array'
            ]
        );

        $this->repository->save(
            array_merge( 
                $this->repository->get(), 
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
