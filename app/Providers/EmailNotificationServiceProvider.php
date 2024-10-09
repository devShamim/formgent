<?php

namespace FormGent\App\Providers;

defined( "ABSPATH" ) || exit;

use FormGent\App\DTO\EmailNotificationDTO;
use FormGent\App\DTO\FormDTO;
use FormGent\WpMVC\Contracts\Provider;
use FormGent\App\Repositories\EmailNotificationRepository;
use FormGent\App\BackgroundProcessors\EmailNotification;
use WP_REST_Request;
use stdClass;

class EmailNotificationServiceProvider implements Provider {
    public EmailNotification $background_process;

    public function boot() {
        $this->background_process = new EmailNotification;

        add_action( "formgent_after_create_form_response", [$this, "after_create_form_response"], 10, 3 );
        add_action( "formgent_after_create_form", [$this, "after_create_form"] );
    }

    public function after_create_form_response( int $response_id, stdClass $form, WP_REST_Request $request ) {
        /**
         * @var EmailNotificationRepository $repository
         */
        $repository = formgent_singleton( EmailNotificationRepository::class );
        $emails     = $repository->get_by_form_id( $form->ID );

        if ( empty( $emails ) ) {
            return;
        }

        $this->background_process->push_to_queue(
            [
                'emails' => $emails
            ] 
        )->save()->dispatch();
    }

    public function after_create_form( FormDTO $form_dto ) {
        $dto = ( new EmailNotificationDTO )->set_form_id( $form_dto->get_id() )
        ->set_name( "Admin Notification Email" )
        ->set_send_to( "{admin_email}" )
        ->set_subject( "New Form Submission" )
        ->set_body( "You received a new response in the form of Formgent" )
        ->set_status( "publish" );

        /**
         * @var EmailNotificationRepository $repository
         */
        $repository = formgent_singleton( EmailNotificationRepository::class );
        $repository->create( $dto );
    }
}