<?php

namespace FormGent\App\Repositories;

defined( 'ABSPATH' ) || exit;

use Exception;
use FormGent\App\DTO\PostMetaDTO;
use FormGent\App\DTO\PostMetaReadDTO;
use FormGent\App\DTO\QueryResponse;
use FormGent\App\Models\PostMeta;

class PostMetaRepository {
    public function get( PostMetaReadDTO $dto ): QueryResponse {
        $query = PostMeta::query();

        if ( $dto->get_meta_id() ) {
            $query->where( 'meta_id', $dto->get_meta_id() );
        }

        if ( $dto->get_post_id() ) {
            $query->where( 'post_id', $dto->get_post_id() );
        }

        if ( $dto->get_meta_key() ) {
            $query->where( 'meta_key', $dto->get_meta_key() );
        }

        if ( $dto->get_meta_value() ) {
            $query->where( 'meta_value', $dto->get_meta_value() );
        }

        $count_query = clone $query;

        // Set Ordering
        switch ( $dto->get_order_by() ) {
            case 'oldest':
                $query->order_by( 'meta_id' );
                break;

            case 'latest':
                $query->order_by_desc( 'meta_id' );
                break;
        }

        return new QueryResponse(
            $query->pagination( $dto->get_per_page(), $dto->get_page(), 100, 1 ), 
            $count_query->count() 
        );
    }

    public function get_meta( int $post_id, string $meta_key ) {
        return PostMeta::query()->where( 'post_id', $post_id )->where( 'meta_key', $meta_key )->first();
    }

    public function get_by_meta_id( int $id, $columns = ['*'] ) {
        return PostMeta::query()->select( $columns )->where( 'meta_id', $id )->first();
    }
    
    public function get_by_post_id( int $form_id, $columns = ['*'] ) {
        return PostMeta::query()->select( $columns )->where( 'post_id', $form_id )->get();
    }

    public function create( PostMetaDTO $dto ) {
        return PostMeta::query()->insert_get_id( $dto->to_array() );
    }

    public function update( PostMetaDTO $dto ) {
        $form_meta = $this->get_by_meta_id( $dto->get_meta_id(), [1] );

        if ( ! $form_meta ) {
            throw new Exception( esc_html__( 'Post meta not found.', 'formgent' ), 404 );
        }

        return PostMeta::query()->where( 'meta_id', $dto->get_meta_id() )->update(
            [
                'meta_value' => $dto->get_meta_value()
            ] 
        );
    }

    public function delete( int $id ) {
        $form_meta = $this->get_by_meta_id( $id );

        if ( ! $form_meta ) {
            throw new Exception( esc_html__( 'Post meta not found.', 'formgent' ), 404 );
        }

        return PostMeta::query()->where( 'meta_id', $id )->delete();
    }

    public function get_meta_value( int $post_id, string $meta_key ) {
        $meta = $this->get_meta( $post_id, $meta_key );
        
        if ( ! $meta ) {
            return false;
        }

        return $meta->meta_value;
    }
}