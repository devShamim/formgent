<?php defined( 'ABSPATH' ) || exit; ?>

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
    <div class="formgent-editor-block-list__single__wrapper formgent-editor-block-list__single__wrapper--single-choice">

        <div class="formgent-editor-block-list__single__box formgent-single-choice-<?php echo esc_attr( $attributes['name'] ); ?>" >
            <?php if ( ! empty( $attributes['options'] ) && is_array( $attributes['options'] ) ) : ?>
                <?php foreach ( $attributes['options'] as $index => $option ) : ?>
                    <div class="formgent-editor-block-list__single__box__choice formgent-editor-block-list__single__box__choice--<?php echo esc_attr( $attributes['style'] ); ?>">
                        <input
                            class="formgent-editor-block-list__single__input formgent-editor-block-list__single__input--radio"
                            type="radio"
                            name="<?php echo esc_attr( $attributes['name'] ); ?>"
                            id="<?php echo esc_attr( $option['id'] ); ?>"
                            data-wp-interactive="formgent/form"
                            data-wp-on--change="actions.updateInput"
                            value="<?php echo esc_attr( $option['value'] ); ?>"
                        />
                        <label for="<?php echo esc_attr( $option['id'] ); ?>" class="formgent-editor-block-list__single__label">
                            <?php echo esc_html( $option['label'] ); ?>
                        </label>
                    </div>
                <?php endforeach; ?>
            <?php endif; ?>
        </div>
        <?php if ( ! empty( $attributes['sub_label'] ) ) : ?>
            <span class="formgent-editor-block-list__single__sub-label">
                <?php echo wp_kses_post( $attributes['sub_label'] ); ?>
            </span>
        <?php endif; ?>
    </div>
</div>