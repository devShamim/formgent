<?php

namespace FormGent\App\DTO;

defined( 'ABSPATH' ) || exit;

use FormGent\WpMVC\DTO\DTO;

class ResponseReadDTO extends DTO {
    private int $page;

    private int $per_page;

    private ?int $form_id = null;

    private ?int $is_read = null;

    private ?string $search = null;

    private ?string $order_by = null;

    private ?string $order_field_type = null;

    private ?string $order = null;

    /**
     * Get the value of page
     *
     * @return int
     */
    public function get_page() {
        return $this->page;
    }

    /**
     * Set the value of page
     *
     * @param int $page 
     *
     * @return self
     */
    public function set_page( int $page ) {
        $this->page = $page;

        return $this;
    }

    /**
     * Get the value of per_page
     *
     * @return int
     */
    public function get_per_page() {
        return $this->per_page;
    }

    /**
     * Set the value of per_page
     *
     * @param int $per_page 
     *
     * @return self
     */
    public function set_per_page( int $per_page ) {
        $this->per_page = $per_page;

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
     * Get the value of is_read
     *
     * @return int
     */
    public function get_is_read() {
        return $this->is_read;
    }

    /**
     * Set the value of is_read
     *
     * @param int $is_read 
     *
     * @return self
     */
    public function set_is_read( int $is_read ) {
        $this->is_read = $is_read;

        return $this;
    }

    /**
     * Get the value of search
     *
     * @return string
     */
    public function get_search() {
        return $this->search;
    }

    /**
     * Set the value of search
     *
     * @param string $search 
     *
     * @return self
     */
    public function set_search( string $search ) {
        $this->search = $search;

        return $this;
    }

    /**
     * Get the value of order_by
     *
     * @return string
     */
    public function get_order_by() {
        return $this->order_by;
    }

    /**
     * Set the value of order_by
     *
     * @param string $order_by 
     *
     * @return self
     */
    public function set_order_by( string $order_by ) {
        $this->order_by = $order_by;

        return $this;
    }

    /**
     * Get the value of order_field_type
     *
     * @return string
     */
    public function get_order_field_type() {
        return $this->order_field_type;
    }

    /**
     * Set the value of order_field_type
     *
     * @param string $order_field_type 
     *
     * @return self
     */
    public function set_order_field_type( string $order_field_type ) {
        $this->order_field_type = $order_field_type;

        return $this;
    }

    /**
     * Get the value of order
     *
     * @return string
     */
    public function get_order() {
        return $this->order;
    }

    /**
     * Set the value of order
     *
     * @param string $order 
     *
     * @return self
     */
    public function set_order( string $order ) {
        $this->order = $order;

        return $this;
    }
}