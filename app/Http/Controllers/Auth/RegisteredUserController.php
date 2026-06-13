<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\Entite;
use App\Models\User;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;
use Inertia\Inertia;
use Inertia\Response;

class RegisteredUserController extends Controller
{
    public function create(): Response
    {
        return Inertia::render('Auth/Register', [
            'etablissements' => \App\Models\Etablissement::all(),
            'niveaux' => \App\Models\Niveau::all(),
            'classes' => \App\Models\Classe::all(),
            'logements' => \App\Models\Logement::all(),
            'entites' => Entite::all(),
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users,email',
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
            'contact' => 'required|string|max:20',

            'etablissement_id' => 'required|exists:etablissements,id',
            'niveau_id' => 'required|exists:niveaux,id',
            'classe_id' => 'required|exists:classes,id',
            'entite_id' => 'required|exists:entites,id',
            'logement_id' => 'required|exists:logements,id',

            'image' => 'nullable|image|mimes:jpeg,png,jpg|max:2048',
        ]);

        // 📸 Upload image
        $imagePath = null;

        if ($request->hasFile('image')) {
            $imagePath = $request->file('image')->store('avatars', 'public');
        }

        // 👤 Création utilisateur
        $user = User::create([
            'name' => $validated['name'],
            'email' => $validated['email'],
            'contact' => $validated['contact'],
            'password' => Hash::make($validated['password']),

            'etablissement_id' => $validated['etablissement_id'],
            'niveau_id' => $validated['niveau_id'],
            'classe_id' => $validated['classe_id'],
            'entite_id' => $validated['entite_id'],
            'logement_id' => $validated['logement_id'],

            'image' => $imagePath,
        ]);

        // 🎭 Attribution du rôle
        $user->assignRole('Membres');

        event(new Registered($user));

        return redirect()->route('president.membres.index');
    }

    public function deleteUser($id)
    {
        $user = User::findOrFail($id);

        // ❌ Empêcher suppression du président
        if ($user->roles->contains('name', 'Président')) {
            return back()->with(
                'error',
                'Impossible de supprimer un président.'
            );
        }

        // 🗑️ Supprimer image si existe
        if ($user->image && \Storage::disk('public')->exists($user->image)) {
            \Storage::disk('public')->delete($user->image);
        }

        // 🗑️ Supprimer utilisateur
        $user->delete();

        return redirect()
            ->route('president.membres.index')
            ->with('success', 'Membre supprimé avec succès.');
    }
}