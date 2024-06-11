<?php

namespace FormGent\App\DTO;

defined( 'ABSPATH' ) || exit;

class AnswerDTO extends DTO {
    private int $id;

    private int $response_id = 0;

    private int $form_id;

    private string $field_id;

    private string $field_type;

    private ?string $parent_id = null;

    private ?string $value = null;

    /**
     * Get the value of id
     *
     * @return int
     */
    public function get_id() {
        return $this->id;
    }

    /**
     * Set the value of id
     *
     * @param int $id 
     *
     * @return self
     */
    public function set_id( int $id ) {
        $this->id = $id;

        return $this;
    }

    /**
     * Get the value of response_id
     *
     * @return int
     */
    public function get_response_id() {
        return $this->response_id;
    }

    /**
     * Set the value of response_id
     *
     * @param int $response_id 
     *
     * @return self
     */
    public function set_response_id( int $response_id ) {
        $this->response_id = $response_id;

        return $this;
    }

    /**
     * Get the value of form_id
     *
     * @return int
     */
    public function get_form_id() {
        return $this->form_id;
    }

    /**
     * Set the value of form_id
     *
     * @param int $form_id 
     *
     * @return self
     */
    public function set_form_id( int $form_id ) {
        $this->form_id = $form_id;

        return $this;
    }

    /**
     * Get the value of field_id
     *
     * @return string
     */
    public function get_field_id() {
        return $this->field_id;
    }

    /**
     * Set the value of field_id
     *
     * @param string $field_id 
     *
     * @return self
     */
    public function set_field_id( string $field_id ) {
        $this->field_id = $field_id;

        return $this;
    }

    /**
     * Get the value of field_type
     *
     * @return string
     */
    public function get_field_type() {
        return $this->field_type;
    }

    /**
     * Set the value of field_type
     *
     * @param string $field_type 
     *
     * @return self
     */
    public function set_field_type( string $field_type ) {
        $this->field_type = $field_type;

        return $this;
    }

    /**
     * Get the value of parent_id
     *
     * @return string
     */
    public function get_parent_id() {
        return $this->parent_id;
    }

    /**
     * Set the value of parent_id
     *
     * @param string $parent_id 
     *
     * @return self
     */
    public function set_parent_id( string $parent_id ) {
        $this->parent_id = $parent_id;

        return $this;
    }

    /**
     * Get the value of value
     *
     * @return string
     */
    public function get_value() {
        return $this->value;
    }

    /**
     * Set the value of value
     *
     * @param string $value 
     *
     * @return self
     */
    public function set_value( string $value ) {
        $this->value = $value;

        return $this;
    }
}