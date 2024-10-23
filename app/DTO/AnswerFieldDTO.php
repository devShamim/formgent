<?php

namespace FormGent\App\DTO;

defined( 'ABSPATH' ) || exit;

use FormGent\App\DTO\AnswerDTO;

class AnswerFieldDTO extends AnswerDTO {
    private string $field_label;

    private ?array $children;

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

    /**
     * Get the value of children
     *
     * @return string
     */
    public function get_children():array {
        return $this->children;
    }

    /**
     * Set the value of children
     *
     * @param array $children 
     *
     * @return self
     */
    public function set_children( AnswerFieldDTO ...$children ):self {
        $this->children = $children;

        return $this;
    }
}