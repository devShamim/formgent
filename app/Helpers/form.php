<?php

defined( 'ABSPATH' ) || exit;

function formgent_form_default_values_functions() {
    return apply_filters(
        'formgent_default_values_functions', [
            'ip'         => 'formgent_get_user_ip_address',
            'site_url'   => 'site_url',
            'site_title' => function() {
                return get_bloginfo( 'name' );
            },
            'user'       => function( $property ) {
                $user = wp_get_current_user();
                return isset( $user->$property ) ? $user->$property : '';
            }
        ]
    );
}

function formgent_form_default_values( array $data ) {
    $values_functions = formgent_form_default_values_functions();
    $dynamic_values   = [];

    return array_map(
        function( $item ) use ( $values_functions, &$dynamic_values ) {
            if ( empty( $item['value'] ) ) {
                return '';
            }

            $value = $item['value'];
            preg_match_all( '/\{(.*?)\}/', $value, $matches );

            foreach ( $matches[1] as $key => $variable ) {
                // Split the variable by dot notation
                $parts = explode( '.', $variable );
                $base  = array_shift( $parts );

                // Check if the value is already cached
                if ( ! isset( $dynamic_values[$variable] ) ) {
                    $dynamic_value = '';

                    if ( isset( $values_functions[$base] ) && is_callable( $values_functions[$base] ) ) {
                        // Resolve the user property if applicable
                        if ( $base === 'user' && ! empty( $parts ) ) {
                            $property      = implode( '.', $parts );
                            $dynamic_value = $values_functions[$base]( $property );
                        } else {
                            $dynamic_value = $values_functions[$base]();
                        }
                    }
                    $dynamic_values[$variable] = $dynamic_value;
                }

                // Replace the placeholder with the resolved value
                $value = str_replace( $matches[0][$key], $dynamic_values[$variable], $value );
            }

            return $value;
        }, $data
    );
}