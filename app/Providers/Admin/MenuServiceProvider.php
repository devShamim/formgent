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
        add_menu_page( esc_html__( 'FormGent', 'formgent' ), esc_html__( 'FormGent', 'formgent' ), 'manage_options', 'formgent-menu', function () { }, '', 5 );
        add_submenu_page( 'formgent-menu', esc_html__( 'All Forms', 'formgent' ), esc_html__( 'All Forms', 'formgent' ), 'manage_options', 'formgent', [$this, 'content'] );

        remove_submenu_page( 'formgent-menu', 'formgent-menu' );
    }

    public function content() {
        echo '<div class="formgent-root"></div>';
    }
}