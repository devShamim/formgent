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
    <div class="formgent-editor-block-list__single__wrapper">
        <select
            class="formgent-editor-block-list__single__input formgent-editor-block-list__single__input--select"
            name="<?php echo esc_attr( $attributes['name'] ); ?>"
            id="<?php echo esc_attr( $attributes['name'] ); ?>"
            data-wp-context='{ "name": "<?php echo esc_attr( $attributes['name'] ); ?>" }'
            data-wp-interactive="formgent/form"
            data-wp-init="callbacks.dropdownInit"
            placeholder="Select a option..."
            autocomplete="off"
        >
            <?php if ( ! empty( $attributes['options'] ) && is_array( $attributes['options'] ) ) : ?>
                <option value="">Select an option ...</option>
                <?php foreach ( $attributes['options'] as $index => $option ) : ?>
                    <option
                        value="<?php echo esc_attr( $option['value'] ); ?>"
                    >
                        <?php echo esc_html( $option['label'] ); ?>
                    </option>
                <?php endforeach; ?>
            <?php endif; ?>
        </select>

        <?php if ( ! empty( $attributes['sub_label'] ) ) : ?>
            <span class="formgent-editor-block-list__single__sub-label">
                <?php echo wp_kses_post( $attributes['sub_label'] ); ?>
            </span>
        <?php endif; ?>
    </div>
</div>