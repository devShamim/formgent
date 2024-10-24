<?php defined( 'ABSPATH' ) || exit; ?>

<div class="formgent-editor-block-list__single formgent-editor-block-list__single--csr formgent-editor-block-align-<?php echo esc_attr( $attributes['label_alignment'] ); ?>">
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
        <textarea
            class="formgent-editor-block-list__single__input formgent-editor-block-list__single__input--textarea"
            type="text"
            name="<?php echo esc_attr( $attributes['name'] ); ?>"
            id="<?php echo esc_attr( $attributes['name'] ); ?>"
            data-wp-context='{ "name": "<?php echo esc_attr( $attributes['name'] ); ?>" }'
            placeholder="<?php echo esc_attr( $attributes['placeholder'] ); ?>"
            data-wp-interactive="formgent/form"
            data-wp-on--input="actions.updateInput"
            data-wp-bind--value="actions.getValue"
        ></textarea>
        <?php if ( ! empty( $attributes['sub_label'] ) ) : ?>
            <span class="formgent-editor-block-list__single__sub-label">
                <?php echo wp_kses_post( $attributes['sub_label'] ); ?>
            </span>
        <?php endif; ?>
    </div>
</div>