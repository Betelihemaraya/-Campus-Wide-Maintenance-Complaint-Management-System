<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class EmailVerificationPromptController extends Controller
{
    /**
     * Display the email verification prompt.
     */
    public function __invoke(Request $request): RedirectResponse|Response
    {
        $dashboardRoute = match($request->user()->roles->first()->role) {
            'admin' => 'admin.dashboard',
            'vp' => 'vp.dashboard',
            'director' => 'director.dashboard',
            'coordinator' => 'coordinator.dashboard',
            'worker' => 'worker.dashboard',
            'complainer' => 'complainer.dashboard',
        };
        return $request->user()->hasVerifiedEmail()
                    ? redirect()->intended(route($dashboardRoute, absolute: false))
                    : Inertia::render('Auth/VerifyEmail', ['status' => session('status')]);
    }
}
