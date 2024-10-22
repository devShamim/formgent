<?php

defined( 'ABSPATH' ) || exit;

use FormGent\WpMVC\App;

/**
 * Plugin Name:       FormGent
 * Description:       A no-code AI-powered form builder for WordPress. Drag-and-drop forms, mobile-first, and future-ready for quizzes, payments, and more!
 * Version:           0.0.5
 * Requires at least: 6.6
 * Requires PHP:      7.4
 * Tested up to:      6.6
 * Author:            wpWax - Contact Form Plugin & WP Form Builder
 * Author URI:        http://wpwax.com
 * License:           GPL v3 or later
 * License URI:       http://www.gnu.org/licenses/gpl-3.0.html
 * Text Domain:       formgent
 * Domain Path:       /languages
 */

require_once __DIR__ . '/vendor/vendor-src/autoload.php';
require_once __DIR__ . '/app/Helpers/helper.php';

final class FormGent
{
    public static FormGent $instance;

    public static function instance(): FormGent {
        if ( empty( self::$instance ) ) {
            self::$instance = new self;
        }
        return self::$instance;
    }

    public function load() {

        // Run Activation Tasks
        register_activation_hook(
            __FILE__, function() {
                new FormGent\App\Setup\Activation;
            } 
        );

        $application = App::instance();

        $application->boot( __FILE__, __DIR__ );

        /**
         * Fires once activated plugins have loaded.
         */
        add_action(
            'plugins_loaded', function () use ( $application ): void {

                do_action( 'before_load_formgent' );

                $application->load();

                do_action( 'after_load_formgent' );
            }
        );
    }
}

FormGent::instance()->load();