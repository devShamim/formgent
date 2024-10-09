<?php

defined( 'ABSPATH' ) || exit;

use FormGent\WpMVC\App;

/**
 * Plugin Name:       FormGent
 * Description:       FormGent is the no-code, Gutenberg-native form builder you’ve been waiting for! Whether you want to create simple forms or plan for more dynamic, multi-step forms in the future—FormGent makes it easy. Built specifically for Gutenberg, the future of WordPress, FormGent focuses on delivering a fast and seamless form-building experience today, with powerful features like quizzes, payments, conversational forms, and AI on the way.
 * Version:           0.0.2
 * Requires at least: 6.6
 * Requires PHP:      7.4
 * Tested up to:      6.6
 * Author:            WpWax
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