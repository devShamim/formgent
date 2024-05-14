<?php

namespace NewForm\App\Exceptions;

use Exception;
use Throwable;

class RequestValidatorException extends Exception {
    private $messages = [];

    /**
     * @param string $message
     * @param integer $code
     * @param Throwable|null $previous
     * @param array $messages
     */
    public function __construct( string $message = "", int $code = 422, $previous = null, array $messages = [] ) { 
        parent::__construct( $message, $code, $previous );
        $this->messages = $messages; 
    }

    public function get_messages() {
        return $this->messages;
    }
}