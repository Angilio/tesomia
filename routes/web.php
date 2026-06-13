<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use App\Http\Controllers\Tresorier\TresorierController;
use App\Http\Controllers\PresidentFinanceController;
use App\Http\Controllers\AttributionController;
use App\Http\Controllers\LogementController;
use App\Http\Controllers\MembreController;
use App\Http\Controllers\Auth\RegisteredUserController;
use App\Models\User;
use Illuminate\Support\Facades\Route;
use Spatie\Permission\Models\Role;
use Inertia\Inertia;

Route::get('/', function () {
    // $user = User::find(3);

    // if ($user) {
    //     $role = Role::firstOrCreate([
    //         'name' => 'Trésorier(ère)',
    //     ]);

    //     if (!$user->hasRole('Trésorier(ère)')) {
    //         $user->assignRole($role);
    //     }
    // }

    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
    ]);
});

Route::get('/dashboard', function () {
    $user = Auth::user();
    if ($user && !$user->hasRole('Commission de logement')) {
        $user->assignRole('Commission de logement');
    }
    return Inertia::render('Dashboard');
})->middleware(['auth'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::middleware(['auth', 'role:Président'])
    ->prefix('president')
    ->name('president.')
    ->group(function () {

        Route::get('/dashboard', [MembreController::class, 'dashboard'])
            ->name('dashboard');

        Route::get('/membres', [MembreController::class, 'index'])
            ->name('membres.index');



        Route::delete('/membres/{id}', [RegisteredUserController::class, 'deleteUser'])
            ->name('membres.destroy');

                // Supervision finances
        Route::get('/finances', [PresidentFinanceController::class, 'index'])
            ->name('finances.index');

        Route::put('/finances/entree/{id}', [PresidentFinanceController::class, 'updateEntree'])
            ->name('finances.entrees.update');

        Route::put('/finances/sortie/{id}', [PresidentFinanceController::class, 'updateSortie'])
            ->name('finances.sorties.update');

        Route::delete('/finances/{type}/{id}', [PresidentFinanceController::class, 'destroy'])
            ->name('finances.destroy');

        Route::get('/membres/register', [RegisteredUserController::class, 'create'])
            ->name('membres.register');

        Route::post('/membres/register', [RegisteredUserController::class, 'store']);
});



// Routes pour les logements (Commission de logement seulement)
Route::middleware(['auth', 'role:Commission de logement'])->group(function () {
    Route::get('logements/dashboard', [AttributionController::class, 'dashboard'])
        ->name('dashboard.logements');

    Route::resource('logements', LogementController::class);

    // Routes pour les attributions
    Route::get('attributions', [AttributionController::class, 'index'])->name('attributions.index');
    Route::get('attributions/create', [AttributionController::class, 'create'])->name('attributions.create');
    Route::post('attributions', [AttributionController::class, 'store'])->name('attributions.store');
    Route::get('attributions/{attribution}/edit', [AttributionController::class, 'edit'])->name('attributions.edit');
    Route::put('attributions/{attribution}', [AttributionController::class, 'update'])->name('attributions.update');
    Route::delete('attributions/{attribution}', [AttributionController::class, 'destroy'])->name('attributions.destroy');

    //Route::get('attributions-export/pdf', [AttributionController::class, 'exportPdf'])->name('attributions.export.pdf');
    Route::get('attributions/export-pdf', [AttributionController::class, 'exportPdf'])
     ->name('attributions.export.pdf');
});


Route::middleware(['auth', 'role:Trésorier(ère)||Président'])
    ->prefix('tresorier')
    ->name('tresorier.')
    ->group(function () {

        Route::get('/dashboard', [TresorierController::class, 'dashboard'])
            ->name('dashboard');

        Route::get('/finances', [TresorierController::class, 'finances'])
            ->name('finances');

        Route::post('/ressources', [TresorierController::class, 'storeRessource'])
            ->name('ressources.store');

        Route::get('/rapports', [TresorierController::class, 'rapports'])
            ->name('rapports');

        Route::get('/entrees', [TresorierController::class, 'entrees'])
            ->name('entrees.index');
        Route::post('/entrees', [TresorierController::class, 'storeEntree'])
            ->name('entrees.store');

        Route::get('/sorties', [TresorierController::class, 'sorties'])
            ->name('sorties.index');

        Route::post('/sorties', [TresorierController::class, 'storeSortie'])
            ->name('sorties.store');

        Route::get('/rapports/pdf', [TresorierController::class, 'exportRapportPdf'])
            ->name('rapports.pdf');
});

Route::post('/profile/photo', [ProfileController::class, 'updatePhoto'])
    ->name('profile.photo');

require __DIR__.'/auth.php';
