<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class PresidentUserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        User::updateOrCreate(
            [
                'email' => 'president@gmail.com',
            ],
            [
                'name' => 'Angilio',
                'password' => Hash::make('12345678'),

                // Clés étrangères
                'etablissement_id' => 1,
                'niveau_id' => 1,
                'classe_id' => 1,
                'entite_id' => 1,
                'logement_id' => 1,

                // Autres champs
                'contact' => +261325412775,
                'image' => null,
            ]
        );
    }
}