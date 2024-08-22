<?php

namespace FormGent\App\Repositories;

defined( 'ABSPATH' ) || exit;

use FormGent\App\Models\Response;
use FormGent\App\Models\PostMeta;

use stdClass;
use Exception;

class AnalyticRepository {
    public function form_summary( int $form_id ) {
        $data = [
            'total_stared'            => 0,
            'total_finished'          => 0,
            'total_views'             => $this->form_view_count( $form_id ),
            'average_completion_time' => 0,
        ];

        $response_summary = $this->response_summary( $form_id );

        if ( $response_summary ) {
            $data = array_merge( $data, $response_summary );
        }

        return $data;
    }

    public function form_view_count( int $form_id ): int {
        $data = PostMeta::query()
            ->where( 'post_id', $form_id )
            ->where( 'meta_key', '_formgent_views' )
            ->first();

        return $data ? absint( $data->meta_value ) : 0;
    }

    public function response_summary( int $form_id ): ?array {
        $total_completion_time_query = <<<SQL
        SUM(
            CASE
                WHEN response.is_completed = '1' THEN TIME_TO_SEC(
                    TIMEDIFF( response.completed_at, response.created_at )
                )
                ELSE 0
            END
        ) AS total_completion_time
SQL;

        $base_query = Response::query( 'response' )
            ->select( 
                [
                    "COUNT( form_id ) AS total_stared",
                    "SUM( CASE WHEN response.is_completed = '1' THEN 1 ELSE 0 END ) AS total_finished",
                    $total_completion_time_query,
                ]
            );

        $result = $base_query->where( 'response.form_id', $form_id )->group_by( 'response.form_id' )->first();

        return $result ? $this->transform_response_summary_item_data( $result ) : null;
    }

    private function transform_response_summary_item_data( stdClass $item ) {
        // Calculate average completion time
        $average_completion_time = absint( $item->total_finished ) > 0 
            ? absint( $item->total_completion_time ) / absint( $item->total_finished ) 
            : 0;

        $item->average_completion_time = round( $average_completion_time );
        $item->total_stared            = absint( $item->total_stared );
        $item->total_finished          = absint( $item->total_finished );

        unset( $item->total_completion_time );

        return ( array ) $item;
    }

    /**
     * @throws Exception
     */
    public function update_form_view_count( int $form_id, int $count, $type = '=' ): int {
        $old_count_meta = PostMeta::query()
            ->where( 'post_id', $form_id )
            ->where( 'meta_key', '_formgent_views' )
            ->first();

        if ( ! $old_count_meta ) {
            $count = $count < 0 || '-' === $type ? 0 : $count;
            $id    = PostMeta::query()->insert_get_id(
                [
                    'post_id'    => $form_id,
                    'meta_key'   => '_formgent_views',
                    'meta_value' => $count,
                ]
            );

            if ( $id ) {
                return $count;
            }

            throw new Exception( esc_html__( 'Could not update the view count.', 'formgent' ), 403 );
        }

        $type = in_array( $type, [ '=', '+', '-' ] ) ? $type : '=';

        switch ( $type ) {
            case '+':
                $count = absint( $old_count_meta->meta_value ) + $count;
                break;
            case '-':
                $count = absint( $old_count_meta->meta_value ) - $count;
                $count = $count < 0 ? 0 : $count;
                break;
        }

        $status = PostMeta::query()
            ->where( 'post_id', $form_id )
            ->where( 'meta_key', '_formgent_views' )
            ->update( [  'meta_value' => $count ] );

        if ( false === $status ) {
            throw new Exception( esc_html__( 'Could not update the view count.', 'formgent' ), 403 );
        }

        return $count;
    }
}