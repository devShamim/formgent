<?php defined( 'ABSPATH' ) || exit; ?>

<div class="formgent-editor-block-list__single formgent-editor-block-list__single--csr">
    <div class="formgent-editor-block-list__single__wrapper formgent-editor-block-list__single__wrapper--gdpr formgent-label-align-<?php echo esc_attr( $attributes['label_alignment'] ); ?>">
        <input
            class="formgent-editor-block-list__single__input formgent-editor-block-list__single__input--checkbox"
            type="checkbox"
            id="<?php echo esc_attr( $attributes['id'] ); ?>"
            name="<?php echo esc_attr( $attributes['name'] ); ?>"
            data-wp-interactive="formgent/form"
            data-wp-on--click="actions.updateGdpr"
        />
        <label for="<?php echo esc_attr( $attributes['id'] ); ?>" class="formgent-editor-block-list__single__label-container">
            <span class="formgent-editor-block-list__checkbox">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#fff" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-check"><polyline points="20 6 9 17 4 12"></polyline></svg>
            </span>
            <span class="formgent-editor-block-list__single__sub-label">
                <?php echo wp_kses_post( $attributes['description'] ); ?>
            </span>
            <?php if ( $attributes['required'] ) : ?>
                <span class="formgent-editor-block-list__single__label__required">
                    *
                </span>
            <?php endif; ?>
        </label>
    </div>
</div>