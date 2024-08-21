<?php

namespace FormGent\App\Repositories;

defined( 'ABSPATH' ) || exit;

use FormGent\App\DTO\ResponseDTO;
use FormGent\App\DTO\ResponseReadDTO;
use FormGent\App\DTO\ResponseSingleDTO;
use FormGent\App\EnumeratedList\ResponseStatus;
use FormGent\App\Models\Response;
use FormGent\App\Models\User;
use FormGent\App\Models\Post;
use FormGent\WpMVC\Database\Query\Builder;
use FormGent\App\Models\Answer;
use FormGent\WpMVC\Database\Query\JoinClause;

class ResponseRepository {
    public function get( ResponseReadDTO $dto ) {
        $table_names     = $this->get_field_names( $dto->get_form_id() );
        $responses_query = $this->response_query( $dto, $table_names );

        $count_query = clone $responses_query;

        do_action( 'formgent_responses_count_query', $count_query, $dto );

        if ( ! empty( $table_names ) ) {
            $responses_query->with(
                'answers', function( Builder $query ) use( $table_names ) {
                    $query->select( 'field_name', 'field_type', 'value', 'response_id' )->where_in( 'field_name', $table_names );
                }
            );
        }

        $select_columns = ['response.id', 'response.form_id', 'post.post_title as form_title', 'user.user_email', 'response.is_read', 'response.is_starred', 'response.is_completed', 'response.device', 'response.browser', 'response.created_at', 'response.updated_at'];
        $group_columns  = ['response.id', 'response.form_id', 'response.is_read', 'response.is_starred', 'response.is_completed', 'response.device', 'response.browser', 'response.created_at', 'response.updated_at'];

        $responses_query->select( $select_columns )->group_by( $group_columns );

        $this->responses_order_query( $responses_query, $dto, $table_names );

        do_action( 'formgent_responses_query', $responses_query, $dto );

        return [
            'total'     => $count_query->count( 'DISTINCT response.id' ),
            'responses' => $responses_query->pagination( $dto->get_per_page(), $dto->get_page() )
        ];
    }

    private function responses_order_query( Builder $query, ResponseReadDTO $dto, array $table_names ) {
        if ( 'response' === $dto->get_order_field_type() ) {
            $query->order_by( $dto->get_order_by(), $dto->get_order() );
        } elseif ( ! empty( $table_names ) ) {
            $query->left_join(
                Answer::get_table_name() . " as order_answer", function( JoinClause $join ) use( $dto ) {
                    $join->on_column( "response.id", "order_answer.response_id" )->on( "order_answer.field_name", $dto->get_order_by() );
                } 
            )->order_by( "order_answer.value", $dto->get_order() );
        }
    }

    private function responses_search_query( Builder $query, ResponseReadDTO $dto, array $table_names ) {
        $search = $dto->get_search();

        if ( empty( $search ) ) {
            return $query;
        }

        global $wpdb;
        $search = "%{$search}%";

        if ( empty( $table_names ) ) {
            $search_query = $wpdb->prepare( "(post.post_title like %s or user.user_email like %s)", $search, $search );
        } else {
            $search_query = $wpdb->prepare( "(post.post_title like %s or user.user_email like %s or answer.value like %s)", $search, $search, $search );
        }

        return $query->where_raw( $search_query );
    }

    public function create( ResponseDTO $dto ) {
        return Response::query()->insert_get_id( $dto->to_array() );
    }

    public function get_by_id( int $id, $columns = ['response.*'] ) {
        return Response::query( 'response' )->select( $columns )->where( 'response.id', $id )->first();
    }

    public function get_single( ResponseSingleDTO $dto ) {
        $table_names     =  $this->get_field_names( $dto->get_form_id() );
        $responses_query = $this->response_query( $dto, $table_names );

        $count_query = clone $responses_query;

        do_action( 'formgent_responses_count_query', $count_query, $dto );

        $responses_query->with(
            'answers', function( Builder $query ){
                $query->select( 'id', 'response_id', 'field_name', 'field_type', 'value', 'created_at', 'updated_at' )->where_is_null( 'parent_id' );
            }
        )->with(
            'answers.children', function( Builder $query ){
                $query->select( 'id', 'parent_id', 'field_name', 'field_type', 'value', 'created_at', 'updated_at' );
            }
        );

        $group_columns = ['response.id', 'response.form_id', 'response.is_read', 'response.is_starred', 'response.is_completed', 'response.device', 'response.browser', 'response.created_at'];

        $responses_query->select( $dto->get_columns() )->group_by( $group_columns );

        $this->responses_order_query( $responses_query, $dto, $table_names );

        do_action( 'formgent_responses_query', $responses_query, $dto );

        $responses = $responses_query->pagination( 1, $dto->get_page(), 1, 1 );

        if ( ! empty( $responses[0] ) ) {            
            $data = formgent_get_form_field_settings( parse_blocks( get_post( $dto->get_form_id() )->post_content ) );

            $responses[0]->answers = array_map(
                function( $answer ) use( $data ) {
                    // Set label for the current answer
                    if ( isset( $data[$answer->field_name]['label'] ) ) {
                        $answer->label = $data[$answer->field_name]['label'];
                    }

                    if ( ! empty( $answer->children ) && ! empty( $data[$answer->field_name]['children'] ) ) {
                        $children_data    = $data[$answer->field_name]['children'];
                        $answer->children = array_map(
                            function( $answer ) use( $children_data ) {
                                if ( isset( $children_data[$answer->field_name]['label'] ) ) {
                                    $answer->label = $children_data[$answer->field_name]['label'];
                                }
                                return $answer;
                            }, $answer->children
                        );
                    }

                    return $answer;
                }, $responses[0]->answers
            );
        }

        return [
            'total'     => $count_query->count( 'DISTINCT response.id' ),
            'responses' => $responses
        ];
    }

    private function response_query( ResponseReadDTO $dto, array $table_names ) {
        $responses_query = Response::query( 'response' )->join( Post::get_table_name() . ' as post', 'post.ID', 'response.form_id' )->where( 'response.status', ResponseStatus::PUBLISH )->where( 'response.is_completed', 1 )->left_join( User::get_table_name() . ' as user', 'response.created_by', 'user.ID' );
        if ( $dto->get_form_id() ) {
            $responses_query->where( 'post.ID', $dto->get_form_id() );
        }

        if ( $dto->get_is_read() ) {
            $responses_query->where( 'response.is_read', $dto->get_is_read() );
        }

        if ( ! empty( $table_names ) ) {
            $responses_query->left_join(
                Answer::get_table_name() . " as answer", function( JoinClause $join ) use( $table_names ) {
                    $join->on_column( "response.id", "answer.response_id" )->on_in( 'field_name', $table_names );
                } 
            );
        }

        $this->responses_search_query( $responses_query, $dto, $table_names );

        return $responses_query;
    }

    private function get_field_names( int $form_id ) {
        $table_names = get_post_meta( $form_id, 'response_table_names', true );

        if ( ! is_array( $table_names ) ) {
            $table_names = [];
        }

        return $table_names;
    }

    public function update_starred( int $response_id, int $is_starred ) {
        return Response::query()->where( 'id', $response_id )->update( [ 'is_starred' => $is_starred ] );
    }

    public function update_read( int $response_id, int $is_read ) {
        return Response::query()->where( 'id', $response_id )->update( [ 'is_read' => $is_read ] );
    }

    public function get_export_data( int $form_id, array $response_ids ) {
        $response_query = Response::query( 'response' )->with(
            'answers', function( Builder $query ) {
                $query->select( 'id', 'response_id', 'field_name', 'field_type', 'value' )->where_is_null( 'parent_id' );
            }
        )->with(
            'answers.children', function( Builder $query ) {
                $query->select( 'id', 'response_id', 'parent_id', 'field_name', 'field_type', 'value' );
            }
        )->where( 'form_id', $form_id );
    
        if ( ! empty( $response_ids ) ) {
            $response_query->where_in( 'id', $response_ids );
        }

        return $response_query->get();
    }

    public function deletes( int $form_id, array $ids ) {
        return Response::query( 'response' )->where( 'form_id', $form_id )->where_in( 'id', $ids )->delete();
    }

    public function mark_as_completed( int $id ) {
        return Response::query()->where( 'id', $id )->update(
            [
                'is_completed' => 1,
                'status'       => ResponseStatus::PUBLISH,
            ]
        );
    }

    public function create_and_get_token( ResponseDTO $response_dto ) {
        $response_id = $this->create( $response_dto );

        /**
         * Generating and storing token to identify the subsequent response on this response.
         */
        $token = 'response_token-' . formgent_generate_token();

        /**
         * @var ResponseTokenRepository $response_token_repository
         */
        $response_token_repository = formgent_singleton( ResponseTokenRepository::class );
        $response_token_repository->create( $response_dto->get_form_id(), $response_id, $token );

        return $token;
    }
}