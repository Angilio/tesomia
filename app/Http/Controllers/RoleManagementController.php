<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Inertia\Inertia;
use Spatie\Permission\Models\Role;

class RoleManagementController extends Controller
{
    public function index(Request $request)
    {
        $search = $request->input('search');
        $role = $request->input('role');
        $perPage = (int) $request->input('per_page', 15);

        $perPage = in_array($perPage, [10, 15, 25, 50]) ? $perPage : 15;

        $users = User::query()
            ->select('id', 'name', 'email')
            ->with('roles:id,name')
            ->when($search, function ($query) use ($search) {
                $query->where(function ($q) use ($search) {
                    $q->where('name', 'like', "%{$search}%")
                        ->orWhere('email', 'like', "%{$search}%");
                });
            })
            ->when($role, function ($query) use ($role) {
                $query->whereHas('roles', function ($q) use ($role) {
                    $q->where('name', $role);
                });
            })
            ->orderBy('name')
            ->paginate($perPage)
            ->withQueryString()
            ->through(function ($user) {
                return [
                    'id' => $user->id,
                    'name' => $user->name,
                    'email' => $user->email,
                    'roles' => $user->roles->pluck('name')->values(),
                ];
            });

        $roles = Role::where('guard_name', 'web')
            ->orderBy('name')
            ->pluck('name')
            ->values();

        return Inertia::render('President/Roles/Index', [
            'users' => $users,
            'roles' => $roles,
            'filters' => [
                'search' => $search,
                'role' => $role,
                'per_page' => $perPage,
            ],
            'stats' => [
                'total_users' => User::count(),
                'total_presidents' => User::role('Président')->count(),
                'total_tresoriers' => User::role('Trésorier(ère)')->count(),
                'total_commission_logement' => User::role('Commission de logement')->count(),
                'users_without_role' => User::doesntHave('roles')->count(),
            ],
        ]);
    }

    public function update(Request $request, User $user)
    {
        $validated = $request->validate([
            'roles' => ['required', 'array', 'min:1'],
            'roles.*' => [
                'required',
                'string',
                Rule::exists('roles', 'name')->where('guard_name', 'web'),
            ],
        ], [
            'roles.required' => 'Veuillez sélectionner au moins un rôle.',
            'roles.min' => 'Veuillez sélectionner au moins un rôle.',
            'roles.*.exists' => 'Un des rôles sélectionnés est invalide.',
        ]);

        $newRoles = collect($validated['roles'])
            ->unique()
            ->values();

        if ($user->hasRole('Président') && !$newRoles->contains('Président')) {
            $totalPresidents = User::role('Président')->count();

            if ($totalPresidents <= 1) {
                return back()->withErrors([
                    'roles' => 'Impossible de retirer le rôle Président du dernier Président.',
                ]);
            }
        }

        $user->syncRoles($newRoles->toArray());

        return back()->with('success', 'Rôles mis à jour avec succès.');
    }
}