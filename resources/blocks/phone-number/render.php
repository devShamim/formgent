<?php

defined( 'ABSPATH' ) || exit; 

$unique_id = str_replace( '-', '_', wp_unique_id( 'formgent-store' ) );
// $countries = formgent_config( 'countries' );
// $flag_url  = formgent_url( 'assets/images/flags' );
?>

<div class="formgent-form-field">
    <label for="<?php echo esc_attr( $attributes['name'] ); ?>" class="formgent-form-field__label"><?php formgent_render( wp_kses_post( $attributes['label'] ) ) ?></label>
    <div 
        class="formgent-editor-block-list__single__wrapper formgent-editor-block-list__single__phone"
    >
        <select 
            name="<?php echo esc_attr( $attributes['name'] ); ?>-dial-code"
            id="<?php echo esc_attr( $attributes['name'] ); ?>-<?php formgent_render( $unique_id ) ?>-dial-code"
            data-wp-on--change="actions.updateDialCode"
        >
        </select>
        <span 
            class="formgent-phone-initialization"
            data-wp-init="callbacks.phoneNumberInit"
            data-wp-key="<?php echo esc_attr( $attributes['name'] ); ?>"
        >
        </span>
        <div className="formgent-editor-block-list__single__dialer__content">
            <span data-wp-interactive="formgent/form" data-wp-text="context.data.<?php echo esc_attr( $attributes['name'] ); ?>.dialCode"></span>
            <input
                type="text"
                name="<?php echo esc_attr( $attributes['name'] ); ?>"
                id="<?php echo esc_attr( $attributes['name'] ); ?>-<?php formgent_render( $unique_id ) ?>"
                class="formgent-form-field__element"
                
                data-wp-interactive="formgent/form"
                data-wp-on--input="actions.updatePhoneNumber"
                data-wp-bind--value="context.data.<?php echo esc_attr( $attributes['name'] ); ?>.number"
            >
        </div>
    </div>
</div>