<?php defined( 'ABSPATH' ) || exit; ?>

<div class="formgent-editor-block-list__single formgent-editor-block-list__single--csr formgent-block-width-<?php echo esc_attr( number_format( $attributes['block_width'] ) ); ?>">
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
    <div class="formgent-editor-block-list__single__wrapper">
        <input
            class="formgent-editor-block-list__single__input"
            data-mask="<?php echo esc_attr( $attributes['mask_type'] ) ?>"
            type="text"
            name="<?php echo esc_attr( $attributes['name'] ); ?>"
            id="<?php echo esc_attr( $attributes['name'] ); ?>"
            placeholder="<?php echo esc_attr( $attributes['placeholder'] ); ?>"
            data-wp-interactive="formgent/form"
            data-wp-bind--value="context.data.<?php echo esc_attr( $attributes['name'] ); ?>"
            data-wp-init="callbacks.inputMaskInit"
        />
        <?php if ( ! empty( $attributes['sub_label'] ) ) : ?>
        <span class="formgent-editor-block-list__single__sub-label">
            <?php echo wp_kses_post( $attributes['sub_label'] ); ?>
        </span>
        <?php endif; ?>
    </div>
</div>