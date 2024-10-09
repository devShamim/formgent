<?php defined( 'ABSPATH' ) || exit;

if ( empty( $form->post_content ) ) {
    return;
}

wp_enqueue_script( 'wp-api-fetch' );

$data      = formgent_get_form_field_settings( parse_blocks( $form->post_content ), true );
$unique_id = str_replace( '-', '_', wp_unique_id( 'formgent-store' ) );
$context   = [
    'isResponseTokenGenerating' => false,
    'isResponseSubmitting'      => false,
    'formId'                    => $form->ID,
    'blocksSettings'            => $data,
    'data'                      => formgent_form_default_values( $data ),
];

?>
<div class="formgent-form <?php echo isset( $css_class ) ? esc_attr( $css_class ) : ''; ?>">
    <form
        id="formgent-<?php echo esc_attr( $unique_id ) ?>"
        <?php 
        if ( isset( $is_block ) ) {
            //phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
            echo get_block_wrapper_attributes();
        }
        ?>
        data-wp-interactive="formgent/form"
        data-wp-context='<?php echo wp_json_encode( $context ); ?>'
        data-wp-init="callbacks.init"
        data-wp-bind--disable="context.isResponseSubmitting"
    >
        <div class="formgent-notices"></div>
        <?php
        //phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
        echo do_blocks( $form->post_content );
        ?>
        <!-- Honeypot field -->
        <input
            type="hidden"
            name="formgent-honeypot-<?php echo esc_attr( $form->ID ) ?>"
            id="formgent-honeypot-<?php echo esc_attr( $form->ID ) ?>"
        >
    </form>
</div>