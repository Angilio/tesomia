<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('ress_financieres', function (Blueprint $table) {
            $table->decimal('prix', 12, 2)->default(0)->after('ressource')->nullable();
        });
    }

    public function down(): void
    {
        Schema::table('ress_financieres', function (Blueprint $table) {
            $table->dropColumn('prix');
        });
    }
};