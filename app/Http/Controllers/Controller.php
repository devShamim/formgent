<?php

namespace FormGent\App\Http\Controllers;

defined( 'ABSPATH' ) || exit;

use WP_REST_Request;

abstract class Controller {
    protected function pagination( WP_REST_Request $wp_rest_request, int $total_items, int $per_page = 10, bool $with_links = true ) {
        $params       = $this->get_query_params();
        $current_page = isset( $params['page'] ) ? intval( $params['page'] ) : 1;
        $per_page     = isset( $params['per_page'] ) ? intval( $params['per_page'] ) : $per_page;
        $total_pages  = ceil( $total_items / $per_page );
        $rest_url     = get_rest_url( null, $wp_rest_request->get_route() );

        $params['page']     = $current_page;
        $params['per_page'] = $per_page;

        $pagination = [
            'pagination' => [
                'total_items'  => $total_items,
                'total_pages'  => $total_pages,
                'current_page' => $current_page,
            ]
        ];

        if ( $with_links ) {
            $pagination['links'] = [
                'prev' => $this->get_prev_link( $params, $rest_url ),
                'self' => add_query_arg( $params, $rest_url ),
                'next' => $this->get_next_link( $params, $rest_url, $total_pages )
            ];
        }

        return $pagination;
    }

    protected function get_query_params() {
        /**
         * This method is accessible only via REST request and utilizes QUERY_STRING for generating pagination links. No data is stored in the database from this method, hence validation is unnecessary.
         */
        // phpcs:ignore WordPress.Security.ValidatedSanitizedInput.InputNotValidated, WordPress.Security.ValidatedSanitizedInput.MissingUnslash, WordPress.Security.ValidatedSanitizedInput.InputNotSanitized
        parse_str( $_SERVER['QUERY_STRING'], $params );
        return $params;
    }

    private function get_next_link( array $args, string $rest_url, int $total_pages = 20 ) {
        $page = intval( $args['page'] ) ?? 1;

        if ( $total_pages <= $page ) {
            return null;
        }
    
        $args['page'] = $page + 1;

        return add_query_arg( $args, $rest_url ); 
    }

    private function get_prev_link( array $args, string $rest_url ) {
        if ( empty( $args['page'] ) || ! is_int( $args['page'] ) || 1 == $args['page'] ) {
            return null;
        }
        
        $args['page'] -= 1;

        return add_query_arg( $args, $rest_url ); 
    }
}