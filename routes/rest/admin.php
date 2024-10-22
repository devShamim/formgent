<?php

defined( 'ABSPATH' ) || exit;

use FormGent\App\Http\Controllers\Admin\SummaryController;
use FormGent\App\Http\Controllers\Admin\NoteController;
use FormGent\App\Http\Controllers\Admin\EmailNotificationController;
use FormGent\App\Http\Controllers\Admin\SettingsController;
use FormGent\App\Http\Controllers\Admin\ResponseController;
use FormGent\App\Http\Controllers\Admin\FormController;
use FormGent\App\Http\Controllers\Admin\AnalyticsController;
use FormGent\WpMVC\Routing\Route;

Route::group(
    'admin', function() {
        Route::group(
            'forms', function() {
                Route::group(
                    'email-notifications', function() {
                        Route::patch( '{id}/status', [EmailNotificationController::class, 'update_status'] );
                        Route::post( '{id}/duplicate', [EmailNotificationController::class, 'duplicate'] );
                        Route::resource( '/', EmailNotificationController::class );
                    }
                );
                Route::group(
                    '{id}', function() {
                        Route::get( 'settings', [FormController::class, 'get_settings'] );
                        Route::post( 'settings', [FormController::class, 'update_settings'] );
                        Route::patch( 'status', [FormController::class, 'update_status'] );
                        Route::patch( 'title', [FormController::class, 'update_title'] );
                        Route::post( 'duplicate', [FormController::class, 'duplicate'] );
                        Route::get( 'preset-fields', [FormController::class, 'get_preset_fields'] );
                        
                        Route::group(
                            'summary', function() {
                                Route::get( '/', [SummaryController::class, 'index'] );
                                Route::get( 'field', [SummaryController::class, 'field'] );
                            }
                        );
                    }
                );

                Route::post( 'status', [FormController::class, 'update_bulk_status'] );
                Route::get( 'select', [FormController::class, 'select'] );
                Route::post( 'media', [FormController::class, 'insert_media'] );
                Route::delete( '/', [FormController::class, 'delete_bulk_form'] );
                Route::resource( '/', FormController::class );
            }
        );
        Route::group(
            'responses', function() {
                Route::resource( 'notes', NoteController::class );
                Route::patch( '{id}/starred', [ResponseController::class, 'update_starred'] );
                Route::patch( '{id}/read', [ResponseController::class, 'update_read'] );
                Route::get( 'table', [ResponseController::class, 'get_fields'] );
                Route::group(
                    'fields', function() {
                        Route::post( '/', [ResponseController::class, 'update_fields'] );
                    } 
                );
                Route::get( 'export', [ResponseController::class, 'export'] );
                Route::get( 'single', [ResponseController::class, 'show'] );
                Route::delete( '/', [ResponseController::class, 'delete_bulk_response'] );
                Route::resource( '/', ResponseController::class );
            }
        );

        Route::group(
            'analytics', function() {
                Route::get( 'forms/{id}/summary', [ AnalyticsController::class, 'form_summary' ] );
            }
        );
        
        Route::get( 'settings', [SettingsController::class, 'index'] );
        Route::post( 'settings', [SettingsController::class, 'update'] );
    }, ['admin']
);
