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
        $db_prefix       = "{$wpdb->prefix}formgent_";

        if ( ! function_exists( 'dbDelta' ) ) {
            require_once ABSPATH . 'wp-admin/includes/upgrade.php';
        }

        // -- -----------------------------------------------------
        // -- Table responses
        // -- -----------------------------------------------------
        $sql = "CREATE TABLE {$db_prefix}responses (
            `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
            `form_id` BIGINT UNSIGNED NOT NULL,
            `status` VARCHAR(50) NOT NULL DEFAULT 'publish' COMMENT 'value: draft, publish',
            `is_read` TINYINT NOT NULL DEFAULT 0 COMMENT 'value: 0/1',
            `is_completed` TINYINT NOT NULL DEFAULT 0 COMMENT 'value: 0/1',
            `completed_at` TIMESTAMP DEFAULT NULL,
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
        -- Table answers
        -- -----------------------------------------------------
        CREATE TABLE {$db_prefix}answers (
            `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
            `response_id` BIGINT UNSIGNED NOT NULL,
            `form_id` BIGINT UNSIGNED NOT NULL,
            `parent_id` BIGINT UNSIGNED NULL,
            `field_name` VARCHAR(50) NOT NULL,
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

        -- -----------------------------------------------------
        -- Table response_token
        -- -----------------------------------------------------
        CREATE TABLE {$db_prefix}response_token (
            `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
            `form_id` BIGINT UNSIGNED NOT NULL,
            `response_id` BIGINT UNSIGNED NOT NULL,
            `token` VARCHAR(255) NOT NULL,
            `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
            `expired_at` TIMESTAMP NULL,
            PRIMARY KEY (`id`)
        ) {$charset_collate};
        ";

        dbDelta( $sql );

        // Add constraints if they do not exist
        $this->add_constraints( $db_prefix );

        return true;
    }

    private function add_constraints( $db_prefix ) {
        global $wpdb;

        // Define constraints
        $tables = [
            'responses'      => [
                'form_id' => "{$wpdb->prefix}posts(ID)"
            ],
            'answers'        => [
                'form_id'     => "{$wpdb->prefix}posts(ID)",
                'response_id' => "{$db_prefix}responses(id)",
                'parent_id'   => "{$db_prefix}answers(id)"
            ],
            'notes'          => [
                'response_id' => "{$db_prefix}responses(id)"
            ],
            'response_token' => [
                'form_id'     => "{$wpdb->prefix}posts(ID)",
                'response_id' => "{$db_prefix}responses(id)"
            ]
        ];

        foreach ( $tables as $table => $constraints ) {
            $this->add_constraints_to_table( $table, $constraints, $db_prefix );
        }
    }

    private function add_constraints_to_table( $table, $constraints, $db_prefix ) {
        global $wpdb;

        // Check if the table exists
        $table_name = $db_prefix . $table;
        //phpcs:ignore WordPress.DB.PreparedSQL.InterpolatedNotPrepared
        $columns = $wpdb->get_col( "DESCRIBE {$table_name}", 0 );

        // Add foreign key constraints if columns exist
        foreach ( $constraints as $column => $reference ) {
            if ( in_array( $column, $columns ) ) {
                // Check if the constraint already exists
                $constraint_name = "fk_{$db_prefix}{$table}_{$column}";
                $result          = $wpdb->get_results(
                    $wpdb->prepare(
                        "SELECT CONSTRAINT_NAME 
                    FROM INFORMATION_SCHEMA.KEY_COLUMN_USAGE 
                    WHERE TABLE_SCHEMA = %s 
                    AND TABLE_NAME = %s 
                    AND CONSTRAINT_NAME = %s",
                        DB_NAME, // Use DB_NAME constant directly
                        $table_name,
                        $constraint_name
                    ) 
                );

                if ( empty( $result ) ) {
                    // Add foreign key constraint
                    //phpcs:ignore WordPress.DB.PreparedSQL.InterpolatedNotPrepared
                    $wpdb->query( "ALTER TABLE {$table_name} ADD CONSTRAINT {$constraint_name} FOREIGN KEY ({$column}) REFERENCES {$reference} ON DELETE CASCADE" );
                }
            }
        }
    }
}
