<?php

namespace FormGent\App\DTO;

defined( 'ABSPATH' ) || exit;

trait ReadQueryDTO {
    public int $page = 1;

    public int $per_page = 10;

    public ?string $orger_by = null;

    public ?string $orger = null;

    /**
     * Get the value of page
     *
     * @return int
     */
    public function get_page(): int {
        return $this->page;
    }
    
    /**
     * Set the value of page
     *
     * @param int $page
     * 
     * @return self
     */
    public function set_page( int $page ): self {
        $this->page = $page;
    
        return $this;
    }

    /**
     * Get the value of per_page
     *
     * @return int
     */
    public function get_per_page(): int {
        return $this->per_page;
    }
    
    /**
     * Set the value of per_page
     *
     * @param int $per_page
     * 
     * @return self
     */
    public function set_per_page( int $per_page ): self {
        $this->per_page = $per_page;
    
        return $this;
    }

    /**
     * Get the value of orger_by
     *
     * @return ?string
     */
    public function get_orger_by(): ?string {
        return $this->orger_by;
    }
    
    /**
     * Set the value of orger_by
     *
     * @param ?string $orger_by
     * 
     * @return self
     */
    public function set_orger_by( ?string $orger_by ): self {
        $this->orger_by = $orger_by;
    
        return $this;
    }

    /**
     * Get the value of orger
     *
     * @return ?string
     */
    public function get_orger(): ?string {
        return $this->orger;
    }
    
    /**
     * Set the value of orger
     *
     * @param ?string $orger
     * @return self
     */
    public function set_orger( ?string $orger ): self {
        $this->orger = $orger;
    
        return $this;
    }
}