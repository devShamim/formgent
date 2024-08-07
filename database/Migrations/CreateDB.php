<?php

namespace FormGent\Database\Migrations;

defined( 'ABSPATH' ) || exit;

use FormGent\WpMVC\Contracts\Migration;

class CreateDB implements Migration {
    public function more_than_version() {
        return '1.0.0';
    }

    public function execute(): bool {
        global $wpdb;

        $charset_collate = $wpdb->get_charset_collate();

        if ( ! function_exists( 'dbDelta' ) ) {
            require_once ABSPATH . 'wp-admin/includes/upgrade.php';
        }

        $db_prefix = "{$wpdb->prefix}formgent_";

        // -- -----------------------------------------------------
        // -- Table responses
        // -- -----------------------------------------------------

        $sql = "CREATE TABLE {$db_prefix}responses (
            `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
            `form_id` BIGINT UNSIGNED NOT NULL,
            `is_read` TINYINT NOT NULL DEFAULT 0 COMMENT 'value: 0/1',
            `is_completed` TINYINT NOT NULL DEFAULT 0 COMMENT 'value: 0/1',
            `is_starred` TINYINT NOT NULL DEFAULT 0 COMMENT 'value: 0/1',
            `ip` VARCHAR(50) NULL,
            `device` VARCHAR(50) NULL,
            `browser` VARCHAR(50) NULL,
            `browser_version` VARCHAR(50) NULL,
            `created_by` BIGINT UNSIGNED NULL,
            `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
            `updated_at` TIMESTAMP NULL ON UPDATE CURRENT_TIMESTAMP,
            PRIMARY KEY (`id`)
        ) {$charset_collate};

        -- -----------------------------------------------------
        -- Table fields
        -- -----------------------------------------------------

        CREATE TABLE {$db_prefix}answers (
            `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
            `response_id` BIGINT UNSIGNED NOT NULL,
            `form_id` BIGINT UNSIGNED NOT NULL,
            `parent_id` BIGINT UNSIGNED NULL,
            `field_id` VARCHAR(50) NOT NULL,
            `field_type` VARCHAR(50) NOT NULL,
            `value` LONGTEXT NULL,
            `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
            `updated_at` TIMESTAMP NULL ON UPDATE CURRENT_TIMESTAMP,
            PRIMARY KEY (`id`)
        ) {$charset_collate};

        -- -----------------------------------------------------
        -- Table notes
        -- -----------------------------------------------------

        CREATE TABLE {$db_prefix}notes (
            `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
            `response_id` BIGINT UNSIGNED NOT NULL,
            `note` LONGTEXT NULL,
            `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
            `updated_at` TIMESTAMP NULL ON UPDATE CURRENT_TIMESTAMP,
            PRIMARY KEY (`id`)
        ) {$charset_collate};
        ";

        dbDelta( $sql );

        return true;
    }
}