<?php

namespace FormGent\App\Providers\Admin;

defined( 'ABSPATH' ) || exit;

use FormGent\WpMVC\Contracts\Provider;

class MenuServiceProvider implements Provider
{
    public function boot() {
        add_action( 'admin_menu', [$this, 'action_admin_menu'] );
    }

    public function action_admin_menu() {
        $icon_dir = formgent_dir( 'assets/svg/sidebar-icon.svg' );
        //phpcs:ignore WordPress.WP.AlternativeFunctions.file_get_contents_file_get_contents
        $icon = file_get_contents( $icon_dir );
        $icon = 'data:image/svg+xml;base64,' . base64_encode( $icon );

        add_menu_page( esc_html__( 'FormGent', 'formgent' ), esc_html__( 'FormGent', 'formgent' ), 'manage_options', 'formgent-menu', function () { }, $icon, 5 );
        add_submenu_page( 'formgent-menu', esc_html__( 'All Forms', 'formgent' ), esc_html__( 'All Forms', 'formgent' ), 'manage_options', 'formgent', [$this, 'content'] );

        remove_submenu_page( 'formgent-menu', 'formgent-menu' );
    }

    public function content() {
        echo '<div class="formgent-root"></div>';
    }
}