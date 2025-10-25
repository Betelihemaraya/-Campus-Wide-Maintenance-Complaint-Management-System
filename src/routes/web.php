<?php

use App\Http\Controllers\ComplaintController;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\ComplaintStatusController;
use App\Http\Controllers\ProfileController; 
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Middleware\CheckUserRole;

// Auth routes must be loaded first
require __DIR__.'/auth.php';


    Route::get('/', function () {
        if (auth()->check() && $role = auth()->user()->roles->first()) {
            return redirect()->route($role->role . '.dashboard');
        }
        return Inertia::render('Welcome');
    })->name('home');

// Complaint routes ( auth required)
Route::middleware(['auth','verified'])->group(function () {
Route::get('/complaints/create', [ComplaintController::class, 'create'])->name('complaints.create');
Route::post('/complaints', [ComplaintController::class, 'store'])->name('complaints.store');
Route::get('/complaints/track', [ComplaintController::class, 'track'])->name('complaints.track');
Route::post('/complaints/track', [ComplaintController::class, 'trackComplaint'])->name('complaints.track.post');
Route::get('/complaints/{complaintId}', [ComplaintController::class, 'show'])->name('complaints.show');
});

// Admin routes
Route::middleware(['auth','verified', CheckUserRole::class.':admin'])->prefix('admin')->name('admin.')->group(function () {
    Route::get('/', [AdminController::class, 'dashboard'])->name('dashboard');
    Route::get('/users/create', [AdminController::class, 'createUser'])->name('users.create');
    Route::post('/users', [AdminController::class, 'storeUser'])->name('users.store');
    Route::get('/users/{user}/edit', [AdminController::class, 'editUser'])->name('users.edit');
    Route::put('/users/{user}', [AdminController::class, 'updateUser'])->name('users.update');
    Route::delete('/users/{user}', [AdminController::class, 'deleteUser'])->name('users.delete');
    Route::put('/users/{user}/reset-password', [AdminController::class, 'resetPassword'])->name('users.reset-password');
});

// VP routes
Route::middleware(['auth','verified', CheckUserRole::class.':vp'])->prefix('vp')->name('vp.')->group(function () {
    Route::get('/', [ComplaintController::class, 'vpDashboard'])->name('dashboard');
});

// Director routes
Route::middleware(['auth','verified', CheckUserRole::class.':director'])->prefix('director')->name('director.')->group(function () {
    Route::get('/', [ComplaintController::class, 'directorDashboard'])->name('dashboard');
});

// Coordinator routes
Route::middleware(['auth','verified', CheckUserRole::class.':coordinator'])->prefix('coordinator')->name('coordinator.')->group(function () {
    Route::get('/', [ComplaintController::class, 'coordinatorDashboard'])->name('dashboard');
    Route::post('/complaints/assign-worker', [ComplaintController::class, 'assignWorker'])->name('complaints.assign-worker');
    Route::post('/complaints/update-status', [ComplaintController::class, 'updateComplaintStatus'])->name('complaints.update-status');
});

// Worker routes
Route::middleware(['auth','verified', CheckUserRole::class.':worker'])->prefix('worker')->name('worker.')->group(function () {
    Route::get('/', [ComplaintController::class, 'workerDashboard'])->name('dashboard');
    Route::post('/complaints/update-status', [ComplaintController::class, 'workerUpdateStatus'])->name('complaints.update-status');
    Route::post('/complaints/update-progress', [ComplaintController::class, 'workerAddProgressUpdate'])->name('complaints.update-progress');
});

// Complaint Status Routes
Route::middleware(['auth','verified'])->group(function () {
    Route::post('/complaints/{complaint}/status', [ComplaintStatusController::class, 'update'])
        ->name('complaints.update-status');
});

// Complainer routes
Route::middleware(['auth','verified', CheckUserRole::class.':complainer'])->prefix('complainer')->name('complainer.')->group(function () {
    Route::get('/', [ComplaintController::class, 'complainerDashboard'])->name('dashboard');
});
