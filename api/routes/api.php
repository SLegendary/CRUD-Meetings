<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\MeetingController;

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::controller(MeetingController::class)->group(function(){
    Route::get('/meetings', 'index');
    Route::post('/meeting', 'store');
    Route::get('/meeting/{room}', 'show');
    Route::put('/meeting/{id}', 'update');
    Route::delete('/meeting/{id}', 'destroy');
    Route::put('/meetings', 'autoUpdate');

});