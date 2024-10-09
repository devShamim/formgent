<?php

namespace FormGent\App\DTO;

defined( 'ABSPATH' ) || exit;

use FormGent\WpMVC\DTO\DTO;

class FormDTO extends DTO {
    private int $id;

    private string $title;

    private string $status = 'draft';

    private string $type;

    private string $content = '';

    private bool $save_incomplete_data = false;

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
     * Get the value of title
     *
     * @return string
     */
    public function get_title() {
        return $this->title;
    }

    /**
     * Set the value of title
     *
     * @param string $title 
     *
     * @return self
     */
    public function set_title( string $title ) {
        $this->title = $title;

        return $this;
    }

    /**
     * Get the value of status
     *
     * @return string
     */
    public function get_status() {
        return $this->status;
    }

    /**
     * Set the value of status
     *
     * @param string $status 
     *
     * @return self
     */
    public function set_status( string $status ) {
        $this->status = $status;

        return $this;
    }

    /**
     * Get the value of type
     *
     * @return string
     */
    public function get_type() {
        return $this->type;
    }

    /**
     * Set the value of type
     *
     * @param string $type 
     *
     * @return self
     */
    public function set_type( string $type ) {
        $this->type = $type;

        return $this;
    }

    /**
     * Get the value of content
     *
     * @return string
     */
    public function get_content() {
        return $this->content;
    }

    /**
     * Set the value of content
     *
     * @param string $content 
     *
     * @return self
     */
    public function set_content( string $content ) {
        $this->content = $content;

        return $this;
    }

    /**
     * Get the value of save_incomplete_data
     *
     * @return bool
     */
    public function is_save_incomplete_data() {
        return $this->save_incomplete_data;
    }

    /**
     * Set the value of save_incomplete_data
     *
     * @param bool $save_incomplete_data 
     *
     * @return self
     */
    public function set_save_incomplete_data( bool $save_incomplete_data ) {
        $this->save_incomplete_data = $save_incomplete_data;

        return $this;
    }
}