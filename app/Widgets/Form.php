<?php

namespace FormGent\App\Widgets;

defined( 'ABSPATH' ) || exit;

use Elementor\Widget_Base;
use Elementor\Controls_Manager;
use FormGent\WpMVC\View\View;
use FormGent\App\Models\Post;

class Form extends Widget_Base {
    public static function get_type() {
        return 'widget';
    }

    public function get_name() {
        return 'formgent_forms';
    }

    public function get_title() {
        return 'FormGent';
    }

    public function get_keywords() {
        return [ 'form', 'forms', 'formgent'];
    }

    protected function register_controls() {
        $this->start_controls_section(
            'content_section',
            [
                'label' => __( 'Forms', 'formgent' ),
                'tab'   => Controls_Manager::TAB_CONTENT,
            ]
        );

        $this->add_control(
            'form_id',
            [
                'label'       => esc_html__( 'Select Form', 'formgent' ),
                'label_block' => true,
                'type'        => 'formgent-select',
            ]
        );

        $this->end_controls_section();
    }

    protected function render() {
        $settings = $this->get_settings_for_display();

        if ( '0' === $settings['form_id'] ) {
            return;
        }

        $form = Post::query()->select( 'ID', 'post_content' )->where( 'ID', $settings['form_id'] )->where( 'post_type', formgent_post_type() )->where( 'post_status', 'publish' )->first();

        if ( empty( $form ) ) {
            echo "Form not found";
            return;
        }

        View::render(
            'form', [
                'form'   => $form,
                'fields' => do_blocks( $form->post_content )
            ]
        );
    }
}