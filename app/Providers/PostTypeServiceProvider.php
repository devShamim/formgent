<?php

namespace FormGent\App\Providers;

defined( 'ABSPATH' ) || exit;

use FormGent\WpMVC\View\View;
use FormGent\WpMVC\Contracts\Provider;

class PostTypeServiceProvider implements Provider {
    public function boot() {
        add_action( 'init', [$this, 'register_post_type'] );
        add_filter( 'allowed_block_types_all', [$this, 'allow_blocks_for_formgent_form'], 10, 2 );
        add_filter( 'the_content', [$this, 'filter_the_content'] );
        add_filter( 'block_categories_all', [$this, 'filter_block_categories_all'], 10, 2 );
        add_action( 'admin_init', [$this, 'redirect_to_forms_page'] );
    }

    public function redirect_to_forms_page() {
        global $pagenow;

        //phpcs:ignore WordPress.Security.NonceVerification.Recommended
        if ( $pagenow !== 'edit.php' || empty( $_GET['post_type'] ) || 'formgent_form' !== $_GET['post_type'] ) {
            return;
        }

        wp_safe_redirect( admin_url( 'admin.php?page=formgent' ) );
        exit();
    }

    /**
     * Filters the default array of categories for block types.
     *
     * @param array[]                  $block_categories     Array of categories for block types.
     * @param \WP_Block_Editor_Context $block_editor_context The current block editor context.
     * @return array[] Array of categories for block types.
     */
    public function filter_block_categories_all( array $block_categories, \WP_Block_Editor_Context $block_editor_context ) : array {
        $block_categories[] = [
            'slug'  => 'formgent',
            'title' => esc_html__( 'FormGent', 'formgent' ),
            'icon'  => ''
        ];
    
        return $block_categories;
    }

    public function filter_the_content( string $content ) : string {
        global $post;

        if ( $post->post_type !==  formgent_post_type() ) {
            return $content;
        }

        return View::get(
            'form', [
                'form'   => $post,
                'fields' => $content
            ]
        );
    }

    function register_post_type() : void {
        $labels = [
            'name'                  => _x( 'Forms', 'Post type general name', 'formgent' ),
            'singular_name'         => _x( 'Form', 'Post type singular name', 'formgent' ),
            'menu_name'             => _x( 'Formgent Forms', 'Admin Menu text', 'formgent' ),
            'name_admin_bar'        => _x( 'Formgent Form', 'Add New on Toolbar', 'formgent' ),
            'add_new'               => __( 'Add New', 'formgent' ),
            'add_new_item'          => __( 'Add New Form', 'formgent' ),
            'new_item'              => __( 'New Form', 'formgent' ),
            'edit_item'             => __( 'Edit Form', 'formgent' ),
            'view_item'             => __( 'View Form', 'formgent' ),
            'all_items'             => __( 'All Forms', 'formgent' ),
            'search_items'          => __( 'Search Forms', 'formgent' ),
            'parent_item_colon'     => __( 'Parent Forms:', 'formgent' ),
            'not_found'             => __( 'No Forms found.', 'formgent' ),
            'not_found_in_trash'    => __( 'No Forms found in Trash.', 'formgent' ),
            'featured_image'        => _x( 'Form Cover Image', 'Overrides the “Featured Image” phrase for this post type. Added in 4.3', 'formgent' ),
            'set_featured_image'    => _x( 'Set cover image', 'Overrides the “Set featured image” phrase for this post type. Added in 4.3', 'formgent' ),
            'remove_featured_image' => _x( 'Remove cover image', 'Overrides the “Remove featured image” phrase for this post type. Added in 4.3', 'formgent' ),
            'use_featured_image'    => _x( 'Use as cover image', 'Overrides the “Use as featured image” phrase for this post type. Added in 4.3', 'formgent' ),
            'archives'              => _x( 'Form archives', 'The post type archive label used in nav menus. Default “Post Archives”. Added in 4.4', 'formgent' ),
            'insert_into_item'      => _x( 'Insert into Form', 'Overrides the “Insert into post”/”Insert into page” phrase (used when inserting media into a post). Added in 4.4', 'formgent' ),
            'uploaded_to_this_item' => _x( 'Uploaded to this Form', 'Overrides the “Uploaded to this post”/”Uploaded to this page” phrase (used when viewing media attached to a post). Added in 4.4', 'formgent' ),
            'filter_items_list'     => _x( 'Filter Forms list', 'Screen reader text for the filter links heading on the post type listing screen. Default “Filter posts list”/”Filter pages list”. Added in 4.4', 'formgent' ),
            'items_list_navigation' => _x( 'Forms list navigation', 'Screen reader text for the pagination heading on the post type listing screen. Default “Posts list navigation”/”Pages list navigation”. Added in 4.4', 'formgent' ),
            'items_list'            => _x( 'Forms list', 'Screen reader text for the items list heading on the post type listing screen. Default “Posts list”/”Pages list”. Added in 4.4', 'formgent' ),
        ];

        $args = [
            'labels'             => $labels,
            'public'             => true,
            'publicly_queryable' => true,
            'show_ui'            => true,
            'show_in_menu'       => false,
            'query_var'          => true,
            'rewrite'            => [ 'slug' => 'formgent-form' ],
            'capability_type'    => 'post',
            'has_archive'        => true,
            'hierarchical'       => false,
            'menu_position'      => null,
            'supports'           => ['title', 'editor', 'author' ],
            'show_in_rest'       => true, // Enables Gutenberg editor support
        ];

        register_post_type( formgent_post_type(), $args );
    }

        /**
     * Filters the allowed block types for all editor types.
     *
     * @since 5.8.0
     *
     * @param bool|string[]           $allowed_block_types  Array of block type slugs, or boolean to enable/disable all.
     *                                                      Default true (all registered block types supported).
     * @param \WP_Block_Editor_Context $block_editor_context The current block editor context.
     */
    function allow_blocks_for_formgent_form( $allowed_block_types, $editor_context ) {
        if ( empty( $editor_context->post->post_type ) || formgent_post_type() !== $editor_context->post->post_type ) {
            return $allowed_block_types;
        }

        $blocks = formgent_config( 'blocks' );
        unset( $blocks['formgent/form'] );
        $blocks = array_keys( $blocks );

        $blocks[] = 'core/heading';
        $blocks[] = 'core/paragraph';
        $blocks[] = 'core/spacer';

        return apply_filters( 'formgent_allowed_blocks',  $blocks );
    }
}
