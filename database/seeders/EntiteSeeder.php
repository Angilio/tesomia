<?php

namespace Database\Seeders;

use App\Models\Entite;
use Illuminate\Database\Seeder;

class EntiteSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $entites = [
            'SEOBUA',
            'GEOBA',
            'MENOM',
            'AEPUA',
            'AENOA',
            'SENOA',
        ];

        foreach ($entites as $entite) {
            Entite::updateOrCreate(
                [
                    'entite' => $entite,
                ],
                [
                    'entite' => $entite,
                ]
            );
        }
    }
}