<?php defined( 'ABSPATH' ) || exit; ?>

<div class="formgent-editor-block-list__single formgent-editor-block-list__single--csr formgent-editor-block-align-<?php echo esc_attr( $attributes['label_alignment'] ); ?>">
    <label
        for="<?php echo esc_attr( $attributes['name'] ); ?>"
        class= "formgent-editor-block-list__single__label-container formgent-label-align-<?php echo esc_attr( $attributes['label_alignment'] ); ?>"
    >
        <?php formgent_render( wp_kses_post( $attributes['label'] ) ); ?>
        <?php if ( $attributes['required'] ) : ?>
            <span class="formgent-editor-block-list__single__label__required">
                *
            </span>
        <?php endif; ?>
    </label>
    <div class="formgent-editor-block-list__single__wrapper">
        <div class="formgent-editor-block-list__single__box">
            <?php if ( ! empty( $attributes['options'] ) && is_array( $attributes['options'] ) ) : ?>
                <?php foreach ( $attributes['options'] as $index => $option ) : ?>
                    <div class="formgent-editor-block-list__single__box__choice">
                        <input
                            class="formgent-editor-block-list__single__input formgent-editor-block-list__single__input--radio"
                            type="radio"
                            name="<?php echo esc_attr( $attributes['name'] ); ?>"
                            id="<?php echo esc_attr( $option['value'] ); ?>"
                            checked=<?php echo $option['value'] === $option['id'] ? 'checked' : ''; ?>
                            data-wp-interactive="formgent/form"
                            data-wp-on--change="actions.updateInput"
                            data-wp-bind--value="context.data.<?php echo esc_attr( $attributes['name'] ); ?>"
                        />
                        <label for="<?php echo esc_attr( $option['value'] ); ?>">
                            <?php echo esc_attr( $option['label'] ); ?>
                        </label>
                    </div>
                <?php endforeach; ?>
            <?php endif; ?>
        </div>

        <?php if ( ! empty( $attributes['sub_label'] ) ) : ?>
            <span class="formgent-editor-block-list__single__sub-label">
                <?php formgent_render( wp_kses_post( $attributes['sub_label'] ) ); ?>
            </span>
        <?php endif; ?>
    </div>
</div>