<?php

defined( 'ABSPATH' ) || exit;

$unique_id = str_replace( '-', '_', wp_unique_id( 'formgent-store' ) );
?>

<div class="formgent-editor-block-list__single formgent-editor-block-list__single--csr formgent-block-width-<?php echo esc_attr( number_format( $attributes['block_width'] ) ); ?> formgent-editor-block-align-<?php echo esc_attr( $attributes['label_alignment'] ); ?>">
    <?php if ( ! empty( $attributes['label'] ) ) : ?>
        <label
            for="<?php echo esc_attr( $attributes['name'] ); ?>"
            class= "formgent-editor-block-list__single__label-container formgent-label-align-<?php echo esc_attr( $attributes['label_alignment'] ); ?>"
        >
            <?php echo wp_kses_post( $attributes['label'] ); ?>
            <?php if ( $attributes['required'] ) : ?>
                <span class="formgent-editor-block-list__single__label__required">
                    *
                </span>
            <?php endif; ?>
        </label>
    <?php endif; ?>
    <div
        class="formgent-editor-block-list__single__wrapper"
    >
        <div class="formgent-editor-block-list__single__phone">
            <!-- <span
                class="formgent-phone-initialization"
                data-wp-init="callbacks.phoneNumberInit"
                data-wp-key="<?php // echo esc_attr( $attributes['name'] ); ?>"
                name="<?php // echo esc_attr( $attributes['name'] ); ?>-<?php echo esc_attr( $unique_id ) ?>-dial-code"
            >
            </span> -->
            <div class="formgent-editor-block-list__single__dialer__content">
                <input
                    class="formgent-editor-block-list__single__input <?php $attributes['country_code'] ? 'formgent-editor-block-list__single__input--country-code' : ''; ?>"
                    type="text"
                    name="<?php echo esc_attr( $attributes['name'] ); ?>"
                    id="<?php echo esc_attr( $attributes['name'] ); ?>"
                    data-wp-context='{ "name": "<?php echo esc_attr( $attributes['name'] ); ?>" }'
                    placeholder="<?php echo esc_attr( $attributes['placeholder'] ); ?>"
                    data-wp-interactive="formgent/form"
                    data-wp-init="callbacks.phoneNumberInit"
                >
            </div>
        </div>
        <?php if ( ! empty( $attributes['sub_label'] ) ) : ?>
            <span class="formgent-editor-block-list__single__sub-label">
                <?php echo wp_kses_post( $attributes['sub_label'] ); ?>
            </span>
        <?php endif; ?>
    </div>
</div>