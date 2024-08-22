<?php

namespace FormGent\App\DTO;

defined( 'ABSPATH' ) || exit;

use FormGent\App\EnumeratedList\ResponseStatus;

class ResponseDTO extends DTO {
    private int $id;

    private int $form_id;

    private string $status = ResponseStatus::PUBLISH;
    
    private int $is_read = 0;

    private int $is_completed = 1;

    private ?string $completed_at = null;

    private string $ip;

    private ?int $created_by = null;

    private ?string $device = null;

    private ?string $browser = null;

    private ?string $browser_version = null;

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
     * Get the value of string
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
     * Get the value of is_completed
     *
     * @return int
     */
    public function get_is_completed() {
        return $this->is_completed;
    }

    /**
     * Set the value of is_completed
     *
     * @param int $is_completed 
     *
     * @return self
     */
    public function set_is_completed( int $is_completed ) {
        $this->is_completed = $is_completed;

        return $this;
    }

        /**
     * Get the value of completed_at
     *
     * @return ?string
     */
    public function get_completed_at():?string {
        return $this->completed_at;
    }

    /**
     * Set the value of completed_at
     *
     * @param ?string $completed_at 
     *
     * @return self
     */
    public function set_completed_at( ?string $completed_at ):self {
        $this->completed_at = $completed_at;

        return $this;
    }

    /**
     * Get the value of ip
     *
     * @return string
     */
    public function get_ip() {
        return $this->ip;
    }

    /**
     * Set the value of ip
     *
     * @param string $ip 
     *
     * @return self
     */
    public function set_ip( string $ip ) {
        $this->ip = $ip;

        return $this;
    }

    /**
     * Get the value of created_by
     *
     * @return int
     */
    public function get_created_by() {
        return $this->created_by;
    }

    /**
     * Set the value of created_by
     *
     * @param int $created_by 
     *
     * @return self
     */
    public function set_created_by( ?int $created_by ) {
        $this->created_by = $created_by;

        return $this;
    }

    /**
     * Get the value of device
     *
     * @return string
     */
    public function get_device() {
        return $this->device;
    }

    /**
     * Set the value of device
     *
     * @param string $device 
     *
     * @return self
     */
    public function set_device( ?string $device ) {
        $this->device = $device;

        return $this;
    }

    /**
     * Get the value of browser
     *
     * @return string
     */
    public function get_browser() {
        return $this->browser;
    }

    /**
     * Set the value of browser
     *
     * @param string $browser 
     *
     * @return self
     */
    public function set_browser( ?string $browser ) {
        $this->browser = $browser;

        return $this;
    }

    /**
     * Get the value of browser_version
     *
     * @return string
     */
    public function get_browser_version() {
        return $this->browser_version;
    }

    /**
     * Set the value of browser_version
     *
     * @param string $browser_version 
     *
     * @return self
     */
    public function set_browser_version( ?string $browser_version ) {
        $this->browser_version = $browser_version;

        return $this;
    }
}