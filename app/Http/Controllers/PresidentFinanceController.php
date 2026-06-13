<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Entree;
use App\Models\Sortie;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PresidentFinanceController extends Controller
{
    public function index()
    {
        $entrees = Entree::with('user', 'ressource')->latest()->get();
        $sorties = Sortie::latest()->get();

        return Inertia::render('President/Finances/Index', [
            'entrees' => $entrees,
            'sorties' => $sorties,
        ]);
    }

    public function updateEntree(Request $request, $id)
    {
        $request->validate([
            'montant' => 'required|numeric|min:1',
            'raison' => 'nullable|string',
        ]);

        $entree = Entree::findOrFail($id);

        $entree->update([
            'montant' => $request->montant,
            'raison' => $request->raison,
        ]);

        return back()->with('success', 'Entrée modifiée avec succès');
    }

    public function updateSortie(Request $request, $id)
    {
        $request->validate([
            'montant' => 'required|numeric|min:1',
            'raison' => 'nullable|string',
        ]);

        $sortie = Sortie::findOrFail($id);

        $sortie->update([
            'montant' => $request->montant,
            'raison' => $request->raison,
        ]);

        return back()->with('success', 'Sortie modifiée avec succès');
    }

    public function destroy($type, $id)
    {
        if ($type === 'entree') {
            Entree::findOrFail($id)->delete();
        }

        if ($type === 'sortie') {
            Sortie::findOrFail($id)->delete();
        }

        return back()->with('success', 'Supprimé avec succès');
    }
}
