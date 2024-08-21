<?php

namespace FormGent\App\Repositories;

defined( 'ABSPATH' ) || exit;

use FormGent\App\DTO\AnswerDTO;
use FormGent\App\Models\Answer;
use FormGent\WpMVC\Database\Query\Builder;

class AnswerRepository {
    public function get( int $response_id ) {
        return Answer::query( 'answer' )->with(
            'children', function( Builder $query ) {
                $query->select( 'id', 'parent_id', 'field_id', 'value', 'created_at', 'updated_at' );
            }
        )->select( 'id', 'field_id', 'value', 'created_at', 'updated_at' )->where( 'response_id', $response_id )->where_is_null( 'parent_id' )->get();
    }

    public function create( AnswerDTO $dto ) {
        return Answer::query()->insert_get_id( $dto->to_array() );
    }

    public function update( AnswerDTO $dto ) {
        return Answer::query()->where( 'id', $dto->get_id() )->update( $dto->to_array() );
    }

    /**
     * Create multiple items
     */
    public function creates( int $response_id, array $items ) {
        return Answer::query()->insert(
            array_map(
                function( AnswerDTO $field ) use( $response_id ) {
                    return $field->set_response_id( $response_id )->to_array();
                }, $items
            )
        );
    }

    /**
     * Create multiple items
     */
    public function creates_from_array( array $array ) {
        return Answer::query()->insert( $array );
    }

    public function get_by_field_by_name( int $response_id, string $field_name, ?int $parent_id = null ) {
        $field = Answer::query()->where( 'response_id', $response_id )->where( 'field_name', $field_name );

        if ( is_int( $parent_id ) ) {
            $field->where( 'parent_id', $parent_id );
        } else {
            $field->where_is_null( 'parent_id' );
        }

        return $field->first();
    }

    public function get_by_parent_id( int $response_id, string $parent_id ) {
        return Answer::query()->where( 'response_id', $response_id )->where( 'parent_id', $parent_id )->get();
    }

    public function delete( int $id ) {
        return Answer::query()->where( 'id', $id )->delete();
    }
}