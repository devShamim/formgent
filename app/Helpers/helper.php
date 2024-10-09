<?php

defined( 'ABSPATH' ) || exit;

use FormGent\WpMVC\App;
use FormGent\DI\Container;
use FormGent\App\Fields\Field;
use FormGent\App\Utils\DateTime;
use FormGent\App\Repositories\ResponseRepository;
use FormGent\App\Repositories\ResponseTokenRepository;

function formgent():App {
    return App::$instance;
}

function formgent_config( string $config_key ) {
    return formgent()::$config->get( $config_key );
}

function formgent_app_config( string $config_key ) {
    return formgent_config( "app.{$config_key}" );
}

function formgent_version() {
    return formgent_app_config( 'version' );
}

function formgent_container():Container {
    return formgent()::$container;
}

function formgent_make( string $class ) {
    return formgent_container()->make( $class );
}

function formgent_singleton( string $class ) {
    return formgent_container()->get( $class );
}

function formgent_url( string $url = '' ) {
    return formgent()->get_url( $url );
}

function formgent_dir( string $dir = '' ) {
    return formgent()->get_dir( $dir );
}

function formgent_render_icon( string $icon ) {
    //phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
    echo file_get_contents( formgent_dir( "resources/svg/icons/{$icon}.svg" ) );
}

function formgent_date_time_format() {
    return apply_filters( 'formgent_date_time_format', 'Y-m-d H:i:s' );
}

function formgent_now() {
    return DateTime::now();
}

function formgent_is_valid_date( string $date, string $format ) {
    $date_time = \DateTime::createFromFormat( $format, $date );
    return $date_time && $date_time->format( $format ) === $date;
}

/**
 * Get current user ip address
 *
 * @return string|null
 */
function formgent_get_user_ip_address() {
    // Check for shared Internet/ISP IP
    if ( ! empty( $_SERVER['HTTP_CLIENT_IP'] ) && filter_var( $_SERVER['HTTP_CLIENT_IP'], FILTER_VALIDATE_IP ) ) { //phpcs:ignore WordPress.Security.ValidatedSanitizedInput.MissingUnslash
        return sanitize_text_field( wp_unslash( $_SERVER['HTTP_CLIENT_IP'] ) );
    }

    // Check for IP addresses passed by proxies
    if ( ! empty( $_SERVER['HTTP_X_FORWARDED_FOR'] ) ) { //phpcs:ignore WordPress.Security.ValidatedSanitizedInput.MissingUnslash
        // Extract IP addresses
        $ip_addresses = explode(
            ',', sanitize_text_field( wp_unslash( $_SERVER['HTTP_X_FORWARDED_FOR'] ) )
        );

        // Check each IP address
        foreach ( $ip_addresses as $ip ) {
            $ip = trim( $ip );
            if ( filter_var( $ip, FILTER_VALIDATE_IP ) ) {
                return $ip;
            }
        }
    }

    // Check for the remote IP address
    if ( ! empty( $_SERVER['REMOTE_ADDR'] ) && filter_var( $_SERVER['REMOTE_ADDR'], FILTER_VALIDATE_IP ) ) { //phpcs:ignore WordPress.Security.ValidatedSanitizedInput.MissingUnslash
        return sanitize_text_field( wp_unslash( $_SERVER['REMOTE_ADDR'] ) );
    }

    return null;
}

/**
 * Get value form nested array
 *
 * @param string $keys Comma separated array keys
 * @param array $values
 * @param mixed $default
 * @return mixed
 */
function formgent_get_nested_value( string $keys, array $values, $default = null ) {
    $keys = explode( '.', $keys );

    $item = $values;

    foreach ( $keys as $key ) {
        if ( ! isset( $item[ $key ] ) ) {
            return $default;
        }
        $item = $item[$key];
    }
    return $item;
}

function formgent_field_handler( string $field_type ):Field {
    $field_handler_class = formgent_config( "fields.{$field_type}.class" );

    if ( ! class_exists( $field_handler_class ) ) {
        throw new Exception( esc_html__( 'Field handler not found.', 'formgent' ), 500 );
    }

    $field_handler = formgent_make( $field_handler_class );

    if ( ! $field_handler instanceof Field ) {
        throw new Exception( esc_html__( 'Please use a valid field handler.', 'formgent' ), 500 );
    }

    return $field_handler;
}

function formgent_is_one_level_array( array $array ) {
    foreach ( $array as $value ) {
        if ( is_array( $value ) ) {
            return false; // Contains nested array
        }
    }
    return true; // Valid one-level array
}

function formgent_generate_token() {
    $time   = microtime( true );
    $random = bin2hex( random_bytes( 5 ) );
    $token  = $random . $time;
    return $token;
}

function formgent_post_type() {
    return formgent_app_config( 'post_type' );
}

function formgent_get_form_field_settings( array $parsed_blocks, bool $remove_label = false, string $array_key = 'name' ): array {
    $blocks            = formgent_config( 'blocks' );
    $registered_blocks = WP_Block_Type_Registry::get_instance()->get_all_registered();

    $settings = [];

    foreach ( $parsed_blocks as $parsed_block ) {
        $block_name = $parsed_block['blockName'];

        if ( ! isset( $blocks[$block_name] ) ) {
            // Handle inner blocks if any
            if ( ! empty( $parsed_block['innerBlocks'] ) ) {
                $settings = array_merge( $settings, formgent_get_form_field_settings( $parsed_block['innerBlocks'], $remove_label ) );
            }
            continue;
        }

        // Initialize attributes with default values
        $default_attributes = [];

        if ( ! empty( $registered_blocks[$block_name] ) ) {
            foreach ( $registered_blocks[$block_name]->get_attributes() as $key => $attr ) {
                if ( isset( $attr['default'] ) ) {
                    $default_attributes[$key] = $attr['default'];
                }
            }
        }

        $attributes = array_merge( $default_attributes, $parsed_block['attrs'] );

        if ( $remove_label ) {
            unset( $attributes['label'] );
            unset( $attributes['sub_label'] );
            unset( $attributes['description'] );
            unset( $attributes['options'] );
            unset( $attributes['button_text'] );
        }

        $attributes['field_type'] = $blocks[$block_name]['field_type'];
        $setting_key              = $attributes[$array_key];

        $settings[$setting_key] = $attributes;

        // Handle inner blocks recursively
        if ( ! empty( $parsed_block['innerBlocks'] ) ) {
            $settings[$setting_key]['children'] = formgent_get_form_field_settings( $parsed_block['innerBlocks'], $remove_label );
        }
    }

    return $settings;
}

function formgent_get_response_by_token( string $token, int $form_id ) {
    /**
     * @var ResponseTokenRepository $response_token_repository
     */
    $response_token_repository = formgent_singleton( ResponseTokenRepository::class );
    $token_data                = $response_token_repository->get_by_token( $form_id, $token );

    if ( ! $token_data ) {
        return false;
    }

    /**
     * @var ResponseRepository $response_repository
     */
    $response_repository = formgent_singleton( ResponseRepository::class );
    return $response_repository->get_by_id( $token_data->response_id );
}

require_once __DIR__ . '/form.php';