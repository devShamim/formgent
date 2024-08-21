<?php

defined( 'ABSPATH' ) || exit; 

$allowed_html = wp_kses_allowed_html( 'post' );

?>

<div class="formgent-editor-block-list__single formgent-editor-block-list__single--csr">
    <label
        for="<?php echo esc_attr( $attributes['name'] ); ?>"
        class= "formgent-editor-block-list__single__label-container formgent-label-align-<?php echo esc_attr( $attributes['label_alignment'] ); ?>"
    >
        <?php formgent_render( wp_kses( $attributes['label'], $allowed_html ) ); ?>
        <?php if ( $attributes['required'] ) : ?>
            <span class="formgent-editor-block-list__single__label__required">
                *
            </span>
        <?php endif; ?>
    </label>
    <div class="formgent-editor-block-list__single__wrapper">
        <input
            class="formgent-editor-block-list__single__input"
            type="text"
            name="<?php echo esc_attr( $attributes['name'] ); ?>"
            id="<?php echo esc_attr( $attributes['name'] ); ?>"
            placeholder="<?php echo esc_attr( $attributes['placeholder'] ); ?>"
            data-wp-interactive="formgent/form"
            data-wp-on--input="actions.updateInput"
            data-wp-bind--value="context.data.<?php echo esc_attr( $attributes['name'] ); ?>"
        />
        <span class="formgent-editor-block-list__single__sub-label">
            <?php formgent_render( wp_kses( $attributes['sub_label'], $allowed_html ) ); ?>
        </span>
    </div>
</div>