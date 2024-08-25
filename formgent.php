<?php

defined( 'ABSPATH' ) || exit;

use FormGent\WpMVC\App;

/**
 * Plugin Name:       FormGent
 * Description:       WordPress Form Builder Plugin aims to enhance user experience in creating forms on WordPress by integrating advanced functionalities that are currently either missing or underdeveloped in existing plugins. Our goal is to provide a solution that is both powerful for developers and accessible for non-technical users, focusing on innovative features such as AI-driven form optimizations, real-time collaboration, and enhanced security measures.
 * Version:           1.0.0-beta1
 * Requires at least: 6.0
 * Requires PHP:      7.4
 * Tested up to:      6.5
 * Author:            wpwax
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