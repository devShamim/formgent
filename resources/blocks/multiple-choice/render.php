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
    <div class="formgent-editor-block-list__single__wrapper formgent-editor-block-list__single__wrapper--multi-choice">
        <div class="formgent-editor-block-list__single__box formgent-multiple-choice-<?php echo esc_attr( $attributes['name'] ); ?>">
            <?php if ( ! empty( $attributes['options'] ) && is_array( $attributes['options'] ) ) : ?>
                <?php foreach ( $attributes['options'] as $index => $option ) : ?>
                    <div class="formgent-editor-block-list__single__box__choice formgent-editor-block-list__single__box__choice--<?php echo esc_attr( $attributes['style'] ); ?>">
                        <input
                            class="formgent-editor-block-list__single__input formgent-editor-block-list__single__input--checkbox"
                            type="checkbox"
                            name="<?php echo esc_attr( $attributes['name'] ); ?>"
                            id="<?php echo esc_attr( $option['id'] ); ?>"
                            data-wp-interactive="formgent/form"
                            data-wp-on--change="actions.updateMultiChoice"
                            value="<?php echo esc_attr( $option['value'] ); ?>"
                        />
                        <label for="<?php echo esc_attr( $option['id'] ); ?>" class="formgent-editor-block-list__single__label">
                            <span class="formgent-editor-block-list__single__checkbox">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="#fff" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                            </span>
                            <?php echo esc_attr( $option['label'] ); ?>
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