<?php

namespace FormGent\App\DTO;

defined( 'ABSPATH' ) || exit;

class PostMetaDTO extends DTO {
    private int $meta_id;

    private int $post_id;

    private string $meta_key;

    private string $meta_value;

    /**
     * Get the value of meta_id
     *
     * @return int
     */
    public function get_meta_id(): int {
        return $this->meta_id;
    }

    /**
     * Set the value of meta_id
     *
     * @param int $meta_id 
     *
     * @return self
     */
    public function set_meta_id( int $meta_id ): self {
        $this->meta_id = $meta_id;

        return $this;
    }

    /**
     * Get the value of post_id
     *
     * @return int
     */
    public function get_post_id(): int {
        return $this->post_id;
    }

    /**
     * Set the value of form_id
     *
     * @param int $post_id 
     *
     * @return self
     */
    public function set_post_id( int $post_id ): self {
        $this->post_id = $post_id;

        return $this;
    }

    /**
     * Get the value of meta_key
     *
     * @return string
     */
    public function get_meta_key(): string {
        return $this->meta_key;
    }

    /**
     * Set the value of meta_key
     *
     * @param string $meta_key 
     *
     * @return self
     */
    public function set_meta_key( string $meta_key ): self {
        $this->meta_key = $meta_key;

        return $this;
    }

    /**
     * Get the value of meta_value
     *
     * @return string
     */
    public function get_meta_value(): string {
        return $this->meta_value;
    }

    /**
     * Set the value of meta_value
     *
     * @param string $meta_value 
     *
     * @return self
     */
    public function set_meta_value( string $meta_value ): self {
        $this->meta_value = $meta_value;

        return $this;
    }
}