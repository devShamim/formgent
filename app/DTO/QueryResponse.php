<?php

namespace FormGent\App\DTO;

defined( 'ABSPATH' ) || exit;

class QueryResponse extends DTO {
    private array $data;

    private int $found_items = 0;

    public function __construct( array $data, int $found_items ) {
        $this->data        = $data;
        $this->found_items = $found_items;
    }

    /**
     * Get the value of data
     *
     * @return array
     */
    public function get_data():array {
        return $this->data;
    }

    /**
     * Set the value of data
     *
     * @param array $data 
     *
     * @return self
     */
    public function set_data( $data ) {
        $this->data = $data;

        return $this;
    }

    /**
     * Get the value of found_items
     *
     * @return int
     */
    public function get_found_items():int {
        return $this->found_items;
    }

    /**
     * Set the value of found_items
     *
     * @param int $found_items 
     *
     * @return self
     */
    public function set_found_items( $found_items ) {
        $this->found_items = $found_items;

        return $this;
    }
}