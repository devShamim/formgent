<?php

use FormGent\WpMVC\Enqueue\Enqueue;

defined( 'ABSPATH' ) || exit;

include_once __DIR__ . '/register.php';

Enqueue::register_script( 'formgent/components', 'build/js/components' );

/**
 * Load block styles for elementor builder
 */
//phpcs:ignore WordPress.Security.NonceVerification.Recommended
if ( isset( $_GET['elementor-preview'] ) ) {
    wp_enqueue_style( 'formgent/blocks-frontend', formgent_url( 'assets/build/css/blocks-frontend.css' ) );
}

$block_frontend_asset = include formgent_dir( 'assets/build/js/blocks-frontend.asset.php' );

wp_enqueue_script_module( 'formgent/blocks-frontend', formgent_url( 'assets/build/js/blocks-frontend.js' ), $block_frontend_asset['dependencies'], $block_frontend_asset['version'] );