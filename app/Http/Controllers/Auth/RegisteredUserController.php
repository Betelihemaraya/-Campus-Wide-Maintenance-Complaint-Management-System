<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;
use Inertia\Inertia;
use Inertia\Response;
use App\Models\Role;
use App\Models\UserRole;

class RegisteredUserController extends Controller
{
    /**
     * Display the registration view.
     */
    public function create(): Response
    {
        return Inertia::render('Auth/Register');
    }

    /**
     * Handle an incoming registration request.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function store(Request $request): RedirectResponse
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|lowercase|email|max:255|unique:'.User::class,
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
        ]);

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);

        // Assign 'complainer' role
        $role = Role::where('role', 'complainer')->first();
        if ($role) {
            UserRole::create([
                'user_id' => $user->id,
                'role_id' => $role->id,
                'campus_id' => null,
                'complaint_type_id' => null,
            ]);
        }

        // Fire the Registered event (sends verification email)
        event(new Registered($user));

        // Log the user in
        Auth::login($user);

        // Redirect back with a status message
        return redirect()->route('complainer.dashboard')->with('status', 'Registration successful! Please check your email for verification.');
    }
}
