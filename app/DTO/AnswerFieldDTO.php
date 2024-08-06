<?php

namespace FormGent\App\DTO;

defined( 'ABSPATH' ) || exit;

class AnswerFieldDTO extends AnswerDTO {
    private string $field_name;

    private string $field_label;

    /**
     * Get the value of field_name
     *
     * @return string
     */
    public function get_field_name():string {
        return $this->field_name;
    }

    /**
     * Set the value of field_name
     *
     * @param string $field_name 
     *
     * @return self
     */
    public function set_field_name( string $field_name ):self {
        $this->field_name = $field_name;

        return $this;
    }

    /**
     * Get the value of field_label
     *
     * @return string
     */
    public function get_field_label():string {
        return $this->field_label;
    }

    /**
     * Set the value of field_label
     *
     * @param string $field_label 
     *
     * @return self
     */
    public function set_field_label( string $field_label ):self {
        $this->field_label = $field_label;

        return $this;
    }
}