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
        <div class='formgent-has-input-icon'>
            <?php if ( $attributes['show_field_icon'] ) : ?>
                <span class='formgent-input-icon'>
                    <?php formgent_render_icon( 'envelope' ); ?>
                </span>
            <?php endif; ?>

            <input
                class="formgent-editor-block-list__single__input"
                type="email"
                name="<?php echo esc_attr( $attributes['name'] ); ?>"
                id="<?php echo esc_attr( $attributes['name'] ); ?>"
                data-wp-context='{ "name": "<?php echo esc_attr( $attributes['name'] ); ?>" }'
                placeholder="<?php echo esc_attr( $attributes['placeholder'] ); ?>"
                data-wp-interactive="formgent/form"
                data-wp-on--input="actions.updateInput"
                data-wp-bind--value="actions.getValue"
            />
        </div>

        <?php if ( ! empty( $attributes['sub_label'] ) ) : ?>
            <span class="formgent-editor-block-list__single__sub-label">
                <?php echo wp_kses_post( $attributes['sub_label'] ); ?>
            </span>
        <?php endif; ?>
    </div>
</div>

<?php if ( $attributes['enable_confirmation_field'] ) :
    $name = $attributes['name'] . '_confirm'; ?>

<div style="height: <?php echo esc_attr( $attributes['confirmation_field_gap'] ); ?>"></div>

<div class="formgent-editor-block-list__single formgent-editor-block-list__single--csr formgent-editor-block-align-<?php echo esc_attr( $attributes['label_alignment'] ); ?>">
    <?php if ( ! empty( $attributes['confirm_label'] ) ) : ?>
    <label
        for="<?php echo esc_attr( $name ); ?>"
        class= "formgent-editor-block-list__single__label-container formgent-label-align-<?php echo esc_attr( $attributes['label_alignment'] ); ?>"
    >
        <?php echo wp_kses_post( $attributes['confirm_label'] ); ?>
        <span class="formgent-editor-block-list__single__label__required">*</span>
    </label>
    <?php endif; ?>
    <div class="formgent-editor-block-list__single__wrapper">
        <div class='formgent-has-input-icon'>
            <?php if ( $attributes['show_field_icon'] ) : ?>
                <span class='formgent-input-icon'><?php formgent_render_icon( 'envelope' ); ?></span>
            <?php endif; ?>

            <input
                class="formgent-editor-block-list__single__input"
                type="email"
                name="<?php echo esc_attr( $name ); ?>"
                id="<?php echo esc_attr( $name ); ?>"
                data-wp-context='{ "name": "<?php echo esc_attr( $name ); ?>" }'
                placeholder="<?php echo esc_attr( $attributes['confirm_placeholder'] ); ?>"
                data-wp-interactive="formgent/form"
                data-wp-on--input="actions.updateInput"
                data-wp-bind--value="actions.getValue"
            />
        </div>

        <?php if ( ! empty( $attributes['confirm_sub_label'] ) ) : ?>
            <span class="formgent-editor-block-list__single__sub-label">
                <?php echo wp_kses_post( $attributes['confirm_sub_label'] ); ?>
            </span>
        <?php endif; ?>
    </div>
</div>
<?php endif; ?>